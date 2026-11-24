import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  Lightbulb,
  Printer,
  Search,
  Sparkles,
} from 'lucide-react';
import { apiRequest } from '../lib/api';
import { ChapterNotePayload, EnquiryContext } from '../types';

interface NotesLibraryViewProps {
  initialClassNumber?: number;
  initialChapterId?: number | null;
  onBack: () => void;
  onStartRevision: (chapterId: number, count: number) => void;
  onOpenChapterTests: (chapterId: number) => void;
  onReportError: (ctx: EnquiryContext) => void;
}

interface BrowseSubject {
  id: number;
  slug: string;
  name: string;
  textbookTitle: string;
  classNumber: number;
  chapterCount: number;
}

interface BrowseChapter {
  id: number;
  chapterNumber: number;
  title: string;
  unitName: string | null;
  description: string | null;
  subjectId: number;
  subjectName: string;
  totalQuestions: number;
}

export const NotesLibraryView: React.FC<NotesLibraryViewProps> = ({
  initialClassNumber = 10,
  initialChapterId = null,
  onBack,
  onStartRevision,
  onOpenChapterTests,
  onReportError,
}) => {
  const [selectedClass, setSelectedClass] = useState(initialClassNumber);
  const [subjects, setSubjects] = useState<BrowseSubject[]>([]);
  const [activeSubjectId, setActiveSubjectId] = useState<number>(0);
  const [chapters, setChapters] = useState<BrowseChapter[]>([]);
  const [search, setSearch] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(initialChapterId);
  const [notePayload, setNotePayload] = useState<ChapterNotePayload | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingNote, setLoadingNote] = useState(false);

  // If opened directly for a specific chapterId, load that note first and sync class/subject tabs
  useEffect(() => {
    if (!initialChapterId) return;
    setLoadingNote(true);
    apiRequest<ChapterNotePayload>(`/api/chapters/${initialChapterId}/notes`)
      .then((res) => {
        setNotePayload(res);
        setSelectedChapterId(res.chapter.id);
        setSelectedClass(res.chapter.classNumber);
        setActiveSubjectId(res.chapter.subjectId);
      })
      .finally(() => setLoadingNote(false));
  }, [initialChapterId]);

  useEffect(() => {
    setLoadingList(true);
    const params = new URLSearchParams({
      classNumber: String(selectedClass),
      subjectId: String(activeSubjectId || 0),
      search,
    });
    apiRequest<{
      classNumber: number;
      subjects: BrowseSubject[];
      activeSubjectId: number;
      chapters: BrowseChapter[];
    }>(`/api/notes/browse?${params.toString()}`)
      .then((res) => {
        setSubjects(res.subjects);
        setActiveSubjectId(res.activeSubjectId);
        setChapters(res.chapters);
        if (res.chapters.length > 0 && (!selectedChapterId || !res.chapters.some((c) => c.id === selectedChapterId))) {
          setSelectedChapterId(res.chapters[0].id);
        }
      })
      .finally(() => setLoadingList(false));
  }, [selectedClass, activeSubjectId, search]);

  useEffect(() => {
    if (!selectedChapterId) return;
    setLoadingNote(true);
    apiRequest<ChapterNotePayload>(`/api/chapters/${selectedChapterId}/notes`)
      .then((res) => setNotePayload(res))
      .finally(() => setLoadingNote(false));
  }, [selectedChapterId]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4D5A66] hover:text-[#1E2A36]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {notePayload && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2A36] hover:bg-[#F7F4EC]"
            >
              <Printer className="h-3.5 w-3.5 text-[#355978]" />
              Print Notes
            </button>
            <button
              type="button"
              onClick={() => onStartRevision(notePayload.chapter.id, 20)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2A6651] px-4 py-2 text-xs font-semibold text-white hover:bg-[#225442]"
            >
              <BookOpenCheck className="h-3.5 w-3.5" />
              Practice Revision Qs
            </button>
          </div>
        )}
      </div>

      {/* Header & Class Selector */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-xl border border-[#DED8CA] bg-white p-6 print:hidden"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651]">
              <BookOpen className="h-4 w-4" />
              Complete Exam Notes Library · Classes 6–10
            </div>
            <h1 className="mt-1 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
              Chapter-Wise Exam Revision Notes
            </h1>
            <p className="mt-1 text-sm text-[#52606D]">
              Dedicated study notes for every NCERT chapter across Classes 6 to 10—covering definitions, formulas, scoring tips, and common pitfalls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#DED8CA] bg-[#F5F2EA] p-1">
            {[6, 7, 8, 9, 10].map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => {
                  setSelectedClass(cls);
                  setActiveSubjectId(0);
                  setSelectedChapterId(null);
                }}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedClass === cls
                    ? 'bg-[#1E2A36] text-white'
                    : 'text-[#4D5A66] hover:text-[#1E2A36]'
                }`}
              >
                Class {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Pills & Search */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#EFECE4] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {subjects.map((subj) => (
              <button
                key={subj.id}
                type="button"
                onClick={() => {
                  setActiveSubjectId(subj.id);
                  setSelectedChapterId(null);
                }}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeSubjectId === subj.id
                    ? 'bg-[#355978] text-white'
                    : 'border border-[#DED8CA] bg-[#FAF8F3] text-[#4D5A66] hover:bg-[#EFECE4]'
                }`}
              >
                {subj.name} ({subj.chapterCount})
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-3.5 w-3.5 text-[#7A8692]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chapter title..."
              className="w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] py-2 pr-3 pl-8 text-xs text-[#1E2A36] focus:border-[#355978] focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Chapter List */}
        <aside className="lg:col-span-4 print:hidden">
          <div className="rounded-xl border border-[#DED8CA] bg-white p-4">
            <div className="text-xs font-bold tracking-wide text-[#5A6773] uppercase">
              Chapters ({chapters.length})
            </div>
            {loadingList ? (
              <div className="py-6 text-xs text-[#64717D]">Loading chapters...</div>
            ) : (
              <div className="mt-3 max-h-[580px] space-y-2 overflow-y-auto pr-1">
                {chapters.map((ch) => {
                  const isActive = selectedChapterId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`w-full rounded-xl border p-3 text-left transition-colors ${
                        isActive
                          ? 'border-[#2A6651] bg-[#ECF5F0]'
                          : 'border-[#E6E0D3] bg-[#FCFBF8] hover:bg-[#F4F1E8]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-[#5A6773]">
                        <span>Chapter {ch.chapterNumber}</span>
                        {ch.unitName && <span className="truncate text-[#8A6843]">{ch.unitName}</span>}
                      </div>
                      <div className="mt-0.5 text-sm font-bold text-[#1E2A36]">{ch.title}</div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Notes Reader Pane */}
        <div className="lg:col-span-8">
          {loadingNote ? (
            <div className="rounded-xl border border-[#DED8CA] bg-white p-8 text-sm text-[#5A6773]">
              Loading chapter notes...
            </div>
          ) : notePayload ? (
            <motion.div
              key={notePayload.chapter.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[#DED8CA] bg-white p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#EFECE4] pb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#355978]">
                    <span>Class {notePayload.chapter.classNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{notePayload.chapter.subjectName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{notePayload.chapter.textbookTitle}</span>
                  </div>
                  <h2 className="mt-1.5 text-2xl font-bold text-[#1E2A36]">
                    Ch {notePayload.chapter.chapterNumber}: {notePayload.chapter.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onReportError({
                      classNumber: notePayload.chapter.classNumber,
                      subjectName: notePayload.chapter.subjectName,
                      chapterTitle: `Ch ${notePayload.chapter.chapterNumber}: ${notePayload.chapter.title}`,
                      defaultIssueType: 'Chapter Notes Feedback',
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-[#E5DFD2] bg-[#FAF8F3] px-3 py-1.5 text-xs font-semibold text-[#8A4A35] hover:bg-[#F3ECE4] print:hidden"
                >
                  <Flag className="h-3.5 w-3.5" />
                  Report Note Issue
                </button>
              </div>

              {/* Overview */}
              <div className="mt-5 rounded-xl border border-[#D8E2EA] bg-[#F4F8FB] p-4">
                <div className="text-xs font-bold tracking-wide text-[#355978] uppercase">
                  Chapter Overview
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#24323F]">
                  {notePayload.note.overview}
                </p>
              </div>

              {/* Key Concepts */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#1E2A36]">
                  <Sparkles className="h-4 w-4 text-[#355978]" />
                  Core Concepts &amp; Exam Explanations
                </h3>
                <div className="mt-3 space-y-3">
                  {notePayload.note.keyConcepts.map((c, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#E6E0D3] bg-[#FCFBF8] p-4"
                    >
                      <div className="text-sm font-bold text-[#1E2A36]">
                        {idx + 1}. {c.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[#334155]">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick-Recall Formulas & Facts */}
              <div className="mt-6 rounded-xl border border-[#C8DDD2] bg-[#F2F8F5] p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#163D30]">
                  <CheckCircle2 className="h-4 w-4 text-[#2A6651]" />
                  Quick-Recall Formulas, Definitions &amp; High-Yield Facts
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-[#1D3E32]">
                  {notePayload.note.formulasAndFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2A6651]" />
                      <span className="leading-relaxed">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exam Tips & Common Mistakes */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#D8E2EA] bg-[#F8FBFD] p-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#355978] uppercase">
                    <Lightbulb className="h-4 w-4" />
                    How to Score Full Marks
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#24323F]">
                    {notePayload.note.examTips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#E7D4CC] bg-[#FDF8F5] p-4">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#8A4A35] uppercase">
                    <AlertTriangle className="h-4 w-4" />
                    Common Mistakes to Avoid
                  </h4>
                  <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#4E2A1E]">
                    {notePayload.note.commonMistakes.map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#EFECE4] pt-5 print:hidden">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!notePayload.prevChapterId}
                    onClick={() => notePayload.prevChapterId && setSelectedChapterId(notePayload.prevChapterId)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#D7D1C4] bg-white px-3.5 py-2 text-xs font-semibold text-[#334155] hover:bg-[#F7F4EC] disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev Chapter
                  </button>
                  <button
                    type="button"
                    disabled={!notePayload.nextChapterId}
                    onClick={() => notePayload.nextChapterId && setSelectedChapterId(notePayload.nextChapterId)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#D7D1C4] bg-white px-3.5 py-2 text-xs font-semibold text-[#334155] hover:bg-[#F7F4EC] disabled:opacity-40"
                  >
                    Next Chapter
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChapterTests(notePayload.chapter.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E2A36] px-4 py-2 text-xs font-semibold text-white hover:bg-[#355978]"
                >
                  Open Chapter Tests (10–50 Qs)
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-xl border border-[#DED8CA] bg-white p-8 text-sm text-[#5A6773]">
              Select a chapter on the left to read its exam notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
