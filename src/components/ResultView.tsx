import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, XCircle, MinusCircle, RotateCcw, ListChecks, BookOpen, Home, Clock, Award, X } from 'lucide-react';
import { DIFFICULTY_META, DifficultyLevel, Profile, TestResultPayload } from '../types';

interface ResultViewProps {
  result: TestResultPayload;
  profile: Profile | null;
  onRetake: () => void;
  onTryAnotherTest: () => void;
  onReturnChapters: () => void;
  onGoHome: () => void;
  onOpenAuth: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  profile,
  onRetake,
  onTryAnotherTest,
  onReturnChapters,
  onGoHome,
  onOpenAuth,
}) => {
  const [showCelebration, setShowCelebration] = useState(result.percentage >= 75);
  const levelLabel =
    result.difficultyLevel >= 1 && result.difficultyLevel <= 5
      ? DIFFICULTY_META[result.difficultyLevel as DifficultyLevel].name
      : 'All Levels (Balanced)';

  const performanceGrade =
    result.percentage >= 90
      ? 'Outstanding Mastery'
      : result.percentage >= 75
        ? 'Strong Performance'
        : result.percentage >= 50
          ? 'Good Effort — Keep Practising'
          : 'Needs Revision';

  const getOptionText = (item: TestResultPayload['review'][number], key: 'A' | 'B' | 'C' | 'D') => {
    if (key === 'A') return item.optionA;
    if (key === 'B') return item.optionB;
    if (key === 'C') return item.optionC;
    return item.optionD;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
    >
      {/* Animated Score Achievement Popup */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#141D26]/45 p-4 backdrop-blur-xs"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-md rounded-2xl border border-[#C6DED1] bg-white p-6 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowCelebration(false)}
                aria-label="Close score popup"
                className="absolute top-3.5 right-3.5 rounded-lg p-1.5 text-[#5A6773] hover:bg-[#F4F1E8]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF5F0] text-[#2A6651]">
                <Award className="h-7 w-7" />
              </div>
              <h2 className="mt-3 text-xl font-bold text-[#1E2A36]">{performanceGrade}!</h2>
              <p className="mt-1 text-sm text-[#52606D]">
                You scored <span className="font-mono font-bold text-[#2A6651]">{result.score}/{result.totalMarks} ({result.percentage}%)</span> in {result.chapterTitle}.
              </p>
              <div className="mt-5 flex justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCelebration(false)}
                  className="rounded-lg bg-[#1E2A36] px-5 py-2 text-xs font-semibold text-white hover:bg-[#355978]"
                >
                  Review Detailed Solutions
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score Summary Card */}
      <div className="rounded-xl border border-[#DED8CA] bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EFECE4] pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6773]">
              <span>Class {result.classNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{result.subjectName}</span>
              <span aria-hidden="true">·</span>
              <span>{levelLabel}</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
              {result.chapterTitle}
            </h1>
            <p className="mt-1 text-sm text-[#52606D]">
              {result.testTitle} · {performanceGrade}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="font-mono text-4xl font-bold text-[#355978] tabular-nums">
              {result.score} / {result.totalMarks}
            </div>
            <div className="mt-1 font-mono text-sm font-semibold text-[#4D5A66] tabular-nums">
              {result.percentage}% Score
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-[#C6DED1] bg-[#ECF5F0] p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
              <CheckCircle2 className="h-4 w-4" />
              Correct
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#184435] tabular-nums">
              {result.correctCount}
            </div>
          </div>

          <div className="rounded-lg border border-[#E7CACA] bg-[#FCF2F2] p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9C3D3D]">
              <XCircle className="h-4 w-4" />
              Incorrect
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#6B2323] tabular-nums">
              {result.incorrectCount}
            </div>
          </div>

          <div className="rounded-lg border border-[#DED8CA] bg-[#F5F3EC] p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#52606D]">
              <MinusCircle className="h-4 w-4" />
              Unattempted
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#1E2A36] tabular-nums">
              {result.unattemptedCount}
            </div>
          </div>

          <div className="rounded-lg border border-[#C7D6E2] bg-[#EEF3F7] p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#355978]">
              <Clock className="h-4 w-4" />
              Time Taken
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#1F3A52] tabular-nums">
              {formatDuration(result.timeTakenSeconds)}
            </div>
          </div>
        </div>

        {!profile && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#C7D6E2] bg-[#EEF3F7] px-4 py-3 text-sm text-[#1F3A52]">
            <span>Sign in or create a free student account so your future test scores are saved permanently and ranked on your class leaderboard.</span>
            <button
              type="button"
              onClick={onOpenAuth}
              className="rounded-lg bg-[#355978] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#27445D] whitespace-nowrap"
            >
              Sign In / Register
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E2A36] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#355978] whitespace-nowrap"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Test
          </button>
          <button
            type="button"
            onClick={onTryAnotherTest}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D7D1C4] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E2A36] transition-colors hover:bg-[#F7F4EC] whitespace-nowrap"
          >
            <ListChecks className="h-4 w-4" />
            Try Another Test
          </button>
          <button
            type="button"
            onClick={onReturnChapters}
            className="inline-flex items-center gap-2 rounded-lg border border-[#D7D1C4] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E2A36] transition-colors hover:bg-[#F7F4EC] whitespace-nowrap"
          >
            <BookOpen className="h-4 w-4" />
            Return to Chapters
          </button>
          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#52606D] transition-colors hover:bg-[#F0EDE4] hover:text-[#1E2A36] whitespace-nowrap"
          >
            <Home className="h-4 w-4" />
            Go to Homepage
          </button>
        </div>
      </div>

      {/* Question-wise Answer Review */}
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1E2A36]">Question-Wise Answer Review</h2>
          <span className="text-sm text-[#5A6773]">{result.review.length} Questions Reviewed</span>
        </div>

        <div className="space-y-4">
          {result.review.map((item, idx) => {
            const status =
              item.selectedOption === null
                ? 'unattempted'
                : item.isCorrect
                  ? 'correct'
                  : 'incorrect';

            return (
              <article
                key={`${item.questionId}-${idx}`}
                className="rounded-xl border border-[#DED8CA] bg-white p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#5A6773]">
                    <span className="font-mono font-bold text-[#1E2A36]">Q{idx + 1}</span>
                    {item.chapterTitle && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{item.chapterTitle}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>Level {item.difficultyLevel}</span>
                  </div>

                  {status === 'correct' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A6651]">
                      <CheckCircle2 className="h-4 w-4" />
                      Correct (+1)
                    </span>
                  )}
                  {status === 'incorrect' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9C3D3D]">
                      <XCircle className="h-4 w-4" />
                      Incorrect (0)
                    </span>
                  )}
                  {status === 'unattempted' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64717D]">
                      <MinusCircle className="h-4 w-4" />
                      Unattempted (0)
                    </span>
                  )}
                </div>

                <p className="mt-4 whitespace-pre-line text-base font-medium text-[#1E2A36]">
                  {item.questionText}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                    const isCorrectOpt = item.correctOption === optKey;
                    const isStudentOpt = item.selectedOption === optKey;

                    let cardStyle = 'border-[#DED8CA] bg-[#FCFBF8] text-[#4D5A66]';
                    if (isCorrectOpt) {
                      cardStyle = 'border-[#8FC2AC] bg-[#ECF5F0] text-[#184435] font-medium';
                    } else if (isStudentOpt && !isCorrectOpt) {
                      cardStyle = 'border-[#E0B0B0] bg-[#FCF2F2] text-[#6B2323] font-medium';
                    }

                    return (
                      <div
                        key={optKey}
                        className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm ${cardStyle}`}
                      >
                        <span className="font-mono font-bold">{optKey}.</span>
                        <span className="flex-1">{getOptionText(item, optKey)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-lg border border-[#EAE5D9] bg-[#FAF8F3] px-4 py-3 text-sm text-[#334155]">
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-[#52606D]">
                    <span>
                      Your Answer:{' '}
                      <strong className="text-[#1E2A36]">
                        {item.selectedOption ? `Option ${item.selectedOption}` : 'Not Attempted'}
                      </strong>
                    </span>
                    <span>
                      Correct Answer:{' '}
                      <strong className="text-[#2A6651]">Option {item.correctOption}</strong>
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-[#24323F]">
                    <span className="font-semibold text-[#1E2A36]">Explanation: </span>
                    {item.explanation}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};
