'use client';

import { useAuthContext } from '@/context/AuthContext';

export default function Page() {
  const { user } = useAuthContext();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen gap-8 p-4">
      {/* Profile Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h1>{user.name}'s Profile</h1>
        <img
          src={user.profile?.avatar || '/default-avatar.png'}
          alt={`${user.name} avatar`}
          className="w-32 h-32 rounded-full"
        />
        <p>{user.profile?.bio || 'No bio yet.'}</p>
        {user.profile?.preferences && (
          <div>
            <h3>Preferences:</h3>
            <pre>{JSON.stringify(user.profile.preferences, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Friends List */}
      <div className="flex-1 flex flex-col gap-2">
        <h2>Friends</h2>
        {user.friends && user.friends.length > 0 ? (
          user.friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-2 p-2 border rounded">
              <img
                src={friend.profile?.avatar || '/default-avatar.png'}
                alt={`${friend.name} avatar`}
                className="w-12 h-12 rounded-full"
              />
              <span>{friend.name}</span>
            </div>
          ))
        ) : (
          <p>No friends yet.</p>
        )}
      </div>
    </div>
  );
}
