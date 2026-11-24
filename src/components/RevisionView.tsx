import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Shuffle,
  X,
  XCircle,
} from 'lucide-react';
import { DIFFICULTY_META, DifficultyLevel, EnquiryContext, RevisionPayload } from '../types';

interface RevisionViewProps {
  revision: RevisionPayload;
  onChangeCount: (count: number, shuffle: boolean) => void;
  onExit: () => void;
  onReportError?: (ctx: EnquiryContext) => void;
  loading?: boolean;
}

export const RevisionView: React.FC<RevisionViewProps> = ({
  revision,
  onChangeCount,
  onExit,
  onReportError,
  loading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isShuffled, setIsShuffled] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  const questions = revision.questions;
  const currentQuestion = questions[currentIndex] ?? questions[0];
  const selectedOption = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isRevealed = Boolean(selectedOption);

  const answeredEntries = Object.entries(selectedAnswers);
  const answeredCount = answeredEntries.length;
  const correctCount = questions.filter((q) => selectedAnswers[q.id] === q.correctOption).length;
  const wrongCount = answeredCount - correctCount;
  const accuracyPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  useEffect(() => {
    if (questions.length > 0 && answeredCount === questions.length) {
      setShowCompletePopup(true);
    }
  }, [answeredCount, questions.length]);

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion || selectedAnswers[currentQuestion.id]) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt }));
  };

  const handleResetSession = (shuffleNext: boolean, nextCount = revision.selectedCount) => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsShuffled(shuffleNext);
    setShowCompletePopup(false);
    onChangeCount(nextCount, shuffleNext);
  };

  if (!currentQuestion) {
    return null;
  }

  const options: Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }> = [
    { key: 'A', text: currentQuestion.optionA },
    { key: 'B', text: currentQuestion.optionB },
    { key: 'C', text: currentQuestion.optionC },
    { key: 'D', text: currentQuestion.optionD },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6"
    >
      {/* Completion Milestone Popup */}
      <AnimatePresence>
        {showCompletePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#141D26]/45 p-4 backdrop-blur-xs"
            onClick={() => setShowCompletePopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-[#C6DED1] bg-white p-6 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowCompletePopup(false)}
                aria-label="Close revision popup"
                className="absolute top-3.5 right-3.5 rounded-lg p-1.5 text-[#5A6773] hover:bg-[#F4F1E8]"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECF5F0] text-[#2A6651]">
                <Award className="h-7 w-7" />
              </div>
              <h2 className="mt-3 text-xl font-bold text-[#1E2A36]">
                {questions.length}-Question Revision Complete!
              </h2>
              <p className="mt-1.5 text-sm text-[#52606D]">
                You solved <span className="font-mono font-bold text-[#2A6651]">{correctCount}/{questions.length}</span> correctly ({accuracyPct}% accuracy).
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleResetSession(true, revision.selectedCount)}
                  className="rounded-lg bg-[#1E2A36] px-4 py-2 text-xs font-semibold text-white hover:bg-[#355978]"
                >
                  Shuffle &amp; Practise Again
                </button>
                <button
                  type="button"
                  onClick={() => setShowCompletePopup(false)}
                  className="rounded-lg border border-[#D7D1C4] bg-white px-4 py-2 text-xs font-semibold text-[#334155] hover:bg-[#F7F4EC]"
                >
                  Review Questions
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Return & Chapter Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4D5A66] hover:text-[#1E2A36]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-[#DED8CA] bg-[#F0EDE4] p-1">
            {revision.availableCounts.map((countOpt) => (
              <button
                key={countOpt}
                type="button"
                disabled={loading}
                onClick={() => handleResetSession(isShuffled, countOpt)}
                className={`rounded-md px-3 py-1.5 font-mono text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
                  revision.selectedCount === countOpt
                    ? 'bg-white text-[#1E2A36] shadow-xs'
                    : 'text-[#52606D] hover:text-[#1E2A36]'
                }`}
              >
                {countOpt} Qs
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleResetSession(!isShuffled, revision.selectedCount)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition-colors hover:bg-[#F7F4EC] whitespace-nowrap"
          >
            <Shuffle className="h-3.5 w-3.5 text-[#355978]" />
            {isShuffled ? 'Ordered' : 'Shuffle'}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setSelectedAnswers({});
              setCurrentIndex(0);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition-colors hover:bg-[#F7F4EC] whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#8A6843]" />
            Restart
          </button>
        </div>
      </div>

      {/* Chapter Title Banner */}
      <div className="mt-4 rounded-xl border border-[#DED8CA] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6773]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#2A6651]">
                <BookOpenCheck className="h-3.5 w-3.5" />
                {revision.mode === 'subject' ? 'Subject Marathon Revision' : 'Instant Revision Mode'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Class {revision.chapter.classNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{revision.chapter.subjectName}</span>
              {revision.chapter.chapterNumber > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Chapter {revision.chapter.chapterNumber}</span>
                </>
              )}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
              {revision.chapter.title}
            </h1>
            <p className="mt-1 text-sm text-[#52606D]">
              Click any option to reveal the right and wrong answers immediately along with the full NCERT solution below.
              {revision.supplementedCount ? ` Includes ${revision.supplementedCount} bonus questions from other chapters of ${revision.chapter.subjectName}.` : ''}
            </p>
          </div>

          <div className="flex items-center gap-5 border-t border-[#ECE7DC] pt-3 sm:border-t-0 sm:pt-0 tabular-nums">
            <div className="text-right">
              <div className="text-xs text-[#64717D]">Reviewed</div>
              <div className="font-mono text-lg font-bold text-[#1E2A36]">
                {answeredCount}/{questions.length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#2A6651]">Correct</div>
              <div className="font-mono text-lg font-bold text-[#2A6651]">{correctCount}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#9C3D3D]">Wrong</div>
              <div className="font-mono text-lg font-bold text-[#9C3D3D]">{wrongCount}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#355978]">Accuracy</div>
              <div className="font-mono text-lg font-bold text-[#355978]">{accuracyPct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Revision Stage */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Question + Instant Reveal + Bottom Solution */}
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-[#DED8CA] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-4 text-xs text-[#5A6773]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold text-[#1E2A36] tabular-nums">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>{DIFFICULTY_META[currentQuestion.difficultyLevel as DifficultyLevel]?.name}</span>
                {currentQuestion.chapterTitle && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[#355978]">{currentQuestion.chapterTitle}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="capitalize text-[#7A6B57]">{currentQuestion.questionType}</span>
                {onReportError && (
                  <button
                    type="button"
                    onClick={() =>
                      onReportError({
                        classNumber: revision.chapter.classNumber,
                        subjectName: revision.chapter.subjectName,
                        chapterTitle: currentQuestion.chapterTitle || revision.chapter.title,
                        questionRef: `Revision Q${currentIndex + 1} (#${currentQuestion.id}): ${currentQuestion.questionText.slice(0, 140)}`,
                        defaultIssueType: 'Question / Answer Error',
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-md border border-[#E5DFD2] bg-[#FAF8F3] px-2 py-1 text-xs font-semibold text-[#8A4A35] hover:bg-[#F3ECE4]"
                  >
                    <Flag className="h-3 w-3" />
                    Report Error
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 whitespace-pre-line text-lg leading-relaxed font-medium text-[#1E2A36]">
              {currentQuestion.questionText}
            </div>

            {/* Answer Choices with Immediate Reveal */}
            <div className="mt-6 space-y-3" role="radiogroup" aria-label="Revision answer choices">
              {options.map((opt) => {
                const isCorrectOpt = opt.key === currentQuestion.correctOption;
                const isSelected = selectedOption === opt.key;

                let cardStyle =
                  'border-[#DED8CA] bg-[#FCFBF8] text-[#1E2A36] hover:border-[#355978] hover:bg-[#F3F6F9]';
                let badgeStyle = 'border border-[#D5CFC2] bg-white text-[#4D5A66]';

                if (isRevealed) {
                  if (isCorrectOpt) {
                    cardStyle = 'border-[#7EB39D] bg-[#ECF5F0] text-[#163D30]';
                    badgeStyle = 'bg-[#2A6651] text-white border border-[#2A6651]';
                  } else if (isSelected && !isCorrectOpt) {
                    cardStyle = 'border-[#DAA7A7] bg-[#FCF2F2] text-[#6B2323]';
                    badgeStyle = 'bg-[#9C3D3D] text-white border border-[#9C3D3D]';
                  } else {
                    cardStyle = 'border-[#EAE6DC] bg-[#FAF9F5] text-[#6A7580] opacity-80';
                    badgeStyle = 'border border-[#DED8CA] bg-white text-[#7C8690]';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-left transition-colors ${cardStyle} ${
                      isRevealed ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <span
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold ${badgeStyle}`}
                      >
                        {opt.key}
                      </span>
                      <span className="pt-0.5 text-base leading-snug">{opt.text}</span>
                    </div>

                    {isRevealed && isCorrectOpt && (
                      <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-xs font-bold text-[#2A6651] whitespace-nowrap">
                        <CheckCircle2 className="h-4 w-4" />
                        Right Answer
                      </span>
                    )}
                    {isRevealed && isSelected && !isCorrectOpt && (
                      <span className="inline-flex shrink-0 items-center gap-1 pt-1 text-xs font-bold text-[#9C3D3D] whitespace-nowrap">
                        <XCircle className="h-4 w-4" />
                        Wrong Answer
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Solution Revealed at Bottom of Card */}
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 rounded-xl border p-5 ${
                  selectedOption === currentQuestion.correctOption
                    ? 'border-[#B9D8CA] bg-[#F2F8F5]'
                    : 'border-[#E6C7C7] bg-[#FDF6F6]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    {selectedOption === currentQuestion.correctOption ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-[#2A6651]" />
                        <span className="text-[#184435]">Correct! Well Done.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-[#9C3D3D]" />
                        <span className="text-[#6B2323]">
                          Incorrect — You chose Option {selectedOption}
                        </span>
                      </>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2A6651]">
                    Correct Option: {currentQuestion.correctOption}
                  </span>
                </div>

                <div className="mt-3 text-sm leading-relaxed text-[#24323F]">
                  <span className="font-semibold text-[#1E2A36]">Solution: </span>
                  {currentQuestion.explanation}
                </div>
              </motion.div>
            )}

            {/* Question Navigation Footer */}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#EFECE4] pt-5">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D7D1C4] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] transition-colors hover:bg-[#F7F4EC] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <button
                type="button"
                disabled={currentIndex >= questions.length - 1}
                onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E2A36] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#355978] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
              >
                Next Question
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Revision Question Navigator */}
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-[#DED8CA] bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#1E2A36]">Revision Navigator</h2>
              <span className="font-mono text-xs text-[#64717D] tabular-nums">
                {questions.length} MCQs
              </span>
            </div>

            <div className="mt-4 grid max-h-[340px] grid-cols-5 gap-2 overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const chosen = selectedAnswers[q.id];
                const isRight = chosen && chosen === q.correctOption;
                const isWrong = chosen && chosen !== q.correctOption;
                const isCurrent = idx === currentIndex;

                let btnStyle = 'border border-[#DED8CA] bg-[#FCFBF8] text-[#4D5A66] hover:bg-[#F0EDE4]';
                if (isRight) {
                  btnStyle = 'border border-[#8FC2AC] bg-[#ECF5F0] text-[#1D523F]';
                } else if (isWrong) {
                  btnStyle = 'border border-[#E0B0B0] bg-[#FCF2F2] text-[#7F2929]';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg font-mono text-xs font-semibold tabular-nums transition-colors ${btnStyle} ${
                      isCurrent ? 'ring-2 ring-[#1E2A36] ring-offset-1' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#EFECE4] pt-4 text-xs text-[#5A6773]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs border border-[#8FC2AC] bg-[#ECF5F0]" />
                Right
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs border border-[#E0B0B0] bg-[#FCF2F2]" />
                Wrong
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs border border-[#DED8CA] bg-[#FCFBF8]" />
                Unattempted
              </span>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
};
