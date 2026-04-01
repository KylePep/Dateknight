<?php

namespace App\Http\Controllers;

use App\Models\Date;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $publicDates = Date::with('user:id,name')
        ->where('is_public', true)
        ->where('user_id', '!=', $user->id)
        ->get();

        $myDates = $user->dates()->get();

        return response()->json([
            'public' => $publicDates,
            'mine' => $myDates
        ]);
    }

    public function userDates($id){
        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($id != $user->id){
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $dates = $user->dates()->get();

        return response()->json($dates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2500',
            'is_public' => 'required|boolean',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $date = $user->dates()->create($validated);

        return response()->json([
            'message' => 'Date Created successfully',
            'data' => $date,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            'message' => "Showing date {$id}"
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return response()->json([
            'message' => "Updated date {$id}",
            'data' => $request->all()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return response()->json([
            'message' => "Deleted date {$id}"
        ]);
    }
}
