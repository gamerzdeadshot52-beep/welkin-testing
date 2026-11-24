import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { apiRequest } from '../lib/api';
import { LeaderboardEntry } from '../types';

export const LeaderboardView: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<number>(9);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiRequest<{ classNumber: number; entries: LeaderboardEntry[] }>(
      `/api/leaderboard?classNumber=${selectedClass}`
    )
      .then((res) => setEntries(res.entries))
      .catch((err: any) => setError(err.message || 'Could not load leaderboard.'))
      .finally(() => setLoading(false));
  }, [selectedClass]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#DED8CA] pb-6">
        <div>
          <p className="text-xs font-medium text-[#5A6773]">
            Verified Student Rankings · Separated by Class
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1E2A36] sm:text-3xl">
            Class {selectedClass} Leaderboard
          </h1>
          <p className="mt-1 text-sm text-[#52606D]">
            Rankings are computed exclusively from real submitted examination attempts.
          </p>
        </div>

        {/* Interactive Class Selector */}
        <div className="flex items-center gap-1 rounded-lg border border-[#DED8CA] bg-[#F0EDE4] p-1">
          {[6, 7, 8, 9, 10].map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => setSelectedClass(cls)}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedClass === cls
                  ? 'bg-white text-[#1E2A36] shadow-xs'
                  : 'text-[#52606D] hover:text-[#1E2A36]'
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-[#E0B0B0] bg-[#FCF2F2] px-4 py-3 text-sm text-[#7F2929]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-8 text-sm text-[#5A6773]">Loading Class {selectedClass} leaderboard...</div>
      ) : entries.length === 0 ? (
        <div className="mt-8 rounded-xl border border-[#DED8CA] bg-white p-10 text-center">
          <Trophy className="mx-auto h-10 w-10 text-[#8A6843]/50" />
          <h2 className="mt-3 text-lg font-bold text-[#1E2A36]">
            No Submitted Tests Yet for Class {selectedClass}
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-[#52606D]">
            THE WELKIN CLASSES only displays verified scores from real student attempts. Sign in, complete a Class {selectedClass} test, and become the first student on this leaderboard.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-[#DED8CA] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#DED8CA] bg-[#FAF8F3] text-xs font-semibold text-[#4D5A66]">
              <tr>
                <th className="px-5 py-3.5">Rank</th>
                <th className="px-5 py-3.5">Student Name</th>
                <th className="px-5 py-3.5">Class</th>
                <th className="px-5 py-3.5">Tests Completed</th>
                <th className="px-5 py-3.5">Average %</th>
                <th className="px-5 py-3.5">Highest Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE4]">
              {entries.map((entry) => (
                <tr key={entry.profileId} className="hover:bg-[#FAF8F3]">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#8A6843] tabular-nums">
                    #{entry.rank}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-[#1E2A36]">{entry.name}</td>
                  <td className="px-5 py-3.5 text-[#52606D]">Class {entry.classNumber}</td>
                  <td className="px-5 py-3.5 font-mono text-[#4D5A66] tabular-nums">
                    {entry.testsCompleted}
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-[#355978] tabular-nums">
                    {entry.averagePercentage}%
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[#1E2A36] tabular-nums">
                    {entry.highestScore} ({entry.highestPercentage}%)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
