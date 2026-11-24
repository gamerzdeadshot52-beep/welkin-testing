import React, { useEffect, useState } from 'react';
import { ShieldCheck, Plus, Pencil, Trash2, Users, BookOpen, CheckCircle2, Download, Mail } from 'lucide-react';
import { apiRequest } from '../lib/api';
import {
  AdminQuestionItem,
  ChapterItem,
  DIFFICULTY_META,
  DifficultyLevel,
  EnquiryRecord,
  Profile,
  SubjectItem,
} from '../types';

interface AdminViewProps {
  profile: Profile | null;
  onOpenAdminLogin: () => void;
}

interface AdminOverview {
  stats: {
    totalStudents: number;
    totalAttempts: number;
    totalQuestions: number;
    totalChapters: number;
    readyTestSets: number;
  };
  studentPerformance: Array<{
    id: number;
    name: string;
    email: string;
    classNumber: number;
    testsCompleted: number;
    averagePercentage: number;
    highestScore: number;
    lastAttemptAt: string | null;
  }>;
}

export const AdminView: React.FC<AdminViewProps> = ({ profile, onOpenAdminLogin }) => {
  const [tab, setTab] = useState<'bank' | 'students' | 'enquiries'>('bank');
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [pyqSubjectSlug, setPyqSubjectSlug] = useState('mathematics');
  const [pyqYear, setPyqYear] = useState('2025 Drive');
  const [pyqCode, setPyqCode] = useState('');
  const [pyqTitle, setPyqTitle] = useState('');
  const [pyqQuestionDriveUrl, setPyqQuestionDriveUrl] = useState('');
  const [pyqSolutionDriveUrl, setPyqSolutionDriveUrl] = useState('');
  const [selectedClass, setSelectedClass] = useState<number>(9);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  const [testSets, setTestSets] = useState<
    Array<{ id: number; title: string; difficultyLevel: number; setNumber: number; questionCount: number }>
  >([]);
  const [questions, setQuestions] = useState<AdminQuestionItem[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Add/Edit Chapter form
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [chNum, setChNum] = useState('');
  const [chTitle, setChTitle] = useState('');
  const [chUnit, setChUnit] = useState('');
  const [chDesc, setChDesc] = useState('');

  // Add New Test Set form
  const [newSetLevel, setNewSetLevel] = useState<DifficultyLevel>(1);

  // Add/Edit Question form
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [qTestSetId, setQTestSetId] = useState<number | ''>('');
  const [qText, setQText] = useState('');
  const [qA, setQA] = useState('');
  const [qB, setQB] = useState('');
  const [qC, setQC] = useState('');
  const [qD, setQD] = useState('');
  const [qCorrect, setQCorrect] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [qExplanation, setQExplanation] = useState('');
  const [qType, setQType] = useState('conceptual');

  const isAdmin = profile?.role === 'admin';

  const loadOverview = () => {
    if (!isAdmin) return;
    apiRequest<AdminOverview>('/api/admin/overview')
      .then(setOverview)
      .catch((e: any) => setError(e.message));
    apiRequest<{ enquiries: EnquiryRecord[] }>('/api/admin/enquiries')
      .then((res) => setEnquiries(res.enquiries))
      .catch(() => {});
  };

  useEffect(() => {
    loadOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const handleResolveEnquiry = async (id: number) => {
    try {
      await apiRequest(`/api/admin/enquiries/${id}/resolve`, { method: 'POST' });
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status: 'resolved' } : e)));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddDrivePyq = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFeedback(null);
    const subjLabelMap: Record<string, string> = {
      mathematics: 'Mathematics',
      science: 'Science',
      'social-science': 'Social Science',
      english: 'English',
      hindi: 'Hindi',
      ict: 'ICT (Python & MySQL)',
    };
    try {
      await apiRequest('/api/admin/pyqs', {
        method: 'POST',
        body: JSON.stringify({
          subjectSlug: pyqSubjectSlug,
          subjectName: subjLabelMap[pyqSubjectSlug] || pyqSubjectSlug,
          examYear: pyqYear,
          paperCode: pyqCode,
          title: pyqTitle,
          questionDriveUrl: pyqQuestionDriveUrl,
          solutionDriveUrl: pyqSolutionDriveUrl,
        }),
      });
      setFeedback('Added Class 10 Google Drive PYQ & Solution pair successfully.');
      setPyqCode('');
      setPyqTitle('');
      setPyqQuestionDriveUrl('');
      setPyqSolutionDriveUrl('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    apiRequest<{ subjects: SubjectItem[] }>(`/api/classes/${selectedClass}/subjects`)
      .then((res) => {
        setSubjects(res.subjects);
        if (res.subjects.length > 0) {
          setSelectedSubjectId(res.subjects[0].id);
        } else {
          setSelectedSubjectId(null);
        }
      })
      .catch((e: any) => setError(e.message));
  }, [isAdmin, selectedClass]);

  const loadChapters = (subjId: number) => {
    apiRequest<{ chapters: ChapterItem[] }>(`/api/subjects/${subjId}/chapters`)
      .then((res) => {
        setChapters(res.chapters);
        if (res.chapters.length > 0) {
          setSelectedChapterId((prev) =>
            res.chapters.some((c) => c.id === prev) ? prev : res.chapters[0].id
          );
        } else {
          setSelectedChapterId(null);
        }
      })
      .catch((e: any) => setError(e.message));
  };

  useEffect(() => {
    if (!isAdmin || !selectedSubjectId) return;
    loadChapters(selectedSubjectId);
  }, [isAdmin, selectedSubjectId]);

  const loadChapterBank = (chapterId: number) => {
    apiRequest<{
      testSets: Array<{ id: number; title: string; difficultyLevel: number; setNumber: number; questionCount: number }>;
      questions: AdminQuestionItem[];
    }>(`/api/admin/chapters/${chapterId}/questions`)
      .then((res) => {
        setTestSets(res.testSets);
        setQuestions(res.questions);
        if (res.testSets.length > 0) {
          setQTestSetId((prev) => (res.testSets.some((t) => t.id === prev) ? prev : res.testSets[0].id));
        }
      })
      .catch((e: any) => setError(e.message));
  };

  useEffect(() => {
    if (!isAdmin || !selectedChapterId) return;
    loadChapterBank(selectedChapterId);
  }, [isAdmin, selectedChapterId]);

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-8 sm:p-10">
          <ShieldCheck className="mx-auto h-10 w-10 text-slate-900" />
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Protected Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">
            Administrator authentication is required to manage NCERT chapters, test sets, verified MCQs, and student performance records.
          </p>
          <button
            type="button"
            onClick={onOpenAdminLogin}
            className="mt-6 rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Sign In as Administrator
          </button>
        </div>
      </div>
    );
  }

  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId) return;
    setError(null);
    setFeedback(null);
    try {
      await apiRequest('/api/admin/chapters', {
        method: 'POST',
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          chapterNumber: Number(chNum),
          title: chTitle,
          unitName: chUnit || null,
          description: chDesc || null,
        }),
      });
      setChNum('');
      setChTitle('');
      setChUnit('');
      setChDesc('');
      setShowChapterForm(false);
      setFeedback('Chapter added with 10 structured test set slots.');
      loadChapters(selectedSubjectId);
      loadOverview();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCreateTestSet = async () => {
    if (!selectedChapterId) return;
    setError(null);
    setFeedback(null);
    try {
      const res = await apiRequest<{ id: number; title: string }>('/api/admin/test-sets', {
        method: 'POST',
        body: JSON.stringify({
          chapterId: selectedChapterId,
          difficultyLevel: newSetLevel,
        }),
      });
      setFeedback(`Created test set "${res.title}".`);
      loadChapterBank(selectedChapterId);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetQuestionForm = () => {
    setEditingQuestionId(null);
    setQText('');
    setQA('');
    setQB('');
    setQC('');
    setQD('');
    setQCorrect('A');
    setQExplanation('');
    setQType('conceptual');
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapterId || !qTestSetId) return;
    setError(null);
    setFeedback(null);
    try {
      if (editingQuestionId) {
        await apiRequest(`/api/admin/questions/${editingQuestionId}`, {
          method: 'PUT',
          body: JSON.stringify({
            testSetId: Number(qTestSetId),
            questionText: qText,
            optionA: qA,
            optionB: qB,
            optionC: qC,
            optionD: qD,
            correctOption: qCorrect,
            explanation: qExplanation,
            questionType: qType,
          }),
        });
        setFeedback('Question updated successfully.');
      } else {
        await apiRequest('/api/admin/questions', {
          method: 'POST',
          body: JSON.stringify({
            chapterId: selectedChapterId,
            testSetId: Number(qTestSetId),
            questionText: qText,
            optionA: qA,
            optionB: qB,
            optionC: qC,
            optionD: qD,
            correctOption: qCorrect,
            explanation: qExplanation,
            questionType: qType,
          }),
        });
        setFeedback('Verified MCQ added to question bank.');
      }
      resetQuestionForm();
      loadChapterBank(selectedChapterId);
      loadOverview();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEditQuestion = (q: AdminQuestionItem) => {
    setEditingQuestionId(q.id);
    setQTestSetId(q.testSetId);
    setQText(q.questionText);
    setQA(q.optionA);
    setQB(q.optionB);
    setQC(q.optionC);
    setQD(q.optionD);
    setQCorrect(q.correctOption);
    setQExplanation(q.explanation);
    setQType(q.questionType);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const handleDeleteQuestion = async (questionId: number) => {
    if (!selectedChapterId) return;
    setError(null);
    setFeedback(null);
    try {
      await apiRequest(`/api/admin/questions/${questionId}`, { method: 'DELETE' });
      setFeedback('Question removed.');
      loadChapterBank(selectedChapterId);
      loadOverview();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-medium text-slate-500">
            THE WELKIN CLASSES · Protected Administration
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Question Bank &amp; Curriculum Dashboard
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/api/question-bank/download"
            download="welkin_classes_question_bank.json"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5" />
            Download JSON Bank
          </a>
          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setTab('bank')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                tab === 'bank' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Question Bank
            </button>
            <button
              type="button"
              onClick={() => setTab('students')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                tab === 'students' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              Students
            </button>
            <button
              type="button"
              onClick={() => setTab('enquiries')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                tab === 'enquiries' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              Enquiries &amp; Drive PYQs ({enquiries.filter((e) => e.status === 'open').length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      {overview && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-xl border border-[#DED8CA] bg-white p-4">
            <div className="text-xs text-[#5A6773]">Total MCQs</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#1E2A36] tabular-nums">
              {overview.stats.totalQuestions}
            </div>
          </div>
          <div className="rounded-xl border border-[#DED8CA] bg-white p-4">
            <div className="text-xs text-[#5A6773]">Ready Tests</div>
            <div className="mt-1 font-mono text-2xl font-bold text-[#355978] tabular-nums">
              {overview.stats.readyTestSets}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">NCERT Chapters</div>
            <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
              {overview.stats.totalChapters}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">Registered Students</div>
            <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
              {overview.stats.totalStudents}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">Submitted Attempts</div>
            <div className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
              {overview.stats.totalAttempts}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {feedback && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {feedback}
        </div>
      )}

      {tab === 'bank' ? (
        <div className="mt-6 space-y-6">
          {/* Syllabus Selector Bar */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                <option value={10}>Class 10 (CBSE Board 2025–26)</option>
                <option value={9}>Class 9 (NEW NCERT 2026–27)</option>
                <option value={8}>Class 8 (NCERT)</option>
                <option value={7}>Class 7 (NCERT)</option>
                <option value={6}>Class 6 (NCERT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600">Subject</label>
              <select
                value={selectedSubjectId ?? ''}
                onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.textbookTitle})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-600">Chapter</label>
                <button
                  type="button"
                  onClick={() => setShowChapterForm((v) => !v)}
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  {showChapterForm ? 'Cancel' : '+ Add Chapter'}
                </button>
              </div>
              <select
                value={selectedChapterId ?? ''}
                onChange={(e) => setSelectedChapterId(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              >
                {chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Ch {c.chapterNumber}: {c.title} ({c.totalQuestions} MCQs)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add New Chapter Form */}
          {showChapterForm && (
            <form
              onSubmit={handleAddChapter}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-4"
            >
              <h2 className="text-base font-bold text-slate-900">Add New Chapter</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Chapter Number</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={chNum}
                    onChange={(e) => setChNum(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Chapter Title</label>
                  <input
                    type="text"
                    required
                    value={chTitle}
                    onChange={(e) => setChTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Unit Name (Optional)</label>
                  <input
                    type="text"
                    value={chUnit}
                    onChange={(e) => setChUnit(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Description (Optional)</label>
                  <input
                    type="text"
                    value={chDesc}
                    onChange={(e) => setChDesc(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Save Chapter
              </button>
            </form>
          )}

          {/* Test Sets Overview & Create Test Set */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Chapter Test Sets</h2>
                <p className="text-xs text-slate-500">
                  A test set becomes live for students automatically once it reaches 10 verified MCQs.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={newSetLevel}
                  onChange={(e) => setNewSetLevel(Number(e.target.value) as DifficultyLevel)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800"
                >
                  {([1, 2, 3, 4, 5] as DifficultyLevel[]).map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {DIFFICULTY_META[lvl].name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => void handleCreateTestSet()}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 whitespace-nowrap"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New Test Set
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {testSets.map((ts) => (
                <div
                  key={ts.id}
                  className="rounded-lg border border-[#C6DED1] bg-[#ECF5F0]/60 px-3 py-2 text-xs text-[#184435]"
                >
                  <div className="font-semibold">{ts.title}</div>
                  <div className="mt-0.5 font-mono text-[11px] tabular-nums">
                    {ts.questionCount} direct MCQs
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit MCQ Question Form */}
          <form onSubmit={handleSaveQuestion} className="rounded-xl border border-[#DED8CA] bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1E2A36]">
                {editingQuestionId ? `Edit Question #${editingQuestionId}` : 'Add Verified MCQ Question'}
              </h2>
              {editingQuestionId && (
                <button
                  type="button"
                  onClick={resetQuestionForm}
                  className="text-xs font-semibold text-[#5A6773] hover:text-[#1E2A36]"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-[#334155]">Assign to Test Set</label>
                <select
                  required
                  value={qTestSetId}
                  onChange={(e) => setQTestSetId(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-white px-3 py-2 text-sm"
                >
                  {testSets.map((ts) => (
                    <option key={ts.id} value={ts.id}>
                      {ts.title} ({ts.questionCount} MCQs)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Correct Answer</label>
                <select
                  value={qCorrect}
                  onChange={(e) => setQCorrect(e.target.value as 'A' | 'B' | 'C' | 'D')}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Question Type</label>
                <select
                  value={qType}
                  onChange={(e) => setQType(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                >
                  <option value="factual">Factual</option>
                  <option value="conceptual">Conceptual</option>
                  <option value="numerical">Numerical</option>
                  <option value="application">Application</option>
                  <option value="assertion-reason">Assertion &amp; Reason</option>
                  <option value="case-based">Case-Based</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Question Text</label>
              <textarea
                required
                rows={2}
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                placeholder="Write a syllabus-accurate, original NCERT MCQ..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                value={qA}
                onChange={(e) => setQA(e.target.value)}
                placeholder="Option A"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                required
                value={qB}
                onChange={(e) => setQB(e.target.value)}
                placeholder="Option B"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                required
                value={qC}
                onChange={(e) => setQC(e.target.value)}
                placeholder="Option C"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                required
                value={qD}
                onChange={(e) => setQD(e.target.value)}
                placeholder="Option D"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">Answer Explanation</label>
              <textarea
                required
                rows={2}
                value={qExplanation}
                onChange={(e) => setQExplanation(e.target.value)}
                placeholder="Explain clearly why the correct option is right..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              {editingQuestionId ? 'Update Question' : 'Save Question to Bank'}
            </button>
          </form>

          {/* Existing Chapter Questions List */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Questions in Selected Chapter ({questions.length})
            </h2>
            {questions.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">
                No questions in this chapter yet. Use the form above to add verified MCQs.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-slate-100">
                {questions.map((q) => (
                  <div key={q.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{q.testSetTitle}</span> · Correct:{' '}
                        <span className="font-mono font-bold text-emerald-700">{q.correctOption}</span> ·{' '}
                        {q.questionType}
                      </div>
                      <p className="mt-1 whitespace-pre-line text-sm font-medium text-slate-900">
                        {q.questionText}
                      </p>
                      <p className="mt-1 text-xs text-slate-600">{q.explanation}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEditQuestion(q)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDeleteQuestion(q.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : tab === 'students' ? (
        /* Student Performance Tab */
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-5 py-3.5">Student</th>
                <th className="px-5 py-3.5">Class</th>
                <th className="px-5 py-3.5">Tests Completed</th>
                <th className="px-5 py-3.5">Average %</th>
                <th className="px-5 py-3.5">Highest Score</th>
                <th className="px-5 py-3.5">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!overview || overview.studentPerformance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    No registered students yet. Student records will appear here automatically as learners register and complete tests.
                  </td>
                </tr>
              ) : (
                overview.studentPerformance.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900">{st.name}</div>
                      <div className="text-xs text-slate-500">{st.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-700">Class {st.classNumber}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-800 tabular-nums">{st.testsCompleted}</td>
                    <td className="px-5 py-3.5 font-mono font-bold text-blue-700 tabular-nums">
                      {st.averagePercentage}%
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-800 tabular-nums">{st.highestScore}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 tabular-nums">
                      {st.lastAttemptAt ? new Date(st.lastAttemptAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Enquiries & Drive PYQ Links Tab */
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-5">
            <h2 className="text-base font-bold text-slate-900">
              Link Google Drive Class 10 PYQ PDF Pair
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Paste Question PDF &amp; Solution PDF links from your Google Drive folder to display them side-by-side in PYQ Studio.
            </p>
            <form onSubmit={handleAddDrivePyq} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Subject</label>
                <select
                  value={pyqSubjectSlug}
                  onChange={(e) => setPyqSubjectSlug(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                >
                  <option value="mathematics">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="social-science">Social Science</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="ict">ICT (Python &amp; MySQL)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Year</label>
                  <input
                    type="text"
                    required
                    value={pyqYear}
                    onChange={(e) => setPyqYear(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Paper Code</label>
                  <input
                    type="text"
                    value={pyqCode}
                    onChange={(e) => setPyqCode(e.target.value)}
                    placeholder="e.g., 30/1/2"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Paper Title *</label>
                <input
                  type="text"
                  required
                  value={pyqTitle}
                  onChange={(e) => setPyqTitle(e.target.value)}
                  placeholder="CBSE Class 10 Science 2024 Set 2"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Question Paper Drive Link / ID</label>
                <input
                  type="text"
                  value={pyqQuestionDriveUrl}
                  onChange={(e) => setPyqQuestionDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700">Solution PDF Drive Link / ID</label>
                <input
                  type="text"
                  value={pyqSolutionDriveUrl}
                  onChange={(e) => setPyqSolutionDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Side-by-Side Drive PYQ
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <h2 className="text-base font-bold text-slate-900">
              Student Enquiries &amp; Error Reports ({enquiries.length})
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Submitted reports routed for compoundinterest008@gmail.com.
            </p>
            <div className="mt-4 max-h-[480px] space-y-3 overflow-y-auto pr-1">
              {enquiries.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No student enquiries or error reports yet.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className={`rounded-xl border p-4 text-xs ${
                      enq.status === 'resolved'
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-slate-900">
                        {enq.studentName} {enq.studentEmail ? `(${enq.studentEmail})` : ''}
                      </div>
                      <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700">
                        {enq.issueType} · {enq.status}
                      </span>
                    </div>
                    {(enq.classNumber || enq.subjectName || enq.chapterTitle) && (
                      <div className="mt-1 text-[11px] text-slate-600">
                        {enq.classNumber ? `Class ${enq.classNumber}` : ''} {enq.subjectName ? `· ${enq.subjectName}` : ''} {enq.chapterTitle ? `· ${enq.chapterTitle}` : ''}
                      </div>
                    )}
                    {enq.questionRef && (
                      <div className="mt-1 text-[11px] italic text-slate-500">{enq.questionRef}</div>
                    )}
                    <p className="mt-2 whitespace-pre-line text-slate-800">{enq.message}</p>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{new Date(enq.createdAt).toLocaleString()}</span>
                      {enq.status !== 'resolved' && (
                        <button
                          type="button"
                          onClick={() => handleResolveEnquiry(enq.id)}
                          className="font-semibold text-emerald-700 hover:underline"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
