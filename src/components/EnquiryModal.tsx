import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Mail, Send, X } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { EnquiryContext, Profile } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  context?: EnquiryContext | null;
  profile: Profile | null;
  onClose: () => void;
}

const ISSUE_TYPES = [
  'Question / Answer Error',
  'Solution / Explanation Correction',
  'PYQ / Drive Paper Issue',
  'Chapter Notes Feedback',
  'General Enquiry',
];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  context,
  profile,
  onClose,
}) => {
  const [studentName, setStudentName] = useState(profile?.name || '');
  const [studentEmail, setStudentEmail] = useState(profile?.email || '');
  const [classNumber, setClassNumber] = useState<string>(
    context?.classNumber ? String(context.classNumber) : profile?.classNumber ? String(profile.classNumber) : '10'
  );
  const [subjectName, setSubjectName] = useState(context?.subjectName || '');
  const [chapterTitle, setChapterTitle] = useState(context?.chapterTitle || '');
  const [questionRef, setQuestionRef] = useState(context?.questionRef || '');
  const [issueType, setIssueType] = useState(context?.defaultIssueType || ISSUE_TYPES[0]);
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    id: number;
    emailDelivered: boolean;
    recipient: string;
    mailtoUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStudentName((prev) => prev || profile?.name || '');
    setStudentEmail((prev) => prev || profile?.email || '');
    if (context?.classNumber) setClassNumber(String(context.classNumber));
    if (context?.subjectName !== undefined) setSubjectName(context.subjectName || '');
    if (context?.chapterTitle !== undefined) setChapterTitle(context.chapterTitle || '');
    if (context?.questionRef !== undefined) setQuestionRef(context.questionRef || '');
    if (context?.defaultIssueType) setIssueType(context.defaultIssueType);
    setError('');
    setResult(null);
  }, [isOpen, context, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await apiRequest<{
        id: number;
        saved: boolean;
        emailDelivered: boolean;
        recipient: string;
        mailtoUrl: string;
      }>('/api/enquiries', {
        method: 'POST',
        body: JSON.stringify({
          studentName,
          studentEmail,
          classNumber: classNumber ? Number(classNumber) : null,
          subjectName,
          chapterTitle,
          questionRef,
          issueType,
          message,
        }),
      });
      setResult(res);
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Unable to submit enquiry right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#141D26]/55 p-4 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#DED8CA] bg-white p-6 shadow-xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry modal"
              className="absolute top-4 right-4 rounded-lg p-1.5 text-[#5A6773] transition-colors hover:bg-[#F4F1E8] hover:text-[#1E2A36]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDF2EC] text-[#8A4A35]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1E2A36]">
                  Enquiry &amp; Report an Error
                </h2>
                <p className="text-xs text-[#5A6773]">
                  Direct delivery to <span className="font-mono font-semibold text-[#355978]">compoundinterest008@gmail.com</span>
                </p>
              </div>
            </div>

            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl border border-[#B9D8CA] bg-[#F2F8F5] p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2A6651]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#163D30]">
                      Report #{result.id} Submitted Successfully
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#244E3F]">
                      {result.emailDelivered
                        ? `Your message has been delivered directly to ${result.recipient} and logged for our academic review team.`
                        : `Your enquiry has been saved for our academic team. Click below to send it immediately from your email client directly to ${result.recipient}.`}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <a
                    href={result.mailtoUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#2A6651] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#225442]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Send Mail to compoundinterest008@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#C9D6CE] bg-white px-4 py-2 text-xs font-semibold text-[#1E2A36] hover:bg-[#FAF9F5]"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-[#E5BABA] bg-[#FDF4F4] p-3 text-xs text-[#7F2929]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#334155]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g., Aarav Sharma"
                      className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#334155]">
                      Your Email (for reply)
                    </label>
                    <input
                      type="email"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#334155]">
                      Issue / Enquiry Type
                    </label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
                    >
                      {ISSUE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#334155]">
                      Class
                    </label>
                    <select
                      value={classNumber}
                      onChange={(e) => setClassNumber(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
                    >
                      <option value="">General / All Classes</option>
                      {[6, 7, 8, 9, 10].map((c) => (
                        <option key={c} value={c}>
                          Class {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {(subjectName || chapterTitle || questionRef) && (
                  <div className="rounded-lg border border-[#E5DFD2] bg-[#FAF8F3] p-3 text-xs text-[#4D5A66]">
                    <div className="font-semibold text-[#1E2A36]">Attached Context</div>
                    <div className="mt-1 space-y-0.5">
                      {subjectName && <div>Subject: {subjectName}</div>}
                      {chapterTitle && <div>Chapter: {chapterTitle}</div>}
                      {questionRef && <div className="line-clamp-2">Item: {questionRef}</div>}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#334155]">
                    Describe the Error or Your Enquiry *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us the question number, what seems incorrect, or any study question/enquiry..."
                    className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-[#FCFBF8] px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[#D7D1C4] bg-white px-4 py-2 text-xs font-semibold text-[#4D5A66] hover:bg-[#F7F4EC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E2A36] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#355978] disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {submitting ? 'Sending...' : 'Submit Report / Mail'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
