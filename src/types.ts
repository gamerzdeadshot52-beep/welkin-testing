export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export const DIFFICULTY_META: Record<
  DifficultyLevel,
  { name: string; shortName: string; description: string }
> = {
  1: {
    name: 'Level 1 – Basic',
    shortName: 'Basic',
    description: 'Fundamental concepts, simple definitions, basic factual knowledge.',
  },
  2: {
    name: 'Level 2 – Easy to Moderate',
    shortName: 'Easy–Moderate',
    description: 'Understanding concepts, straightforward applications, basic calculations.',
  },
  3: {
    name: 'Level 3 – Moderate',
    shortName: 'Moderate',
    description: 'Application-based MCQs, logical thinking, numerical problems, multi-concept links.',
  },
  4: {
    name: 'Level 4 – Advanced',
    shortName: 'Advanced',
    description: 'Challenging conceptual questions, multi-step calculations, competency-based.',
  },
  5: {
    name: 'Level 5 – Expert',
    shortName: 'Expert',
    description: 'Higher-order thinking, assertion-reasoning, case-based NCERT-aligned MCQs.',
  },
};

export interface Profile {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  classId: number;
  classNumber: number;
  createdAt: string;
}

export interface ClassItem {
  id: number;
  number: number;
  name: string;
  syllabusYear: string;
  description: string;
  subjectCount: number;
  chapterCount: number;
  readyTestCount: number;
}

export interface SubjectItem {
  id: number;
  classId: number;
  classNumber: number;
  slug: string;
  name: string;
  textbookTitle: string;
  description: string;
  chapterCount: number;
  readyChapterCount: number;
  readyTestCount: number;
  totalQuestionCount: number;
}

export interface ChapterItem {
  id: number;
  subjectId: number;
  chapterNumber: number;
  title: string;
  unitName: string | null;
  description: string | null;
  totalTestSets: number;
  readyTestSets: number;
  totalQuestions: number;
  completedTestSets: number;
  bestPercentage: number | null;
  availableLevels: DifficultyLevel[];
}

export interface TestSetItem {
  id: number;
  chapterId: number;
  title: string;
  difficultyLevel: DifficultyLevel;
  setNumber: number;
  timeLimitMinutes: number;
  totalMarks: number;
  questionCount: number;
  isReady: boolean;
  bestScore: number | null;
  attemptsCount: number;
}

export interface ExamQuestion {
  id: number;
  chapterId: number;
  chapterNumber?: number;
  chapterTitle?: string;
  difficultyLevel: DifficultyLevel;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  questionType: string;
}

export interface RetakeInfo {
  attemptNumber: number;
  retakeNumber: number;
  cycle: number;
  retakesRemainingInCycle: number;
}

export interface ExamPayload {
  mode: 'chapter' | 'mixed';
  testSetId: number | null;
  title: string;
  classNumber: number;
  subjectName: string;
  textbookTitle: string;
  chapterTitle: string;
  difficultyLevel: DifficultyLevel | 0;
  timeLimitMinutes: number;
  totalMarks: number;
  retakeInfo?: RetakeInfo;
  questions: ExamQuestion[];
}

export interface RevisionQuestion {
  id: number;
  chapterId: number;
  chapterTitle?: string;
  difficultyLevel: DifficultyLevel;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  questionType: string;
}

export interface RevisionPayload {
  mode?: 'chapter' | 'subject';
  supplementedCount?: number;
  chapter: {
    id: number;
    subjectId: number;
    chapterNumber: number;
    title: string;
    unitName: string | null;
    description: string | null;
    subjectName: string;
    textbookTitle: string;
    classNumber: number;
    className: string;
    totalQuestions: number;
  };
  availableCounts: number[];
  selectedCount: number;
  questions: RevisionQuestion[];
}

export interface ReviewItem {
  questionId: number;
  chapterTitle?: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null;
  correctOption: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string;
  difficultyLevel: DifficultyLevel;
}

export interface TestResultPayload {
  attemptId: number;
  score: number;
  totalMarks: number;
  percentage: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  timeTakenSeconds: number;
  classNumber: number;
  subjectId: number;
  subjectName: string;
  chapterId: number | null;
  chapterTitle: string;
  testSetId: number | null;
  testTitle: string;
  isMixed: boolean;
  difficultyLevel: number;
  createdAt: string;
  review: ReviewItem[];
}

export interface StudentAnalytics {
  profile: Profile;
  totalAttempts: number;
  averagePercentage: number;
  highestScorePercentage: number;
  highestRawScore: number;
  strongestSubject: { name: string; averagePercentage: number; attempts: number } | null;
  weakestSubject: { name: string; averagePercentage: number; attempts: number } | null;
  subjectBreakdown: Array<{
    subjectId: number;
    subjectName: string;
    classNumber: number;
    attempts: number;
    averagePercentage: number;
    highestPercentage: number;
  }>;
  chapterProgress: Array<{
    chapterId: number;
    chapterNumber: number;
    chapterTitle: string;
    subjectName: string;
    classNumber: number;
    completedSets: number;
    totalReadySets: number;
    bestPercentage: number;
  }>;
  recentAttempts: Array<{
    id: number;
    classNumber: number;
    subjectName: string;
    chapterTitle: string;
    testTitle: string;
    isMixed: boolean;
    difficultyLevel: number;
    score: number;
    totalMarks: number;
    percentage: number;
    timeTakenSeconds: number;
    createdAt: string;
  }>;
}

export interface LeaderboardEntry {
  rank: number;
  profileId: number;
  name: string;
  classNumber: number;
  testsCompleted: number;
  averagePercentage: number;
  highestScore: number;
  highestPercentage: number;
}

export interface AdminQuestionItem {
  id: number;
  chapterId: number;
  testSetId: number;
  testSetTitle: string;
  difficultyLevel: DifficultyLevel;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  questionType: string;
}

export interface ChapterNoteConcept {
  title: string;
  detail: string;
}

export interface ChapterNotePayload {
  chapter: {
    id: number;
    chapterNumber: number;
    title: string;
    unitName: string | null;
    description: string | null;
    subjectId: number;
    subjectSlug: string;
    subjectName: string;
    textbookTitle: string;
    classNumber: number;
  };
  note: {
    overview: string;
    keyConcepts: ChapterNoteConcept[];
    formulasAndFacts: string[];
    examTips: string[];
    commonMistakes: string[];
    updatedAt: string;
  };
  prevChapterId: number | null;
  nextChapterId: number | null;
}

export interface PyqQaItem {
  qNo: string;
  section: string;
  marks: number;
  question: string;
  solution: string;
  markingTip: string;
}

export interface PyqPaperItem {
  id: number;
  classNumber: number;
  subjectSlug: string;
  subjectName: string;
  examYear: string;
  paperCode: string;
  title: string;
  driveFolderUrl: string | null;
  questionDriveFileId: string | null;
  solutionDriveFileId: string | null;
  qaItems: PyqQaItem[];
}

export interface StudyPlanDay {
  dayRange: string;
  focusSubject: string;
  chaptersToCover: string[];
  dailyTasks: string[];
  welkinAction: string;
}

export interface StudyPlanResponse {
  planTitle: string;
  classNumber: number;
  daysLeft: number;
  examGoal: string;
  strategySummary: string;
  dailyRoutine: Array<{ timeSlot: string; activity: string }>;
  phaseBreakdown: Array<{ phaseName: string; duration: string; objective: string }>;
  schedule: StudyPlanDay[];
  examTips: string[];
}

export interface EnquiryContext {
  classNumber?: number;
  subjectName?: string;
  chapterTitle?: string;
  questionRef?: string;
  defaultIssueType?: string;
}

export interface EnquiryRecord {
  id: number;
  studentName: string;
  studentEmail: string | null;
  classNumber: number | null;
  subjectName: string | null;
  chapterTitle: string | null;
  questionRef: string | null;
  issueType: string;
  message: string;
  emailedTo: string;
  emailDelivered: number;
  status: string;
  createdAt: string;
}

