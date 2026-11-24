import fs from 'fs';
import path from 'path';
import { db } from '../src/server/db.ts';
import { seedDatabaseIfNeeded } from '../src/server/seed/index.ts';

export interface ExportedQuestion {
  class: number;
  subject: string;
  textbook: string;
  chapter_number: number;
  chapter_name: string;
  question_id: string;
  difficulty_level: number;
  question_type: 'MCQ';
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const SUBJECT_CODE: Record<string, string> = {
  science: 'SCI',
  mathematics: 'MATH',
  'social-science': 'SST',
  hindi: 'HINDI',
  english: 'ENG',
  ict: 'ICT',
};

export function buildExportedQuestionBank(): ExportedQuestion[] {
  const rows = db
    .prepare(
      `SELECT
        c.number as classNumber,
        s.slug as subjectSlug,
        s.name as subjectName,
        s.textbook_title as textbook,
        ch.chapter_number as chapterNumber,
        ch.title as chapterName,
        q.difficulty_level as difficultyLevel,
        q.question_text as questionText,
        q.option_a as optionA,
        q.option_b as optionB,
        q.option_c as optionC,
        q.option_d as optionD,
        q.correct_option as correctOption,
        q.explanation as explanation
      FROM questions q
      JOIN chapters ch ON ch.id = q.chapter_id
      JOIN subjects s ON s.id = ch.subject_id
      JOIN classes c ON c.id = s.class_id
      ORDER BY c.number ASC, s.slug ASC, ch.chapter_number ASC, q.difficulty_level ASC, q.id ASC`
    )
    .all() as Array<Record<string, any>>;

  const chapterCounters = new Map<string, number>();

  return rows.map((r) => {
    const subjCode = SUBJECT_CODE[r.subjectSlug] || 'GEN';
    const chStr = String(r.chapterNumber).padStart(2, '0');
    const prefix = `C${r.classNumber}_${subjCode}_CH${chStr}`;
    const nextNum = (chapterCounters.get(prefix) ?? 0) + 1;
    chapterCounters.set(prefix, nextNum);

    return {
      class: Number(r.classNumber),
      subject: String(r.subjectName),
      textbook: String(r.textbook),
      chapter_number: Number(r.chapterNumber),
      chapter_name: String(r.chapterName),
      question_id: `${prefix}_Q${String(nextNum).padStart(3, '0')}`,
      difficulty_level: Number(r.difficultyLevel),
      question_type: 'MCQ',
      question: String(r.questionText),
      options: {
        A: String(r.optionA),
        B: String(r.optionB),
        C: String(r.optionC),
        D: String(r.optionD),
      },
      correct_answer: r.correctOption as 'A' | 'B' | 'C' | 'D',
      explanation: String(r.explanation),
    };
  });
}

// Run as CLI verification & export script when invoked directly
if (process.argv[1] && process.argv[1].endsWith('export_and_verify_bank.ts')) {
  seedDatabaseIfNeeded();
  const bank = buildExportedQuestionBank();

  const outDir = path.resolve(process.cwd(), 'data', 'question_bank');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'toppers_adda_question_bank.json');
  fs.writeFileSync(outPath, JSON.stringify(bank, null, 2), 'utf-8');

  // Automated Verification Checks
  const seenIds = new Set<string>();
  const seenStems = new Set<string>();
  let duplicateIds = 0;
  let duplicateQuestions = 0;
  let invalidOptions = 0;
  let invalidAnswers = 0;
  let missingExplanations = 0;

  const bySubject: Record<string, number> = {};
  const byChapter: Record<string, number> = {};
  const byLevel: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const classesSet = new Set<number>();

  for (const q of bank) {
    classesSet.add(q.class);
    const subjKey = `Class ${q.class} – ${q.subject} (${q.textbook})`;
    bySubject[subjKey] = (bySubject[subjKey] ?? 0) + 1;

    const chKey = `Class ${q.class} ${q.subject} Ch ${String(q.chapter_number).padStart(2, '0')} (${q.chapter_name})`;
    byChapter[chKey] = (byChapter[chKey] ?? 0) + 1;

    byLevel[q.difficulty_level] = (byLevel[q.difficulty_level] ?? 0) + 1;

    if (seenIds.has(q.question_id)) duplicateIds++;
    seenIds.add(q.question_id);

    const normStem = `${q.class}|${q.subject}|${q.question.trim().toLowerCase()}`;
    if (seenStems.has(normStem)) duplicateQuestions++;
    seenStems.add(normStem);

    const opts = [q.options.A, q.options.B, q.options.C, q.options.D].map((s) => s.trim());
    if (opts.some((o) => !o) || new Set(opts.map((o) => o.toLowerCase())).size !== 4) {
      invalidOptions++;
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      invalidAnswers++;
    }
    if (!q.explanation || q.explanation.trim().length < 8) {
      missingExplanations++;
    }
  }

  console.log(
    JSON.stringify(
      {
        outputFile: outPath,
        totalQuestions: bank.length,
        totalClassesWithQuestions: classesSet.size,
        totalSubjectsWithQuestions: Object.keys(bySubject).length,
        totalChaptersWithQuestions: Object.keys(byChapter).length,
        bySubject,
        byChapter,
        byLevel,
        verification: {
          duplicateIds,
          duplicateQuestions,
          invalidOptions,
          invalidAnswers,
          missingExplanations,
          status:
            duplicateIds === 0 &&
            duplicateQuestions === 0 &&
            invalidOptions === 0 &&
            invalidAnswers === 0 &&
            missingExplanations === 0
              ? 'PASSED'
              : 'ISSUES_FOUND',
        },
      },
      null,
      2
    )
  );
}
