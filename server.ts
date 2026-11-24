import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { db, createSessionToken, hashPassword, verifyPassword } from './src/server/db.ts';
import { seedDatabaseIfNeeded, getTargetTestQuestionCount } from './src/server/seed/index.ts';
import { CLASS_10_DRIVE_FOLDER_URL } from './src/server/seed/pyq_and_notes.ts';
import { buildExportedQuestionBank } from './scripts/export_and_verify_bank.ts';

function extractDriveFileId(input: string | undefined | null): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const directMatch = trimmed.match(/^[a-zA-Z0-9_-]{15,80}$/);
  if (directMatch) return directMatch[0];
  const urlMatch = trimmed.match(/(?:\/d\/|[?&]id=)([a-zA-Z0-9_-]{15,80})/);
  return urlMatch ? urlMatch[1] : null;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Seed database on startup (idempotent)
seedDatabaseIfNeeded();

interface AuthedProfile {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  classId: number;
  classNumber: number;
  createdAt: string;
}

interface AuthedRequest extends Request {
  profile?: AuthedProfile;
}

function getProfileByToken(token: string | undefined): AuthedProfile | undefined {
  if (!token) return undefined;
  const row = db
    .prepare(
      `SELECT p.id, p.name, p.email, p.role, p.class_id as classId, c.number as classNumber, p.created_at as createdAt
       FROM sessions s
       JOIN profiles p ON p.id = s.profile_id
       JOIN classes c ON c.id = p.class_id
       WHERE s.token = ? AND s.expires_at > datetime('now')`
    )
    .get(token) as AuthedProfile | undefined;
  return row;
}

function extractToken(req: Request): string | undefined {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7).trim();
  }
  return undefined;
}

function attachOptionalAuth(req: AuthedRequest, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) {
    req.profile = getProfileByToken(token);
  }
  next();
}

function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req);
  const profile = getProfileByToken(token);
  if (!profile) {
    return res.status(401).json({ error: 'Authentication required. Please sign in.' });
  }
  req.profile = profile;
  next();
}

function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = extractToken(req);
  const profile = getProfileByToken(token);
  if (!profile) {
    return res.status(401).json({ error: 'Admin authentication required.' });
  }
  if (profile.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Administrator privileges required.' });
  }
  req.profile = profile;
  next();
}

function createSessionForProfile(profileId: number): string {
  const token = createSessionToken();
  db.prepare(
    `INSERT INTO sessions (token, profile_id, expires_at) VALUES (?, ?, datetime('now', '+30 days'))`
  ).run(token, profileId);
  return token;
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function hashSeed(seedStr: string): number {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function deterministicShuffle<T>(items: T[], seedStr: string): T[] {
  const arr = [...items];
  let state = hashSeed(seedStr) || 1;
  const nextRand = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(nextRand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));
  app.use(attachOptionalAuth);

  // ==================== AUTH ROUTES ====================
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { name, email, password, classNumber } = req.body ?? {};
      if (!name || !email || !password || !classNumber) {
        return res.status(400).json({ error: 'Name, email, password, and class are required.' });
      }
      if (String(password).length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
      }
      const cls = db.prepare('SELECT id, number FROM classes WHERE number = ?').get(Number(classNumber)) as
        | { id: number; number: number }
        | undefined;
      if (!cls) {
        return res.status(400).json({ error: 'Please select a valid class (6, 7, 8, 9, or 10).' });
      }
      const normalizedEmail = String(email).trim().toLowerCase();
      const existing = db.prepare('SELECT id FROM profiles WHERE email = ?').get(normalizedEmail);
      if (existing) {
        return res.status(409).json({ error: 'An account with this email already exists. Please sign in.' });
      }

      const passwordHash = hashPassword(String(password));
      const result = db
        .prepare(
          `INSERT INTO profiles (name, email, password_hash, role, class_id) VALUES (?, ?, ?, 'student', ?)`
        )
        .run(String(name).trim(), normalizedEmail, passwordHash, cls.id);
      const profileId = Number(result.lastInsertRowid);
      const token = createSessionForProfile(profileId);
      const profile = getProfileByToken(token);
      return res.status(201).json({ token, profile });
    } catch (err) {
      console.error('Register error:', err);
      return res.status(500).json({ error: 'Failed to create account.' });
    }
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body ?? {};
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }
      const normalizedEmail = String(email).trim().toLowerCase();
      const row = db
        .prepare('SELECT id, password_hash FROM profiles WHERE email = ?')
        .get(normalizedEmail) as { id: number; password_hash: string } | undefined;
      if (!row || !verifyPassword(String(password), row.password_hash)) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }
      const token = createSessionForProfile(row.id);
      const profile = getProfileByToken(token);
      return res.json({ token, profile });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Failed to sign in.' });
    }
  });

  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const token = extractToken(req);
    if (token) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    }
    return res.json({ ok: true });
  });

  app.get('/api/auth/me', (req: AuthedRequest, res: Response) => {
    return res.json({ profile: req.profile ?? null });
  });

  app.put('/api/auth/profile', requireAuth, (req: AuthedRequest, res: Response) => {
    try {
      const { name, classNumber } = req.body ?? {};
      const cls = db.prepare('SELECT id FROM classes WHERE number = ?').get(Number(classNumber)) as
        | { id: number }
        | undefined;
      if (!name || !cls) {
        return res.status(400).json({ error: 'Valid name and class are required.' });
      }
      db.prepare('UPDATE profiles SET name = ?, class_id = ? WHERE id = ?').run(
        String(name).trim(),
        cls.id,
        req.profile!.id
      );
      const token = extractToken(req);
      const updated = getProfileByToken(token);
      return res.json({ profile: updated });
    } catch (err) {
      console.error('Update profile error:', err);
      return res.status(500).json({ error: 'Failed to update profile.' });
    }
  });

  // ==================== SYLLABUS & BROWSE ROUTES ====================
  app.get('/api/classes', (_req: Request, res: Response) => {
    const rows = db
      .prepare(
        `SELECT
          c.id,
          c.number,
          c.name,
          c.syllabus_year as syllabusYear,
          c.description,
          (SELECT COUNT(*) FROM subjects s WHERE s.class_id = c.id) as subjectCount,
          (SELECT COUNT(*) FROM chapters ch JOIN subjects s ON s.id = ch.subject_id WHERE s.class_id = c.id) as chapterCount,
          (
            SELECT COUNT(*)
            FROM test_sets ts
            JOIN chapters ch ON ch.id = ts.chapter_id
            JOIN subjects s ON s.id = ch.subject_id
            WHERE s.class_id = c.id
              AND (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) >= ts.question_count
              AND ts.question_count >= 10
          ) as readyTestCount
        FROM classes c
        ORDER BY c.number ASC`
      )
      .all();
    return res.json(rows);
  });

  app.get('/api/classes/:classNumber/subjects', (req: Request, res: Response) => {
    const classNumber = Number(req.params.classNumber);
    const cls = db
      .prepare('SELECT id, number, name, syllabus_year as syllabusYear, description FROM classes WHERE number = ?')
      .get(classNumber) as Record<string, unknown> | undefined;
    if (!cls) {
      return res.status(404).json({ error: 'Class not found.' });
    }

    const subjects = db
      .prepare(
        `SELECT
          s.id,
          s.class_id as classId,
          c.number as classNumber,
          s.slug,
          s.name,
          s.textbook_title as textbookTitle,
          s.description,
          (SELECT COUNT(*) FROM chapters ch WHERE ch.subject_id = s.id) as chapterCount,
          (
            SELECT COUNT(*) FROM (
              SELECT ch.id
              FROM chapters ch
              JOIN questions q ON q.chapter_id = ch.id
              WHERE ch.subject_id = s.id
              GROUP BY ch.id
              HAVING COUNT(q.id) >= 10
            )
          ) as readyChapterCount,
          (
            SELECT COUNT(*)
            FROM test_sets ts
            JOIN chapters ch ON ch.id = ts.chapter_id
            WHERE ch.subject_id = s.id
              AND (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) >= ts.question_count
              AND ts.question_count >= 10
          ) as readyTestCount,
          (
            SELECT COUNT(*)
            FROM questions q
            JOIN chapters ch ON ch.id = q.chapter_id
            WHERE ch.subject_id = s.id
          ) as totalQuestionCount
        FROM subjects s
        JOIN classes c ON c.id = s.class_id
        WHERE s.class_id = ?
        ORDER BY CASE s.slug
          WHEN 'science' THEN 1
          WHEN 'mathematics' THEN 2
          WHEN 'social-science' THEN 3
          WHEN 'english' THEN 4
          WHEN 'hindi' THEN 5
          ELSE 6
        END`
      )
      .all(cls.id);

    return res.json({ classInfo: cls, subjects });
  });

  app.get('/api/subjects/:subjectId/chapters', (req: AuthedRequest, res: Response) => {
    const subjectId = Number(req.params.subjectId);
    const subject = db
      .prepare(
        `SELECT s.id, s.class_id as classId, c.number as classNumber, c.name as className,
                c.syllabus_year as syllabusYear, s.slug, s.name, s.textbook_title as textbookTitle, s.description
         FROM subjects s
         JOIN classes c ON c.id = s.class_id
         WHERE s.id = ?`
      )
      .get(subjectId) as Record<string, unknown> | undefined;

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    const profileId = req.profile?.id ?? -1;

    const rawChapters = db
      .prepare(
        `SELECT
          ch.id,
          ch.subject_id as subjectId,
          ch.chapter_number as chapterNumber,
          ch.title,
          ch.unit_name as unitName,
          ch.description,
          (SELECT COUNT(*) FROM test_sets ts WHERE ts.chapter_id = ch.id) as totalTestSets,
          (
            SELECT COUNT(*)
            FROM test_sets ts
            WHERE ts.chapter_id = ch.id
              AND (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) >= ts.question_count
              AND ts.question_count >= 10
          ) as readyTestSets,
          (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ch.id) as totalQuestions,
          (
            SELECT COUNT(DISTINCT ta.test_set_id)
            FROM test_attempts ta
            WHERE ta.chapter_id = ch.id AND ta.profile_id = ? AND ta.is_mixed = 0
          ) as completedTestSets,
          (
            SELECT MAX(ta.percentage)
            FROM test_attempts ta
            WHERE ta.chapter_id = ch.id AND ta.profile_id = ? AND ta.is_mixed = 0
          ) as bestPercentage
        FROM chapters ch
        WHERE ch.subject_id = ?
        ORDER BY ch.chapter_number ASC`
      )
      .all(profileId, profileId, subjectId) as Array<Record<string, unknown>>;

    const levelsStmt = db.prepare(`
      SELECT DISTINCT ts.difficulty_level as level
      FROM test_sets ts
      WHERE ts.chapter_id = ?
        AND (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) >= ts.question_count
        AND ts.question_count >= 10
      ORDER BY ts.difficulty_level ASC
    `);

    const chapters = rawChapters.map((ch) => {
      const levels = (levelsStmt.all(ch.id) as Array<{ level: number }>).map((r) => r.level);
      return {
        ...ch,
        availableLevels: levels,
      };
    });

    // Mixed chapter test eligibility: chapters with at least 10 questions
    const readyChapters = chapters.filter((c) => Number((c as Record<string, unknown>).totalQuestions) >= 10);
    const mixedTestInfo = {
      readyChaptersCount: readyChapters.length,
      totalChaptersCount: chapters.length,
      questionCount: readyChapters.length * 10,
      timeLimitMinutes: readyChapters.length * 10,
      totalMarks: readyChapters.length * 10,
      isAvailable: readyChapters.length >= 2,
    };

    return res.json({ subject, chapters, mixedTestInfo });
  });

  app.get('/api/chapters/:chapterId/tests', (req: AuthedRequest, res: Response) => {
    const chapterId = Number(req.params.chapterId);
    const chapter = db
      .prepare(
        `SELECT ch.id, ch.subject_id as subjectId, ch.chapter_number as chapterNumber, ch.title,
                ch.unit_name as unitName, ch.description,
                (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ch.id) as totalQuestions,
                s.name as subjectName, s.textbook_title as textbookTitle,
                c.number as classNumber, c.name as className
         FROM chapters ch
         JOIN subjects s ON s.id = ch.subject_id
         JOIN classes c ON c.id = s.class_id
         WHERE ch.id = ?`
      )
      .get(chapterId) as Record<string, unknown> | undefined;

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found.' });
    }

    const profileId = req.profile?.id ?? -1;
    const rawSets = db
      .prepare(
        `SELECT
          ts.id,
          ts.chapter_id as chapterId,
          ts.title,
          ts.difficulty_level as difficultyLevel,
          ts.set_number as setNumber,
          ts.question_count as targetQuestionCount,
          ts.time_limit_minutes as timeLimitMinutes,
          ts.total_marks as totalMarks,
          (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) as chapterPoolCount,
          (SELECT MAX(ta.score) FROM test_attempts ta WHERE ta.test_set_id = ts.id AND ta.profile_id = ?) as bestScore,
          (SELECT COUNT(*) FROM test_attempts ta WHERE ta.test_set_id = ts.id AND ta.profile_id = ?) as attemptsCount
        FROM test_sets ts
        WHERE ts.chapter_id = ?
        ORDER BY ts.difficulty_level ASC, ts.set_number ASC`
      )
      .all(profileId, profileId, chapterId) as Array<Record<string, unknown>>;

    const testSets = rawSets.map((s) => {
      const targetCount = Number(s.targetQuestionCount || 10);
      const chapterPool = Number(s.chapterPoolCount || 0);
      const isReady = chapterPool >= targetCount && targetCount >= 10;
      return {
        ...s,
        questionCount: targetCount,
        isReady,
      };
    });

    return res.json({ chapter, testSets });
  });

  // ==================== CHAPTER & SUBJECT REVISION MODE (20 / 50 / 75 / 100 QUESTIONS, INSTANT REVEAL) ====================
  app.get('/api/chapters/:chapterId/revision', (req: Request, res: Response) => {
    const chapterId = Number(req.params.chapterId);
    const chapter = db
      .prepare(
        `SELECT ch.id, ch.subject_id as subjectId, ch.chapter_number as chapterNumber, ch.title,
                ch.unit_name as unitName, ch.description,
                s.name as subjectName, s.textbook_title as textbookTitle,
                c.number as classNumber, c.name as className
         FROM chapters ch
         JOIN subjects s ON s.id = ch.subject_id
         JOIN classes c ON c.id = s.class_id
         WHERE ch.id = ?`
      )
      .get(chapterId) as Record<string, unknown> | undefined;

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found.' });
    }

    const chapterQuestions = db
      .prepare(
        `SELECT q.id, q.chapter_id as chapterId, ch.title as chapterTitle,
                q.difficulty_level as difficultyLevel,
                q.question_text as questionText, q.option_a as optionA, q.option_b as optionB,
                q.option_c as optionC, q.option_d as optionD, q.correct_option as correctOption,
                q.explanation, q.question_type as questionType
         FROM questions q
         JOIN chapters ch ON ch.id = q.chapter_id
         WHERE q.chapter_id = ?
         ORDER BY q.difficulty_level ASC, q.id ASC`
      )
      .all(chapterId) as Array<Record<string, unknown>>;

    const subjectQuestions = db
      .prepare(
        `SELECT q.id, q.chapter_id as chapterId, ch.title as chapterTitle,
                q.difficulty_level as difficultyLevel,
                q.question_text as questionText, q.option_a as optionA, q.option_b as optionB,
                q.option_c as optionC, q.option_d as optionD, q.correct_option as correctOption,
                q.explanation, q.question_type as questionType
         FROM questions q
         JOIN chapters ch ON ch.id = q.chapter_id
         WHERE ch.subject_id = ? AND q.chapter_id != ?
         ORDER BY q.difficulty_level ASC, q.id ASC`
      )
      .all(Number(chapter.subjectId), chapterId) as Array<Record<string, unknown>>;

    const totalSubjectPool = chapterQuestions.length + subjectQuestions.length;
    if (totalSubjectPool === 0) {
      return res.status(400).json({ error: 'No revision questions available for this chapter yet.' });
    }

    const presetCandidates = [20, 50, 75, 100];
    const availableCounts = presetCandidates.filter((n) => n <= totalSubjectPool);
    if (availableCounts.length === 0) {
      availableCounts.push(totalSubjectPool);
    }

    const rawCount = Number(req.query.count || 0);
    const defaultCount = availableCounts.includes(20) ? 20 : availableCounts[0];
    const requestedCount = rawCount > 0 ? Math.min(totalSubjectPool, Math.min(100, rawCount)) : defaultCount;

    const shouldShuffle = req.query.shuffle === '1' || req.query.shuffle === 'true';
    const primaryPool = shouldShuffle ? shuffleArray(chapterQuestions) : chapterQuestions;

    let selected = primaryPool.slice(0, requestedCount);
    let supplementedCount = 0;
    if (selected.length < requestedCount && subjectQuestions.length > 0) {
      const extraPool = shouldShuffle ? shuffleArray(subjectQuestions) : subjectQuestions;
      const needed = requestedCount - selected.length;
      const extras = extraPool.slice(0, needed);
      supplementedCount = extras.length;
      selected = [...selected, ...extras];
    }

    return res.json({
      mode: 'chapter',
      supplementedCount,
      chapter: {
        ...chapter,
        totalQuestions: chapterQuestions.length,
      },
      availableCounts,
      selectedCount: selected.length,
      questions: selected,
    });
  });

  app.get('/api/subjects/:subjectId/revision', (req: Request, res: Response) => {
    const subjectId = Number(req.params.subjectId);
    const subject = db
      .prepare(
        `SELECT s.id, s.slug, s.name as subjectName, s.textbook_title as textbookTitle,
                s.description, c.number as classNumber, c.name as className
         FROM subjects s
         JOIN classes c ON c.id = s.class_id
         WHERE s.id = ?`
      )
      .get(subjectId) as Record<string, unknown> | undefined;

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    const allQuestions = db
      .prepare(
        `SELECT q.id, q.chapter_id as chapterId, ch.title as chapterTitle,
                q.difficulty_level as difficultyLevel,
                q.question_text as questionText, q.option_a as optionA, q.option_b as optionB,
                q.option_c as optionC, q.option_d as optionD, q.correct_option as correctOption,
                q.explanation, q.question_type as questionType
         FROM questions q
         JOIN chapters ch ON ch.id = q.chapter_id
         WHERE ch.subject_id = ?
         ORDER BY ch.chapter_number ASC, q.difficulty_level ASC, q.id ASC`
      )
      .all(subjectId) as Array<Record<string, unknown>>;

    if (allQuestions.length === 0) {
      return res.status(400).json({ error: 'No revision questions available for this subject yet.' });
    }

    const presetCandidates = [20, 50, 75, 100];
    const availableCounts = presetCandidates.filter((n) => n <= allQuestions.length);
    if (availableCounts.length === 0) {
      availableCounts.push(allQuestions.length);
    }

    const rawCount = Number(req.query.count || 0);
    const defaultCount = availableCounts.includes(50) ? 50 : availableCounts[0];
    const requestedCount = rawCount > 0 ? Math.min(allQuestions.length, Math.min(100, rawCount)) : defaultCount;

    const shouldShuffle = req.query.shuffle === '1' || req.query.shuffle === 'true';
    const pool = shouldShuffle ? shuffleArray(allQuestions) : allQuestions;
    const selected = pool.slice(0, requestedCount);

    return res.json({
      mode: 'subject',
      supplementedCount: 0,
      chapter: {
        id: 0,
        subjectId: Number(subject.id),
        chapterNumber: 0,
        title: `${subject.subjectName} — Full Subject Marathon`,
        unitName: String(subject.textbookTitle),
        description: String(subject.description),
        subjectName: String(subject.subjectName),
        textbookTitle: String(subject.textbookTitle),
        classNumber: Number(subject.classNumber),
        className: String(subject.className),
        totalQuestions: allQuestions.length,
      },
      availableCounts,
      selectedCount: selected.length,
      questions: selected,
    });
  });

  // ==================== EXAM ENGINE ROUTES ====================
  app.get('/api/tests/:testSetId/start', (req: AuthedRequest, res: Response) => {
    const testSetId = Number(req.params.testSetId);
    const meta = db
      .prepare(
        `SELECT ts.id, ts.title, ts.difficulty_level as difficultyLevel, ts.set_number as setNumber,
                ts.question_count as questionCount, ts.time_limit_minutes as timeLimitMinutes,
                ts.total_marks as totalMarks, ts.chapter_id as chapterId,
                ch.chapter_number as chapterNumber, ch.title as chapterTitle,
                s.name as subjectName, s.textbook_title as textbookTitle,
                c.number as classNumber
         FROM test_sets ts
         JOIN chapters ch ON ch.id = ts.chapter_id
         JOIN subjects s ON s.id = ch.subject_id
         JOIN classes c ON c.id = s.class_id
         WHERE ts.id = ?`
      )
      .get(testSetId) as Record<string, unknown> | undefined;

    if (!meta) {
      return res.status(404).json({ error: 'Test set not found.' });
    }

    // Determine prior attempts so questions stay IDENTICAL for the first 5 retakes (attempts 1..6),
    // and automatically rotate to a fresh set starting on retake #6!
    let priorAttempts = Math.max(0, Number(req.query.retakeCount ?? 0) || 0);
    if (req.profile) {
      const attRow = db
        .prepare('SELECT COUNT(*) as c FROM test_attempts WHERE profile_id = ? AND test_set_id = ?')
        .get(req.profile.id, testSetId) as { c: number };
      priorAttempts = attRow.c;
    }

    const cycle = Math.floor(priorAttempts / 6);
    const targetCount = Number(meta.questionCount || 10);
    const targetDifficulty = Number(meta.difficultyLevel || 1);

    const allChapterQuestions = db
      .prepare(
        `SELECT id, test_set_id as testSetId, chapter_id as chapterId, difficulty_level as difficultyLevel,
                question_text as questionText, option_a as optionA, option_b as optionB,
                option_c as optionC, option_d as optionD, question_type as questionType
         FROM questions
         WHERE chapter_id = ?
         ORDER BY id ASC`
      )
      .all(meta.chapterId) as Array<Record<string, unknown>>;

    if (allChapterQuestions.length < targetCount) {
      return res.status(400).json({
        error: `This test requires ${targetCount} questions and currently has ${allChapterQuestions.length} in the chapter pool.`,
      });
    }

    // Priority order within the chapter:
    // 1. Direct questions assigned to this test_set_id
    // 2. Other questions in the same chapter at the exact target difficulty level
    // 3. Remaining questions in the chapter ordered by closest difficulty tier
    const direct = allChapterQuestions.filter((q) => Number(q.testSetId) === testSetId);
    const sameLevel = deterministicShuffle(
      allChapterQuestions.filter(
        (q) => Number(q.testSetId) !== testSetId && Number(q.difficultyLevel) === targetDifficulty
      ),
      `${testSetId}:sameLevel`
    );
    const otherLevelsRaw = allChapterQuestions
      .filter((q) => Number(q.difficultyLevel) !== targetDifficulty)
      .sort((a, b) => {
        const da = Math.abs(Number(a.difficultyLevel) - targetDifficulty);
        const dbDiff = Math.abs(Number(b.difficultyLevel) - targetDifficulty);
        if (da !== dbDiff) return da - dbDiff;
        return Number(a.id) - Number(b.id);
      });
    const otherLevels = deterministicShuffle(otherLevelsRaw, `${testSetId}:otherLevels`);

    const orderedPool = [...direct, ...sameLevel, ...otherLevels];

    let selected: Array<Record<string, unknown>>;
    if (cycle === 0) {
      // Attempts 0..5 (initial attempt + first 5 retakes): deterministic identical set & order
      selected = orderedPool.slice(0, targetCount);
    } else if (orderedPool.length > targetCount) {
      // Retake 6+ (cycle >= 1): rotate window deterministically through the chapter pool
      const rotatedPool = deterministicShuffle(orderedPool, `${testSetId}:cycleBase`);
      const offset = (cycle * targetCount) % rotatedPool.length;
      const picked: Array<Record<string, unknown>> = [];
      for (let i = 0; i < targetCount; i++) {
        picked.push(rotatedPool[(offset + i) % rotatedPool.length]);
      }
      selected = deterministicShuffle(picked, `${testSetId}:cycle:${cycle}`);
    } else {
      // Chapter pool equals targetCount (e.g. 20Q test in 20Q chapter): shuffle deterministically per cycle
      selected = deterministicShuffle(orderedPool, `${testSetId}:cycle:${cycle}`);
    }

    const questions = selected.map(({ testSetId: _ignored, ...rest }) => rest);

    return res.json({
      mode: 'chapter',
      testSetId: meta.id,
      title: meta.title,
      classNumber: meta.classNumber,
      subjectName: meta.subjectName,
      textbookTitle: meta.textbookTitle,
      chapterTitle: `Ch ${meta.chapterNumber}: ${meta.chapterTitle}`,
      difficultyLevel: meta.difficultyLevel,
      timeLimitMinutes: questions.length,
      totalMarks: questions.length,
      retakeInfo: {
        attemptNumber: priorAttempts + 1,
        retakeNumber: priorAttempts,
        cycle,
        retakesRemainingInCycle: 5 - (priorAttempts % 6),
      },
      questions,
    });
  });

  // Download full verified JSON question bank in the exact TOPPERS ADDA schema
  app.get('/api/question-bank/download', (_req: Request, res: Response) => {
    try {
      const bank = buildExportedQuestionBank();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="toppers_adda_question_bank.json"');
      return res.send(JSON.stringify(bank, null, 2));
    } catch (err) {
      console.error('Export error:', err);
      return res.status(500).json({ error: 'Failed to export question bank.' });
    }
  });

  app.post('/api/subjects/:subjectId/mixed-test/start', (req: Request, res: Response) => {
    const subjectId = Number(req.params.subjectId);
    const requestedDifficulty = Number(req.body?.difficultyLevel ?? 0); // 0 = all levels, 1-5 = preferred level

    const subject = db
      .prepare(
        `SELECT s.id, s.name as subjectName, s.textbook_title as textbookTitle, c.number as classNumber
         FROM subjects s
         JOIN classes c ON c.id = s.class_id
         WHERE s.id = ?`
      )
      .get(subjectId) as { id: number; subjectName: string; textbookTitle: string; classNumber: number } | undefined;

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found.' });
    }

    const readyChapters = db
      .prepare(
        `SELECT ch.id, ch.chapter_number as chapterNumber, ch.title
         FROM chapters ch
         JOIN questions q ON q.chapter_id = ch.id
         WHERE ch.subject_id = ?
         GROUP BY ch.id
         HAVING COUNT(q.id) >= 10
         ORDER BY ch.chapter_number ASC`
      )
      .all(subjectId) as Array<{ id: number; chapterNumber: number; title: string }>;

    if (readyChapters.length < 2) {
      return res.status(400).json({
        error: 'Mixed Chapter Test requires at least 2 populated chapters in this subject.',
      });
    }

    const selectedQuestions: Array<Record<string, unknown>> = [];

    for (const ch of readyChapters) {
      let chQuestions: Array<Record<string, unknown>> = [];
      if (requestedDifficulty >= 1 && requestedDifficulty <= 5) {
        // First pick from requested difficulty level, then fill remainder up to 10 from closest levels
        const exact = db
          .prepare(
            `SELECT id, chapter_id as chapterId, difficulty_level as difficultyLevel,
                    question_text as questionText, option_a as optionA, option_b as optionB,
                    option_c as optionC, option_d as optionD, question_type as questionType
             FROM questions
             WHERE chapter_id = ? AND difficulty_level = ?`
          )
          .all(ch.id, requestedDifficulty) as Array<Record<string, unknown>>;

        chQuestions = shuffleArray(exact).slice(0, 10);

        if (chQuestions.length < 10) {
          const pickedIds = new Set(chQuestions.map((q) => q.id));
          const others = db
            .prepare(
              `SELECT id, chapter_id as chapterId, difficulty_level as difficultyLevel,
                      question_text as questionText, option_a as optionA, option_b as optionB,
                      option_c as optionC, option_d as optionD, question_type as questionType
               FROM questions
               WHERE chapter_id = ?
               ORDER BY ABS(difficulty_level - ?) ASC`
            )
            .all(ch.id, requestedDifficulty) as Array<Record<string, unknown>>;
          for (const q of others) {
            if (!pickedIds.has(q.id) && chQuestions.length < 10) {
              chQuestions.push(q);
              pickedIds.add(q.id);
            }
          }
        }
      } else {
        const all = db
          .prepare(
            `SELECT id, chapter_id as chapterId, difficulty_level as difficultyLevel,
                    question_text as questionText, option_a as optionA, option_b as optionB,
                    option_c as optionC, option_d as optionD, question_type as questionType
             FROM questions
             WHERE chapter_id = ?`
          )
          .all(ch.id) as Array<Record<string, unknown>>;
        chQuestions = shuffleArray(all).slice(0, 10);
      }

      for (const q of chQuestions) {
        selectedQuestions.push({
          ...q,
          chapterNumber: ch.chapterNumber,
          chapterTitle: ch.title,
        });
      }
    }

    const shuffled = shuffleArray(selectedQuestions);
    const totalQuestions = shuffled.length;

    return res.json({
      mode: 'mixed',
      testSetId: null,
      title: `Mixed Chapter Test (${readyChapters.length} Chapters)`,
      classNumber: subject.classNumber,
      subjectName: subject.subjectName,
      textbookTitle: subject.textbookTitle,
      chapterTitle: `All Ready Chapters (${readyChapters.length} × 10 Questions)`,
      difficultyLevel: requestedDifficulty,
      timeLimitMinutes: totalQuestions, // 1 minute per question
      totalMarks: totalQuestions, // 1 mark per question
      questions: shuffled,
    });
  });

  app.post('/api/tests/submit', (req: AuthedRequest, res: Response) => {
    try {
      const {
        mode,
        testSetId,
        subjectId,
        difficultyLevel,
        timeTakenSeconds,
        questionIds,
        answers,
      } = req.body ?? {};

      if (!Array.isArray(questionIds) || questionIds.length === 0) {
        return res.status(400).json({ error: 'No questions submitted.' });
      }

      const placeholders = questionIds.map(() => '?').join(',');
      const dbQuestions = db
        .prepare(
          `SELECT q.id, q.chapter_id as chapterId, q.difficulty_level as difficultyLevel,
                  q.question_text as questionText, q.option_a as optionA, q.option_b as optionB,
                  q.option_c as optionC, q.option_d as optionD, q.correct_option as correctOption,
                  q.explanation, ch.title as chapterTitle, ch.chapter_number as chapterNumber,
                  ch.subject_id as subjectId, s.name as subjectName, s.class_id as classId,
                  c.number as classNumber
           FROM questions q
           JOIN chapters ch ON ch.id = q.chapter_id
           JOIN subjects s ON s.id = ch.subject_id
           JOIN classes c ON c.id = s.class_id
           WHERE q.id IN (${placeholders})`
        )
        .all(...questionIds) as Array<Record<string, any>>;

      const qMap = new Map(dbQuestions.map((q) => [Number(q.id), q]));
      const orderedQuestions = questionIds
        .map((id: number) => qMap.get(Number(id)))
        .filter((q): q is Record<string, any> => Boolean(q));

      if (orderedQuestions.length === 0) {
        return res.status(400).json({ error: 'Submitted questions could not be found.' });
      }

      const answerMap: Record<string, string | null> = answers ?? {};
      let correctCount = 0;
      let incorrectCount = 0;
      let unattemptedCount = 0;

      const review = orderedQuestions.map((q) => {
        const rawSel = answerMap[String(q.id)] ?? null;
        const selectedOption =
          rawSel === 'A' || rawSel === 'B' || rawSel === 'C' || rawSel === 'D' ? rawSel : null;
        const isCorrect = selectedOption !== null && selectedOption === q.correctOption;
        if (selectedOption === null) {
          unattemptedCount++;
        } else if (isCorrect) {
          correctCount++;
        } else {
          incorrectCount++;
        }
        return {
          questionId: q.id,
          chapterTitle: `Ch ${q.chapterNumber}: ${q.chapterTitle}`,
          questionText: q.questionText,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          selectedOption,
          correctOption: q.correctOption,
          isCorrect,
          explanation: q.explanation,
          difficultyLevel: q.difficultyLevel,
        };
      });

      const totalMarks = orderedQuestions.length;
      const score = correctCount;
      const percentage = Number(((score / totalMarks) * 100).toFixed(1));
      const firstQ = orderedQuestions[0];
      const isMixed = mode === 'mixed';
      const resolvedSubjectId = Number(subjectId || firstQ.subjectId);
      const resolvedClassId = Number(firstQ.classId);
      const resolvedChapterId = isMixed ? null : Number(firstQ.chapterId);
      const resolvedTestSetId = isMixed ? null : Number(testSetId || 0) || null;
      const safeTime = Math.max(1, Number(timeTakenSeconds || 0));

      let testTitle = isMixed ? `Mixed Chapter Test (${totalMarks} Questions)` : 'Chapter Test';
      if (resolvedTestSetId) {
        const tsRow = db.prepare('SELECT title FROM test_sets WHERE id = ?').get(resolvedTestSetId) as
          | { title: string }
          | undefined;
        if (tsRow) testTitle = tsRow.title;
      }

      let attemptId = 0;
      const createdAt = new Date().toISOString();

      // Permanently store attempt if student is signed in
      if (req.profile) {
        const saveTx = db.transaction(() => {
          const attRes = db
            .prepare(
              `INSERT INTO test_attempts (
                profile_id, class_id, subject_id, chapter_id, test_set_id,
                is_mixed, difficulty_level, score, total_marks, percentage,
                correct_count, incorrect_count, unattempted_count, time_taken_seconds
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .run(
              req.profile!.id,
              resolvedClassId,
              resolvedSubjectId,
              resolvedChapterId,
              resolvedTestSetId,
              isMixed ? 1 : 0,
              Number(difficultyLevel || 0),
              score,
              totalMarks,
              percentage,
              correctCount,
              incorrectCount,
              unattemptedCount,
              safeTime
            );
          attemptId = Number(attRes.lastInsertRowid);

          const insertAns = db.prepare(
            'INSERT INTO test_answers (attempt_id, question_id, selected_option, is_correct) VALUES (?, ?, ?, ?)'
          );
          for (const item of review) {
            insertAns.run(attemptId, item.questionId, item.selectedOption, item.isCorrect ? 1 : 0);
          }
        });
        saveTx();
      }

      return res.json({
        attemptId,
        score,
        totalMarks,
        percentage,
        correctCount,
        incorrectCount,
        unattemptedCount,
        timeTakenSeconds: safeTime,
        classNumber: firstQ.classNumber,
        subjectId: resolvedSubjectId,
        subjectName: firstQ.subjectName,
        chapterId: resolvedChapterId,
        chapterTitle: isMixed
          ? `Mixed Chapter Test — ${firstQ.subjectName}`
          : `Ch ${firstQ.chapterNumber}: ${firstQ.chapterTitle}`,
        testSetId: resolvedTestSetId,
        testTitle,
        isMixed,
        difficultyLevel: Number(difficultyLevel || 0),
        createdAt,
        review,
      });
    } catch (err) {
      console.error('Submit test error:', err);
      return res.status(500).json({ error: 'Failed to grade and save test submission.' });
    }
  });

  app.get('/api/attempts/:attemptId', requireAuth, (req: AuthedRequest, res: Response) => {
    const attemptId = Number(req.params.attemptId);
    const attempt = db
      .prepare(
        `SELECT ta.*, c.number as classNumber, s.name as subjectName,
                ch.chapter_number as chapterNumber, ch.title as chapterTitle,
                ts.title as testTitle
         FROM test_attempts ta
         JOIN classes c ON c.id = ta.class_id
         JOIN subjects s ON s.id = ta.subject_id
         LEFT JOIN chapters ch ON ch.id = ta.chapter_id
         LEFT JOIN test_sets ts ON ts.id = ta.test_set_id
         WHERE ta.id = ?`
      )
      .get(attemptId) as Record<string, any> | undefined;

    if (!attempt) {
      return res.status(404).json({ error: 'Test attempt not found.' });
    }
    if (attempt.profile_id !== req.profile!.id && req.profile!.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    const reviewRows = db
      .prepare(
        `SELECT ans.question_id as questionId, ans.selected_option as selectedOption, ans.is_correct as isCorrect,
                q.question_text as questionText, q.option_a as optionA, q.option_b as optionB,
                q.option_c as optionC, q.option_d as optionD, q.correct_option as correctOption,
                q.explanation, q.difficulty_level as difficultyLevel,
                ch.chapter_number as chapterNumber, ch.title as chapterTitle
         FROM test_answers ans
         JOIN questions q ON q.id = ans.question_id
         JOIN chapters ch ON ch.id = q.chapter_id
         WHERE ans.attempt_id = ?
         ORDER BY ans.id ASC`
      )
      .all(attemptId) as Array<Record<string, any>>;

    return res.json({
      attemptId: attempt.id,
      score: attempt.score,
      totalMarks: attempt.total_marks,
      percentage: attempt.percentage,
      correctCount: attempt.correct_count,
      incorrectCount: attempt.incorrect_count,
      unattemptedCount: attempt.unattempted_count,
      timeTakenSeconds: attempt.time_taken_seconds,
      classNumber: attempt.classNumber,
      subjectId: attempt.subject_id,
      subjectName: attempt.subjectName,
      chapterId: attempt.chapter_id,
      chapterTitle: attempt.is_mixed
        ? `Mixed Chapter Test — ${attempt.subjectName}`
        : `Ch ${attempt.chapterNumber}: ${attempt.chapterTitle}`,
      testSetId: attempt.test_set_id,
      testTitle: attempt.testTitle || (attempt.is_mixed ? 'Mixed Chapter Test' : 'Chapter Test'),
      isMixed: Boolean(attempt.is_mixed),
      difficultyLevel: attempt.difficulty_level,
      createdAt: attempt.created_at,
      review: reviewRows.map((r) => ({
        ...r,
        chapterTitle: `Ch ${r.chapterNumber}: ${r.chapterTitle}`,
        isCorrect: Boolean(r.isCorrect),
      })),
    });
  });

  // ==================== PROFILE ANALYTICS & LEADERBOARD ====================
  app.get('/api/profile/analytics', requireAuth, (req: AuthedRequest, res: Response) => {
    const profileId = req.profile!.id;

    const summary = db
      .prepare(
        `SELECT
          COUNT(*) as totalAttempts,
          COALESCE(ROUND(AVG(percentage), 1), 0) as averagePercentage,
          COALESCE(MAX(percentage), 0) as highestScorePercentage,
          COALESCE(MAX(score), 0) as highestRawScore
        FROM test_attempts
        WHERE profile_id = ?`
      )
      .get(profileId) as {
      totalAttempts: number;
      averagePercentage: number;
      highestScorePercentage: number;
      highestRawScore: number;
    };

    const subjectBreakdown = db
      .prepare(
        `SELECT
          s.id as subjectId,
          s.name as subjectName,
          c.number as classNumber,
          COUNT(*) as attempts,
          ROUND(AVG(ta.percentage), 1) as averagePercentage,
          MAX(ta.percentage) as highestPercentage
        FROM test_attempts ta
        JOIN subjects s ON s.id = ta.subject_id
        JOIN classes c ON c.id = ta.class_id
        WHERE ta.profile_id = ?
        GROUP BY s.id
        ORDER BY averagePercentage DESC`
      )
      .all(profileId) as Array<{
      subjectId: number;
      subjectName: string;
      classNumber: number;
      attempts: number;
      averagePercentage: number;
      highestPercentage: number;
    }>;

    const strongestSubject = subjectBreakdown.length > 0
      ? {
          name: `${subjectBreakdown[0].subjectName} (Class ${subjectBreakdown[0].classNumber})`,
          averagePercentage: subjectBreakdown[0].averagePercentage,
          attempts: subjectBreakdown[0].attempts,
        }
      : null;

    const weakestSubject =
      subjectBreakdown.length > 1
        ? {
            name: `${subjectBreakdown[subjectBreakdown.length - 1].subjectName} (Class ${subjectBreakdown[subjectBreakdown.length - 1].classNumber})`,
            averagePercentage: subjectBreakdown[subjectBreakdown.length - 1].averagePercentage,
            attempts: subjectBreakdown[subjectBreakdown.length - 1].attempts,
          }
        : subjectBreakdown.length === 1
          ? {
              name: `${subjectBreakdown[0].subjectName} (Class ${subjectBreakdown[0].classNumber})`,
              averagePercentage: subjectBreakdown[0].averagePercentage,
              attempts: subjectBreakdown[0].attempts,
            }
          : null;

    const chapterProgress = db
      .prepare(
        `SELECT
          ch.id as chapterId,
          ch.chapter_number as chapterNumber,
          ch.title as chapterTitle,
          s.name as subjectName,
          c.number as classNumber,
          COUNT(DISTINCT ta.test_set_id) as completedSets,
          (
            SELECT COUNT(*)
            FROM test_sets ts
            WHERE ts.chapter_id = ch.id
              AND (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) >= ts.question_count
              AND ts.question_count >= 10
          ) as totalReadySets,
          MAX(ta.percentage) as bestPercentage
        FROM test_attempts ta
        JOIN chapters ch ON ch.id = ta.chapter_id
        JOIN subjects s ON s.id = ch.subject_id
        JOIN classes c ON c.id = s.class_id
        WHERE ta.profile_id = ? AND ta.is_mixed = 0
        GROUP BY ch.id
        ORDER BY MAX(ta.created_at) DESC`
      )
      .all(profileId);

    const recentAttempts = db
      .prepare(
        `SELECT
          ta.id,
          c.number as classNumber,
          s.name as subjectName,
          COALESCE('Ch ' || ch.chapter_number || ': ' || ch.title, 'Mixed Chapter Test') as chapterTitle,
          COALESCE(ts.title, 'Mixed Chapter Test') as testTitle,
          ta.is_mixed as isMixed,
          ta.difficulty_level as difficultyLevel,
          ta.score,
          ta.total_marks as totalMarks,
          ta.percentage,
          ta.time_taken_seconds as timeTakenSeconds,
          ta.created_at as createdAt
        FROM test_attempts ta
        JOIN classes c ON c.id = ta.class_id
        JOIN subjects s ON s.id = ta.subject_id
        LEFT JOIN chapters ch ON ch.id = ta.chapter_id
        LEFT JOIN test_sets ts ON ts.id = ta.test_set_id
        WHERE ta.profile_id = ?
        ORDER BY ta.created_at DESC
        LIMIT 25`
      )
      .all(profileId)
      .map((r: any) => ({ ...r, isMixed: Boolean(r.isMixed) }));

    return res.json({
      profile: req.profile,
      ...summary,
      strongestSubject,
      weakestSubject,
      subjectBreakdown,
      chapterProgress,
      recentAttempts,
    });
  });

  app.get('/api/leaderboard', (req: Request, res: Response) => {
    const classNumber = Number(req.query.classNumber || 9);
    const rows = db
      .prepare(
        `SELECT
          p.id as profileId,
          p.name,
          c.number as classNumber,
          COUNT(ta.id) as testsCompleted,
          ROUND(AVG(ta.percentage), 1) as averagePercentage,
          MAX(ta.score) as highestScore,
          MAX(ta.percentage) as highestPercentage
        FROM test_attempts ta
        JOIN profiles p ON p.id = ta.profile_id
        JOIN classes c ON c.id = ta.class_id
        WHERE c.number = ? AND p.role = 'student'
        GROUP BY p.id
        ORDER BY averagePercentage DESC, testsCompleted DESC, highestScore DESC
        LIMIT 50`
      )
      .all(classNumber) as Array<Record<string, unknown>>;

    const ranked = rows.map((row, idx) => ({
      rank: idx + 1,
      ...row,
    }));

    return res.json({ classNumber, entries: ranked });
  });

  // ==================== PROTECTED ADMIN ROUTES ====================
  app.get('/api/admin/overview', requireAdmin, (_req: AuthedRequest, res: Response) => {
    const stats = {
      totalStudents: (db.prepare("SELECT COUNT(*) as c FROM profiles WHERE role = 'student'").get() as { c: number }).c,
      totalAttempts: (db.prepare('SELECT COUNT(*) as c FROM test_attempts').get() as { c: number }).c,
      totalQuestions: (db.prepare('SELECT COUNT(*) as c FROM questions').get() as { c: number }).c,
      totalChapters: (db.prepare('SELECT COUNT(*) as c FROM chapters').get() as { c: number }).c,
      readyTestSets: (
        db
          .prepare(
            `SELECT COUNT(*) as c
             FROM test_sets ts
             WHERE (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ts.chapter_id) >= ts.question_count
               AND ts.question_count >= 10`
          )
          .get() as { c: number }
      ).c,
    };

    const studentPerformance = db
      .prepare(
        `SELECT
          p.id,
          p.name,
          p.email,
          c.number as classNumber,
          COUNT(ta.id) as testsCompleted,
          COALESCE(ROUND(AVG(ta.percentage), 1), 0) as averagePercentage,
          COALESCE(MAX(ta.score), 0) as highestScore,
          MAX(ta.created_at) as lastAttemptAt
        FROM profiles p
        JOIN classes c ON c.id = p.class_id
        LEFT JOIN test_attempts ta ON ta.profile_id = p.id
        WHERE p.role = 'student'
        GROUP BY p.id
        ORDER BY testsCompleted DESC, averagePercentage DESC`
      )
      .all();

    return res.json({ stats, studentPerformance });
  });

  app.post('/api/admin/chapters', requireAdmin, (req: AuthedRequest, res: Response) => {
    try {
      const { subjectId, chapterNumber, title, unitName, description } = req.body ?? {};
      if (!subjectId || !chapterNumber || !title) {
        return res.status(400).json({ error: 'Subject, chapter number, and title are required.' });
      }
      const tx = db.transaction(() => {
        const chRes = db
          .prepare(
            'INSERT INTO chapters (subject_id, chapter_number, title, unit_name, description) VALUES (?, ?, ?, ?, ?)'
          )
          .run(Number(subjectId), Number(chapterNumber), String(title).trim(), unitName || null, description || null);
        const chapterId = Number(chRes.lastInsertRowid);

        const insTs = db.prepare(
          'INSERT INTO test_sets (chapter_id, title, difficulty_level, set_number, question_count, time_limit_minutes, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        for (let level = 1; level <= 5; level++) {
          for (let setNum = 1; setNum <= 2; setNum++) {
            const qCount = getTargetTestQuestionCount(level, setNum);
            insTs.run(chapterId, `Level ${level} – Test ${setNum}`, level, setNum, qCount, qCount, qCount);
          }
        }
        return chapterId;
      });
      const chapterId = tx();
      return res.status(201).json({ id: chapterId });
    } catch (err: any) {
      if (String(err?.message).includes('UNIQUE')) {
        return res.status(409).json({ error: 'That chapter number already exists in this subject.' });
      }
      return res.status(500).json({ error: 'Failed to add chapter.' });
    }
  });

  app.put('/api/admin/chapters/:chapterId', requireAdmin, (req: AuthedRequest, res: Response) => {
    try {
      const chapterId = Number(req.params.chapterId);
      const { title, unitName, description } = req.body ?? {};
      if (!title) {
        return res.status(400).json({ error: 'Chapter title is required.' });
      }
      db.prepare('UPDATE chapters SET title = ?, unit_name = ?, description = ? WHERE id = ?').run(
        String(title).trim(),
        unitName || null,
        description || null,
        chapterId
      );
      return res.json({ ok: true });
    } catch {
      return res.status(500).json({ error: 'Failed to update chapter.' });
    }
  });

  app.get('/api/admin/chapters/:chapterId/questions', requireAdmin, (req: AuthedRequest, res: Response) => {
    const chapterId = Number(req.params.chapterId);
    const testSets = db
      .prepare(
        `SELECT ts.id, ts.title, ts.difficulty_level as difficultyLevel, ts.set_number as setNumber,
                (SELECT COUNT(*) FROM questions q WHERE q.test_set_id = ts.id) as questionCount
         FROM test_sets ts
         WHERE ts.chapter_id = ?
         ORDER BY ts.difficulty_level ASC, ts.set_number ASC`
      )
      .all(chapterId);

    const questions = db
      .prepare(
        `SELECT q.id, q.chapter_id as chapterId, q.test_set_id as testSetId, ts.title as testSetTitle,
                q.difficulty_level as difficultyLevel, q.question_text as questionText,
                q.option_a as optionA, q.option_b as optionB, q.option_c as optionC, q.option_d as optionD,
                q.correct_option as correctOption, q.explanation, q.question_type as questionType
         FROM questions q
         JOIN test_sets ts ON ts.id = q.test_set_id
         WHERE q.chapter_id = ?
         ORDER BY q.difficulty_level ASC, ts.set_number ASC, q.id ASC`
      )
      .all(chapterId);

    return res.json({ testSets, questions });
  });

  app.post('/api/admin/test-sets', requireAdmin, (req: AuthedRequest, res: Response) => {
    try {
      const { chapterId, difficultyLevel, title } = req.body ?? {};
      const lvl = Number(difficultyLevel);
      if (!chapterId || lvl < 1 || lvl > 5) {
        return res.status(400).json({ error: 'Valid chapter and difficulty level (1–5) are required.' });
      }
      const maxRow = db
        .prepare('SELECT COALESCE(MAX(set_number), 0) as m FROM test_sets WHERE chapter_id = ? AND difficulty_level = ?')
        .get(Number(chapterId), lvl) as { m: number };
      const nextSetNum = maxRow.m + 1;
      const finalTitle = title?.trim() || `Level ${lvl} – Test ${nextSetNum}`;
      const qCount = getTargetTestQuestionCount(lvl, nextSetNum);
      const r = db
        .prepare(
          'INSERT INTO test_sets (chapter_id, title, difficulty_level, set_number, question_count, time_limit_minutes, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?)'
        )
        .run(Number(chapterId), finalTitle, lvl, nextSetNum, qCount, qCount, qCount);
      return res.status(201).json({ id: Number(r.lastInsertRowid), title: finalTitle, setNumber: nextSetNum });
    } catch {
      return res.status(500).json({ error: 'Failed to create test set.' });
    }
  });

  app.post('/api/admin/questions', requireAdmin, (req: AuthedRequest, res: Response) => {
    try {
      const {
        chapterId,
        testSetId,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        explanation,
        questionType,
      } = req.body ?? {};

      if (
        !chapterId ||
        !testSetId ||
        !questionText ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !['A', 'B', 'C', 'D'].includes(correctOption) ||
        !explanation
      ) {
        return res.status(400).json({ error: 'All MCQ fields, valid correct option (A–D), and explanation are required.' });
      }

      const ts = db.prepare('SELECT difficulty_level FROM test_sets WHERE id = ?').get(Number(testSetId)) as
        | { difficulty_level: number }
        | undefined;
      if (!ts) {
        return res.status(404).json({ error: 'Selected test set not found.' });
      }

      const r = db
        .prepare(
          `INSERT INTO questions (
            chapter_id, test_set_id, difficulty_level,
            question_text, option_a, option_b, option_c, option_d,
            correct_option, explanation, question_type
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          Number(chapterId),
          Number(testSetId),
          ts.difficulty_level,
          String(questionText).trim(),
          String(optionA).trim(),
          String(optionB).trim(),
          String(optionC).trim(),
          String(optionD).trim(),
          correctOption,
          String(explanation).trim(),
          questionType || 'conceptual'
        );

      return res.status(201).json({ id: Number(r.lastInsertRowid) });
    } catch {
      return res.status(500).json({ error: 'Failed to create question.' });
    }
  });

  app.put('/api/admin/questions/:questionId', requireAdmin, (req: AuthedRequest, res: Response) => {
    try {
      const questionId = Number(req.params.questionId);
      const {
        testSetId,
        questionText,
        optionA,
        optionB,
        optionC,
        optionD,
        correctOption,
        explanation,
        questionType,
      } = req.body ?? {};

      if (
        !testSetId ||
        !questionText ||
        !optionA ||
        !optionB ||
        !optionC ||
        !optionD ||
        !['A', 'B', 'C', 'D'].includes(correctOption) ||
        !explanation
      ) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const ts = db.prepare('SELECT difficulty_level FROM test_sets WHERE id = ?').get(Number(testSetId)) as
        | { difficulty_level: number }
        | undefined;
      if (!ts) {
        return res.status(404).json({ error: 'Test set not found.' });
      }

      db.prepare(
        `UPDATE questions
         SET test_set_id = ?, difficulty_level = ?, question_text = ?,
             option_a = ?, option_b = ?, option_c = ?, option_d = ?,
             correct_option = ?, explanation = ?, question_type = ?
         WHERE id = ?`
      ).run(
        Number(testSetId),
        ts.difficulty_level,
        String(questionText).trim(),
        String(optionA).trim(),
        String(optionB).trim(),
        String(optionC).trim(),
        String(optionD).trim(),
        correctOption,
        String(explanation).trim(),
        questionType || 'conceptual',
        questionId
      );
      return res.json({ ok: true });
    } catch {
      return res.status(500).json({ error: 'Failed to update question.' });
    }
  });

  app.delete('/api/admin/questions/:questionId', requireAdmin, (req: AuthedRequest, res: Response) => {
    const questionId = Number(req.params.questionId);
    db.prepare('DELETE FROM questions WHERE id = ?').run(questionId);
    return res.json({ ok: true });
  });

  // ==================== CHAPTER EXAM NOTES ROUTES (CLASSES 6–10) ====================
  app.get('/api/notes/browse', (req: Request, res: Response) => {
    const classNumber = Number(req.query.classNumber || 10);
    const subjectId = Number(req.query.subjectId || 0);
    const search = String(req.query.search || '').trim().toLowerCase();

    const subjects = db
      .prepare(
        `SELECT s.id, s.slug, s.name, s.textbook_title as textbookTitle, c.number as classNumber,
                COUNT(DISTINCT ch.id) as chapterCount
         FROM subjects s
         JOIN classes c ON c.id = s.class_id
         LEFT JOIN chapters ch ON ch.subject_id = s.id
         WHERE c.number = ?
         GROUP BY s.id
         ORDER BY s.id ASC`
      )
      .all(classNumber) as Array<Record<string, unknown>>;

    const targetSubjectId =
      subjectId > 0 && subjects.some((s) => Number(s.id) === subjectId)
        ? subjectId
        : Number(subjects[0]?.id || 0);

    const rawChapters = targetSubjectId
      ? (db
          .prepare(
            `SELECT ch.id, ch.chapter_number as chapterNumber, ch.title, ch.unit_name as unitName,
                    ch.description, s.id as subjectId, s.slug as subjectSlug, s.name as subjectName,
                    s.textbook_title as textbookTitle, c.number as classNumber,
                    CASE WHEN cn.id IS NOT NULL THEN 1 ELSE 0 END as hasNotes,
                    (SELECT COUNT(*) FROM questions q WHERE q.chapter_id = ch.id) as totalQuestions
             FROM chapters ch
             JOIN subjects s ON s.id = ch.subject_id
             JOIN classes c ON c.id = s.class_id
             LEFT JOIN chapter_notes cn ON cn.chapter_id = ch.id
             WHERE ch.subject_id = ?
             ORDER BY ch.chapter_number ASC`
          )
          .all(targetSubjectId) as Array<Record<string, unknown>>)
      : [];

    const chapters = search
      ? rawChapters.filter(
          (ch) =>
            String(ch.title).toLowerCase().includes(search) ||
            String(ch.unitName ?? '').toLowerCase().includes(search)
        )
      : rawChapters;

    return res.json({ classNumber, subjects, activeSubjectId: targetSubjectId, chapters });
  });

  app.get('/api/chapters/:chapterId/notes', (req: Request, res: Response) => {
    const chapterId = Number(req.params.chapterId);
    const row = db
      .prepare(
        `SELECT ch.id, ch.chapter_number as chapterNumber, ch.title, ch.unit_name as unitName,
                ch.description, s.id as subjectId, s.slug as subjectSlug, s.name as subjectName,
                s.textbook_title as textbookTitle, c.number as classNumber,
                cn.overview, cn.key_concepts as keyConceptsJson,
                cn.formulas_and_facts as formulasJson, cn.exam_tips as examTipsJson,
                cn.common_mistakes as commonMistakesJson, cn.updated_at as updatedAt
         FROM chapters ch
         JOIN subjects s ON s.id = ch.subject_id
         JOIN classes c ON c.id = s.class_id
         LEFT JOIN chapter_notes cn ON cn.chapter_id = ch.id
         WHERE ch.id = ?`
      )
      .get(chapterId) as Record<string, unknown> | undefined;

    if (!row) {
      return res.status(404).json({ error: 'Chapter notes not found.' });
    }

    const siblings = db
      .prepare('SELECT id, chapter_number as chapterNumber FROM chapters WHERE subject_id = ? ORDER BY chapter_number ASC')
      .all(Number(row.subjectId)) as Array<{ id: number; chapterNumber: number }>;
    const idx = siblings.findIndex((s) => s.id === chapterId);

    const parseJson = <T>(raw: unknown, fallback: T): T => {
      try {
        return raw ? (JSON.parse(String(raw)) as T) : fallback;
      } catch {
        return fallback;
      }
    };

    return res.json({
      chapter: {
        id: row.id,
        chapterNumber: row.chapterNumber,
        title: row.title,
        unitName: row.unitName,
        description: row.description,
        subjectId: row.subjectId,
        subjectSlug: row.subjectSlug,
        subjectName: row.subjectName,
        textbookTitle: row.textbookTitle,
        classNumber: row.classNumber,
      },
      note: {
        overview: String(row.overview ?? row.description ?? ''),
        keyConcepts: parseJson(row.keyConceptsJson, []),
        formulasAndFacts: parseJson(row.formulasJson, []),
        examTips: parseJson(row.examTipsJson, []),
        commonMistakes: parseJson(row.commonMistakesJson, []),
        updatedAt: String(row.updatedAt ?? ''),
      },
      prevChapterId: idx > 0 ? siblings[idx - 1].id : null,
      nextChapterId: idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1].id : null,
    });
  });

  // ==================== CLASS 10 PYQ & SIDE-BY-SIDE SOLUTIONS ROUTES ====================
  app.get('/api/pyqs', (req: Request, res: Response) => {
    const subjectSlug = String(req.query.subjectSlug || '').trim();
    const year = String(req.query.year || '').trim();

    let query = `
      SELECT id, class_number as classNumber, subject_slug as subjectSlug, subject_name as subjectName,
             exam_year as examYear, paper_code as paperCode, title,
             drive_folder_url as driveFolderUrl, question_drive_file_id as questionDriveFileId,
             solution_drive_file_id as solutionDriveFileId, qa_items as qaItemsJson
      FROM pyq_papers
      WHERE class_number = 10
    `;
    const params: unknown[] = [];
    if (subjectSlug && subjectSlug !== 'all') {
      query += ' AND subject_slug = ?';
      params.push(subjectSlug);
    }
    if (year && year !== 'all') {
      query += ' AND exam_year = ?';
      params.push(year);
    }
    query += ' ORDER BY exam_year DESC, subject_name ASC, id ASC';

    const rows = db.prepare(query).all(...params) as Array<Record<string, unknown>>;
    const papers = rows.map((r) => {
      let qaItems = [];
      try {
        qaItems = JSON.parse(String(r.qaItemsJson || '[]'));
      } catch {
        qaItems = [];
      }
      return {
        id: r.id,
        classNumber: r.classNumber,
        subjectSlug: r.subjectSlug,
        subjectName: r.subjectName,
        examYear: r.examYear,
        paperCode: r.paperCode,
        title: r.title,
        driveFolderUrl: r.driveFolderUrl || CLASS_10_DRIVE_FOLDER_URL,
        questionDriveFileId: r.questionDriveFileId,
        solutionDriveFileId: r.solutionDriveFileId,
        qaItems,
      };
    });

    return res.json({
      driveFolderUrl: CLASS_10_DRIVE_FOLDER_URL,
      papers,
    });
  });

  app.post('/api/admin/pyqs', requireAdmin, (req: AuthedRequest, res: Response) => {
    const {
      subjectSlug,
      subjectName,
      examYear,
      paperCode,
      title,
      questionDriveUrl,
      solutionDriveUrl,
    } = req.body ?? {};

    if (!subjectSlug || !subjectName || !examYear || !title) {
      return res.status(400).json({ error: 'Subject, exam year, and paper title are required.' });
    }

    const qDriveId = extractDriveFileId(questionDriveUrl);
    const sDriveId = extractDriveFileId(solutionDriveUrl);
    if (!qDriveId && !sDriveId) {
      return res
        .status(400)
        .json({ error: 'Provide at least one valid Google Drive file URL or File ID.' });
    }

    try {
      const result = db
        .prepare(
          `INSERT INTO pyq_papers (
            class_number, subject_slug, subject_name, exam_year, paper_code, title,
            drive_folder_url, question_drive_file_id, solution_drive_file_id, qa_items
          ) VALUES (10, ?, ?, ?, ?, ?, ?, ?, ?, '[]')`
        )
        .run(
          String(subjectSlug).trim(),
          String(subjectName).trim(),
          String(examYear).trim(),
          String(paperCode || `DRV-${Date.now()}`).trim(),
          String(title).trim(),
          CLASS_10_DRIVE_FOLDER_URL,
          qDriveId,
          sDriveId
        );
      return res.status(201).json({ id: Number(result.lastInsertRowid) });
    } catch {
      return res.status(409).json({ error: 'A PYQ paper with this subject, year, and paper code already exists.' });
    }
  });

  // ==================== ENQUIRY / ERROR REPORT ROUTES (compoundinterest008@gmail.com) ====================
  app.post('/api/enquiries', async (req: Request, res: Response) => {
    const {
      studentName,
      studentEmail,
      classNumber,
      subjectName,
      chapterTitle,
      questionRef,
      issueType,
      message,
    } = req.body ?? {};

    if (!studentName || !String(studentName).trim()) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }
    if (!message || String(message).trim().length < 8) {
      return res.status(400).json({ error: 'Please describe your enquiry or error (at least 8 characters).' });
    }

    const cleanName = String(studentName).trim().slice(0, 100);
    const cleanEmail = studentEmail ? String(studentEmail).trim().slice(0, 120) : null;
    const cleanClass = classNumber ? Number(classNumber) : null;
    const cleanSubject = subjectName ? String(subjectName).trim().slice(0, 80) : null;
    const cleanChapter = chapterTitle ? String(chapterTitle).trim().slice(0, 140) : null;
    const cleanQuestionRef = questionRef ? String(questionRef).trim().slice(0, 300) : null;
    const cleanIssueType = String(issueType || 'Question / Answer Error').trim().slice(0, 60);
    const cleanMessage = String(message).trim().slice(0, 2000);

    const recipient = 'compoundinterest008@gmail.com';
    const subjectLine = `[THE WELKIN CLASSES] ${cleanIssueType}${cleanClass ? ` · Class ${cleanClass}` : ''}${cleanSubject ? ` · ${cleanSubject}` : ''}`;
    const emailBody = [
      `New Enquiry / Error Report from THE WELKIN CLASSES`,
      `--------------------------------------------------`,
      `Student Name: ${cleanName}`,
      `Student Email: ${cleanEmail || 'Not provided'}`,
      `Issue Type: ${cleanIssueType}`,
      cleanClass ? `Class: ${cleanClass}` : null,
      cleanSubject ? `Subject: ${cleanSubject}` : null,
      cleanChapter ? `Chapter: ${cleanChapter}` : null,
      cleanQuestionRef ? `Question / Item Ref: ${cleanQuestionRef}` : null,
      ``,
      `Problem / Enquiry Description:`,
      cleanMessage,
    ]
      .filter(Boolean)
      .join('\n');

    let emailDelivered = 0;
    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();
    const smtpPort = Number(process.env.SMTP_PORT || 587);

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: process.env.SMTP_FROM?.trim() || smtpUser,
          to: recipient,
          replyTo: cleanEmail || undefined,
          subject: subjectLine,
          text: emailBody,
        });
        emailDelivered = 1;
      } catch (err) {
        console.error('SMTP delivery error (saved to database):', err);
      }
    }

    const insert = db
      .prepare(
        `INSERT INTO enquiries (
          student_name, student_email, class_number, subject_name, chapter_title,
          question_ref, issue_type, message, emailed_to, email_delivered, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open')`
      )
      .run(
        cleanName,
        cleanEmail,
        cleanClass,
        cleanSubject,
        cleanChapter,
        cleanQuestionRef,
        cleanIssueType,
        cleanMessage,
        recipient,
        emailDelivered
      );

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;

    return res.status(201).json({
      id: Number(insert.lastInsertRowid),
      saved: true,
      emailDelivered: Boolean(emailDelivered),
      recipient,
      mailtoUrl,
    });
  });

  app.get('/api/admin/enquiries', requireAdmin, (_req: AuthedRequest, res: Response) => {
    const enquiries = db
      .prepare(
        `SELECT id, student_name as studentName, student_email as studentEmail,
                class_number as classNumber, subject_name as subjectName,
                chapter_title as chapterTitle, question_ref as questionRef,
                issue_type as issueType, message, emailed_to as emailedTo,
                email_delivered as emailDelivered, status, created_at as createdAt
         FROM enquiries
         ORDER BY created_at DESC, id DESC
         LIMIT 200`
      )
      .all();
    return res.json({ enquiries });
  });

  app.post('/api/admin/enquiries/:id/resolve', requireAdmin, (req: AuthedRequest, res: Response) => {
    const id = Number(req.params.id);
    db.prepare(`UPDATE enquiries SET status = 'resolved' WHERE id = ?`).run(id);
    return res.json({ ok: true });
  });

  // ==================== AI STUDY PLANNER ROUTE (@google/genai) ====================
  const studyPlannerCache = new Map<string, { ts: number; data: unknown }>();
  const STUDY_PLANNER_CACHE_TTL_MS = 30 * 60 * 1000;

  app.post('/api/study-planner', async (req: Request, res: Response) => {
    const classNumber = Number(req.body?.classNumber);
    const daysLeft = Number(req.body?.daysLeft);
    const dailyHours = Math.min(14, Math.max(1, Number(req.body?.dailyHours || 3)));
    const examGoal = String(req.body?.examGoal || '').trim();
    const forceRefresh = Boolean(req.body?.forceRefresh);
    const weakSubjects: string[] = Array.isArray(req.body?.weakSubjects)
      ? req.body.weakSubjects.map((s: unknown) => String(s).trim()).filter(Boolean)
      : [];

    if (![6, 7, 8, 9, 10].includes(classNumber)) {
      return res.status(400).json({ error: 'Please select a valid class (6, 7, 8, 9, or 10).' });
    }
    if (!Number.isFinite(daysLeft) || daysLeft < 1 || daysLeft > 365) {
      return res.status(400).json({ error: 'Please enter valid days left before your exam (1–365 days).' });
    }
    if (!examGoal || examGoal.length < 3) {
      return res.status(400).json({ error: 'Please enter your exam goal (e.g., 95%+ in Class 10 Boards).' });
    }

    const cacheKey = JSON.stringify({
      classNumber,
      daysLeft,
      dailyHours,
      examGoal: examGoal.toLowerCase(),
      weakSubjects: [...weakSubjects].sort(),
    });
    const now = Date.now();
    if (!forceRefresh) {
      const cached = studyPlannerCache.get(cacheKey);
      if (cached && now - cached.ts < STUDY_PLANNER_CACHE_TTL_MS) {
        return res.json(cached.data);
      }
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please set GEMINI_API_KEY in Settings > Secrets to generate AI study plans.',
      });
    }

    const syllabusRows = db
      .prepare(
        `SELECT s.name as subjectName, ch.chapter_number as chapterNumber, ch.title as chapterTitle
         FROM subjects s
         JOIN classes c ON c.id = s.class_id
         JOIN chapters ch ON ch.subject_id = s.id
         WHERE c.number = ?
         ORDER BY s.id ASC, ch.chapter_number ASC`
      )
      .all(classNumber) as Array<{ subjectName: string; chapterNumber: number; chapterTitle: string }>;

    const bySubject = new Map<string, string[]>();
    for (const r of syllabusRows) {
      const arr = bySubject.get(r.subjectName) ?? [];
      arr.push(`${r.chapterNumber}. ${r.chapterTitle}`);
      bySubject.set(r.subjectName, arr);
    }

    const syllabusSummary = Array.from(bySubject.entries())
      .map(([subj, chs]) => `${subj} (${chs.length} ch): ${chs.slice(0, 10).join(', ')}${chs.length > 10 ? ', ...' : ''}`)
      .join('\n');

    const blockCount = daysLeft <= 5 ? daysLeft : Math.min(7, Math.max(4, Math.ceil(daysLeft / Math.ceil(daysLeft / 6))));

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `Build a fast, practical NCERT/CBSE study roadmap for Class ${classNumber} on THE WELKIN CLASSES.
Inputs: ${daysLeft} days left | ${dailyHours} hrs/day | Goal: ${examGoal.slice(0, 160)} | Priority subjects: ${weakSubjects.length > 0 ? weakSubjects.join(', ') : 'Balanced'}.
Syllabus:
${syllabusSummary}

Rules (keep concise & crisp):
- Provide 4 time slots in dailyRoutine covering ${dailyHours} hrs/day.
- Provide 3 clear phases in phaseBreakdown.
- Divide ${daysLeft} days into ${blockCount} chronological schedule blocks ("Day 1–3", etc.), covering weak subjects early and ending with 50–100 Q revision marathons${classNumber === 10 ? ' + Class 10 Board PYQs Side-by-Side' : ''}.
- Reference real chapter names from Syllabus; keep 2–3 crisp tasks/block and a short welkinAction (e.g., "Notes → Level 1–3 Tests → 50 Q Revision").
- Provide 4 practical examTips.`;

      const callPlannerModel = async (model: string, thinkingLevel: ThinkingLevel) =>
        ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction:
              'You are an Indian NCERT & CBSE mentor at THE WELKIN CLASSES. Return concise, practical JSON strictly following the schema.',
            thinkingConfig: { thinkingLevel },
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                planTitle: { type: Type.STRING },
                strategySummary: { type: Type.STRING },
                dailyRoutine: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      timeSlot: { type: Type.STRING },
                      activity: { type: Type.STRING },
                    },
                  },
                },
                phaseBreakdown: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phaseName: { type: Type.STRING },
                      duration: { type: Type.STRING },
                      objective: { type: Type.STRING },
                    },
                  },
                },
                schedule: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      dayRange: { type: Type.STRING },
                      focusSubject: { type: Type.STRING },
                      chaptersToCover: { type: Type.ARRAY, items: { type: Type.STRING } },
                      dailyTasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                      welkinAction: { type: Type.STRING },
                    },
                  },
                },
                examTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
            },
          },
        });

      let response;
      try {
        // Primary fast low-latency model
        response = await callPlannerModel('gemini-3.1-flash-lite', ThinkingLevel.MINIMAL);
      } catch (primaryErr: any) {
        const primaryStatus = Number(primaryErr?.status || 0);
        if (primaryStatus === 503 || primaryStatus === 429 || primaryStatus === 404) {
          response = await callPlannerModel('gemini-4-hydrogen', ThinkingLevel.LOW);
        } else {
          throw primaryErr;
        }
      }

      const parsed = JSON.parse((response.text ?? '{}').trim());
      const payload = {
        ...parsed,
        classNumber,
        daysLeft,
        examGoal,
      };

      if (studyPlannerCache.size >= 50) {
        const oldestKey = studyPlannerCache.keys().next().value;
        if (oldestKey) studyPlannerCache.delete(oldestKey);
      }
      studyPlannerCache.set(cacheKey, { ts: now, data: payload });

      return res.json(payload);
    } catch (err: any) {
      console.error('Gemini AI Study Planner error:', err?.status, err?.message || err);
      const status = Number(err?.status || 500);
      return res.status(status >= 400 && status < 600 ? status : 500).json({
        error:
          err?.message?.includes('API_KEY') || status === 400 || status === 403
            ? 'Invalid or missing Gemini API key. Please check GEMINI_API_KEY in Settings > Secrets.'
            : 'Unable to generate AI study plan right now. Please try again in a moment.',
      });
    }
  });

  // ==================== VITE / STATIC SERVING ====================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`THE WELKIN CLASSES server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
