<?php

namespace App\Http\Controllers;

use App\Models\Friendship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendshipController extends Controller
{
    /**
     * List friendships (accepted + pending)
     */
    public function index()
    {
        $userId = Auth::id();

        $friendships = Friendship::with([
            'user.profile:id,user_id,avatar',
            'friend.profile:id,user_id,avatar'
        ])
        ->where(function ($query) use ($userId) {
            $query->where('user_id', $userId)
                ->orWhere('friend_id', $userId);
        })
        ->get();

        $accepted = [];
        $incoming = [];
        $outgoing = [];

        foreach ($friendships as $f) {
            $isSender = $f->user_id === $userId;

            // Resolve "the other user"
            $otherUser = $isSender ? $f->friend : $f->user;

            $formatted = [
                'id' => $otherUser->id,
                'name' => $otherUser->name,
                'profile' => [
                    'avatar' => $otherUser->profile?->avatar,
                ],
                'friendship_id' => $f->id, 
            ];

            if ($f->status === 'accepted') {
                $accepted[] = $formatted;
            } elseif ($f->status === 'pending') {
                if ($isSender) {
                    $outgoing[] = $formatted;
                } else {
                    $incoming[] = $formatted;
                }
            }
        }

        return response()->json([
            'accepted' => $accepted,
            'incoming' => $incoming,
            'outgoing' => $outgoing,
        ]);
    }


    /**
     * Send a friend request
     */
    public function store(Request $request)
    {
        $request->validate([
            'friend_id' => 'required|exists:users,id|different:' . Auth::id(),
        ]);

        $userId = Auth::id();
        $friendId = $request->friend_id;

        // Normalize order to prevent duplicates
        [$userId, $friendId] = collect([$userId, $friendId])
            ->sort()
            ->values()
            ->all();

        // Check if already exists
        $exists = Friendship::where('user_id', $userId)
            ->where('friend_id', $friendId)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Friend request already exists'
            ], 409);
        }

        $friendship = Friendship::create([
            'user_id' => $userId,
            'friend_id' => $friendId,
            'status' => 'pending',
        ]);

        return response()->json($friendship, 201);
    }

    /**
     * Accept a friend request
     */
    public function accept(Friendship $friendship)
    {
        $userId = Auth::id();

        if ($friendship->friend_id !== $userId && $friendship->user_id !== $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($friendship->friend_id !== $userId) {
            return response()->json(['message' => 'Only recipient can accept'], 403);
        }

        $friendship->update([
            'status' => 'accepted'
        ]);

        return response()->json(['message' => 'Friend request accepted']);
    }

    /**
     * Decline a friend request
     */
    public function decline(Friendship $friendship)
    {
        $userId = Auth::id();

        if ($friendship->friend_id !== $userId && $friendship->user_id !== $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $friendship->update([
            'status' => 'declined'
        ]);

        return response()->json(['message' => 'Friend request declined']);
    }

    /**
     * Remove friendship (unfriend)
     */
    public function destroy(Friendship $friendship)
    {
        $userId = Auth::id();

        if ($friendship->friend_id !== $userId && $friendship->user_id !== $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $friendship->delete();

        return response()->json(['message' => 'Friend removed']);
    }
}
