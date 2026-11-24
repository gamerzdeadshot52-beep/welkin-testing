import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react';
import { apiRequest, setAuthToken } from './lib/api';
import {
  ChapterItem,
  ClassItem,
  DIFFICULTY_META,
  DifficultyLevel,
  EnquiryContext,
  ExamPayload,
  Profile,
  RevisionPayload,
  SubjectItem,
  TestResultPayload,
  TestSetItem,
} from './types';
import { AuthModal } from './components/AuthModal';
import { ExamView } from './components/ExamView';
import { ResultView } from './components/ResultView';
import { ProfileView } from './components/ProfileView';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminView } from './components/AdminView';
import { RevisionView } from './components/RevisionView';
import { EnquiryModal } from './components/EnquiryModal';
import { PyqStudioView } from './components/PyqStudioView';
import { NotesLibraryView } from './components/NotesLibraryView';
import { StudyPlannerView } from './components/StudyPlannerView';
import {
  ClassGeometricEmblem,
  HeroGeometricBackdrop,
  SectionFlourishDivider,
} from './components/DecorativeMotifs';

type ViewState =
  | { name: 'home' }
  | { name: 'subjects'; classNumber: number }
  | { name: 'chapters'; classNumber: number; subjectId: number }
  | { name: 'chapter-tests'; classNumber: number; subjectId: number; chapterId: number }
  | { name: 'exam'; exam: ExamPayload; subjectId: number; returnChapterId: number | null }
  | { name: 'result'; result: TestResultPayload; returnChapterId: number | null }
  | { name: 'revision-hub' }
  | {
      name: 'revision';
      revision: RevisionPayload;
      subjectId: number;
      classNumber: number;
      returnTo: 'chapters' | 'chapter-tests' | 'revision-hub' | 'subjects';
    }
  | { name: 'notes-library'; initialClassNumber?: number; initialChapterId?: number | null }
  | { name: 'pyq-studio' }
  | { name: 'study-planner'; initialClassNumber?: number }
  | { name: 'profile' }
  | { name: 'leaderboard' }
  | { name: 'admin' };

interface MixedTestInfo {
  readyChaptersCount: number;
  totalChaptersCount: number;
  questionCount: number;
  timeLimitMinutes: number;
  totalMarks: number;
  isAvailable: boolean;
}

const FOUNDER = { role: 'Founder', name: 'Aakash Sharma' };
const CO_FOUNDER_MANAGER = {
  role: 'Co-Founder and Manager',
  name: 'Vishal Singh and Lucky Raj',
};

const GUEST_RETAKE_STORAGE_KEY = 'toppers_adda_guest_retakes';
const WELCOME_POPUP_STORAGE_KEY = 'welkin_classes_welcome_seen_v1';

function loadGuestRetakes(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(GUEST_RETAKE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveGuestRetakes(next: Record<string, number>): void {
  try {
    window.localStorage.setItem(GUEST_RETAKE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage quota failures
  }
}

export default function App() {
  const [view, setView] = useState<ViewState>({ name: 'home' });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'admin' | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryContext, setEnquiryContext] = useState<EnquiryContext | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(() => {
    try {
      return !window.sessionStorage.getItem(WELCOME_POPUP_STORAGE_KEY);
    } catch {
      return false;
    }
  });
  const [guestRetakes, setGuestRetakes] = useState<Record<string, number>>(() => loadGuestRetakes());

  // Data states
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjectsData, setSubjectsData] = useState<{
    classInfo: { number: number; name: string; syllabusYear: string; description: string };
    subjects: SubjectItem[];
  } | null>(null);
  const [chaptersData, setChaptersData] = useState<{
    subject: {
      id: number;
      classNumber: number;
      className: string;
      syllabusYear: string;
      name: string;
      textbookTitle: string;
      description: string;
    };
    chapters: ChapterItem[];
    mixedTestInfo: MixedTestInfo;
  } | null>(null);
  const [chapterTestsData, setChapterTestsData] = useState<{
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
    };
    testSets: TestSetItem[];
  } | null>(null);

  // Revision hub browser state
  const [revHubClass, setRevHubClass] = useState<number>(9);
  const [revHubSubjects, setRevHubSubjects] = useState<SubjectItem[]>([]);
  const [revHubSubjectId, setRevHubSubjectId] = useState<number | null>(null);
  const [revHubChapters, setRevHubChapters] = useState<ChapterItem[]>([]);
  const [revHubLoading, setRevHubLoading] = useState(false);

  const [mixedDifficulty, setMixedDifficulty] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session & load classes on mount
  useEffect(() => {
    apiRequest<{ profile: Profile | null }>('/api/auth/me')
      .then((res) => setProfile(res.profile))
      .catch(() => {});

    apiRequest<ClassItem[]>('/api/classes')
      .then(setClasses)
      .catch((err: any) => setError(err.message || 'Could not load classes.'));
  }, []);

  // Load route-specific data
  useEffect(() => {
    setError(null);
    if (view.name === 'subjects') {
      setLoading(true);
      apiRequest<{
        classInfo: { number: number; name: string; syllabusYear: string; description: string };
        subjects: SubjectItem[];
      }>(`/api/classes/${view.classNumber}/subjects`)
        .then(setSubjectsData)
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    } else if (view.name === 'chapters') {
      setLoading(true);
      apiRequest<{
        subject: {
          id: number;
          classNumber: number;
          className: string;
          syllabusYear: string;
          name: string;
          textbookTitle: string;
          description: string;
        };
        chapters: ChapterItem[];
        mixedTestInfo: MixedTestInfo;
      }>(`/api/subjects/${view.subjectId}/chapters`)
        .then(setChaptersData)
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    } else if (view.name === 'chapter-tests') {
      setLoading(true);
      apiRequest<{
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
        };
        testSets: TestSetItem[];
      }>(`/api/chapters/${view.chapterId}/tests`)
        .then(setChapterTestsData)
        .catch((err: any) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [view, profile?.id]);

  // Load Revision Hub subjects when class changes
  useEffect(() => {
    if (view.name !== 'revision-hub') return;
    let active = true;
    setRevHubLoading(true);
    apiRequest<{
      classInfo: { number: number; name: string; syllabusYear: string; description: string };
      subjects: SubjectItem[];
    }>(`/api/classes/${revHubClass}/subjects`)
      .then((res) => {
        if (!active) return;
        setRevHubSubjects(res.subjects);
        if (res.subjects.length > 0) {
          const keepsCurrent = res.subjects.some((s) => s.id === revHubSubjectId);
          if (!keepsCurrent) {
            setRevHubSubjectId(res.subjects[0].id);
          }
        } else {
          setRevHubSubjectId(null);
          setRevHubChapters([]);
        }
      })
      .catch((err: any) => {
        if (active) setError(err.message || 'Could not load revision subjects.');
      })
      .finally(() => {
        if (active) setRevHubLoading(false);
      });
    return () => {
      active = false;
    };
  }, [view.name, revHubClass]);

  // Load Revision Hub chapters when subject changes
  useEffect(() => {
    if (view.name !== 'revision-hub' || !revHubSubjectId) return;
    let active = true;
    setRevHubLoading(true);
    apiRequest<{
      chapters: ChapterItem[];
    }>(`/api/subjects/${revHubSubjectId}/chapters`)
      .then((res) => {
        if (active) setRevHubChapters(res.chapters);
      })
      .catch((err: any) => {
        if (active) setError(err.message || 'Could not load revision chapters.');
      })
      .finally(() => {
        if (active) setRevHubLoading(false);
      });
    return () => {
      active = false;
    };
  }, [view.name, revHubSubjectId]);

  const startChapterTest = async (testSetId: number, subjectId: number, chapterId: number) => {
    setError(null);
    setLoading(true);
    try {
      const guestCount = guestRetakes[String(testSetId)] ?? 0;
      const exam = await apiRequest<ExamPayload>(
        `/api/tests/${testSetId}/start?retakeCount=${guestCount}`
      );
      setView({ name: 'exam', exam, subjectId, returnChapterId: chapterId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Could not start test.');
    } finally {
      setLoading(false);
    }
  };

  const startMixedTest = async (subjectId: number, difficultyLevel: number) => {
    setError(null);
    setLoading(true);
    try {
      const exam = await apiRequest<ExamPayload>(`/api/subjects/${subjectId}/mixed-test/start`, {
        method: 'POST',
        body: JSON.stringify({ difficultyLevel }),
      });
      setView({ name: 'exam', exam, subjectId, returnChapterId: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Could not start mixed chapter test.');
    } finally {
      setLoading(false);
    }
  };

  const startChapterRevision = async (
    chapterId: number,
    subjectId: number,
    classNumber: number,
    returnTo: 'chapters' | 'chapter-tests' | 'revision-hub' | 'subjects',
    count?: number,
    shuffle = false
  ) => {
    setError(null);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (count && count > 0) params.set('count', String(count));
      if (shuffle) params.set('shuffle', '1');
      const query = params.toString();
      const revision = await apiRequest<RevisionPayload>(
        `/api/chapters/${chapterId}/revision${query ? `?${query}` : ''}`
      );
      setView({ name: 'revision', revision, subjectId, classNumber, returnTo });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Could not load chapter revision.');
    } finally {
      setLoading(false);
    }
  };

  const startSubjectRevision = async (
    subjectId: number,
    classNumber: number,
    returnTo: 'chapters' | 'chapter-tests' | 'revision-hub' | 'subjects',
    count = 50,
    shuffle = false
  ) => {
    setError(null);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (count && count > 0) params.set('count', String(count));
      if (shuffle) params.set('shuffle', '1');
      const query = params.toString();
      const revision = await apiRequest<RevisionPayload>(
        `/api/subjects/${subjectId}/revision${query ? `?${query}` : ''}`
      );
      setView({ name: 'revision', revision, subjectId, classNumber, returnTo });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Could not load subject revision.');
    } finally {
      setLoading(false);
    }
  };

  const openEnquiryModal = (ctx?: EnquiryContext) => {
    setEnquiryContext(ctx ?? null);
    setEnquiryOpen(true);
  };

  const dismissWelcomePopup = () => {
    setShowWelcomePopup(false);
    try {
      window.sessionStorage.setItem(WELCOME_POPUP_STORAGE_KEY, '1');
    } catch {
      // ignore storage errors
    }
  };

  const handleLogout = async () => {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setAuthToken(null);
    setProfile(null);
    if (view.name === 'admin') {
      setView({ name: 'home' });
    }
  };

  // Distraction-free full-screen exam view
  if (view.name === 'exam') {
    return (
      <>
        <ExamView
          exam={view.exam}
          subjectId={view.subjectId}
          onReportError={(ctx) => openEnquiryModal(ctx)}
          onComplete={(result) => {
            if (!profile && view.exam.mode === 'chapter' && view.exam.testSetId) {
              const key = String(view.exam.testSetId);
              setGuestRetakes((prev) => {
                const updated = { ...prev, [key]: (prev[key] ?? 0) + 1 };
                saveGuestRetakes(updated);
                return updated;
              });
            }
            setView({ name: 'result', result, returnChapterId: view.returnChapterId });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExit={() => {
            if (view.returnChapterId) {
              setView({
                name: 'chapter-tests',
                classNumber: view.exam.classNumber,
                subjectId: view.subjectId,
                chapterId: view.returnChapterId,
              });
            } else {
              setView({
                name: 'chapters',
                classNumber: view.exam.classNumber,
                subjectId: view.subjectId,
              });
            }
          }}
        />
        <EnquiryModal
          isOpen={enquiryOpen}
          context={enquiryContext}
          profile={profile}
          onClose={() => setEnquiryOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F5F0] text-[#1E2A36]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 border-b border-[#DED8CA] bg-[#FCFBF8]/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          {/* Zone 1: Single Wordmark */}
          <button
            type="button"
            onClick={() => setView({ name: 'home' })}
            className="font-display text-base font-extrabold tracking-tight text-[#1E2A36] sm:text-lg whitespace-nowrap shrink-0"
          >
            THE WELKIN CLASSES
          </button>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav className="hidden items-center gap-4 text-[13px] font-medium text-[#52606D] lg:gap-5 md:flex">
            <button
              type="button"
              onClick={() => setView({ name: 'home' })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'home' ||
                view.name === 'subjects' ||
                view.name === 'chapters' ||
                view.name === 'chapter-tests'
                  ? 'font-semibold text-[#355978]'
                  : ''
              }`}
            >
              Classes
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'notes-library', initialClassNumber: profile?.classNumber ?? 10 })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'notes-library' ? 'font-semibold text-[#2A6651]' : ''
              }`}
            >
              Notes
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'pyq-studio' })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'pyq-studio' ? 'font-semibold text-[#8A4A35]' : ''
              }`}
            >
              Class 10 PYQs
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'revision-hub' })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'revision-hub' || view.name === 'revision'
                  ? 'font-semibold text-[#2A6651]'
                  : ''
              }`}
            >
              Revision
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'study-planner', initialClassNumber: profile?.classNumber ?? 10 })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'study-planner' ? 'font-semibold text-[#355978]' : ''
              }`}
            >
              AI Planner
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'leaderboard' })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'leaderboard' ? 'font-semibold text-[#355978]' : ''
              }`}
            >
              Ranks
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'profile' })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'profile' ? 'font-semibold text-[#355978]' : ''
              }`}
            >
              Progress
            </button>
            <button
              type="button"
              onClick={() => setView({ name: 'admin' })}
              className={`transition-colors hover:text-[#1E2A36] whitespace-nowrap shrink-0 ${
                view.name === 'admin' ? 'font-semibold text-[#355978]' : ''
              }`}
            >
              Admin
            </button>
          </nav>

          {/* Zone 3: Enquiry + Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal({ defaultIssueType: 'General Enquiry' })}
              className="hidden items-center gap-1.5 rounded-lg border border-[#D4C5B4] bg-[#FCF7F2] px-3 py-2 text-xs font-semibold text-[#8A4A35] transition-colors hover:bg-[#8A4A35] hover:text-white sm:inline-flex whitespace-nowrap shrink-0"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Enquiry
            </button>
            {profile ? (
              <button
                type="button"
                onClick={() =>
                  setView(profile.role === 'admin' ? { name: 'admin' } : { name: 'profile' })
                }
                className="max-w-[150px] truncate rounded-lg bg-[#1E2A36] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#355978] whitespace-nowrap shrink-0"
              >
                {profile.name}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="rounded-lg bg-[#1E2A36] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#355978] whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Quick Nav Row */}
        <div className="flex items-center gap-2 overflow-x-auto border-t border-[#EAE5D9] px-3 py-2 text-xs font-medium text-[#52606D] md:hidden">
          <button type="button" onClick={() => setView({ name: 'home' })} className="px-2 py-1 whitespace-nowrap hover:text-[#1E2A36]">
            Classes
          </button>
          <button
            type="button"
            onClick={() => setView({ name: 'notes-library', initialClassNumber: profile?.classNumber ?? 10 })}
            className="px-2 py-1 whitespace-nowrap hover:text-[#2A6651]"
          >
            Notes
          </button>
          <button
            type="button"
            onClick={() => setView({ name: 'pyq-studio' })}
            className="px-2 py-1 whitespace-nowrap hover:text-[#8A4A35]"
          >
            Class 10 PYQs
          </button>
          <button
            type="button"
            onClick={() => setView({ name: 'revision-hub' })}
            className="px-2 py-1 whitespace-nowrap hover:text-[#2A6651]"
          >
            Revision
          </button>
          <button
            type="button"
            onClick={() => setView({ name: 'study-planner', initialClassNumber: profile?.classNumber ?? 10 })}
            className="px-2 py-1 whitespace-nowrap hover:text-[#355978]"
          >
            AI Planner
          </button>
          <button type="button" onClick={() => setView({ name: 'leaderboard' })} className="px-2 py-1 whitespace-nowrap hover:text-[#1E2A36]">
            Ranks
          </button>
          <button type="button" onClick={() => setView({ name: 'profile' })} className="px-2 py-1 whitespace-nowrap hover:text-[#1E2A36]">
            Progress
          </button>
          <button
            type="button"
            onClick={() => openEnquiryModal({ defaultIssueType: 'General Enquiry' })}
            className="px-2 py-1 whitespace-nowrap text-[#8A4A35]"
          >
            Enquiry
          </button>
          <button type="button" onClick={() => setView({ name: 'admin' })} className="px-2 py-1 whitespace-nowrap hover:text-[#1E2A36]">
            Admin
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {error && (
          <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
            <div className="rounded-lg border border-[#E0B0B0] bg-[#FCF2F2] px-4 py-3 text-sm text-[#7F2929]">
              {error}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={view.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
        {/* ==================== HOMEPAGE ==================== */}
        {view.name === 'home' && (
          <>
            {/* Calm Academic Hero with Geometric Backdrop */}
            <section className="relative overflow-hidden border-b border-[#DED8CA] bg-gradient-to-br from-[#1C2833] via-[#223242] to-[#2B4257] text-[#F8F6F0]">
              <HeroGeometricBackdrop />
              <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-3xl"
                >
                  <p className="text-sm font-medium text-[#D6C7AE]">
                    NCERT &amp; CBSE Board Revision, Notes, PYQs &amp; Examination Platform · Classes 6 to 10
                  </p>
                  <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    THE WELKIN CLASSES
                  </h1>
                  <p className="mt-2 text-xl font-semibold text-[#E5E0D5]">
                    Learn. Practice. Improve.
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#CBD5E1]">
                    Complete NCERT &amp; CBSE preparation from Class 6 to Class 10—featuring chapter-wise MCQ tests (10–50 Qs with 5-retake stability), 20 to 100 question instant revision across every subject, dedicated chapter notes, Class 10 Board PYQs with side-by-side solutions, and an AI Study Planner tailored to your exam countdown.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('choose-class-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#D6C7AE] px-5 py-2.5 text-sm font-semibold text-[#1C2833] transition-colors hover:bg-[#E4D7C1]"
                    >
                      Browse Classes 6–10
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setView({ name: 'pyq-studio' });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                    >
                      <FileText className="h-4 w-4 text-[#E6C59C]" />
                      Class 10 PYQs + Solutions
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setView({ name: 'notes-library', initialClassNumber: profile?.classNumber ?? 10 });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                    >
                      <BookOpen className="h-4 w-4 text-[#A7D3C0]" />
                      Chapter Notes (6–10)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setView({ name: 'study-planner', initialClassNumber: profile?.classNumber ?? 10 });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                    >
                      <CalendarDays className="h-4 w-4 text-[#A9CBEB]" />
                      AI Study Planner
                    </button>
                  </div>
                </motion.div>

                {/* Founder & Leadership Row */}
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
                  <div className="flex flex-wrap items-start gap-x-10 gap-y-4">
                    <div>
                      <div className="text-xs font-semibold text-[#B9C4CE]">{FOUNDER.role}</div>
                      <div className="mt-1 text-base font-semibold text-white">{FOUNDER.name}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#B9C4CE]">
                        {CO_FOUNDER_MANAGER.role}
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">
                        {CO_FOUNDER_MANAGER.name}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal({ defaultIssueType: 'General Enquiry' })}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-[#F8F6F0] transition-colors hover:bg-white/20"
                  >
                    <AlertCircle className="h-3.5 w-3.5 text-[#E6C59C]" />
                    Report Error or Send Enquiry
                  </button>
                </div>
              </div>
            </section>

            {/* Choose Your Class Section */}
            <section id="choose-class-section" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E2A36] sm:text-3xl">
                    Choose Your Class
                  </h2>
                  <p className="mt-1 text-sm text-[#52606D]">
                    Select your class to access prescribed NCERT textbooks, 10–50 MCQ chapter tests, 20–100 Q instant revision sets, chapter notes, and mixed chapter exams.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {classes.map((cls, idx) => (
                  <motion.button
                    key={cls.id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: idx * 0.04 }}
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      setView({ name: 'subjects', classNumber: cls.number });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group flex flex-col justify-between rounded-xl border border-[#DED8CA] bg-white p-6 text-left transition-colors hover:border-[#355978] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355978]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-[#8A6843]">{cls.syllabusYear}</div>
                          <h3 className="mt-1.5 font-display text-2xl font-bold text-[#1E2A36]">
                            {cls.name}
                          </h3>
                        </div>
                        <ClassGeometricEmblem classNumber={cls.number} />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[#52606D]">
                        {cls.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[#EFECE4] pt-4">
                      <div className="flex items-center gap-2 text-xs text-[#5A6773] tabular-nums">
                        <span>{cls.subjectCount} Subjects</span>
                        <span aria-hidden="true">·</span>
                        <span>{cls.chapterCount} Chapters</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#1E2A36]">{cls.readyTestCount} Ready Tests</span>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#355978] transition-transform group-hover:translate-x-0.5">
                        Open Subjects
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Dedicated Study Toolkit Cards: Class 10 PYQs, Chapter Notes, AI Study Planner */}
              <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col justify-between rounded-xl border border-[#DEC9B8] bg-[#FCF7F2] p-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A4A35]">
                      <FileText className="h-4 w-4" />
                      Class 10 Board Exam Archive
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#1E2A36]">
                      Class 10 PYQs &amp; Side-by-Side Solutions
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52606D]">
                      View authentic CBSE Class 10 Previous Year Question Papers connected to the class Drive folder with board questions on the left and step-by-step marking-scheme solutions on the right.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setView({ name: 'pyq-studio' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#8A4A35] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#703B2A]"
                  >
                    Open Class 10 PYQ Studio
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col justify-between rounded-xl border border-[#C7D4E2] bg-[#F3F7FB] p-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#355978]">
                      <Sparkles className="h-4 w-4" />
                      Smart Exam Scheduling
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#1E2A36]">
                      AI Study Planner (Classes 6–10)
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52606D]">
                      Enter your class, days remaining before exams, daily study hours, and target score—AI automatically generates a realistic day-by-day NCERT &amp; mock-test schedule.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setView({ name: 'study-planner', initialClassNumber: profile?.classNumber ?? 10 });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#355978] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#294761]"
                  >
                    Build My Study Plan
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex flex-col justify-between rounded-xl border border-[#C6DCD1] bg-[#F3F8F5] p-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
                      <BookOpen className="h-4 w-4" />
                      All 332 NCERT Chapters
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#1E2A36]">
                      Chapter-Wise Exam Notes (Classes 6–10)
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#52606D]">
                      Dedicated high-yield notes for every chapter across Classes 6–10: core definitions, formulas &amp; facts, board exam tips, and common mistakes to avoid.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setView({ name: 'notes-library', initialClassNumber: profile?.classNumber ?? 10 });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2A6651] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#225342]"
                  >
                    Read Chapter Notes
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>

              <SectionFlourishDivider label="Academic Structure" />

              {/* Instant Revision Highlight Card */}
              <div className="rounded-xl border border-[#C6DCD1] bg-[#F3F8F5] p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
                      <BookOpenCheck className="h-4 w-4" />
                      Subject &amp; Chapter Instant Revision
                    </div>
                    <h2 className="mt-1.5 font-display text-2xl font-bold text-[#1E2A36]">
                      Practise 20, 50, 75, or 100 Questions in All Subjects (Classes 6–10)
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#465664]">
                      Pick any subject or chapter across all {classes.reduce((sum, c) => sum + c.chapterCount, 0) || 332} NCERT &amp; CBSE chapters, choose 20, 50, 75, or 100 questions, and click any option to immediately reveal right and wrong choices alongside the complete explanation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setView({ name: 'revision-hub' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#2A6651] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#225342] whitespace-nowrap"
                  >
                    <BookOpenCheck className="h-4 w-4" />
                    Open Revision Hub
                  </button>
                </div>
              </div>

              {/* 5 Difficulty Levels Guide */}
              <div className="mt-12">
                <h2 className="text-xl font-bold text-[#1E2A36]">
                  Five Progressive Levels &amp; Variable Exam Lengths
                </h2>
                <p className="mt-1 text-sm text-[#52606D]">
                  Every chapter features 10 structured tests spanning 10, 15, 20, and 50 MCQs. Retaking the same test keeps identical questions for your first 5 retakes before rotating on retake #6.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {([1, 2, 3, 4, 5] as DifficultyLevel[]).map((lvl) => (
                    <div key={lvl} className="rounded-xl border border-[#DED8CA] bg-white p-4">
                      <div className="font-mono text-xs font-semibold text-[#8A6843]">Level {lvl}</div>
                      <div className="mt-1 font-display text-sm font-bold text-[#1E2A36]">
                        {DIFFICULTY_META[lvl].shortName}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#52606D]">
                        {DIFFICULTY_META[lvl].description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ==================== REVISION HUB ==================== */}
        {view.name === 'revision-hub' && (
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <div className="border-b border-[#DED8CA] pb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
                <BookOpenCheck className="h-4 w-4" />
                Chapter-Wise Instant Revision (20–100 Questions)
              </div>
              <h1 className="mt-1 text-3xl font-bold text-[#1E2A36]">NCERT Revision Hub</h1>
              <p className="mt-1.5 max-w-2xl text-sm text-[#52606D]">
                Select your class, subject, and chapter below to launch an instant-feedback revision session. Click any option to immediately reveal right and wrong choices plus the NCERT solution below.
              </p>

              {/* Class Selector */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {[6, 7, 8, 9, 10].map((cNum) => (
                  <button
                    key={cNum}
                    type="button"
                    onClick={() => setRevHubClass(cNum)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      revHubClass === cNum
                        ? 'bg-[#1E2A36] text-white'
                        : 'border border-[#DED8CA] bg-white text-[#4D5A66] hover:bg-[#EFECE4]'
                    }`}
                  >
                    Class {cNum}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Tabs */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {revHubSubjects.map((subj) => (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => setRevHubSubjectId(subj.id)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                    revHubSubjectId === subj.id
                      ? 'bg-[#2A6651] text-white'
                      : 'border border-[#DED8CA] bg-white text-[#4D5A66] hover:border-[#2A6651] hover:text-[#1E2A36]'
                  }`}
                >
                  {subj.name} ({subj.textbookTitle})
                </button>
              ))}
            </div>

            {/* Full-Subject Revision Marathon Bar (20 / 50 / 75 / 100 Qs) */}
            {revHubSubjectId && (
              <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-[#C6DCD1] bg-[#F3F8F5] p-5 sm:flex-row sm:items-center">
                <div>
                  <div className="text-xs font-semibold text-[#2A6651]">
                    Full Subject Instant Revision Marathon
                  </div>
                  <p className="mt-0.5 text-sm text-[#354654]">
                    Practise mixed instant-reveal questions across every chapter of{' '}
                    <strong>
                      Class {revHubClass}{' '}
                      {revHubSubjects.find((s) => s.id === revHubSubjectId)?.name || 'this subject'}
                    </strong>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {[20, 50, 75, 100].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        void startSubjectRevision(
                          revHubSubjectId,
                          revHubClass,
                          'revision-hub',
                          cnt,
                          true
                        )
                      }
                      className="rounded-lg bg-[#2A6651] px-3.5 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#225342] whitespace-nowrap tabular-nums"
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chapter Revision Cards */}
            {revHubLoading ? (
              <div className="mt-8 text-sm text-[#5A6773]">Loading chapters for Class {revHubClass}...</div>
            ) : (
              <div className="mt-6 space-y-3">
                {revHubChapters.map((ch) => {
                  const pool = ch.totalQuestions;
                  const presets = [20, 50, 75, 100];

                  return (
                    <div
                      key={ch.id}
                      className="flex flex-col justify-between gap-4 rounded-xl border border-[#DED8CA] bg-white p-5 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6773]">
                          <span className="font-mono font-bold text-[#1E2A36]">
                            Chapter {String(ch.chapterNumber).padStart(2, '0')}
                          </span>
                          {ch.unitName && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{ch.unitName}</span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#2A6651] tabular-nums">
                            {pool} Chapter MCQs + Subject Pool
                          </span>
                        </div>
                        <h2 className="mt-1 text-lg font-bold text-[#1E2A36]">{ch.title}</h2>
                        {ch.description && (
                          <p className="mt-0.5 text-sm text-[#52606D]">{ch.description}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setView({
                              name: 'notes-library',
                              initialClassNumber: revHubClass,
                              initialChapterId: ch.id,
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-[#DED8CA] bg-[#FAF8F3] px-3 py-2 text-xs font-semibold text-[#355978] transition-colors hover:bg-[#EFECE4] whitespace-nowrap"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Notes
                        </button>
                        {presets.map((cnt) => (
                          <button
                            key={cnt}
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              revHubSubjectId &&
                              void startChapterRevision(
                                ch.id,
                                revHubSubjectId,
                                revHubClass,
                                'revision-hub',
                                cnt
                              )
                            }
                            className="rounded-lg border border-[#C6DCD1] bg-[#F3F8F5] px-3 py-2 font-mono text-xs font-semibold text-[#2A6651] transition-colors hover:bg-[#2A6651] hover:text-white whitespace-nowrap tabular-nums"
                          >
                            {cnt} Qs
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== REVISION PLAYER ==================== */}
        {view.name === 'revision' && (
          <RevisionView
            revision={view.revision}
            loading={loading}
            onReportError={(ctx) => openEnquiryModal(ctx)}
            onChangeCount={(count, shuffle) => {
              if (view.revision.mode === 'subject' || view.revision.chapter.id === 0) {
                void startSubjectRevision(
                  view.subjectId,
                  view.classNumber,
                  view.returnTo,
                  count,
                  shuffle
                );
              } else {
                void startChapterRevision(
                  view.revision.chapter.id,
                  view.subjectId,
                  view.classNumber,
                  view.returnTo,
                  count,
                  shuffle
                );
              }
            }}
            onExit={() => {
              if (view.returnTo === 'chapter-tests' && view.revision.chapter.id > 0) {
                setView({
                  name: 'chapter-tests',
                  classNumber: view.classNumber,
                  subjectId: view.subjectId,
                  chapterId: view.revision.chapter.id,
                });
              } else if (view.returnTo === 'chapters') {
                setView({
                  name: 'chapters',
                  classNumber: view.classNumber,
                  subjectId: view.subjectId,
                });
              } else if (view.returnTo === 'subjects') {
                setView({
                  name: 'subjects',
                  classNumber: view.classNumber,
                });
              } else {
                setView({ name: 'revision-hub' });
              }
            }}
          />
        )}

        {/* ==================== SUBJECT SELECTION ==================== */}
        {view.name === 'subjects' && (
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <button
              type="button"
              onClick={() => setView({ name: 'home' })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#52606D] hover:text-[#1E2A36]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Classes
            </button>

            {loading || !subjectsData ? (
              <div className="mt-8 text-sm text-[#5A6773]">Loading Class {view.classNumber} subjects...</div>
            ) : (
              <>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#DED8CA] pb-6">
                  <div>
                    <div className="text-xs font-semibold text-[#8A6843]">
                      {subjectsData.classInfo.syllabusYear}
                    </div>
                    <h1 className="mt-1 text-3xl font-bold text-[#1E2A36]">
                      {subjectsData.classInfo.name} — Select a Subject
                    </h1>
                    <p className="mt-1.5 max-w-2xl text-sm text-[#52606D]">
                      {subjectsData.classInfo.description}
                    </p>
                  </div>
                  <ClassGeometricEmblem classNumber={view.classNumber} />
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {subjectsData.subjects.map((subj) => (
                    <div
                      key={subj.id}
                      className="group flex flex-col justify-between rounded-xl border border-[#DED8CA] bg-white p-6 text-left transition-all hover:border-[#355978] hover:shadow-md"
                    >
                      <div>
                        <div className="text-xs font-medium text-[#5A6773]">
                          NCERT Textbook: <span className="font-semibold text-[#1E2A36]">{subj.textbookTitle}</span>
                        </div>
                        <h2 className="mt-2 font-display text-xl font-bold text-[#1E2A36]">
                          {subj.name}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#52606D]">
                          {subj.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-[#EFECE4] pt-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6773] tabular-nums">
                          <span>{subj.chapterCount} Chapters</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-[#1E2A36]">{subj.readyTestCount} Ready Tests</span>
                          <span aria-hidden="true">·</span>
                          <span>{subj.totalQuestionCount} MCQs</span>
                        </div>
                        <div className="mt-3.5 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setView({
                                name: 'chapters',
                                classNumber: view.classNumber,
                                subjectId: subj.id,
                              });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E2A36] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#355978]"
                          >
                            View Chapters
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              void startSubjectRevision(subj.id, view.classNumber, 'subjects', 50, true)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#B9D8CA] bg-[#F2F8F5] px-3 py-2 text-xs font-semibold text-[#2A6651] transition-colors hover:bg-[#2A6651] hover:text-white"
                          >
                            <BookOpenCheck className="h-3.5 w-3.5" />
                            Revise (20–100 Qs)
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== CHAPTER SELECTION + MIXED TEST ==================== */}
        {view.name === 'chapters' && (
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <button
              type="button"
              onClick={() => setView({ name: 'subjects', classNumber: view.classNumber })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#52606D] hover:text-[#1E2A36]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Class {view.classNumber} Subjects
            </button>

            {loading || !chaptersData ? (
              <div className="mt-8 text-sm text-[#5A6773]">Loading prescribed chapters...</div>
            ) : (
              <>
                <div className="mt-4 border-b border-[#DED8CA] pb-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6773]">
                    <span>{chaptersData.subject.className}</span>
                    <span aria-hidden="true">·</span>
                    <span>{chaptersData.subject.name}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#8A6843]">
                      Textbook: {chaptersData.subject.textbookTitle}
                    </span>
                  </div>
                  <h1 className="mt-1 text-3xl font-bold text-[#1E2A36]">Select a Chapter</h1>
                  <p className="mt-1.5 text-sm text-[#52606D]">
                    All chapters prescribed in the official NCERT <em>{chaptersData.subject.textbookTitle}</em> syllabus. Read chapter notes, launch 20–100 question instant revision, or take timed tests.
                  </p>
                </div>

                {/* Subject-Wide 20/50/75/100 Instant Revision Bar */}
                <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-[#C6DCD1] bg-[#F3F8F5] p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
                      <BookOpenCheck className="h-4 w-4" />
                      Full Subject Instant Revision ({chaptersData.subject.name})
                    </div>
                    <p className="mt-1 text-sm text-[#354654]">
                      Practise 20, 50, 75, or 100 shuffled questions from across all chapters of {chaptersData.subject.name} with instant answer reveal.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {[20, 50, 75, 100].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          void startSubjectRevision(
                            chaptersData.subject.id,
                            chaptersData.subject.classNumber,
                            'chapters',
                            cnt,
                            true
                          )
                        }
                        className="rounded-lg bg-[#2A6651] px-3.5 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-[#225342] whitespace-nowrap tabular-nums"
                      >
                        {cnt} Qs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chapter List */}
                <div className="mt-6 space-y-3">
                  {chaptersData.chapters.map((ch) => {
                    const hasReadyTests = ch.readyTestSets > 0;
                    const progressPct =
                      ch.readyTestSets > 0
                        ? Math.min(100, Math.round((ch.completedTestSets / ch.readyTestSets) * 100))
                        : 0;

                    return (
                      <div
                        key={ch.id}
                        className="flex flex-col justify-between gap-4 rounded-xl border border-[#DED8CA] bg-white p-5 transition-colors hover:border-[#BDB4A1] sm:flex-row sm:items-center"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6773]">
                            <span className="font-mono font-bold text-[#1E2A36]">
                              Chapter {String(ch.chapterNumber).padStart(2, '0')}
                            </span>
                            {ch.unitName && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{ch.unitName}</span>
                              </>
                            )}
                            <span aria-hidden="true">·</span>
                            <span className={hasReadyTests ? 'font-semibold text-[#2A6651]' : 'text-[#5A6773]'}>
                              {ch.readyTestSets} of {ch.totalTestSets} Tests Ready
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{ch.totalQuestions} MCQs</span>
                            {ch.availableLevels.length > 0 && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>
                                  Levels {Math.min(...ch.availableLevels)}–{Math.max(...ch.availableLevels)}
                                </span>
                              </>
                            )}
                          </div>

                          <h2 className="mt-1 text-lg font-bold text-[#1E2A36]">{ch.title}</h2>
                          {ch.description && (
                            <p className="mt-0.5 text-sm text-[#52606D]">{ch.description}</p>
                          )}

                          {/* Student Progress Indicator */}
                          {hasReadyTests && (
                            <div className="mt-3 flex max-w-md items-center gap-3">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EFECE4]">
                                <div
                                  className="h-full rounded-full bg-[#355978] transition-all"
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                              <span className="text-xs text-[#5A6773] tabular-nums whitespace-nowrap">
                                {ch.completedTestSets}/{ch.readyTestSets} done
                                {ch.bestPercentage !== null ? ` · Best ${ch.bestPercentage}%` : ''}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setView({
                                name: 'notes-library',
                                initialClassNumber: view.classNumber,
                                initialChapterId: ch.id,
                              })
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4C5B4] bg-[#FCF7F2] px-3 py-2.5 text-xs font-semibold text-[#8A4A35] transition-colors hover:bg-[#8A4A35] hover:text-white whitespace-nowrap"
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            Notes
                          </button>
                          {ch.totalQuestions > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                void startChapterRevision(
                                  ch.id,
                                  view.subjectId,
                                  view.classNumber,
                                  'chapters',
                                  50
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#B9D8CA] bg-[#F2F8F5] px-3 py-2.5 text-xs font-semibold text-[#2A6651] transition-colors hover:bg-[#2A6651] hover:text-white whitespace-nowrap"
                            >
                              <BookOpenCheck className="h-3.5 w-3.5" />
                              Revise (20–100)
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setView({
                                name: 'chapter-tests',
                                classNumber: view.classNumber,
                                subjectId: view.subjectId,
                                chapterId: ch.id,
                              });
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap ${
                              hasReadyTests
                                ? 'bg-[#1E2A36] text-white hover:bg-[#355978]'
                                : 'border border-[#DED8CA] bg-[#FAF8F3] text-[#52606D] hover:bg-[#EFECE4]'
                            }`}
                          >
                            {hasReadyTests ? 'View Tests' : 'View Syllabus Slot'}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Prominent MIXED CHAPTER TEST Section at the bottom */}
                <section className="relative mt-10 overflow-hidden rounded-xl border border-[#2C3E50] bg-gradient-to-br from-[#1C2833] via-[#223242] to-[#2B4257] p-6 text-white sm:p-8">
                  <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#D6C7AE]">
                        <Shuffle className="h-4 w-4" />
                        <span>Full-Subject Assessment</span>
                      </div>
                      <h2 className="mt-2 font-display text-2xl font-bold text-white">
                        MIXED CHAPTER TEST
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                        Draws 10 questions equally from every ready chapter of{' '}
                        <strong>
                          Class {chaptersData.subject.classNumber} {chaptersData.subject.name}
                        </strong>
                        , shuffled for an authentic examination experience with 1 mark and 1 minute per question.
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#CBD5E1] tabular-nums">
                        <span className="inline-flex items-center gap-1.5">
                          <Layers className="h-4 w-4 text-[#D6C7AE]" />
                          {chaptersData.mixedTestInfo.readyChaptersCount} Ready Chapters × 10 ={' '}
                          <strong className="text-white">
                            {chaptersData.mixedTestInfo.questionCount} Questions
                          </strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-[#D6C7AE]" />
                          <strong className="text-white">
                            {chaptersData.mixedTestInfo.timeLimitMinutes} Minutes
                          </strong>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          <strong className="text-white">
                            {chaptersData.mixedTestInfo.totalMarks} Marks
                          </strong>{' '}
                          (No Negative Marking)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:min-w-[260px]">
                      <label className="text-xs font-semibold text-[#D6C7AE]" htmlFor="mixed-level">
                        Select Difficulty Level
                      </label>
                      <select
                        id="mixed-level"
                        value={mixedDifficulty}
                        onChange={(e) => setMixedDifficulty(Number(e.target.value))}
                        disabled={!chaptersData.mixedTestInfo.isAvailable}
                        className="rounded-lg border border-white/20 bg-[#18232E] px-3.5 py-2.5 text-sm text-white focus:border-[#D6C7AE] focus:outline-none disabled:opacity-50"
                      >
                        <option value={0}>All Levels (Balanced Mix)</option>
                        <option value={1}>Level 1 – Basic</option>
                        <option value={2}>Level 2 – Easy to Moderate</option>
                        <option value={3}>Level 3 – Moderate</option>
                        <option value={4}>Level 4 – Advanced</option>
                        <option value={5}>Level 5 – Expert</option>
                      </select>

                      <button
                        type="button"
                        disabled={!chaptersData.mixedTestInfo.isAvailable || loading}
                        onClick={() => void startMixedTest(chaptersData.subject.id, mixedDifficulty)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D6C7AE] px-5 py-3 text-sm font-semibold text-[#1C2833] transition-colors hover:bg-[#E4D7C1] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/50"
                      >
                        <Play className="h-4 w-4" />
                        {chaptersData.mixedTestInfo.isAvailable
                          ? `Start Mixed Test (${chaptersData.mixedTestInfo.questionCount} Qs)`
                          : 'Needs at least 2 Ready Chapters'}
                      </button>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        )}

        {/* ==================== CHAPTER TEST SETS ==================== */}
        {view.name === 'chapter-tests' && (
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <button
              type="button"
              onClick={() =>
                setView({
                  name: 'chapters',
                  classNumber: view.classNumber,
                  subjectId: view.subjectId,
                })
              }
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#52606D] hover:text-[#1E2A36]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Chapters
            </button>

            {loading || !chapterTestsData ? (
              <div className="mt-8 text-sm text-[#5A6773]">Loading chapter test sets...</div>
            ) : (
              <>
                <div className="mt-4 border-b border-[#DED8CA] pb-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6773]">
                    <span>{chapterTestsData.chapter.className}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {chapterTestsData.chapter.subjectName} ({chapterTestsData.chapter.textbookTitle})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Chapter {chapterTestsData.chapter.chapterNumber}</span>
                  </div>
                  <h1 className="mt-1 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
                    {chapterTestsData.chapter.title}
                  </h1>
                  {chapterTestsData.chapter.description && (
                    <p className="mt-1.5 text-sm text-[#52606D]">
                      {chapterTestsData.chapter.description}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#52606D]">
                    <span>10–50 MCQs per test</span>
                    <span aria-hidden="true">·</span>
                    <span>1 Mark &amp; 1 Min per Question</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#355978]">
                      Same Questions for First 5 Retakes
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>No Negative Marking</span>
                  </div>
                </div>

                {/* Compact Chapter Instant Revision Bar */}
                <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-[#C6DCD1] bg-[#F3F8F5] p-5 sm:flex-row sm:items-center">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
                      <BookOpenCheck className="h-4 w-4" />
                      Chapter Instant Revision (20–100 Questions)
                    </div>
                    <p className="mt-1 text-sm text-[#354654]">
                      Click any option to instantly see right and wrong answers along with the full NCERT solution below.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setView({
                          name: 'notes-library',
                          initialClassNumber: chapterTestsData.chapter.classNumber,
                          initialChapterId: chapterTestsData.chapter.id,
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#D4C5B4] bg-[#FCF7F2] px-3.5 py-2 text-xs font-semibold text-[#8A4A35] transition-colors hover:bg-[#8A4A35] hover:text-white whitespace-nowrap"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Chapter Notes
                    </button>
                    {[20, 50, 75, 100].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          void startChapterRevision(
                            chapterTestsData.chapter.id,
                            chapterTestsData.chapter.subjectId,
                            chapterTestsData.chapter.classNumber,
                            'chapter-tests',
                            preset
                          )
                        }
                        className="rounded-lg border border-[#A8CEBC] bg-white px-3.5 py-2 font-mono text-xs font-semibold text-[#2A6651] transition-colors hover:bg-[#2A6651] hover:text-white whitespace-nowrap tabular-nums"
                      >
                        {preset} Qs
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grouped by Difficulty Level 1..5 */}
                <div className="mt-8 space-y-8">
                  {([1, 2, 3, 4, 5] as DifficultyLevel[]).map((level) => {
                    const setsForLevel = chapterTestsData.testSets.filter(
                      (s) => s.difficultyLevel === level
                    );
                    if (setsForLevel.length === 0) return null;

                    return (
                      <section key={level}>
                        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                          <h2 className="text-lg font-bold text-[#1E2A36]">
                            {DIFFICULTY_META[level].name}
                          </h2>
                          <span className="text-xs text-[#5A6773]">
                            {DIFFICULTY_META[level].description}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {setsForLevel.map((ts) => {
                            const effectiveAttempts = profile
                              ? ts.attemptsCount
                              : Math.max(ts.attemptsCount, guestRetakes[String(ts.id)] ?? 0);
                            const retakesDoneInCycle = effectiveAttempts % 6;
                            const retakeHint =
                              effectiveAttempts === 0
                                ? 'Same Qs locked for 5 retakes'
                                : retakesDoneInCycle === 0
                                  ? `Attempt #${effectiveAttempts} · Fresh rotated set`
                                  : retakesDoneInCycle === 5
                                    ? 'Retake 5/5 used · Next retake rotates Qs'
                                    : `Retake ${retakesDoneInCycle}/5 · Same Qs`;

                            return (
                              <div
                                key={ts.id}
                                className="flex flex-col justify-between rounded-xl border border-[#DED8CA] bg-white p-5 sm:flex-row sm:items-center"
                              >
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-display text-base font-bold text-[#1E2A36]">
                                      {ts.title}
                                    </h3>
                                    {ts.bestScore !== null && (
                                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A6651] tabular-nums">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Best {ts.bestScore}/{ts.totalMarks}
                                      </span>
                                    )}
                                  </div>
                                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5A6773] tabular-nums">
                                    <span className="font-semibold text-[#1E2A36]">
                                      {ts.questionCount} MCQs
                                    </span>
                                    <span aria-hidden="true">·</span>
                                    <span>{ts.timeLimitMinutes} Min</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{ts.totalMarks} Marks</span>
                                  </div>
                                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#6B7682]">
                                    <RotateCcw className="h-3 w-3 text-[#8A6843]" />
                                    <span>{retakeHint}</span>
                                  </div>
                                </div>

                                <div className="mt-4 sm:mt-0 sm:shrink-0">
                                  {ts.isReady ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        void startChapterTest(
                                          ts.id,
                                          chapterTestsData.chapter.subjectId,
                                          chapterTestsData.chapter.id
                                        )
                                      }
                                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#355978] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#294761] whitespace-nowrap"
                                    >
                                      <Play className="h-3.5 w-3.5" />
                                      {effectiveAttempts > 0 ? 'Retake Test' : 'Start Test'}
                                    </button>
                                  ) : (
                                    <span className="inline-block rounded-lg border border-[#DED8CA] bg-[#FAF8F3] px-3.5 py-2 text-xs font-medium text-[#5A6773] whitespace-nowrap">
                                      Coming Soon ({ts.questionCount} Qs)
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== RESULTS & ANSWER REVIEW ==================== */}
        {view.name === 'result' && (
          <ResultView
            result={view.result}
            profile={profile}
            onRetake={() => {
              if (view.result.isMixed) {
                void startMixedTest(view.result.subjectId, view.result.difficultyLevel);
              } else if (view.result.testSetId && view.result.chapterId) {
                void startChapterTest(
                  view.result.testSetId,
                  view.result.subjectId,
                  view.result.chapterId
                );
              }
            }}
            onTryAnotherTest={() => {
              if (view.result.chapterId) {
                setView({
                  name: 'chapter-tests',
                  classNumber: view.result.classNumber,
                  subjectId: view.result.subjectId,
                  chapterId: view.result.chapterId,
                });
              } else {
                setView({
                  name: 'chapters',
                  classNumber: view.result.classNumber,
                  subjectId: view.result.subjectId,
                });
              }
            }}
            onReturnChapters={() =>
              setView({
                name: 'chapters',
                classNumber: view.result.classNumber,
                subjectId: view.result.subjectId,
              })
            }
            onGoHome={() => setView({ name: 'home' })}
            onOpenAuth={() => setAuthModalMode('register')}
          />
        )}

        {/* ==================== STUDENT PROFILE & PROGRESS ==================== */}
        {view.name === 'profile' && (
          <ProfileView
            profile={profile}
            onOpenAuth={() => setAuthModalMode('login')}
            onProfileUpdated={setProfile}
            onLogout={() => void handleLogout()}
            onInspectAttempt={(result) => {
              setView({ name: 'result', result, returnChapterId: result.chapterId });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ==================== CHAPTER NOTES LIBRARY (CLASSES 6–10) ==================== */}
        {view.name === 'notes-library' && (
          <NotesLibraryView
            initialClassNumber={view.initialClassNumber ?? 10}
            initialChapterId={view.initialChapterId ?? null}
            onBack={() => setView({ name: 'home' })}
            onStartRevision={(chapterId, count) => {
              void apiRequest<{ chapter: { subjectId: number; classNumber: number } }>(
                `/api/chapters/${chapterId}/notes`
              )
                .then((res) =>
                  startChapterRevision(
                    chapterId,
                    res.chapter.subjectId,
                    res.chapter.classNumber,
                    'revision-hub',
                    count
                  )
                )
                .catch((err: any) => setError(err.message || 'Could not start chapter revision.'));
            }}
            onOpenChapterTests={(chapterId) => {
              void apiRequest<{ chapter: { subjectId: number; classNumber: number } }>(
                `/api/chapters/${chapterId}/notes`
              )
                .then((res) => {
                  setView({
                    name: 'chapter-tests',
                    classNumber: res.chapter.classNumber,
                    subjectId: res.chapter.subjectId,
                    chapterId,
                  });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                })
                .catch((err: any) => setError(err.message || 'Could not open chapter tests.'));
            }}
            onReportError={(ctx) => openEnquiryModal(ctx)}
          />
        )}

        {/* ==================== CLASS 10 BOARD PYQ STUDIO (DRIVE + SIDE-BY-SIDE SOLUTIONS) ==================== */}
        {view.name === 'pyq-studio' && (
          <PyqStudioView
            onBack={() => setView({ name: 'home' })}
            onReportError={(ctx) => openEnquiryModal(ctx)}
          />
        )}

        {/* ==================== AI STUDY PLANNER ==================== */}
        {view.name === 'study-planner' && (
          <StudyPlannerView
            initialClassNumber={view.initialClassNumber ?? 10}
            onBack={() => setView({ name: 'home' })}
            onOpenNotes={(clsNum) => {
              setView({ name: 'notes-library', initialClassNumber: clsNum });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRevision={() => {
              setView({ name: 'revision-hub' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPyqs={() => {
              setView({ name: 'pyq-studio' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ==================== LEADERBOARD ==================== */}
        {view.name === 'leaderboard' && <LeaderboardView />}

        {/* ==================== PROTECTED ADMIN PANEL ==================== */}
        {view.name === 'admin' && (
          <AdminView profile={profile} onOpenAdminLogin={() => setAuthModalMode('admin')} />
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Clean Institutional Footer */}
      <footer className="mt-16 border-t border-[#DED8CA] bg-[#FCFBF8]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-xs text-[#5A6773] sm:flex-row sm:items-center sm:px-6">
          <div>
            <span className="font-display font-bold text-[#1E2A36]">THE WELKIN CLASSES</span> · Learn. Practice. Improve.
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>
              {FOUNDER.role}: <strong className="text-[#1E2A36]">{FOUNDER.name}</strong>
            </span>
            <span>
              {CO_FOUNDER_MANAGER.role}:{' '}
              <strong className="text-[#1E2A36]">{CO_FOUNDER_MANAGER.name}</strong>
            </span>
            <button
              type="button"
              onClick={() => openEnquiryModal({ defaultIssueType: 'General Enquiry' })}
              className="inline-flex items-center gap-1 font-semibold text-[#8A4A35] hover:underline"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Enquiry / Report Error
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Enquiry / Report Error Trigger */}
      <button
        type="button"
        onClick={() => openEnquiryModal({ defaultIssueType: 'Question / Answer Error' })}
        aria-label="Report error or send enquiry"
        className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full border border-[#D4C5B4] bg-[#8A4A35] px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#703B2A]"
      >
        <AlertCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Report Error / Enquiry</span>
        <span className="sm:hidden">Enquiry</span>
      </button>

      {/* Animated Welcome & New Features Popup */}
      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#18232E]/60 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-lg rounded-2xl border border-[#DED8CA] bg-[#FCFBF8] p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[#EAE5D9] pb-4">
                <div>
                  <div className="text-xs font-semibold text-[#8A6843]">
                    Welcome to Classes 6–10 Exam Studio
                  </div>
                  <h2 id="welcome-popup-title" className="mt-1 font-display text-2xl font-extrabold text-[#1E2A36]">
                    THE WELKIN CLASSES
                  </h2>
                  <p className="mt-1 text-xs text-[#5A6773]">
                    {FOUNDER.role}: <span className="font-semibold text-[#1E2A36]">{FOUNDER.name}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-[#5A6773]">
                    {CO_FOUNDER_MANAGER.role}:{' '}
                    <span className="font-semibold text-[#1E2A36]">{CO_FOUNDER_MANAGER.name}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={dismissWelcomePopup}
                  aria-label="Close welcome dialog"
                  className="rounded-lg p-1.5 text-[#5A6773] hover:bg-[#EFECE4] hover:text-[#1E2A36]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5 text-sm text-[#465664]">
                <button
                  type="button"
                  onClick={() => {
                    dismissWelcomePopup();
                    setView({ name: 'pyq-studio' });
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-[#DEC9B8] bg-[#FCF7F2] px-4 py-3 text-left transition-colors hover:border-[#8A4A35]"
                >
                  <div>
                    <div className="font-semibold text-[#1E2A36]">Class 10 Board PYQs + Side-by-Side Solutions</div>
                    <div className="text-xs text-[#5A6773]">Connected to Class 10 Drive folder with full marking scheme</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#8A4A35] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    dismissWelcomePopup();
                    setView({ name: 'study-planner', initialClassNumber: profile?.classNumber ?? 10 });
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-[#C7D4E2] bg-[#F3F7FB] px-4 py-3 text-left transition-colors hover:border-[#355978]"
                >
                  <div>
                    <div className="font-semibold text-[#1E2A36]">AI Exam Study Planner</div>
                    <div className="text-xs text-[#5A6773]">Enter days left, goal &amp; class for an instant daily roadmap</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#355978] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    dismissWelcomePopup();
                    setView({ name: 'notes-library', initialClassNumber: profile?.classNumber ?? 10 });
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-[#C6DCD1] bg-[#F3F8F5] px-4 py-3 text-left transition-colors hover:border-[#2A6651]"
                >
                  <div>
                    <div className="font-semibold text-[#1E2A36]">Separate Chapter Notes (Classes 6–10) &amp; 20–100 Q Revision</div>
                    <div className="text-xs text-[#5A6773]">Exam-focused summaries, formulas, and instant MCQ checks</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#2A6651] shrink-0" />
                </button>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={dismissWelcomePopup}
                  className="rounded-lg bg-[#1E2A36] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#355978]"
                >
                  Start Learning
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enquiry / Report Error Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        context={enquiryContext}
        profile={profile}
        onClose={() => setEnquiryOpen(false)}
      />

      {/* Auth Modal */}
      {authModalMode && (
        <AuthModal
          initialMode={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onSuccess={(newProfile) => {
            setProfile(newProfile);
            setAuthModalMode(null);
            if (newProfile.role === 'admin') {
              setView({ name: 'admin' });
            }
          }}
        />
      )}
    </div>
  );
}
