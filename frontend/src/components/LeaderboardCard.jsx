import React from 'react';

const leaderboardData = [
  { rank: 1, name: 'Ethan Harper', points: '12,500 pts' },
  { rank: 2, name: 'Olivia Bennett', points: '11,800 pts' },
  { rank: 3, name: 'You', points: '10,200 pts', isUser: true },
  { rank: 4, name: 'Sophia Chen', points: '9,900 pts' },
];

export default function LeaderboardCard() {
  return (
    <div className="card p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
      <ul className="space-y-4 flex-grow flex flex-col justify-around">
        {leaderboardData.map(user => (
          <li 
            key={user.rank} 
            className={`flex items-center justify-between ${user.isUser ? 'bg-[var(--primary-color)]/20 p-2 rounded-lg -m-2' : ''}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">{user.rank}</span>
              <p className={user.isUser ? 'font-bold text-white' : ''}>{user.name}</p>
            </div>
            <span className={user.isUser ? 'font-bold text-white' : 'text-[var(--text-secondary-color)]'}>
              {user.points}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}