import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  Columns2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Flag,
  FolderOpen,
  Lightbulb,
  Link2,
  Printer,
  Search,
} from 'lucide-react';
import { apiRequest } from '../lib/api';
import { EnquiryContext, PyqPaperItem } from '../types';

interface PyqStudioViewProps {
  onBack: () => void;
  onReportError: (ctx: EnquiryContext) => void;
}

const DRIVE_FOLDER_EMBED_URL =
  'https://drive.google.com/embeddedfolderview?id=1w--IKGAoiricnru0PSjSIyQmzJ0zc7z7#list';

const DRIVE_FILE_ID_REGEX = /^[a-zA-Z0-9_-]{10,60}$/;

function extractDriveFileId(rawInput: string): string | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;
  if (DRIVE_FILE_ID_REGEX.test(trimmed)) return trimmed;
  const pathMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]{10,60})/);
  if (pathMatch && DRIVE_FILE_ID_REGEX.test(pathMatch[1])) return pathMatch[1];
  const queryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{10,60})/);
  if (queryMatch && DRIVE_FILE_ID_REGEX.test(queryMatch[1])) return queryMatch[1];
  return null;
}

const SUBJECT_FILTERS = [
  { slug: 'all', label: 'All Subjects' },
  { slug: 'mathematics', label: 'Mathematics' },
  { slug: 'science', label: 'Science' },
  { slug: 'social-science', label: 'Social Science' },
  { slug: 'english', label: 'English' },
  { slug: 'hindi', label: 'Hindi' },
  { slug: 'ict', label: 'ICT (Python & MySQL)' },
];

type DisplayMode = 'cards' | 'booklet';
type PrintMode = 'both' | 'questions' | 'solutions';

export const PyqStudioView: React.FC<PyqStudioViewProps> = ({ onBack, onReportError }) => {
  const [driveFolderUrl, setDriveFolderUrl] = useState(
    'https://drive.google.com/drive/folders/1w--IKGAoiricnru0PSjSIyQmzJ0zc7z7?usp=drive_link'
  );
  const [papers, setPapers] = useState<PyqPaperItem[]>([]);
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
  const [sectionFilter, setSectionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('cards');
  const [printMode, setPrintMode] = useState<PrintMode>('both');
  const [revealedMap, setRevealedMap] = useState<Record<string, boolean>>({});
  const [revealAll, setRevealAll] = useState(true);
  const [showDriveFolderEmbed, setShowDriveFolderEmbed] = useState(false);
  const [showManualDrivePanel, setShowManualDrivePanel] = useState(false);
  const [manualQuestionUrl, setManualQuestionUrl] = useState('');
  const [manualSolutionUrl, setManualSolutionUrl] = useState('');
  const [manualQuestionId, setManualQuestionId] = useState<string | null>(null);
  const [manualSolutionId, setManualSolutionId] = useState<string | null>(null);
  const [driveUrlError, setDriveUrlError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams();
    if (subjectFilter !== 'all') params.set('subjectSlug', subjectFilter);
    apiRequest<{ driveFolderUrl: string; papers: PyqPaperItem[] }>(`/api/pyqs?${params.toString()}`)
      .then((res) => {
        setDriveFolderUrl(res.driveFolderUrl);
        setPapers(res.papers);
        if (res.papers.length > 0) {
          setSelectedPaperId((prev) =>
            prev && res.papers.some((p) => p.id === prev) ? prev : res.papers[0].id
          );
        } else {
          setSelectedPaperId(null);
        }
      })
      .catch((err: any) => setError(err.message || 'Unable to load Class 10 PYQs.'))
      .finally(() => setLoading(false));
  }, [subjectFilter]);

  const activePaper = papers.find((p) => p.id === selectedPaperId) ?? papers[0] ?? null;

  useEffect(() => {
    setSectionFilter('all');
    setSearchQuery('');
  }, [activePaper?.id]);

  const sectionTabs = useMemo(() => {
    if (!activePaper) return [];
    const seen = new Set<string>();
    const list: string[] = [];
    for (const item of activePaper.qaItems) {
      if (!seen.has(item.section)) {
        seen.add(item.section);
        list.push(item.section);
      }
    }
    return list;
  }, [activePaper]);

  const filteredItems = useMemo(() => {
    if (!activePaper) return [];
    const q = searchQuery.trim().toLowerCase();
    return activePaper.qaItems.filter((item) => {
      if (sectionFilter !== 'all' && item.section !== sectionFilter) return false;
      if (q) {
        const hay = `${item.qNo} ${item.section} ${item.question} ${item.solution}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activePaper, sectionFilter, searchQuery]);

  const totalPaperMarks = useMemo(() => {
    if (!activePaper) return 0;
    return activePaper.qaItems.reduce((sum, item) => sum + Number(item.marks || 0), 0);
  }, [activePaper]);

  const isSolutionVisible = (qNo: string) => {
    if (revealAll) return revealedMap[qNo] !== false;
    return Boolean(revealedMap[qNo]);
  };

  const toggleQuestionSolution = (qNo: string) => {
    const currentlyVisible = isSolutionVisible(qNo);
    setRevealedMap((prev) => ({ ...prev, [qNo]: !currentlyVisible }));
  };

  const handleToggleAll = () => {
    const next = !revealAll;
    setRevealAll(next);
    setRevealedMap({});
  };

  const triggerPrintPdf = (mode: PrintMode) => {
    setPrintMode(mode);
    if (mode !== 'questions') {
      setRevealAll(true);
      setRevealedMap({});
    }
    window.setTimeout(() => {
      window.print();
    }, 60);
  };

  const handleApplyDrivePdfs = (e: React.FormEvent) => {
    e.preventDefault();
    setDriveUrlError('');
    const qId = manualQuestionUrl.trim() ? extractDriveFileId(manualQuestionUrl) : null;
    const sId = manualSolutionUrl.trim() ? extractDriveFileId(manualSolutionUrl) : null;

    if (manualQuestionUrl.trim() && !qId) {
      setDriveUrlError('Invalid Question PDF Google Drive URL or File ID.');
      return;
    }
    if (manualSolutionUrl.trim() && !sId) {
      setDriveUrlError('Invalid Solution PDF Google Drive URL or File ID.');
      return;
    }
    setManualQuestionId(qId);
    setManualSolutionId(sId);
  };

  const effectiveQuestionDriveId = manualQuestionId || activePaper?.questionDriveFileId || null;
  const effectiveSolutionDriveId = manualSolutionId || activePaper?.solutionDriveFileId || null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4D5A66] hover:text-[#1E2A36]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowManualDrivePanel((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2A36] transition-colors hover:bg-[#F7F4EC]"
          >
            <Link2 className="h-3.5 w-3.5 text-[#2A6651]" />
            Load Drive PDFs Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setShowDriveFolderEmbed((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DED8CA] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2A36] transition-colors hover:bg-[#F7F4EC]"
          >
            <FolderOpen className="h-3.5 w-3.5 text-[#355978]" />
            {showDriveFolderEmbed ? 'Hide Drive Folder Viewer' : 'Preview Drive Folder'}
          </button>
          <a
            href={driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E2A36] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#355978]"
          >
            Open Class 10 PYQ Google Drive
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Header & Drive Integration Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-xl border border-[#DED8CA] bg-white p-6 print:border-0 print:p-0"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#355978]">
              <Columns2 className="h-4 w-4" />
              Class 10 Full Board PYQ Studio &amp; Side-by-Side Solutions
            </div>
            <h1 className="mt-1.5 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
              Full Board Question Papers (30–39 Qs) &amp; Step-by-Step Solutions
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-[#52606D]">
              Complete Sections A to E/F Board Question Papers on the left paired with official CBSE Marking Scheme solutions side-by-side on the right. Save Question PDF, Solution PDF, or Side-by-Side PDF anytime, or load any pair of PDFs from your Google Drive folder.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5DFD2] bg-[#FAF8F3] px-4 py-3 text-xs text-[#4D5A66]">
            <div className="font-semibold text-[#1E2A36]">Google Drive PYQ Archive</div>
            <a
              href={driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 font-medium text-[#355978] hover:underline"
            >
              Class 10 PYQ Drive Folder
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Side-by-Side Drive PDF URL Loader */}
        {showManualDrivePanel && (
          <form
            onSubmit={handleApplyDrivePdfs}
            className="mt-5 rounded-xl border border-[#C6DFD2] bg-[#F4FAF7] p-4 print:hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-bold text-[#163D30]">
                Open Question PDF &amp; Solution PDF from Drive Side-by-Side
              </div>
              <a
                href={driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#355978] hover:underline"
              >
                Pick PDF links from Drive Folder →
              </a>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
              <div className="md:col-span-5">
                <label className="block text-[11px] font-semibold text-[#244E3F]">
                  Question Paper Drive PDF URL or File ID
                </label>
                <input
                  type="text"
                  value={manualQuestionUrl}
                  onChange={(e) => setManualQuestionUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view"
                  className="mt-1 w-full rounded-lg border border-[#B9D8CA] bg-white px-3 py-2 text-xs text-[#1E2A36] focus:border-[#2A6651] focus:outline-none"
                />
              </div>
              <div className="md:col-span-5">
                <label className="block text-[11px] font-semibold text-[#244E3F]">
                  Solution PDF Drive URL or File ID
                </label>
                <input
                  type="text"
                  value={manualSolutionUrl}
                  onChange={(e) => setManualSolutionUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view"
                  className="mt-1 w-full rounded-lg border border-[#B9D8CA] bg-white px-3 py-2 text-xs text-[#1E2A36] focus:border-[#2A6651] focus:outline-none"
                />
              </div>
              <div className="flex items-end gap-2 md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#2A6651] px-3 py-2 text-xs font-semibold text-white hover:bg-[#225442]"
                >
                  Load Side-by-Side
                </button>
              </div>
            </div>
            {driveUrlError && (
              <div className="mt-2 text-xs font-medium text-[#7F2929]">{driveUrlError}</div>
            )}
          </form>
        )}

        {showDriveFolderEmbed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-5 overflow-hidden rounded-xl border border-[#D7D1C4] bg-[#FAF8F3] print:hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5DFD2] px-4 py-2.5 text-xs text-[#4D5A66]">
              <span>
                Embedded Google Drive PYQ Folder (if folder access requires sign-in, click Open in New Tab).
              </span>
              <a
                href={driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#355978] hover:underline"
              >
                Open in New Tab →
              </a>
            </div>
            <iframe
              title="Class 10 PYQ Google Drive Folder"
              src={DRIVE_FOLDER_EMBED_URL}
              className="h-[360px] w-full bg-white"
            />
          </motion.div>
        )}

        {/* Subject Filter Tabs */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#EFECE4] pt-4 print:hidden">
          {SUBJECT_FILTERS.map((sf) => (
            <button
              key={sf.slug}
              type="button"
              onClick={() => setSubjectFilter(sf.slug)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                subjectFilter === sf.slug
                  ? 'bg-[#1E2A36] text-white'
                  : 'border border-[#DED8CA] bg-[#FAF8F3] text-[#4D5A66] hover:bg-[#EFECE4]'
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>
      </motion.div>

      {error && (
        <div className="mt-6 rounded-xl border border-[#E6C7C7] bg-[#FDF6F6] p-4 text-sm text-[#7F2929]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-6 text-sm text-[#5A6773]">Loading Full Class 10 Board PYQ papers...</div>
      ) : papers.length === 0 ? (
        <div className="mt-6 rounded-xl border border-[#DED8CA] bg-white p-8 text-center text-sm text-[#5A6773]">
          No PYQ papers found for this filter.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 print:mt-0 print:block">
          {/* Paper Selector Sidebar */}
          <aside className="lg:col-span-3 print:hidden">
            <div className="rounded-xl border border-[#DED8CA] bg-white p-4">
              <h2 className="text-xs font-bold tracking-wide text-[#5A6773] uppercase">
                Full Board Papers ({papers.length})
              </h2>
              <div className="mt-3 space-y-2">
                {papers.map((paper) => {
                  const isActive = activePaper?.id === paper.id;
                  const paperMarks = paper.qaItems.reduce(
                    (acc, item) => acc + Number(item.marks || 0),
                    0
                  );
                  return (
                    <button
                      key={paper.id}
                      type="button"
                      onClick={() => {
                        setSelectedPaperId(paper.id);
                        setRevealedMap({});
                      }}
                      className={`w-full rounded-xl border p-3.5 text-left transition-colors ${
                        isActive
                          ? 'border-[#355978] bg-[#EFF4F8]'
                          : 'border-[#E6E0D3] bg-[#FCFBF8] hover:bg-[#F4F1E8]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#355978]">
                        <span>{paper.subjectName}</span>
                        <span className="font-mono text-[11px] text-[#64717D]">{paper.examYear}</span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-[#1E2A36]">{paper.title}</div>
                      <div className="mt-1 font-mono text-[11px] text-[#64717D]">
                        Code: {paper.paperCode} · {paper.qaItems.length} Qs · {paperMarks} Marks
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Side-by-Side Question & Solution Stage */}
          <div className="lg:col-span-9">
            {activePaper && (
              <div className="rounded-xl border border-[#DED8CA] bg-white p-5 sm:p-6 print:border-0 print:p-0">
                {/* Print Header (visible cleanly when saving PDF) */}
                <div className="hidden border-b border-[#1E2A36] pb-3 print:block">
                  <div className="text-xs font-bold uppercase text-[#355978]">
                    THE WELKIN CLASSES · CBSE Class 10 Board PYQ ({activePaper.examYear}) · Paper {activePaper.paperCode}
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-[#1E2A36]">{activePaper.title}</h2>
                  <div className="mt-0.5 text-xs text-[#52606D]">
                    Mode:{' '}
                    {printMode === 'questions'
                      ? 'Question Paper Only'
                      : printMode === 'solutions'
                      ? 'Official Marking Scheme Solutions Only'
                      : 'Complete Question Paper & Side-by-Side Solutions'}
                    {' · '}Total: {activePaper.qaItems.length} Questions · {totalPaperMarks} Marks
                  </div>
                </div>

                {/* Interactive Paper Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#EFECE4] pb-4 print:hidden">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#355978]">
                      <span>{activePaper.subjectName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activePaper.examYear}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">Paper {activePaper.paperCode}</span>
                      <span aria-hidden="true">·</span>
                      <span className="rounded bg-[#EFF4F8] px-2 py-0.5 font-mono text-[11px] text-[#1E2A36]">
                        {activePaper.qaItems.length} Full Questions · {totalPaperMarks} Marks
                      </span>
                    </div>
                    <h2 className="mt-1 text-lg font-bold text-[#1E2A36] sm:text-xl">
                      {activePaper.title}
                    </h2>
                  </div>

                  {activePaper.qaItems.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      {/* View Switcher */}
                      <div className="inline-flex rounded-lg border border-[#D7D1C4] bg-[#FAF8F3] p-0.5">
                        <button
                          type="button"
                          onClick={() => setDisplayMode('cards')}
                          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                            displayMode === 'cards'
                              ? 'bg-[#1E2A36] text-white'
                              : 'text-[#4D5A66] hover:text-[#1E2A36]'
                          }`}
                        >
                          <Columns2 className="h-3 w-3" />
                          Q&amp;A Cards
                        </button>
                        <button
                          type="button"
                          onClick={() => setDisplayMode('booklet')}
                          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                            displayMode === 'booklet'
                              ? 'bg-[#1E2A36] text-white'
                              : 'text-[#4D5A66] hover:text-[#1E2A36]'
                          }`}
                        >
                          <BookOpen className="h-3 w-3" />
                          Split Booklet
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleToggleAll}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D7D1C4] bg-[#FAF8F3] px-3 py-1.5 text-xs font-semibold text-[#1E2A36] hover:bg-[#EFECE4]"
                      >
                        {revealAll ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5 text-[#8A4A35]" />
                            Hide Solutions
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5 text-[#2A6651]" />
                            Reveal All Solutions
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* PDF Export & Section Filter Bar */}
                {activePaper.qaItems.length > 0 && (
                  <div className="mt-4 space-y-3 border-b border-[#EFECE4] pb-4 print:hidden">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-xs font-bold text-[#5A6773]">Save / Print PDF:</span>
                        <button
                          type="button"
                          onClick={() => triggerPrintPdf('questions')}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#DED8CA] bg-[#FAF8F3] px-2.5 py-1.5 text-xs font-semibold text-[#1E2A36] hover:bg-[#EFECE4]"
                        >
                          <Printer className="h-3 w-3 text-[#355978]" />
                          Question Paper PDF
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerPrintPdf('solutions')}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#B9D8CA] bg-[#F2F8F5] px-2.5 py-1.5 text-xs font-semibold text-[#163D30] hover:bg-[#E4F1EA]"
                        >
                          <Printer className="h-3 w-3 text-[#2A6651]" />
                          Solutions PDF
                        </button>
                        <button
                          type="button"
                          onClick={() => triggerPrintPdf('both')}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#355978] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#27455F]"
                        >
                          <Printer className="h-3 w-3" />
                          Side-by-Side PDF
                        </button>
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search className="pointer-events-none absolute top-2.5 left-3 h-3.5 w-3.5 text-[#7A8692]" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search question or keyword..."
                          className="w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] py-1.5 pr-3 pl-8 text-xs text-[#1E2A36] focus:border-[#355978] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Section Tabs */}
                    {sectionTabs.length > 1 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSectionFilter('all')}
                          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                            sectionFilter === 'all'
                              ? 'bg-[#355978] text-white'
                              : 'border border-[#DED8CA] bg-white text-[#4D5A66] hover:bg-[#FAF8F3]'
                          }`}
                        >
                          All Sections ({activePaper.qaItems.length})
                        </button>
                        {sectionTabs.map((sec) => {
                          const count = activePaper.qaItems.filter((i) => i.section === sec).length;
                          return (
                            <button
                              key={sec}
                              type="button"
                              onClick={() => setSectionFilter(sec)}
                              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                                sectionFilter === sec
                                  ? 'bg-[#355978] text-white'
                                  : 'border border-[#DED8CA] bg-white text-[#4D5A66] hover:bg-[#FAF8F3]'
                              }`}
                            >
                              {sec} ({count})
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Side-by-Side Drive PDF Iframes (when DB-linked or manually loaded) */}
                {(effectiveQuestionDriveId || effectiveSolutionDriveId) && (
                  <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 print:hidden">
                    <div className="overflow-hidden rounded-xl border border-[#DED8CA]">
                      <div className="flex items-center justify-between border-b border-[#DED8CA] bg-[#FAF8F3] px-4 py-2.5 text-xs font-bold text-[#1E2A36]">
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-[#355978]" />
                          Question Paper PDF (Drive)
                        </span>
                      </div>
                      {effectiveQuestionDriveId ? (
                        <iframe
                          title="Question Paper Drive PDF"
                          src={`https://drive.google.com/file/d/${effectiveQuestionDriveId}/preview`}
                          className="h-[540px] w-full bg-white"
                        />
                      ) : (
                        <div className="p-6 text-xs text-[#64717D]">Question PDF link not attached.</div>
                      )}
                    </div>

                    <div className="overflow-hidden rounded-xl border border-[#B9D8CA]">
                      <div className="flex items-center justify-between border-b border-[#B9D8CA] bg-[#F2F8F5] px-4 py-2.5 text-xs font-bold text-[#163D30]">
                        <span className="inline-flex items-center gap-1.5">
                          <Lightbulb className="h-3.5 w-3.5 text-[#2A6651]" />
                          Official Solution PDF (Drive)
                        </span>
                      </div>
                      {effectiveSolutionDriveId ? (
                        <iframe
                          title="Solution Drive PDF"
                          src={`https://drive.google.com/file/d/${effectiveSolutionDriveId}/preview`}
                          className="h-[540px] w-full bg-white"
                        />
                      ) : (
                        <div className="p-6 text-xs text-[#64717D]">Solution PDF link not attached.</div>
                      )}
                    </div>
                  </div>
                )}

                {/* View Mode 1: Interactive Side-by-Side Question & Solution Rows */}
                {activePaper.qaItems.length > 0 && displayMode === 'cards' && (
                  <div className="mt-5 space-y-5">
                    <div className="hidden grid-cols-12 gap-4 px-2 text-xs font-bold tracking-wide text-[#5A6773] uppercase lg:grid print:hidden">
                      <div className="col-span-6">Board Question Paper</div>
                      <div className="col-span-6">Step-by-Step Solution &amp; Marking Scheme</div>
                    </div>

                    {filteredItems.length === 0 ? (
                      <div className="rounded-xl border border-[#DED8CA] bg-[#FCFBF8] p-6 text-center text-xs text-[#5A6773]">
                        No questions match your current section or search filter.
                      </div>
                    ) : (
                      filteredItems.map((item) => {
                        const visible = isSolutionVisible(item.qNo);
                        return (
                          <div
                            key={item.qNo}
                            className={`grid break-inside-avoid grid-cols-1 gap-4 rounded-xl border border-[#E5DFD2] bg-[#FCFBF8] p-4 ${
                              printMode === 'both' ? 'lg:grid-cols-12 print:grid-cols-12' : 'lg:grid-cols-12'
                            }`}
                          >
                            {/* Left: Question */}
                            <div
                              className={`flex flex-col justify-between rounded-lg border border-[#E5DFD2] bg-white p-4 ${
                                printMode === 'solutions'
                                  ? 'lg:col-span-6 print:hidden'
                                  : printMode === 'questions'
                                  ? 'lg:col-span-6 print:col-span-12'
                                  : 'lg:col-span-6 print:col-span-6'
                              }`}
                            >
                              <div>
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1EDE4] pb-2.5">
                                  <span className="font-mono text-xs font-bold text-[#355978]">
                                    {item.qNo} · {item.section}
                                  </span>
                                  <span className="rounded-md bg-[#EEF3F7] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#355978]">
                                    {item.marks} {item.marks === 1 ? 'Mark' : 'Marks'}
                                  </span>
                                </div>
                                <div className="mt-3 whitespace-pre-line text-sm leading-relaxed font-medium text-[#1E2A36]">
                                  {item.question}
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#F1EDE4] pt-2.5 print:hidden">
                                <button
                                  type="button"
                                  onClick={() => toggleQuestionSolution(item.qNo)}
                                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A6651] hover:underline lg:hidden"
                                >
                                  {visible ? 'Hide Solution' : 'Show Solution'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onReportError({
                                      classNumber: 10,
                                      subjectName: activePaper.subjectName,
                                      chapterTitle: `PYQ ${activePaper.examYear} (${activePaper.paperCode})`,
                                      questionRef: `${item.qNo}: ${item.question.slice(0, 140)}`,
                                      defaultIssueType: 'PYQ / Drive Paper Issue',
                                    })
                                  }
                                  className="inline-flex items-center gap-1 text-xs font-medium text-[#8A4A35] hover:underline"
                                >
                                  <Flag className="h-3 w-3" />
                                  Report Error
                                </button>
                              </div>
                            </div>

                            {/* Right: Solution */}
                            <div
                              className={`flex flex-col justify-between rounded-lg border border-[#C6DFD2] bg-[#F4FAF7] p-4 ${
                                printMode === 'questions'
                                  ? 'lg:col-span-6 print:hidden'
                                  : printMode === 'solutions'
                                  ? 'lg:col-span-6 print:col-span-12'
                                  : 'lg:col-span-6 print:col-span-6'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 border-b border-[#DCECE3] pb-2.5">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#184435]">
                                  <Lightbulb className="h-3.5 w-3.5 text-[#2A6651]" />
                                  Official Solution ({item.qNo})
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleQuestionSolution(item.qNo)}
                                  className="text-xs font-semibold text-[#2A6651] hover:underline print:hidden"
                                >
                                  {visible ? 'Hide' : 'Reveal'}
                                </button>
                              </div>

                              {visible ? (
                                <>
                                  <div className="mt-3 whitespace-pre-line font-sans text-sm leading-relaxed text-[#1B3A2F]">
                                    {item.solution}
                                  </div>
                                  {item.markingTip && (
                                    <div className="mt-4 rounded-lg border border-[#C6DFD2] bg-white/80 px-3 py-2 text-xs text-[#244E3F]">
                                      <span className="font-bold">Board Marking Tip: </span>
                                      {item.markingTip}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center print:hidden">
                                  <p className="text-xs text-[#4D6B5E]">
                                    Solve on paper first, then reveal the marking scheme solution.
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => toggleQuestionSolution(item.qNo)}
                                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#2A6651] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#225442]"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Show Solution
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* View Mode 2: Dual Booklet Split View (Full Question Paper Left | Full Solution Booklet Right) */}
                {activePaper.qaItems.length > 0 && displayMode === 'booklet' && (
                  <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {/* Left Pane: Full Question Paper Booklet */}
                    <div
                      className={`flex flex-col rounded-xl border border-[#DED8CA] bg-[#FCFBF8] ${
                        printMode === 'solutions' ? 'print:hidden' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-[#DED8CA] bg-[#F5F2EA] px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E2A36]">
                          <FileText className="h-4 w-4 text-[#355978]" />
                          Question Paper Booklet ({filteredItems.length} Qs)
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-[#5A6773]">
                          {activePaper.paperCode}
                        </span>
                      </div>
                      <div className="max-h-[720px] space-y-4 overflow-y-auto p-4 print:max-h-none print:overflow-visible">
                        {filteredItems.map((item) => (
                          <div
                            key={`q-${item.qNo}`}
                            className="break-inside-avoid rounded-lg border border-[#E6E0D3] bg-white p-3.5"
                          >
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className="font-mono font-bold text-[#355978]">
                                {item.qNo} · {item.section}
                              </span>
                              <span className="font-mono text-[11px] font-semibold text-[#5A6773]">
                                [{item.marks}M]
                              </span>
                            </div>
                            <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#1E2A36]">
                              {item.question}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Pane: Full Official Solution Booklet */}
                    <div
                      className={`flex flex-col rounded-xl border border-[#B9D8CA] bg-[#F4FAF7] ${
                        printMode === 'questions' ? 'print:hidden' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between border-b border-[#B9D8CA] bg-[#E7F3ED] px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163D30]">
                          <Lightbulb className="h-4 w-4 text-[#2A6651]" />
                          Official Marking Scheme Solutions
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-[#2A6651]">
                          Step-by-Step
                        </span>
                      </div>
                      <div className="max-h-[720px] space-y-4 overflow-y-auto p-4 print:max-h-none print:overflow-visible">
                        {filteredItems.map((item) => {
                          const visible = isSolutionVisible(item.qNo);
                          return (
                            <div
                              key={`s-${item.qNo}`}
                              className="break-inside-avoid rounded-lg border border-[#C6DFD2] bg-white p-3.5"
                            >
                              <div className="flex items-center justify-between gap-2 text-xs">
                                <span className="font-mono font-bold text-[#184435]">
                                  Ans {item.qNo} · {item.section}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleQuestionSolution(item.qNo)}
                                  className="text-xs font-semibold text-[#2A6651] hover:underline print:hidden"
                                >
                                  {visible ? 'Hide' : 'Reveal'}
                                </button>
                              </div>
                              {visible ? (
                                <>
                                  <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#1B3A2F]">
                                    {item.solution}
                                  </div>
                                  {item.markingTip && (
                                    <div className="mt-2.5 rounded border border-[#D4E8DD] bg-[#F4FAF7] px-2.5 py-1.5 text-xs text-[#244E3F]">
                                      <span className="font-bold">Marking Tip: </span>
                                      {item.markingTip}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleQuestionSolution(item.qNo)}
                                  className="mt-2 text-xs font-semibold text-[#2A6651] hover:underline print:hidden"
                                >
                                  Click to reveal solution
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
