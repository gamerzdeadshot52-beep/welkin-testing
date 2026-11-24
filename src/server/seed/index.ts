import { db, hashPassword, initializeSchema } from '../db.ts';
import { NCERT_SYLLABUS } from './syllabus.ts';
import { seedPyqsAndNotesIfNeeded } from './pyq_and_notes.ts';
import { C6_SCI_CH1_FULL_QUESTIONS } from './questions_c6_sci_ch1_full.ts';
import { C6_SCI_CH2_FULL_QUESTIONS } from './questions_c6_sci_ch2_full.ts';
import { C6_SCI_CH3_FULL_QUESTIONS } from './questions_c6_sci_ch3_full.ts';
import { C6_SCI_CH4_FULL_QUESTIONS } from './questions_c6_sci_ch4_full.ts';
import { C6_SCI_CH5_FULL_QUESTIONS } from './questions_c6_sci_ch5_full.ts';
import { C6_SCI_CH6_FULL_QUESTIONS } from './questions_c6_sci_ch6_full.ts';
import { C6_SCI_CH7_FULL_QUESTIONS } from './questions_c6_sci_ch7_full.ts';
import { C6_SCI_CH8_FULL_QUESTIONS } from './questions_c6_sci_ch8_full.ts';
import { C6_SCI_CH9_FULL_QUESTIONS } from './questions_c6_sci_ch9_full.ts';
import { C6_SCI_CH10_FULL_QUESTIONS } from './questions_c6_sci_ch10_full.ts';
import { C6_SCI_CH11_FULL_QUESTIONS } from './questions_c6_sci_ch11_full.ts';
import { C6_SCI_CH12_FULL_QUESTIONS } from './questions_c6_sci_ch12_full.ts';
import { C6_MATH_CH1_FULL_QUESTIONS } from './questions_c6_math_ch1_full.ts';
import { C6_MATH_CH2_FULL_QUESTIONS } from './questions_c6_math_ch2_full.ts';
import { C6_MATH_CH3_FULL_QUESTIONS } from './questions_c6_math_ch3_full.ts';
import { C6_MATH_CH4_FULL_QUESTIONS } from './questions_c6_math_ch4_full.ts';
import { C6_MATH_CH5_FULL_QUESTIONS } from './questions_c6_math_ch5_full.ts';
import { C6_MATH_CH6_FULL_QUESTIONS } from './questions_c6_math_ch6_full.ts';
import { C6_MATH_CH7_FULL_QUESTIONS } from './questions_c6_math_ch7_full.ts';
import { C6_MATH_CH8_FULL_QUESTIONS } from './questions_c6_math_ch8_full.ts';
import { C6_MATH_CH9_FULL_QUESTIONS } from './questions_c6_math_ch9_full.ts';
import { C6_MATH_CH10_FULL_QUESTIONS } from './questions_c6_math_ch10_full.ts';
import { C7_MATH_CH1_FULL_QUESTIONS } from './questions_c7_math_ch1_full.ts';
import { C7_MATH_CH2_FULL_QUESTIONS } from './questions_c7_math_ch2_full.ts';
import { C7_MATH_CH3_FULL_QUESTIONS } from './questions_c7_math_ch3_full.ts';
import { C7_MATH_CH4_FULL_QUESTIONS } from './questions_c7_math_ch4_full.ts';
import { C7_MATH_CH5_FULL_QUESTIONS } from './questions_c7_math_ch5_full.ts';
import { C7_MATH_CH6_FULL_QUESTIONS } from './questions_c7_math_ch6_full.ts';
import { C7_MATH_CH7_FULL_QUESTIONS } from './questions_c7_math_ch7_full.ts';
import { C8_SST_CH1_FULL_QUESTIONS } from './questions_c8_sst_ch1_full.ts';
import { C8_SST_CH2_FULL_QUESTIONS } from './questions_c8_sst_ch2_full.ts';
import { C8_SST_CH3_FULL_QUESTIONS } from './questions_c8_sst_ch3_full.ts';
import { C8_SST_CH4_FULL_QUESTIONS } from './questions_c8_sst_ch4_full.ts';
import { C8_SST_CH5_FULL_QUESTIONS } from './questions_c8_sst_ch5_full.ts';
import { C8_SST_CH6_FULL_QUESTIONS } from './questions_c8_sst_ch6_full.ts';
import { C8_SST_CH7_FULL_QUESTIONS } from './questions_c8_sst_ch7_full.ts';
import { C9_ENG_CH1_FULL_QUESTIONS } from './questions_c9_eng_ch1_full.ts';
import { C9_ENG_CH2_FULL_QUESTIONS } from './questions_c9_eng_ch2_full.ts';
import { C9_ENG_CH3_FULL_QUESTIONS } from './questions_c9_eng_ch3_full.ts';
import { C9_ENG_CH4_FULL_QUESTIONS } from './questions_c9_eng_ch4_full.ts';
import { C9_ENG_CH5_FULL_QUESTIONS } from './questions_c9_eng_ch5_full.ts';
import { C9_ENG_CH6_FULL_QUESTIONS } from './questions_c9_eng_ch6_full.ts';
import { C9_ENG_CH7_FULL_QUESTIONS } from './questions_c9_eng_ch7_full.ts';
import { C9_HIN_CH1_FULL_QUESTIONS } from './questions_c9_hin_ch1_full.ts';
import { C9_HIN_CH2_FULL_QUESTIONS } from './questions_c9_hin_ch2_full.ts';
import { C9_HIN_CH3_FULL_QUESTIONS } from './questions_c9_hin_ch3_full.ts';
import { C9_HIN_CH4_FULL_QUESTIONS } from './questions_c9_hin_ch4_full.ts';
import { C9_HIN_CH5_FULL_QUESTIONS } from './questions_c9_hin_ch5_full.ts';
import { C9_HIN_CH6_FULL_QUESTIONS } from './questions_c9_hin_ch6_full.ts';
import { C9_HIN_CH7_FULL_QUESTIONS } from './questions_c9_hin_ch7_full.ts';
import { C9_HIN_CH8_FULL_QUESTIONS } from './questions_c9_hin_ch8_full.ts';
import { C9_HIN_CH9_FULL_QUESTIONS } from './questions_c9_hin_ch9_full.ts';
import { C9_HIN_CH10_FULL_QUESTIONS } from './questions_c9_hin_ch10_full.ts';
import { C9_HIN_CH11_FULL_QUESTIONS } from './questions_c9_hin_ch11_full.ts';
import { C9_HIN_CH12_FULL_QUESTIONS } from './questions_c9_hin_ch12_full.ts';
import { C9_SCI_CH1_QUESTIONS } from './questions_c9_sci_ch1.ts';
import { C9_SCI_CH2_QUESTIONS } from './questions_c9_sci_ch2.ts';
import { C9_SCI_CH3_FULL_QUESTIONS } from './questions_c9_sci_ch3_full.ts';
import { C9_SCI_CH4_FULL_QUESTIONS } from './questions_c9_sci_ch4_full.ts';
import { C9_SCI_CH5_FULL_QUESTIONS } from './questions_c9_sci_ch5_full.ts';
import { C9_SCI_CH6_FULL_QUESTIONS } from './questions_c9_sci_ch6_full.ts';
import { C9_SCI_CH7_FULL_QUESTIONS } from './questions_c9_sci_ch7_full.ts';
import { C9_SCI_CH8_FULL_QUESTIONS } from './questions_c9_sci_ch8_full.ts';
import { C9_SCI_CH9_FULL_QUESTIONS } from './questions_c9_sci_ch9_full.ts';
import { C9_SCI_CH10_FULL_QUESTIONS } from './questions_c9_sci_ch10_full.ts';
import { C9_SCI_CH11_FULL_QUESTIONS } from './questions_c9_sci_ch11_full.ts';
import { C9_SCI_CH12_FULL_QUESTIONS } from './questions_c9_sci_ch12_full.ts';
import { C9_SCI_CH13_FULL_QUESTIONS } from './questions_c9_sci_ch13_full.ts';
import { C9_MATH_CH1_QUESTIONS } from './questions_c9_math_ch1.ts';
import { C9_MATH_CH2_FULL_QUESTIONS } from './questions_c9_math_ch2_full.ts';
import { C9_MATH_CH3_FULL_QUESTIONS } from './questions_c9_math_ch3_full.ts';
import { C9_MATH_CH4_FULL_QUESTIONS } from './questions_c9_math_ch4_full.ts';
import { C9_MATH_CH5_FULL_QUESTIONS } from './questions_c9_math_ch5_full.ts';
import { C9_MATH_CH6_FULL_QUESTIONS } from './questions_c9_math_ch6_full.ts';
import { C9_MATH_CH7_FULL_QUESTIONS } from './questions_c9_math_ch7_full.ts';
import { C9_MATH_CH8_FULL_QUESTIONS } from './questions_c9_math_ch8_full.ts';
import { C9_MATH_CH9_FULL_QUESTIONS } from './questions_c9_math_ch9_full.ts';
import { C9_MATH_CH10_FULL_QUESTIONS } from './questions_c9_math_ch10_full.ts';
import { C9_MATH_CH11_FULL_QUESTIONS } from './questions_c9_math_ch11_full.ts';
import { C9_MATH_CH12_FULL_QUESTIONS } from './questions_c9_math_ch12_full.ts';
import { C9_MATH_CH13_FULL_QUESTIONS } from './questions_c9_math_ch13_full.ts';
import { C9_MATH_CH14_FULL_QUESTIONS } from './questions_c9_math_ch14_full.ts';
import { C9_SST_CH1_FULL_QUESTIONS } from './questions_c9_sst_ch1_full.ts';
import { C9_SST_CH2_FULL_QUESTIONS } from './questions_c9_sst_ch2_full.ts';
import { C9_SST_CH3_FULL_QUESTIONS } from './questions_c9_sst_ch3_full.ts';
import { C9_SST_CH4_FULL_QUESTIONS } from './questions_c9_sst_ch4_full.ts';
import { C9_SST_CH5_FULL_QUESTIONS } from './questions_c9_sst_ch5_full.ts';
import { C9_SST_CH6_FULL_QUESTIONS } from './questions_c9_sst_ch6_full.ts';
import { C9_SST_CH7_FULL_QUESTIONS } from './questions_c9_sst_ch7_full.ts';
import { C9_SST_CH8_FULL_QUESTIONS } from './questions_c9_sst_ch8_full.ts';
import { C9_SST_CH9_FULL_QUESTIONS } from './questions_c9_sst_ch9_full.ts';
import { C9_SST_CH10_FULL_QUESTIONS } from './questions_c9_sst_ch10_full.ts';
import { C9_SST_CH11_FULL_QUESTIONS } from './questions_c9_sst_ch11_full.ts';
import { C9_SST_CH12_FULL_QUESTIONS } from './questions_c9_sst_ch12_full.ts';
import { C9_SST_CH13_FULL_QUESTIONS } from './questions_c9_sst_ch13_full.ts';
import { C9_SST_CH14_FULL_QUESTIONS } from './questions_c9_sst_ch14_full.ts';
import { C9_SST_CH15_FULL_QUESTIONS } from './questions_c9_sst_ch15_full.ts';
import { C9_HUMANITIES_AND_MATH2_QUESTIONS } from './questions_c9_humanities.ts';
import { CLASSES_6_7_8_QUESTIONS } from './questions_classes_6_7_8.ts';
import { C6_ENG_CH1_8_QUESTIONS } from './questions_c6_eng_ch1_8.ts';
import { C6_ENG_CH9_16_QUESTIONS } from './questions_c6_eng_ch9_16.ts';
import { C6_HIN_CH1_7_QUESTIONS } from './questions_c6_hin_ch1_7.ts';
import { C6_HIN_CH8_13_QUESTIONS } from './questions_c6_hin_ch8_13.ts';
import { C6_SST_CH1_7_QUESTIONS } from './questions_c6_sst_ch1_7.ts';
import { C6_SST_CH8_14_QUESTIONS } from './questions_c6_sst_ch8_14.ts';
import { C7_ENG_CH1_8_QUESTIONS } from './questions_c7_eng_ch1_8.ts';
import { C7_ENG_CH9_15_QUESTIONS } from './questions_c7_eng_ch9_15.ts';
import { C7_HIN_CH1_5_QUESTIONS } from './questions_c7_hin_ch1_5.ts';
import { C7_HIN_CH6_10_QUESTIONS } from './questions_c7_hin_ch6_10.ts';
import { C7_MATH_CH8_11_QUESTIONS } from './questions_c7_math_ch8_11.ts';
import { C7_SCI_CH1_3_QUESTIONS } from './questions_c7_sci_ch1_3.ts';
import { C7_SCI_CH4_6_QUESTIONS } from './questions_c7_sci_ch4_6.ts';
import { C7_SCI_CH7_9_QUESTIONS } from './questions_c7_sci_ch7_9.ts';
import { C7_SCI_CH10_12_QUESTIONS } from './questions_c7_sci_ch10_12.ts';
import { C7_SST_CH1_3_QUESTIONS } from './questions_c7_sst_ch1_3.ts';
import { C7_SST_CH4_6_QUESTIONS } from './questions_c7_sst_ch4_6.ts';
import { C7_SST_CH7_9_QUESTIONS } from './questions_c7_sst_ch7_9.ts';
import { C7_SST_CH10_12_QUESTIONS } from './questions_c7_sst_ch10_12.ts';
import { C8_ENG_QUESTIONS } from './questions_c8_eng.ts';
import { C8_HIN_CH1_5_QUESTIONS } from './questions_c8_hin_ch1_5.ts';
import { C8_HIN_CH6_10_QUESTIONS } from './questions_c8_hin_ch6_10.ts';
import { C8_MATH_CH1_3_QUESTIONS } from './questions_c8_math_ch1_3.ts';
import { C8_MATH_CH4_6_QUESTIONS } from './questions_c8_math_ch4_6.ts';
import { C8_MATH_CH7_9_QUESTIONS } from './questions_c8_math_ch7_9.ts';
import { C8_MATH_CH10_11_QUESTIONS } from './questions_c8_math_ch10_11.ts';
import { C8_SCI_CH1_3_QUESTIONS } from './questions_c8_sci_ch1_3.ts';
import { C8_SCI_CH4_6_QUESTIONS } from './questions_c8_sci_ch4_6.ts';
import { C8_SCI_CH7_9_QUESTIONS } from './questions_c8_sci_ch7_9.ts';
import { C8_SCI_CH10_11_QUESTIONS } from './questions_c8_sci_ch10_11.ts';
import { C8_SCI_CH12_13_QUESTIONS } from './questions_c8_sci_ch12_13.ts';
import { C8_SST_CH8_10_QUESTIONS } from './questions_c8_sst_ch8_10.ts';
import { C8_SST_CH11_13_QUESTIONS } from './questions_c8_sst_ch11_13.ts';
import { C8_SST_CH14_15_QUESTIONS } from './questions_c8_sst_ch14_15.ts';
import { C10_MATH_PART1_QUESTIONS } from './questions_c10_math_part1.ts';
import { C10_MATH_PART2_QUESTIONS } from './questions_c10_math_part2.ts';
import { C10_MATH_PART3_QUESTIONS } from './questions_c10_math_part3.ts';
import { C10_SCI_PART1_QUESTIONS } from './questions_c10_sci_part1.ts';
import { C10_SCI_PART2_QUESTIONS } from './questions_c10_sci_part2.ts';
import { C10_SCI_PART3_QUESTIONS } from './questions_c10_sci_part3.ts';
import { C10_SST_PART1_QUESTIONS } from './questions_c10_sst_part1.ts';
import { C10_SST_PART2_QUESTIONS } from './questions_c10_sst_part2.ts';
import { C10_ENG_PART1_QUESTIONS } from './questions_c10_eng_part1.ts';
import { C10_ENG_PART2_QUESTIONS } from './questions_c10_eng_part2.ts';
import { C10_HIN_PART1_QUESTIONS } from './questions_c10_hin_part1.ts';
import { C10_HIN_PART2_QUESTIONS } from './questions_c10_hin_part2.ts';
import { C10_ICT_QUESTIONS } from './questions_c10_ict.ts';
import { SeedQuestion } from './types.ts';

export const ALL_SEED_QUESTIONS: SeedQuestion[] = [
  ...C6_SCI_CH1_FULL_QUESTIONS,
  ...C6_SCI_CH2_FULL_QUESTIONS,
  ...C6_SCI_CH3_FULL_QUESTIONS,
  ...C6_SCI_CH4_FULL_QUESTIONS,
  ...C6_SCI_CH5_FULL_QUESTIONS,
  ...C6_SCI_CH6_FULL_QUESTIONS,
  ...C6_SCI_CH7_FULL_QUESTIONS,
  ...C6_SCI_CH8_FULL_QUESTIONS,
  ...C6_SCI_CH9_FULL_QUESTIONS,
  ...C6_SCI_CH10_FULL_QUESTIONS,
  ...C6_SCI_CH11_FULL_QUESTIONS,
  ...C6_SCI_CH12_FULL_QUESTIONS,
  ...C6_MATH_CH1_FULL_QUESTIONS,
  ...C6_MATH_CH2_FULL_QUESTIONS,
  ...C6_MATH_CH3_FULL_QUESTIONS,
  ...C6_MATH_CH4_FULL_QUESTIONS,
  ...C6_MATH_CH5_FULL_QUESTIONS,
  ...C6_MATH_CH6_FULL_QUESTIONS,
  ...C6_MATH_CH7_FULL_QUESTIONS,
  ...C6_MATH_CH8_FULL_QUESTIONS,
  ...C6_MATH_CH9_FULL_QUESTIONS,
  ...C6_MATH_CH10_FULL_QUESTIONS,
  ...C7_MATH_CH1_FULL_QUESTIONS,
  ...C7_MATH_CH2_FULL_QUESTIONS,
  ...C7_MATH_CH3_FULL_QUESTIONS,
  ...C7_MATH_CH4_FULL_QUESTIONS,
  ...C7_MATH_CH5_FULL_QUESTIONS,
  ...C7_MATH_CH6_FULL_QUESTIONS,
  ...C7_MATH_CH7_FULL_QUESTIONS,
  ...C8_SST_CH1_FULL_QUESTIONS,
  ...C8_SST_CH2_FULL_QUESTIONS,
  ...C8_SST_CH3_FULL_QUESTIONS,
  ...C8_SST_CH4_FULL_QUESTIONS,
  ...C8_SST_CH5_FULL_QUESTIONS,
  ...C8_SST_CH6_FULL_QUESTIONS,
  ...C8_SST_CH7_FULL_QUESTIONS,
  ...C9_ENG_CH1_FULL_QUESTIONS,
  ...C9_ENG_CH2_FULL_QUESTIONS,
  ...C9_ENG_CH3_FULL_QUESTIONS,
  ...C9_ENG_CH4_FULL_QUESTIONS,
  ...C9_ENG_CH5_FULL_QUESTIONS,
  ...C9_ENG_CH6_FULL_QUESTIONS,
  ...C9_ENG_CH7_FULL_QUESTIONS,
  ...C9_HIN_CH1_FULL_QUESTIONS,
  ...C9_HIN_CH2_FULL_QUESTIONS,
  ...C9_HIN_CH3_FULL_QUESTIONS,
  ...C9_HIN_CH4_FULL_QUESTIONS,
  ...C9_HIN_CH5_FULL_QUESTIONS,
  ...C9_HIN_CH6_FULL_QUESTIONS,
  ...C9_HIN_CH7_FULL_QUESTIONS,
  ...C9_HIN_CH8_FULL_QUESTIONS,
  ...C9_HIN_CH9_FULL_QUESTIONS,
  ...C9_HIN_CH10_FULL_QUESTIONS,
  ...C9_HIN_CH11_FULL_QUESTIONS,
  ...C9_HIN_CH12_FULL_QUESTIONS,
  ...CLASSES_6_7_8_QUESTIONS,
  ...C9_SCI_CH1_QUESTIONS,
  ...C9_SCI_CH2_QUESTIONS,
  ...C9_SCI_CH3_FULL_QUESTIONS,
  ...C9_SCI_CH4_FULL_QUESTIONS,
  ...C9_SCI_CH5_FULL_QUESTIONS,
  ...C9_SCI_CH6_FULL_QUESTIONS,
  ...C9_SCI_CH7_FULL_QUESTIONS,
  ...C9_SCI_CH8_FULL_QUESTIONS,
  ...C9_SCI_CH9_FULL_QUESTIONS,
  ...C9_SCI_CH10_FULL_QUESTIONS,
  ...C9_SCI_CH11_FULL_QUESTIONS,
  ...C9_SCI_CH12_FULL_QUESTIONS,
  ...C9_SCI_CH13_FULL_QUESTIONS,
  ...C9_MATH_CH1_QUESTIONS,
  ...C9_MATH_CH2_FULL_QUESTIONS,
  ...C9_MATH_CH3_FULL_QUESTIONS,
  ...C9_MATH_CH4_FULL_QUESTIONS,
  ...C9_MATH_CH5_FULL_QUESTIONS,
  ...C9_MATH_CH6_FULL_QUESTIONS,
  ...C9_MATH_CH7_FULL_QUESTIONS,
  ...C9_MATH_CH8_FULL_QUESTIONS,
  ...C9_MATH_CH9_FULL_QUESTIONS,
  ...C9_MATH_CH10_FULL_QUESTIONS,
  ...C9_MATH_CH11_FULL_QUESTIONS,
  ...C9_MATH_CH12_FULL_QUESTIONS,
  ...C9_MATH_CH13_FULL_QUESTIONS,
  ...C9_MATH_CH14_FULL_QUESTIONS,
  ...C9_SST_CH1_FULL_QUESTIONS,
  ...C9_SST_CH2_FULL_QUESTIONS,
  ...C9_SST_CH3_FULL_QUESTIONS,
  ...C9_SST_CH4_FULL_QUESTIONS,
  ...C9_SST_CH5_FULL_QUESTIONS,
  ...C9_SST_CH6_FULL_QUESTIONS,
  ...C9_SST_CH7_FULL_QUESTIONS,
  ...C9_SST_CH8_FULL_QUESTIONS,
  ...C9_SST_CH9_FULL_QUESTIONS,
  ...C9_SST_CH10_FULL_QUESTIONS,
  ...C9_SST_CH11_FULL_QUESTIONS,
  ...C9_SST_CH12_FULL_QUESTIONS,
  ...C9_SST_CH13_FULL_QUESTIONS,
  ...C9_SST_CH14_FULL_QUESTIONS,
  ...C9_SST_CH15_FULL_QUESTIONS,
  ...C9_HUMANITIES_AND_MATH2_QUESTIONS,
  ...C6_ENG_CH1_8_QUESTIONS,
  ...C6_ENG_CH9_16_QUESTIONS,
  ...C6_HIN_CH1_7_QUESTIONS,
  ...C6_HIN_CH8_13_QUESTIONS,
  ...C6_SST_CH1_7_QUESTIONS,
  ...C6_SST_CH8_14_QUESTIONS,
  ...C7_ENG_CH1_8_QUESTIONS,
  ...C7_ENG_CH9_15_QUESTIONS,
  ...C7_HIN_CH1_5_QUESTIONS,
  ...C7_HIN_CH6_10_QUESTIONS,
  ...C7_MATH_CH8_11_QUESTIONS,
  ...C7_SCI_CH1_3_QUESTIONS,
  ...C7_SCI_CH4_6_QUESTIONS,
  ...C7_SCI_CH7_9_QUESTIONS,
  ...C7_SCI_CH10_12_QUESTIONS,
  ...C7_SST_CH1_3_QUESTIONS,
  ...C7_SST_CH4_6_QUESTIONS,
  ...C7_SST_CH7_9_QUESTIONS,
  ...C7_SST_CH10_12_QUESTIONS,
  ...C8_ENG_QUESTIONS,
  ...C8_HIN_CH1_5_QUESTIONS,
  ...C8_HIN_CH6_10_QUESTIONS,
  ...C8_MATH_CH1_3_QUESTIONS,
  ...C8_MATH_CH4_6_QUESTIONS,
  ...C8_MATH_CH7_9_QUESTIONS,
  ...C8_MATH_CH10_11_QUESTIONS,
  ...C8_SCI_CH1_3_QUESTIONS,
  ...C8_SCI_CH4_6_QUESTIONS,
  ...C8_SCI_CH7_9_QUESTIONS,
  ...C8_SCI_CH10_11_QUESTIONS,
  ...C8_SCI_CH12_13_QUESTIONS,
  ...C8_SST_CH8_10_QUESTIONS,
  ...C8_SST_CH11_13_QUESTIONS,
  ...C8_SST_CH14_15_QUESTIONS,
  ...C10_MATH_PART1_QUESTIONS,
  ...C10_MATH_PART2_QUESTIONS,
  ...C10_MATH_PART3_QUESTIONS,
  ...C10_SCI_PART1_QUESTIONS,
  ...C10_SCI_PART2_QUESTIONS,
  ...C10_SCI_PART3_QUESTIONS,
  ...C10_SST_PART1_QUESTIONS,
  ...C10_SST_PART2_QUESTIONS,
  ...C10_ENG_PART1_QUESTIONS,
  ...C10_ENG_PART2_QUESTIONS,
  ...C10_HIN_PART1_QUESTIONS,
  ...C10_HIN_PART2_QUESTIONS,
  ...C10_ICT_QUESTIONS,
];

export function getTargetTestQuestionCount(level: number, setNumber: number): number {
  // 4 tests of 10 Qs (L1S1, L1S2, L2S1, L2S2)
  // 2 tests of 15 Qs (L3S1, L3S2)
  // 2 tests of 20 Qs (L4S1, L4S2)
  // 2 tests of 50 Qs (L5S1, L5S2)
  if (level <= 2) return 10;
  if (level === 3) return 15;
  if (level === 4) return 20;
  return setNumber >= 1 ? 50 : 50;
}

export function seedDatabaseIfNeeded() {
  initializeSchema();

  const existingClasses = db.prepare('SELECT COUNT(*) as count FROM classes').get() as { count: number };

  const insertClass = db.prepare(
    'INSERT OR IGNORE INTO classes (number, name, syllabus_year, description) VALUES (?, ?, ?, ?)'
  );
  const insertSubject = db.prepare(
    'INSERT OR IGNORE INTO subjects (class_id, slug, name, textbook_title, description) VALUES (?, ?, ?, ?, ?)'
  );
  const insertChapter = db.prepare(
    'INSERT OR IGNORE INTO chapters (subject_id, chapter_number, title, unit_name, description) VALUES (?, ?, ?, ?, ?)'
  );
  const insertTestSet = db.prepare(
    'INSERT OR IGNORE INTO test_sets (chapter_id, title, difficulty_level, set_number, question_count, time_limit_minutes, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  const findExistingQuestion = db.prepare(
    'SELECT id, option_a as optionA, option_b as optionB, option_c as optionC, option_d as optionD, correct_option as correctOption FROM questions WHERE chapter_id = ? AND question_text = ?'
  );
  const countQuestionAttempts = db.prepare(
    'SELECT COUNT(*) as c FROM test_answers WHERE question_id = ?'
  );
  const updateQuestionOptions = db.prepare(`
    UPDATE questions
    SET option_a = ?, option_b = ?, option_c = ?, option_d = ?,
        correct_option = ?, explanation = ?, question_type = ?
    WHERE id = ?
  `);
  const insertQuestion = db.prepare(`
    INSERT INTO questions (
      chapter_id, test_set_id, difficulty_level,
      question_text, option_a, option_b, option_c, option_d,
      correct_option, explanation, question_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const runSeed = db.transaction(() => {
    let class9Id = 1;

    // Always ensure all syllabus classes (6-10), subjects, chapters, and test sets exist incrementally
    for (const cls of NCERT_SYLLABUS) {
      insertClass.run(cls.number, cls.name, cls.syllabusYear, cls.description);
      const clsRow = db.prepare('SELECT id FROM classes WHERE number = ?').get(cls.number) as { id: number };
      const classId = clsRow.id;
      if (cls.number === 9) class9Id = classId;

      for (const subj of cls.subjects) {
        insertSubject.run(classId, subj.slug, subj.name, subj.textbookTitle, subj.description);
        const subjRow = db
          .prepare('SELECT id FROM subjects WHERE class_id = ? AND slug = ?')
          .get(classId, subj.slug) as { id: number };
        const subjectId = subjRow.id;

        for (const ch of subj.chapters) {
          insertChapter.run(subjectId, ch.number, ch.title, ch.unitName ?? null, ch.description ?? null);
          const chRow = db
            .prepare('SELECT id FROM chapters WHERE subject_id = ? AND chapter_number = ?')
            .get(subjectId, ch.number) as { id: number };
          const chapterId = chRow.id;

          for (let level = 1; level <= 5; level++) {
            for (let setNum = 1; setNum <= 2; setNum++) {
              const qCount = getTargetTestQuestionCount(level, setNum);
              insertTestSet.run(chapterId, `Level ${level} – Test ${setNum}`, level, setNum, qCount, qCount, qCount);
            }
          }
        }
      }
    }

    if (existingClasses.count === 0) {
      const adminExists = db
        .prepare("SELECT id FROM profiles WHERE email = 'admin@toppersadda.edu'")
        .get();
      if (!adminExists) {
        const adminPasswordHash = hashPassword('Admin@Toppers2026');
        db.prepare(
          `INSERT INTO profiles (name, email, password_hash, role, class_id)
           VALUES (?, ?, ?, 'admin', ?)`
        ).run('Vishal Singh (Admin)', 'admin@toppersadda.edu', adminPasswordHash, class9Id);
      }
    }

    // Build lookup maps for incremental idempotent question seeding
    const chapterRows = db
      .prepare(
        `SELECT ch.id, c.number as classNumber, s.slug as subjectSlug, ch.chapter_number as chapterNumber
         FROM chapters ch
         JOIN subjects s ON s.id = ch.subject_id
         JOIN classes c ON c.id = s.class_id`
      )
      .all() as Array<{ id: number; classNumber: number; subjectSlug: string; chapterNumber: number }>;

    const chapterKeyToId = new Map<string, number>();
    for (const r of chapterRows) {
      chapterKeyToId.set(`${r.classNumber}:${r.subjectSlug}:${r.chapterNumber}`, r.id);
      for (let level = 1; level <= 5; level++) {
        for (let setNum = 1; setNum <= 2; setNum++) {
          const qCount = getTargetTestQuestionCount(level, setNum);
          insertTestSet.run(r.id, `Level ${level} – Test ${setNum}`, level, setNum, qCount, qCount, qCount);
        }
      }
    }

    const testSetRows = db
      .prepare('SELECT id, chapter_id as chapterId, difficulty_level as level, set_number as setNum FROM test_sets')
      .all() as Array<{ id: number; chapterId: number; level: number; setNum: number }>;

    const testSetMap = new Map<string, number>();
    for (const ts of testSetRows) {
      testSetMap.set(`${ts.chapterId}:${ts.level}:${ts.setNum}`, ts.id);
    }

    let insertedCount = 0;
    let updatedCount = 0;
    for (const q of ALL_SEED_QUESTIONS) {
      const chKey = `${q.classNumber}:${q.subjectSlug}:${q.chapterNumber}`;
      const chapterId = chapterKeyToId.get(chKey);
      if (!chapterId) continue;

      const testSetId = testSetMap.get(`${chapterId}:${q.difficultyLevel}:${q.setNumber}`);
      if (!testSetId) continue;

      const exists = findExistingQuestion.get(chapterId, q.questionText) as
        | { id: number; optionA: string; optionB: string; optionC: string; optionD: string; correctOption: string }
        | undefined;
      if (exists) {
        if (
          exists.optionA !== q.optionA ||
          exists.optionB !== q.optionB ||
          exists.optionC !== q.optionC ||
          exists.optionD !== q.optionD ||
          exists.correctOption !== q.correctOption
        ) {
          const att = countQuestionAttempts.get(exists.id) as { c: number };
          if (att.c === 0) {
            updateQuestionOptions.run(
              q.optionA,
              q.optionB,
              q.optionC,
              q.optionD,
              q.correctOption,
              q.explanation,
              q.questionType ?? 'conceptual',
              exists.id
            );
            updatedCount++;
          }
        }
        continue;
      }

      insertQuestion.run(
        chapterId,
        testSetId,
        q.difficultyLevel,
        q.questionText,
        q.optionA,
        q.optionB,
        q.optionC,
        q.optionD,
        q.correctOption,
        q.explanation,
        q.questionType ?? 'conceptual'
      );
      insertedCount++;
    }

    // Calibrate test_sets question_count / total_marks / time_limit_minutes
    // so 10/15/20/50-question tests match available unique questions in each chapter cleanly.
    const chTotals = db
      .prepare('SELECT chapter_id as chapterId, COUNT(*) as total FROM questions GROUP BY chapter_id')
      .all() as Array<{ chapterId: number; total: number }>;
    const totalByCh = new Map(chTotals.map((r) => [r.chapterId, r.total]));

    const updateTsMeta = db.prepare(
      'UPDATE test_sets SET question_count = ?, time_limit_minutes = ?, total_marks = ? WHERE id = ?'
    );
    for (const ts of testSetRows) {
      const chTotal = totalByCh.get(ts.chapterId) ?? 0;
      const target = getTargetTestQuestionCount(ts.level, ts.setNum);
      const effectiveCount = chTotal >= 10 ? Math.min(target, chTotal) : target;
      updateTsMeta.run(effectiveCount, effectiveCount, effectiveCount, ts.id);
    }

    if (insertedCount > 0 || updatedCount > 0) {
      console.log(`Synced ${insertedCount} new and ${updatedCount} balanced NCERT MCQs into TOPPERS ADDA database.`);
    }
  });

  runSeed();
  seedPyqsAndNotesIfNeeded();
}
