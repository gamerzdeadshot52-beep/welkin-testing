import React, { useEffect, useState } from 'react';
import { Award, TrendingUp, TrendingDown, BarChart3, Eye, Save, LogOut } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { Profile, StudentAnalytics, TestResultPayload } from '../types';

interface ProfileViewProps {
  profile: Profile | null;
  onOpenAuth: () => void;
  onProfileUpdated: (profile: Profile) => void;
  onLogout: () => void;
  onInspectAttempt: (result: TestResultPayload) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onOpenAuth,
  onProfileUpdated,
  onLogout,
  onInspectAttempt,
}) => {
  const [analytics, setAnalytics] = useState<StudentAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editName, setEditName] = useState(profile?.name ?? '');
  const [editClass, setEditClass] = useState(profile?.classNumber ?? 9);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setEditName(profile.name);
    setEditClass(profile.classNumber);
    setLoading(true);
    setError(null);
    apiRequest<StudentAnalytics>('/api/profile/analytics')
      .then(setAnalytics)
      .catch((err: any) => setError(err.message || 'Could not load progress analytics.'))
      .finally(() => setLoading(false));
  }, [profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await apiRequest<{ profile: Profile }>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name: editName, classNumber: editClass }),
      });
      onProfileUpdated(res.profile);
      setSaveMessage('Profile updated.');
    } catch (err: any) {
      setSaveMessage(err.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  const openAttemptReview = async (attemptId: number) => {
    try {
      const res = await apiRequest<TestResultPayload>(`/api/attempts/${attemptId}`);
      onInspectAttempt(res);
    } catch (err: any) {
      setError(err.message || 'Could not load attempt review.');
    }
  };

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-xl border border-[#DED8CA] bg-white p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-[#1E2A36]">Student Profile &amp; Progress</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#52606D]">
            Create a free student account or sign in to permanently record your test scores, track chapter-wise completion, identify your strongest and weakest subjects, and appear on your class leaderboard.
          </p>
          <button
            type="button"
            onClick={onOpenAuth}
            className="mt-6 rounded-lg bg-[#1E2A36] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#355978]"
          >
            Sign In or Create Student Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DED8CA] pb-6">
        <div>
          <p className="text-xs font-medium text-[#5A6773]">
            Student Profile · Class {profile.classNumber} · {profile.email}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1E2A36] sm:text-3xl">{profile.name}</h1>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-[#D7D1C4] bg-white px-4 py-2 text-sm font-semibold text-[#334155] transition-colors hover:bg-[#F7F4EC]"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Profile Settings Bar */}
      <form
        onSubmit={handleSaveProfile}
        className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border border-[#DED8CA] bg-white p-5"
      >
        <div className="min-w-[200px] flex-1">
          <label className="block text-xs font-semibold text-[#334155]" htmlFor="prof-name">
            Student Name
          </label>
          <input
            id="prof-name"
            type="text"
            required
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#D7D1C4] px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
          />
        </div>
        <div className="w-48">
          <label className="block text-xs font-semibold text-[#334155]" htmlFor="prof-class">
            Enrolled Class
          </label>
          <select
            id="prof-class"
            value={editClass}
            onChange={(e) => setEditClass(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-[#D7D1C4] bg-white px-3 py-2 text-sm text-[#1E2A36] focus:border-[#355978] focus:outline-none"
          >
            <option value={6}>Class 6</option>
            <option value={7}>Class 7</option>
            <option value={8}>Class 8</option>
            <option value={9}>Class 9</option>
            <option value={10}>Class 10</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1E2A36] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#355978] disabled:opacity-60 whitespace-nowrap"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Update Profile'}
        </button>
        {saveMessage && <span className="text-xs font-medium text-[#2A6651]">{saveMessage}</span>}
      </form>

      {loading || !analytics ? (
        <div className="mt-8 text-sm text-[#5A6773]">Loading your performance records...</div>
      ) : (
        <>
          {/* KPI Summary Strip */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-[#DED8CA] bg-white p-5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#5A6773]">
                <span>Tests Completed</span>
                <BarChart3 className="h-4 w-4 text-[#8A6843]" />
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-[#1E2A36] tabular-nums">
                {analytics.totalAttempts}
              </div>
            </div>

            <div className="rounded-xl border border-[#DED8CA] bg-white p-5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#5A6773]">
                <span>Average Percentage</span>
                <Award className="h-4 w-4 text-[#355978]" />
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-[#355978] tabular-nums">
                {analytics.averagePercentage}%
              </div>
              <div className="mt-1 text-xs text-[#5A6773] tabular-nums">
                Highest Score: {analytics.highestRawScore} ({analytics.highestScorePercentage}%)
              </div>
            </div>

            <div className="rounded-xl border border-[#DED8CA] bg-white p-5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#2A6651]">
                <span>Strongest Subject</span>
                <TrendingUp className="h-4 w-4 text-[#2A6651]" />
              </div>
              <div className="mt-2 text-lg font-bold text-[#1E2A36]">
                {analytics.strongestSubject ? analytics.strongestSubject.name : 'No attempts yet'}
              </div>
              {analytics.strongestSubject && (
                <div className="mt-1 font-mono text-xs text-[#52606D] tabular-nums">
                  {analytics.strongestSubject.averagePercentage}% avg · {analytics.strongestSubject.attempts} tests
                </div>
              )}
            </div>

            <div className="rounded-xl border border-[#DED8CA] bg-white p-5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8A6843]">
                <span>Needs More Practice</span>
                <TrendingDown className="h-4 w-4 text-[#8A6843]" />
              </div>
              <div className="mt-2 text-lg font-bold text-[#1E2A36]">
                {analytics.weakestSubject ? analytics.weakestSubject.name : 'No attempts yet'}
              </div>
              {analytics.weakestSubject && (
                <div className="mt-1 font-mono text-xs text-[#52606D] tabular-nums">
                  {analytics.weakestSubject.averagePercentage}% avg · {analytics.weakestSubject.attempts} tests
                </div>
              )}
            </div>
          </div>

          {/* Chapter-wise Progress */}
          {analytics.chapterProgress.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-[#1E2A36]">Chapter-Wise Progress</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {analytics.chapterProgress.map((ch) => {
                  const pct =
                    ch.totalReadySets > 0
                      ? Math.min(100, Math.round((ch.completedSets / ch.totalReadySets) * 100))
                      : 0;
                  return (
                    <div key={ch.chapterId} className="rounded-xl border border-[#DED8CA] bg-white p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs text-[#5A6773]">
                            Class {ch.classNumber} · {ch.subjectName}
                          </div>
                          <h3 className="mt-0.5 font-semibold text-[#1E2A36]">
                            Ch {ch.chapterNumber}: {ch.chapterTitle}
                          </h3>
                        </div>
                        <span className="font-mono text-sm font-bold text-[#355978] tabular-nums">
                          Best: {ch.bestPercentage}%
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#EFECE4]">
                        <div className="h-full rounded-full bg-[#355978]" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-[#5A6773] tabular-nums">
                        <span>
                          {ch.completedSets} of {ch.totalReadySets} ready tests completed
                        </span>
                        <span>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Previous Test Results Table */}
          <section className="mt-8">
            <h2 className="text-lg font-bold text-[#1E2A36]">Previous Test Results</h2>
            {analytics.recentAttempts.length === 0 ? (
              <div className="mt-4 rounded-xl border border-[#DED8CA] bg-white p-8 text-center text-sm text-[#5A6773]">
                You have not submitted any tests yet. Choose a class and chapter to take your first MCQ test.
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-xl border border-[#DED8CA] bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[#DED8CA] bg-[#FAF8F3] text-xs font-semibold text-[#52606D]">
                    <tr>
                      <th className="px-4 py-3">Class &amp; Subject</th>
                      <th className="px-4 py-3">Chapter / Test</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Percentage</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE4]">
                    {analytics.recentAttempts.map((att) => (
                      <tr key={att.id} className="hover:bg-[#FCFBF8]">
                        <td className="px-4 py-3 font-medium text-[#1E2A36]">
                          Class {att.classNumber} · {att.subjectName}
                        </td>
                        <td className="px-4 py-3 text-[#334155]">
                          <div>{att.chapterTitle}</div>
                          <div className="text-xs text-[#5A6773]">{att.testTitle}</div>
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#1E2A36] tabular-nums">
                          {att.score}/{att.totalMarks}
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-[#355978] tabular-nums">
                          {att.percentage}%
                        </td>
                        <td className="px-4 py-3 text-xs text-[#5A6773] tabular-nums">
                          {new Date(att.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => void openAttemptReview(att.id)}
                            className="inline-flex items-center gap-1 rounded-md border border-[#D7D1C4] px-3 py-1.5 text-xs font-semibold text-[#334155] hover:bg-[#F7F4EC] whitespace-nowrap"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};
