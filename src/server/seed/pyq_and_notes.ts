import { db } from '../db';
import {
  CLASS_10_DRIVE_FOLDER_URL,
  MATH_AND_SCIENCE_PYQS,
  PyqQaItem,
  SeedPyqPaper,
} from './pyqs/math_science_pyqs';
import { SST_LANG_ICT_PYQS } from './pyqs/sst_lang_ict_pyqs';

export const CLASS_10_DRIVE_FOLDER_ID = '1w--IKGAoiricnru0PSjSIyQmzJ0zc7z7';
export { CLASS_10_DRIVE_FOLDER_URL };
export type { PyqQaItem };

const SEED_PYQ_PAPERS: SeedPyqPaper[] = [
  ...MATH_AND_SCIENCE_PYQS,
  ...SST_LANG_ICT_PYQS,
];

function cleanToStatement(questionText: string, answerText: string, explanation: string): {
  title: string;
  detail: string;
  fact: string;
} {
  const cleanExp = explanation.replace(/\s+/g, ' ').trim();
  const cleanAns = answerText.replace(/\s+/g, ' ').trim();
  let title = questionText
    .replace(/^(Which of the following|What is|What are|Why does|Why do|How does|How do|In |If |Identify |Select |Choose |Calculate |Find )/i, '')
    .replace(/\?+$/, '')
    .trim();
  if (title.length > 76) {
    title = title.slice(0, 73).trim() + '…';
  }
  if (!title) title = 'Core Chapter Concept';
  title = title.charAt(0).toUpperCase() + title.slice(1);

  const detail = cleanExp.length > 18 ? cleanExp : `${cleanAns} — ${cleanExp}`;
  const fact = `${cleanAns}: ${cleanExp}`;
  return { title, detail, fact };
}

function getSubjectExamTips(subjectSlug: string, classNumber: number): string[] {
  const boardSuffix =
    classNumber === 10
      ? ' Follow CBSE Board Marking Scheme steps—box final answers and include units/keywords.'
      : ' Focus on NCERT textbook activities, examples, and reasoning questions.';

  switch (subjectSlug) {
    case 'mathematics':
      return [
        'Write Given, Formula/Theorem, Substitution, and Final Answer with proper units on separate lines.' + boardSuffix,
        'Always verify signs, brackets, and decimal/fraction reductions—especially in algebra and mensuration.',
        'Draw neat pencil diagrams with labelled dimensions for Geometry, Trigonometry, and Mensuration problems.',
        'Attempt all 1-mark and 2-mark foundational checks first, then verify multi-step numericals by reverse-checking.',
      ];
    case 'science':
      return [
        'Use exact NCERT scientific keywords (e.g., enzyme names, chemical state symbols, laws, SI units) so examiners award full marks.' + boardSuffix,
        'Balance every chemical equation and write reaction conditions (heat, catalyst, light) above the arrow.',
        'Practice labelled diagrams (ray diagrams, circuits, heart/nephron/flower) and sign conventions carefully.',
        'In Assertion-Reason questions, test Assertion and Reason independently first before checking causation.',
      ];
    case 'social-science':
      return [
        'Structure 3-mark and 5-mark answers in numbered points with underlined sub-headings rather than long paragraphs.' + boardSuffix,
        'Anchor History and Civics answers with exact years, acts, treaties, personalities, and constitutional articles.',
        'For Geography and Economics, distinguish paired terms clearly (e.g., formal vs informal, conventional vs non-conventional) using concrete Indian examples.',
        'Keep chapter timelines and key map locations revised alongside definitions.',
      ];
    case 'english':
      return [
        'Support literature answers with exact character names, chapter titles, and brief textual evidence.' + boardSuffix,
        'In Formal Letters and Analytical Paragraphs, adhere strictly to standard CBSE layout, tone, and word limit.',
        'For Integrated Grammar, verify tense sequence, subject-verb agreement, modals, and determiners step by step.',
        'Identify poetic devices (metaphor, simile, personification, alliteration, rhyme scheme) directly from poem stanzas.',
      ];
    case 'hindi':
      return [
        'उत्तर लिखते समय वर्तनी (मात्राओं), विराम-चिह्नों तथा पाठ व लेखक/कवि के शुद्ध नाम का विशेष ध्यान रखें।' + boardSuffix,
        'व्याकरण में समास-विग्रह, पदबंध और वाक्य-रूपांतरण के नियमों का लिखित अभ्यास करें।',
        'काव्य-खंड के प्रश्नों में प्रतीकात्मक अर्थ और मूल संदेश को स्पष्ट शब्दों में लिखें।',
        'रचना कौशल (पत्र, अनुच्छेद, सूचना, विज्ञापन) में निर्धारित प्रारूप और शब्द-सीमा का पालन करें।',
      ];
    default: // ict
      return [
        'Trace Python `for`/`while` loops variable-by-variable on rough paper before choosing output options.' + boardSuffix,
        'Distinguish `range(start, stop, step)` bounds (stop is excluded) and string/list indexing (`0`-based and negative indices).',
        'In MySQL queries, check clause order carefully: `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`.',
        'Always use `IS NULL` / `IS NOT NULL` rather than `= NULL` in SQL conditions.',
      ];
  }
}

function getCommonMistakes(subjectSlug: string): string[] {
  switch (subjectSlug) {
    case 'mathematics':
      return [
        'Dropping negative signs when expanding brackets or transferring terms across `=`.',
        'Confusing radius vs diameter or omitting units (cm², cm³, m) in final answers.',
        'Applying formulas blindly without checking whether angles/lengths match the theorem preconditions.',
      ];
    case 'science':
      return [
        'Writing unbalanced chemical equations or omitting state symbols where required.',
        'Mixing up mirror/lens sign conventions (`u` is always negative; focal length sign differs for concave vs convex).',
        'Assuming a true Reason automatically explains the Assertion in Assertion-Reason items.',
      ];
    case 'social-science':
      return [
        'Writing vague summaries without specific dates, names, regions, or constitutional provisions.',
        'Mixing up similar terms (e.g., Khadar vs Bangar, Federal vs Unitary, Organised vs Unorganised sector).',
        'Leaving multi-part questions half-answered instead of addressing every sub-question.',
      ];
    case 'english':
      return [
        'Exceeding word limits or missing the Subject/Salutation line in formal writing tasks.',
        'Switching tense mid-sentence in reported speech and editing passages.',
        'Retelling the entire story plot instead of directly answering the analytical "why/how" prompt.',
      ];
    case 'hindi':
      return [
        'अशुद्ध वर्तनी या अनुस्वार-अनुनासिक (ं / ँ) की त्रुटियाँ करना।',
        'समास-विग्रह लिखे बिना केवल समास का नाम लिख देना।',
        'औपचारिक पत्र में अनावश्यक विस्तार करना और विषय स्पष्ट न लिखना।',
      ];
    default:
      return [
        'Counting the `stop` value inside `range(start, stop)` in Python loops.',
        'Assuming `list.remove(x)` deletes all occurrences of `x` (it removes only the first).',
        'Using `WHERE` instead of `HAVING` to filter aggregated `GROUP BY` results in MySQL.',
      ];
  }
}

export function seedPyqsAndNotesIfNeeded() {
  const selectExistingPyq = db.prepare(`
    SELECT id, qa_items as qaItems FROM pyq_papers
    WHERE class_number = ? AND subject_slug = ? AND exam_year = ? AND paper_code = ?
  `);

  const insertPyq = db.prepare(`
    INSERT INTO pyq_papers (
      class_number, subject_slug, subject_name, exam_year, paper_code, title,
      drive_folder_url, question_drive_file_id, solution_drive_file_id, qa_items
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const updateFullPyq = db.prepare(`
    UPDATE pyq_papers
    SET title = ?, drive_folder_url = ?, qa_items = ?
    WHERE id = ?
  `);

  const runPyqs = db.transaction(() => {
    for (const paper of SEED_PYQ_PAPERS) {
      const existing = selectExistingPyq.get(
        paper.classNumber,
        paper.subjectSlug,
        paper.examYear,
        paper.paperCode
      ) as { id: number; qaItems: string } | undefined;

      if (!existing) {
        insertPyq.run(
          paper.classNumber,
          paper.subjectSlug,
          paper.subjectName,
          paper.examYear,
          paper.paperCode,
          paper.title,
          paper.driveFolderUrl,
          paper.questionDriveFileId ?? null,
          paper.solutionDriveFileId ?? null,
          JSON.stringify(paper.qaItems)
        );
      } else {
        let existingCount = 0;
        try {
          const parsed = JSON.parse(existing.qaItems);
          existingCount = Array.isArray(parsed) ? parsed.length : 0;
        } catch {
          existingCount = 0;
        }
        if (existingCount < paper.qaItems.length) {
          updateFullPyq.run(
            paper.title,
            paper.driveFolderUrl,
            JSON.stringify(paper.qaItems),
            existing.id
          );
        }
      }
    }
  });
  runPyqs();

  // Seed separate exam notes for ALL chapters across Classes 6-10 that don't yet have notes
  const missingChapters = db
    .prepare(
      `SELECT ch.id, ch.chapter_number as chapterNumber, ch.title, ch.unit_name as unitName,
              ch.description, s.slug as subjectSlug, s.name as subjectName,
              s.textbook_title as textbookTitle, c.number as classNumber
       FROM chapters ch
       JOIN subjects s ON s.id = ch.subject_id
       JOIN classes c ON c.id = s.class_id
       LEFT JOIN chapter_notes cn ON cn.chapter_id = ch.id
       WHERE cn.id IS NULL
       ORDER BY c.number ASC, s.id ASC, ch.chapter_number ASC`
    )
    .all() as Array<{
    id: number;
    chapterNumber: number;
    title: string;
    unitName: string | null;
    description: string | null;
    subjectSlug: string;
    subjectName: string;
    textbookTitle: string;
    classNumber: number;
  }>;

  if (missingChapters.length === 0) return;

  const getChapterQs = db.prepare(
    `SELECT difficulty_level as difficultyLevel, question_text as questionText,
            option_a as optionA, option_b as optionB, option_c as optionC, option_d as optionD,
            correct_option as correctOption, explanation, question_type as questionType
     FROM questions
     WHERE chapter_id = ?
     ORDER BY difficulty_level ASC, id ASC`
  );

  const insertNote = db.prepare(`
    INSERT OR IGNORE INTO chapter_notes (
      chapter_id, overview, key_concepts, formulas_and_facts, exam_tips, common_mistakes
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const runNotes = db.transaction(() => {
    let seededCount = 0;
    for (const ch of missingChapters) {
      const qs = getChapterQs.all(ch.id) as Array<{
        difficultyLevel: number;
        questionText: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
        correctOption: string;
        explanation: string;
        questionType: string;
      }>;

      const overviewParts = [
        `Class ${ch.classNumber} ${ch.subjectName} — Chapter ${ch.chapterNumber}: ${ch.title}`,
        ch.unitName ? `(${ch.unitName})` : '',
        `from ${ch.textbookTitle}.`,
        ch.description
          ? ch.description
          : `Complete exam-oriented revision summary covering core definitions, NCERT concepts, applications, and scoring takeaways for ${ch.title}.`,
      ].filter(Boolean);
      const overview = overviewParts.join(' ');

      const conceptCandidates = qs.filter(
        (q) => q.questionType !== 'assertion-reason' && q.explanation && q.explanation.length > 20
      );

      // Pick diverse questions across difficulty levels 1..5 for Key Concepts & Quick-Recall Facts
      const pickedForConcepts: typeof conceptCandidates = [];
      const seenTitles = new Set<string>();
      for (const level of [1, 2, 3, 4, 5]) {
        const levelQs = conceptCandidates.filter((q) => q.difficultyLevel === level);
        for (const q of levelQs.slice(0, 2)) {
          if (pickedForConcepts.length >= 6) break;
          const ansMap: Record<string, string> = {
            A: q.optionA,
            B: q.optionB,
            C: q.optionC,
            D: q.optionD,
          };
          const ansText = ansMap[q.correctOption] ?? q.optionA;
          const cleaned = cleanToStatement(q.questionText, ansText, q.explanation);
          if (!seenTitles.has(cleaned.title)) {
            seenTitles.add(cleaned.title);
            pickedForConcepts.push(q);
          }
        }
      }

      const keyConcepts = pickedForConcepts.map((q) => {
        const ansMap: Record<string, string> = {
          A: q.optionA,
          B: q.optionB,
          C: q.optionC,
          D: q.optionD,
        };
        const ansText = ansMap[q.correctOption] ?? q.optionA;
        const cleaned = cleanToStatement(q.questionText, ansText, q.explanation);
        return {
          title: cleaned.title,
          detail: `${ansText} — ${cleaned.detail}`,
        };
      });

      if (keyConcepts.length === 0) {
        keyConcepts.push({
          title: `Core Framework of ${ch.title}`,
          detail: ch.description ?? `Review key NCERT terms, textbook examples, and exercise problems in ${ch.title}.`,
        });
      }

      const formulasAndFacts: string[] = [];
      for (const q of conceptCandidates.slice(0, 12)) {
        if (formulasAndFacts.length >= 6) break;
        if (pickedForConcepts.includes(q) && conceptCandidates.length > 8) continue;
        const ansMap: Record<string, string> = {
          A: q.optionA,
          B: q.optionB,
          C: q.optionC,
          D: q.optionD,
        };
        const ansText = ansMap[q.correctOption] ?? q.optionA;
        const cleaned = cleanToStatement(q.questionText, ansText, q.explanation);
        if (!formulasAndFacts.includes(cleaned.fact)) {
          formulasAndFacts.push(cleaned.fact);
        }
      }
      if (formulasAndFacts.length === 0) {
        formulasAndFacts.push(...keyConcepts.map((c) => `${c.title}: ${c.detail}`));
      }

      const examTips = getSubjectExamTips(ch.subjectSlug, ch.classNumber);
      const commonMistakes = getCommonMistakes(ch.subjectSlug);

      insertNote.run(
        ch.id,
        overview,
        JSON.stringify(keyConcepts),
        JSON.stringify(formulasAndFacts),
        JSON.stringify(examTips),
        JSON.stringify(commonMistakes)
      );
      seededCount++;
    }
    if (seededCount > 0) {
      console.log(`Seeded exam-ready Chapter Notes for ${seededCount} chapters across Classes 6–10.`);
    }
  });

  runNotes();
}
