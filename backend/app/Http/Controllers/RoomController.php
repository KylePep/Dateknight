<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\RoomService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function store(Request $request, RoomService $service)
    {
        $request->validate(([
            'user_id' => 'required|exists:users,id'
        ]));

        $creator = Auth::user();
        $invitee = User::findOrFail($request->user_id);

        $room = $service->createRoom($creator, $invitee);

        return response()->json($room);
    }
}
