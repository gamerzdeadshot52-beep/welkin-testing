import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Printer,
  RefreshCw,
  Sparkles,
  Target,
} from 'lucide-react';
import { apiRequest } from '../lib/api';
import { StudyPlanResponse, SubjectItem } from '../types';

interface StudyPlannerViewProps {
  initialClassNumber?: number;
  onBack: () => void;
  onOpenNotes: (classNumber: number) => void;
  onOpenRevision?: () => void;
  onOpenPyqs: () => void;
}

const GOAL_PRESETS = [
  'Score 95%+ in Final / Board Exams',
  'Score 90%+ Distinction with Strong Concepts',
  'Complete Full Syllabus & Revision Rapidly',
  'Strengthen Weak Subjects & Clear All Basics',
];

const PLAN_STORAGE_KEY = 'welkin_saved_study_plan_v1';

interface SavedPlanState {
  plan: StudyPlanResponse;
  completedBlocks: Record<number, boolean>;
  savedAt: string;
}

function loadSavedPlan(): SavedPlanState | null {
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPlanState;
    if (parsed && parsed.plan && Array.isArray(parsed.plan.schedule)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  initialClassNumber = 10,
  onBack,
  onOpenNotes,
  onOpenRevision,
  onOpenPyqs,
}) => {
  const [savedInitial] = useState<SavedPlanState | null>(() => loadSavedPlan());
  const [classNumber, setClassNumber] = useState(
    savedInitial?.plan?.classNumber ?? initialClassNumber
  );
  const [daysLeft, setDaysLeft] = useState(savedInitial?.plan?.daysLeft ?? 30);
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState(4);
  const [examGoal, setExamGoal] = useState(savedInitial?.plan?.examGoal ?? GOAL_PRESETS[0]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<StudyPlanResponse | null>(savedInitial?.plan ?? null);
  const [completedBlocks, setCompletedBlocks] = useState<Record<number, boolean>>(
    savedInitial?.completedBlocks ?? {}
  );

  useEffect(() => {
    apiRequest<{ subjects: SubjectItem[] }>(`/api/classes/${classNumber}/subjects`)
      .then((res) => {
        setSubjects(res.subjects);
        setWeakSubjects([]);
      })
      .catch(() => setSubjects([]));
  }, [classNumber]);

  useEffect(() => {
    if (!generating) return;
    const start = Date.now();
    setElapsedMs(0);
    const timer = window.setInterval(() => {
      setElapsedMs(Date.now() - start);
    }, 100);
    return () => window.clearInterval(timer);
  }, [generating]);

  useEffect(() => {
    if (!plan) return;
    try {
      const payload: SavedPlanState = {
        plan,
        completedBlocks,
        savedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage quota errors
    }
  }, [plan, completedBlocks]);

  const handleExamDateChange = (dateStr: string) => {
    setExamDate(dateStr);
    if (!dateStr) return;
    const target = new Date(`${dateStr}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (Number.isFinite(diffDays) && diffDays >= 1) {
      setDaysLeft(Math.min(365, diffDays));
    }
  };

  const toggleWeakSubject = (name: string) => {
    setWeakSubjects((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const requestPlan = async (forceRefresh = false) => {
    setError('');
    setGenerating(true);
    setCompletedBlocks({});
    try {
      const res = await apiRequest<StudyPlanResponse>('/api/study-planner', {
        method: 'POST',
        body: JSON.stringify({
          classNumber,
          daysLeft,
          dailyHours,
          examGoal,
          weakSubjects,
          forceRefresh,
        }),
      });
      setPlan(res);
    } catch (err: any) {
      setError(err.message || 'Could not generate your AI study plan right now.');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await requestPlan(false);
  };

  const totalBlocks = plan?.schedule?.length ?? 0;
  const doneBlocks = plan
    ? (plan.schedule || []).filter((_, idx) => Boolean(completedBlocks[idx])).length
    : 0;

  const progressStage =
    elapsedMs < 1100
      ? `Loading Class ${classNumber} NCERT syllabus...`
      : elapsedMs < 2400
      ? 'Prioritizing weak subjects & daily slots...'
      : 'Finalizing chapter roadmap & revision blocks...';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4D5A66] hover:text-[#1E2A36]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        {plan && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={generating}
              onClick={() => void requestPlan(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2A36] hover:bg-[#F7F4EC] disabled:opacity-60"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#2A6651] ${generating ? 'animate-spin' : ''}`} />
              Regenerate Fresh Plan
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2A36] hover:bg-[#F7F4EC]"
            >
              <Printer className="h-3.5 w-3.5 text-[#355978]" />
              Print / Save PDF
            </button>
          </div>
        )}
      </div>

      {/* Header & Controls */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-xl border border-[#DED8CA] bg-white p-6 sm:p-8"
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#355978]">
          <Sparkles className="h-4 w-4 text-[#2A6651]" />
          Fast AI Study Planner · THE WELKIN CLASSES
        </div>
        <h1 className="mt-1.5 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
          Build Your Custom Exam Roadmap
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-[#52606D]">
          Enter your class, days left (or pick your exam date), and your target score. Your personalized NCERT schedule maps straight to Chapter Notes, 20–100 Q Revision, and Class 10 PYQs—and stays saved on your device.
        </p>

        <form
          onSubmit={handleGenerate}
          className="mt-6 grid grid-cols-1 gap-5 border-t border-[#EFECE4] pt-6 md:grid-cols-12 print:hidden"
        >
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-[#334155]">Select Class</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[6, 7, 8, 9, 10].map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setClassNumber(cls)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                    classNumber === cls
                      ? 'bg-[#1E2A36] text-white'
                      : 'border border-[#D7D1C4] bg-[#FCFBF8] text-[#4D5A66] hover:bg-[#F0EDE4]'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-xs font-bold text-[#334155]">
                Days Left for Exam: <span className="font-mono text-[#355978]">{daysLeft} Days</span>
              </label>
              <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#52606D]">
                <span>Exam Date:</span>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => handleExamDateChange(e.target.value)}
                  className="rounded border border-[#D7D1C4] bg-[#FCFBF8] px-1.5 py-0.5 text-[11px] text-[#1E2A36]"
                />
              </label>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={180}
                value={Math.min(180, daysLeft)}
                onChange={(e) => {
                  setExamDate('');
                  setDaysLeft(Number(e.target.value));
                }}
                className="w-full accent-[#1E2A36]"
              />
              <input
                type="number"
                min={1}
                max={365}
                value={daysLeft}
                onChange={(e) => {
                  setExamDate('');
                  setDaysLeft(Math.max(1, Math.min(365, Number(e.target.value) || 1)));
                }}
                className="w-20 rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-2.5 py-1.5 font-mono text-sm font-semibold text-[#1E2A36]"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-[#334155]">
              Daily Study Hours: <span className="font-mono text-[#2A6651]">{dailyHours} hrs/day</span>
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={12}
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-[#2A6651]"
              />
              <span className="w-12 font-mono text-sm font-semibold text-[#1E2A36]">{dailyHours}h</span>
            </div>
          </div>

          <div className="md:col-span-12">
            <label className="block text-xs font-bold text-[#334155]">Your Exam Goal</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {GOAL_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setExamGoal(preset)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    examGoal === preset
                      ? 'bg-[#355978] text-white'
                      : 'border border-[#D7D1C4] bg-[#FAF8F3] text-[#4D5A66] hover:bg-[#EFECE4]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="text"
              required
              value={examGoal}
              onChange={(e) => setExamGoal(e.target.value)}
              placeholder="Or type your custom goal (e.g., Score 98/100 in Class 10 Maths & Science)"
              className="mt-2.5 w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-3.5 py-2.5 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
            />
          </div>

          {subjects.length > 0 && (
            <div className="md:col-span-12">
              <label className="block text-xs font-bold text-[#334155]">
                Priority / Weak Subjects (Optional — AI allocates extra early revision blocks)
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {subjects.map((s) => {
                  const selected = weakSubjects.includes(s.name);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleWeakSubject(s.name)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        selected
                          ? 'border-[#8A4A35] bg-[#FDF2EC] text-[#8A4A35]'
                          : 'border-[#DED8CA] bg-white text-[#4D5A66] hover:bg-[#FAF8F3]'
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-12">
            {error ? (
              <div className="flex items-center gap-2 rounded-lg border border-[#E5BABA] bg-[#FDF4F4] px-3.5 py-2 text-xs text-[#7F2929]">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            ) : generating ? (
              <div className="flex items-center gap-2.5 rounded-lg border border-[#C7D4E2] bg-[#F3F7FB] px-3.5 py-2 text-xs font-medium text-[#24435C]">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#2A6651]" />
                <span>{progressStage}</span>
                <span className="font-mono font-bold text-[#355978]">
                  {(elapsedMs / 1000).toFixed(1)}s
                </span>
              </div>
            ) : (
              <div className="text-xs text-[#64717D]">
                Uses live Class {classNumber} NCERT chapters on THE WELKIN CLASSES (fast mode).
              </div>
            )}

            <button
              type="submit"
              disabled={generating}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1E2A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#355978] disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4 text-[#D6C7AE]" />
              {generating ? 'Generating Fast Plan...' : 'Generate AI Study Plan'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Generated Study Plan */}
      {plan && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Strategy Summary */}
          <div className="rounded-xl border border-[#C8DDD2] bg-[#F2F8F5] p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold tracking-wide text-[#2A6651] uppercase">
                  <span>
                    Class {plan.classNumber} · {plan.daysLeft} Days Roadmap
                  </span>
                  {totalBlocks > 0 && (
                    <span className="rounded-md border border-[#A9CDBB] bg-white px-2 py-0.5 font-mono text-[11px] text-[#163D30]">
                      Progress: {doneBlocks}/{totalBlocks} Blocks Done
                    </span>
                  )}
                </div>
                <h2 className="mt-1 text-xl font-bold text-[#163D30] sm:text-2xl">
                  {plan.planTitle}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#244E3F]">
                  {plan.strategySummary}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 print:hidden">
                <button
                  type="button"
                  onClick={() => onOpenNotes(plan.classNumber)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#A9CDBB] bg-white px-3.5 py-2 text-xs font-semibold text-[#163D30] hover:bg-[#ECF5F0]"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Class {plan.classNumber} Notes
                </button>
                {onOpenRevision && (
                  <button
                    type="button"
                    onClick={onOpenRevision}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#A9CDBB] bg-white px-3.5 py-2 text-xs font-semibold text-[#163D30] hover:bg-[#ECF5F0]"
                  >
                    <BookOpenCheck className="h-3.5 w-3.5" />
                    20–100 Q Revision
                  </button>
                )}
                {plan.classNumber === 10 && (
                  <button
                    type="button"
                    onClick={onOpenPyqs}
                    className="rounded-lg bg-[#2A6651] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#225442]"
                  >
                    Open Class 10 PYQs
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Daily Routine & Phases */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-[#DED8CA] bg-white p-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-[#1E2A36]">
                <Clock className="h-4 w-4 text-[#355978]" />
                Recommended Daily Study Routine
              </h3>
              <div className="mt-4 space-y-2.5">
                {(plan.dailyRoutine || []).map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 rounded-lg border border-[#ECE7DC] bg-[#FCFBF8] px-3.5 py-2.5 text-sm"
                  >
                    <span className="whitespace-nowrap font-mono text-xs font-bold text-[#355978]">
                      {slot.timeSlot}
                    </span>
                    <span className="text-right text-xs text-[#24323F] sm:text-sm">
                      {slot.activity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#DED8CA] bg-white p-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-[#1E2A36]">
                <Target className="h-4 w-4 text-[#8A4A35]" />
                Preparation Phases
              </h3>
              <div className="mt-4 space-y-3">
                {(plan.phaseBreakdown || []).map((ph, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[#ECE7DC] bg-[#FCFBF8] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#1E2A36]">{ph.phaseName}</span>
                      <span className="font-mono text-xs font-semibold text-[#8A4A35]">
                        {ph.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-[#52606D]">{ph.objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Day-by-Day Schedule */}
          <div className="rounded-xl border border-[#DED8CA] bg-white p-6">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#1E2A36]">
              <CalendarDays className="h-4 w-4 text-[#2A6651]" />
              Chronological Study Schedule (Check off completed blocks)
            </h3>
            <div className="mt-4 space-y-3">
              {(plan.schedule || []).map((block, idx) => {
                const done = Boolean(completedBlocks[idx]);
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition-colors ${
                      done
                        ? 'border-[#B9D8CA] bg-[#F2F8F5]'
                        : 'border-[#E6E0D3] bg-[#FCFBF8]'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setCompletedBlocks((prev) => ({ ...prev, [idx]: !prev[idx] }))
                          }
                          aria-label={`Mark ${block.dayRange} completed`}
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            done
                              ? 'border-[#2A6651] bg-[#2A6651] text-white'
                              : 'border-[#BFC7CF] bg-white text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </button>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#355978]">
                              {block.dayRange}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="text-sm font-bold text-[#1E2A36]">
                              {block.focusSubject}
                            </span>
                          </div>
                          {block.chaptersToCover?.length > 0 && (
                            <div className="mt-1 text-xs font-medium text-[#52606D]">
                              Chapters: {block.chaptersToCover.join(' · ')}
                            </div>
                          )}
                          <ul className="mt-2 space-y-1 text-xs text-[#334155]">
                            {(block.dailyTasks || []).map((task, tIdx) => (
                              <li key={tIdx}>• {task}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-lg border border-[#D8E2EA] bg-white px-3 py-2 text-xs text-[#355978]">
                        <span className="font-bold">Action: </span>
                        {block.welkinAction}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Tips */}
          {plan.examTips?.length > 0 && (
            <div className="rounded-xl border border-[#DED8CA] bg-white p-6">
              <h3 className="text-sm font-bold text-[#1E2A36]">Final Exam Strategy Tips</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2.5 text-xs leading-relaxed text-[#334155] sm:grid-cols-2">
                {plan.examTips.map((tip, i) => (
                  <li key={i} className="rounded-lg border border-[#ECE7DC] bg-[#FAF8F3] p-3">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
