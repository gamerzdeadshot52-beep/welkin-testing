export interface SeedQuestion {
  classNumber: 6 | 7 | 8 | 9 | 10;
  subjectSlug: 'science' | 'hindi' | 'english' | 'mathematics' | 'social-science' | 'ict';
  chapterNumber: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  setNumber: 1 | 2;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  questionType?: 'factual' | 'conceptual' | 'numerical' | 'application' | 'assertion-reason' | 'case-based' | 'inference';
}

export type CompactQuestion = [
  difficultyLevel: 1 | 2 | 3 | 4 | 5,
  setNumber: 1 | 2,
  questionText: string,
  optionA: string,
  optionB: string,
  optionC: string,
  optionD: string,
  correctOption: 'A' | 'B' | 'C' | 'D',
  explanation: string,
  questionType?: SeedQuestion['questionType']
];

const OPTION_LETTERS: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

const FIXED_OPTION_PATTERN =
  /\b(all of the above|all the above|all of these|none of the above|none of these|both of the above|both of these|both a and b|both \(a\)|both a & b|both b and c|a and r|option a|option b|option c|option d|neither a nor b)\b|उपर्युक्त सभी|उपरोक्त सभी|इनमें से कोई नहीं|दोनों सही|a और r|a व r/i;

function fnv1aHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function randomizeOptionsIfSafe(
  seedKey: string,
  options: [string, string, string, string],
  correctOption: 'A' | 'B' | 'C' | 'D',
  questionType?: SeedQuestion['questionType']
): { options: [string, string, string, string]; correctOption: 'A' | 'B' | 'C' | 'D' } {
  if (questionType === 'assertion-reason') {
    return { options, correctOption };
  }
  if (options.some((opt) => FIXED_OPTION_PATTERN.test(opt))) {
    return { options, correctOption };
  }

  const origIdx = OPTION_LETTERS.indexOf(correctOption);
  const tagged = options.map((text, idx) => ({ text, isCorrect: idx === origIdx }));

  // Deterministic Fisher-Yates shuffle using SplitMix32 seeded per question
  let state = fnv1aHash(seedKey) || 1;
  const nextRand = () => {
    state = (state + 0x9e3779b9) >>> 0;
    let t = state ^ (state >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    t = t ^ (t >>> 15);
    return t >>> 0;
  };
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = nextRand() % (i + 1);
    const tmp = tagged[i];
    tagged[i] = tagged[j];
    tagged[j] = tmp;
  }

  const newCorrectIdx = tagged.findIndex((t) => t.isCorrect);
  return {
    options: [tagged[0].text, tagged[1].text, tagged[2].text, tagged[3].text],
    correctOption: OPTION_LETTERS[newCorrectIdx >= 0 ? newCorrectIdx : 0],
  };
}

export function expandQuestions(
  classNumber: 6 | 7 | 8 | 9 | 10,
  subjectSlug: SeedQuestion['subjectSlug'],
  chapterNumber: number,
  rows: CompactQuestion[]
): SeedQuestion[] {
  return rows.map(
    ([difficultyLevel, setNumber, questionText, optionA, optionB, optionC, optionD, correctOption, explanation, questionType], idx) => {
      const seedKey = `${classNumber}:${subjectSlug}:${chapterNumber}:${idx}:${questionText}`;
      const balanced = randomizeOptionsIfSafe(
        seedKey,
        [optionA, optionB, optionC, optionD],
        correctOption,
        questionType
      );
      return {
        classNumber,
        subjectSlug,
        chapterNumber,
        difficultyLevel,
        setNumber,
        questionText,
        optionA: balanced.options[0],
        optionB: balanced.options[1],
        optionC: balanced.options[2],
        optionD: balanced.options[3],
        correctOption: balanced.correctOption,
        explanation,
        questionType: questionType ?? 'conceptual',
      };
    }
  );
}
