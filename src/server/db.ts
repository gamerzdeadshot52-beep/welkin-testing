import Database from 'better-sqlite3';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'toppers_adda.db');

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derived, 'hex'));
}

export function createSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function initializeSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number INTEGER NOT NULL UNIQUE,
      name TEXT NOT NULL,
      syllabus_year TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
      class_id INTEGER NOT NULL REFERENCES classes(id),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      textbook_title TEXT NOT NULL,
      description TEXT NOT NULL,
      UNIQUE(class_id, slug)
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      chapter_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      unit_name TEXT,
      description TEXT,
      UNIQUE(subject_id, chapter_number)
    );

    CREATE TABLE IF NOT EXISTS test_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
      set_number INTEGER NOT NULL,
      question_count INTEGER NOT NULL DEFAULT 10,
      time_limit_minutes INTEGER NOT NULL DEFAULT 10,
      total_marks INTEGER NOT NULL DEFAULT 10,
      UNIQUE(chapter_id, difficulty_level, set_number)
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
      test_set_id INTEGER NOT NULL REFERENCES test_sets(id) ON DELETE CASCADE,
      difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
      explanation TEXT NOT NULL,
      question_type TEXT NOT NULL DEFAULT 'conceptual'
    );

    CREATE TABLE IF NOT EXISTS test_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      class_id INTEGER NOT NULL REFERENCES classes(id),
      subject_id INTEGER NOT NULL REFERENCES subjects(id),
      chapter_id INTEGER REFERENCES chapters(id) ON DELETE SET NULL,
      test_set_id INTEGER REFERENCES test_sets(id) ON DELETE SET NULL,
      is_mixed INTEGER NOT NULL DEFAULT 0,
      difficulty_level INTEGER NOT NULL DEFAULT 0,
      score INTEGER NOT NULL,
      total_marks INTEGER NOT NULL,
      percentage REAL NOT NULL,
      correct_count INTEGER NOT NULL,
      incorrect_count INTEGER NOT NULL,
      unattempted_count INTEGER NOT NULL,
      time_taken_seconds INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS test_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id INTEGER NOT NULL REFERENCES test_attempts(id) ON DELETE CASCADE,
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      selected_option TEXT CHECK (selected_option IN ('A', 'B', 'C', 'D') OR selected_option IS NULL),
      is_correct INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS chapter_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chapter_id INTEGER NOT NULL UNIQUE REFERENCES chapters(id) ON DELETE CASCADE,
      overview TEXT NOT NULL,
      key_concepts TEXT NOT NULL,
      formulas_and_facts TEXT NOT NULL,
      exam_tips TEXT NOT NULL,
      common_mistakes TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS pyq_papers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_number INTEGER NOT NULL DEFAULT 10,
      subject_slug TEXT NOT NULL,
      subject_name TEXT NOT NULL,
      exam_year TEXT NOT NULL,
      paper_code TEXT NOT NULL,
      title TEXT NOT NULL,
      drive_folder_url TEXT,
      question_drive_file_id TEXT,
      solution_drive_file_id TEXT,
      qa_items TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(class_number, subject_slug, exam_year, paper_code)
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      student_email TEXT,
      class_number INTEGER,
      subject_name TEXT,
      chapter_title TEXT,
      question_ref TEXT,
      issue_type TEXT NOT NULL,
      message TEXT NOT NULL,
      emailed_to TEXT NOT NULL DEFAULT 'compoundinterest008@gmail.com',
      email_delivered INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'open',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_chapters_subject ON chapters(subject_id);
    CREATE INDEX IF NOT EXISTS idx_test_sets_chapter ON test_sets(chapter_id);
    CREATE INDEX IF NOT EXISTS idx_questions_test_set ON questions(test_set_id);
    CREATE INDEX IF NOT EXISTS idx_questions_chapter_level ON questions(chapter_id, difficulty_level);
    CREATE INDEX IF NOT EXISTS idx_attempts_profile ON test_attempts(profile_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_class ON test_attempts(class_id);
    CREATE INDEX IF NOT EXISTS idx_pyq_subject_year ON pyq_papers(class_number, subject_slug, exam_year);
    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status, created_at);
  `);

  // Safe migration for existing databases missing question_count on test_sets
  const tsCols = db.prepare('PRAGMA table_info(test_sets)').all() as Array<{ name: string }>;
  if (!tsCols.some((c) => c.name === 'question_count')) {
    db.exec('ALTER TABLE test_sets ADD COLUMN question_count INTEGER NOT NULL DEFAULT 10');
  }
}
