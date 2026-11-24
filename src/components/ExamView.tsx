import React, { useEffect, useRef, useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, Send, AlertTriangle, CheckCircle2, Flag } from 'lucide-react';
import { DIFFICULTY_META, DifficultyLevel, EnquiryContext, ExamPayload, TestResultPayload } from '../types';
import { apiRequest } from '../lib/api';

interface ExamViewProps {
  exam: ExamPayload;
  subjectId: number;
  onComplete: (result: TestResultPayload) => void;
  onExit: () => void;
  onReportError?: (ctx: EnquiryContext) => void;
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const ExamView: React.FC<ExamViewProps> = ({ exam, subjectId, onComplete, onExit, onReportError }) => {
  const totalSeconds = exam.timeLimitMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submittedRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const secondsLeftRef = useRef(secondsLeft);
  secondsLeftRef.current = secondsLeft;

  const submitExam = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setShowConfirmModal(false);
    setError(null);

    const timeTakenSeconds = Math.max(1, totalSeconds - secondsLeftRef.current);
    const stringAnswers: Record<string, string> = {};
    for (const [k, v] of Object.entries(answersRef.current)) {
      stringAnswers[String(k)] = v;
    }

    try {
      const result = await apiRequest<TestResultPayload>('/api/tests/submit', {
        method: 'POST',
        body: JSON.stringify({
          mode: exam.mode,
          testSetId: exam.testSetId,
          subjectId,
          difficultyLevel: exam.difficultyLevel,
          timeTakenSeconds,
          questionIds: exam.questions.map((q) => q.id),
          answers: stringAnswers,
        }),
      });
      onComplete(result);
    } catch (err: any) {
      submittedRef.current = false;
      setSubmitting(false);
      setError(err.message || 'Failed to submit test. Please try again.');
    }
  };

  // Countdown timer with guaranteed auto-submit at 00:00
  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          void submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = exam.questions[currentIndex];
  const attemptedCount = Object.keys(answers).length;
  const remainingCount = exam.questions.length - attemptedCount;
  const isLowTime = secondsLeft <= 120;

  const selectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt }));
  };

  const clearCurrentSelection = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const levelLabel =
    exam.difficultyLevel >= 1 && exam.difficultyLevel <= 5
      ? DIFFICULTY_META[exam.difficultyLevel as DifficultyLevel].name
      : 'All Levels (Balanced)';

  const options: Array<{ key: 'A' | 'B' | 'C' | 'D'; text: string }> = [
    { key: 'A', text: currentQuestion.optionA },
    { key: 'B', text: currentQuestion.optionB },
    { key: 'C', text: currentQuestion.optionC },
    { key: 'D', text: currentQuestion.optionD },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0]">
      {/* Focused Exam Header */}
      <div className="sticky top-0 z-30 border-b border-[#2C3B4B] bg-[#1E2A36] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#C7D2DC]">
              <span>Class {exam.classNumber}</span>
              <span aria-hidden="true">·</span>
              <span>{exam.subjectName}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{levelLabel}</span>
              {exam.retakeInfo && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#D6C7AE]">
                    {exam.retakeInfo.retakeNumber === 0
                      ? 'Attempt 1'
                      : exam.retakeInfo.retakesRemainingInCycle > 0
                        ? `Retake ${exam.retakeInfo.retakeNumber % 6} of 5 (Same Questions)`
                        : 'Fresh Question Cycle'}
                  </span>
                </>
              )}
            </div>
            <h1 className="truncate text-base font-bold sm:text-lg">
              {exam.chapterTitle} — {exam.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div
              className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-base font-semibold tabular-nums ${
                isLowTime
                  ? 'border-[#D99B9B]/60 bg-[#4A2024] text-[#FADADA]'
                  : 'border-[#334659] bg-[#263544] text-white'
              }`}
              aria-live="polite"
            >
              <Clock className="h-4 w-4 shrink-0" />
              <span>{formatClock(secondsLeft)}</span>
              {isLowTime && <span className="hidden text-xs font-sans font-medium sm:inline">Low Time</span>}
            </div>

            <button
              type="button"
              onClick={() => setShowExitModal(true)}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white whitespace-nowrap"
            >
              Exit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Main Examination Workspace */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12">
        {/* Left: Question Stage */}
        <div className="lg:col-span-8">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="rounded-xl border border-[#DED8CA] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-4">
              <div className="flex items-center gap-2 text-sm text-[#52606D]">
                <span className="font-display font-bold text-[#1E2A36] tabular-nums">
                  Question {currentIndex + 1} of {exam.questions.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>1 Mark</span>
                <span aria-hidden="true">·</span>
                <span>No Negative Marking</span>
              </div>
              <div className="flex items-center gap-3">
                {currentQuestion.chapterTitle && (
                  <span className="text-xs font-medium text-[#64717D]">
                    Ch {currentQuestion.chapterNumber}: {currentQuestion.chapterTitle}
                  </span>
                )}
                {onReportError && (
                  <button
                    type="button"
                    onClick={() =>
                      onReportError({
                        classNumber: exam.classNumber,
                        subjectName: exam.subjectName,
                        chapterTitle: currentQuestion.chapterTitle || exam.chapterTitle,
                        questionRef: `Q${currentIndex + 1} (#${currentQuestion.id}): ${currentQuestion.questionText.slice(0, 140)}`,
                        defaultIssueType: 'Question / Answer Error',
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-md border border-[#E5DFD2] bg-[#FAF8F3] px-2.5 py-1 text-xs font-semibold text-[#8A4A35] hover:bg-[#F3ECE4]"
                  >
                    <Flag className="h-3 w-3" />
                    Report Error
                  </button>
                )}
              </div>
            </div>

            {/* Question Stem */}
            <div className="mt-6 whitespace-pre-line text-lg leading-relaxed font-medium text-[#1E2A36]">
              {currentQuestion.questionText}
            </div>

            {/* Clickable Answer Options */}
            <div className="mt-6 space-y-3" role="radiogroup" aria-label="Answer choices">
              {options.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => selectOption(opt.key)}
                    className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-[#355978] bg-[#EEF3F7] text-[#1E2A36]'
                        : 'border-[#DED8CA] bg-[#FCFBF8] text-[#1E2A36] hover:border-[#B6C4D1] hover:bg-[#F5F7F9]'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-sm font-semibold ${
                        isSelected
                          ? 'bg-[#355978] text-white'
                          : 'border border-[#D5CFC2] bg-white text-[#4D5A66]'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="pt-0.5 text-base leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#EFECE4] pt-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D7D1C4] bg-white px-4 py-2.5 text-sm font-semibold text-[#334155] transition-colors hover:bg-[#F7F4EC] disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Question
                </button>
                {answers[currentQuestion.id] && (
                  <button
                    type="button"
                    onClick={clearCurrentSelection}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#5A6773] transition-colors hover:bg-[#F0EDE4] hover:text-[#1E2A36] whitespace-nowrap"
                  >
                    Clear Answer
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentIndex < exam.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((i) => Math.min(exam.questions.length - 1, i + 1))}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E2A36] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#355978] whitespace-nowrap"
                  >
                    Next Question
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => setShowConfirmModal(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#2A6651] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#225241] disabled:opacity-60 whitespace-nowrap"
                  >
                    <Send className="h-4 w-4" />
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Status & Question Palette */}
        <aside className="lg:col-span-4">
          <div className="rounded-xl border border-[#DED8CA] bg-white p-6">
            <h2 className="text-sm font-bold text-[#1E2A36]">Exam Progress</h2>

            <div className="mt-4 grid grid-cols-3 gap-3 border-b border-[#EFECE4] pb-5 text-center">
              <div>
                <div className="font-mono text-2xl font-bold text-[#355978] tabular-nums">{attemptedCount}</div>
                <div className="mt-0.5 text-xs text-[#64717D]">Attempted</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-[#1E2A36] tabular-nums">{remainingCount}</div>
                <div className="mt-0.5 text-xs text-[#64717D]">Remaining</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-[#4D5A66] tabular-nums">{exam.totalMarks}</div>
                <div className="mt-0.5 text-xs text-[#64717D]">Total Marks</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-[#64717D]">
                <span className="font-semibold text-[#334155]">Question Palette</span>
                <span>Answers locked on submit</span>
              </div>

              <div className="mt-3 grid max-h-[300px] grid-cols-5 gap-2 overflow-y-auto pr-1">
                {exam.questions.map((q, idx) => {
                  const isAnswered = Boolean(answers[q.id]);
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg font-mono text-xs font-semibold tabular-nums transition-colors ${
                        isCurrent
                          ? 'bg-[#1E2A36] text-white ring-2 ring-[#355978] ring-offset-1'
                          : isAnswered
                            ? 'border border-[#B7CBD9] bg-[#EEF3F7] text-[#28455E] hover:bg-[#E1EAF2]'
                            : 'border border-[#DED8CA] bg-[#FCFBF8] text-[#52606D] hover:bg-[#F0EDE4]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-[#64717D]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs border border-[#B7CBD9] bg-[#EEF3F7]" />
                  Answered
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs border border-[#DED8CA] bg-[#FCFBF8]" />
                  Not Answered
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-[#1E2A36]" />
                  Current
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={() => setShowConfirmModal(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#355978] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A4760] disabled:opacity-60"
            >
              <CheckCircle2 className="h-4 w-4" />
              {submitting ? 'Grading Test...' : 'Submit Test'}
            </button>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal Before Manual Submission */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Submit Test for Grading?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Once submitted, you cannot change your answers. Your score and detailed explanations will be displayed immediately.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-4 text-sm">
              <div>
                <span className="text-slate-500">Attempted:</span>{' '}
                <strong className="font-mono text-slate-900 tabular-nums">{attemptedCount}</strong>
              </div>
              <div>
                <span className="text-slate-500">Unattempted:</span>{' '}
                <strong className="font-mono text-slate-900 tabular-nums">{remainingCount}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Time Remaining:</span>{' '}
                <strong className="font-mono text-slate-900 tabular-nums">{formatClock(secondsLeft)}</strong>
              </div>
            </div>

            {remainingCount > 0 && (
              <div className="mt-3 flex items-start gap-2 text-xs text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  You have {remainingCount} unanswered {remainingCount === 1 ? 'question' : 'questions'}. Since there is no negative marking, consider reviewing them before submitting.
                </span>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Continue Test
              </button>
              <button
                type="button"
                onClick={() => void submitExam()}
                className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Exam Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Leave This Test?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Your current answers will not be saved if you exit without submitting.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Stay in Exam
              </button>
              <button
                type="button"
                onClick={onExit}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Exit Without Saving
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
