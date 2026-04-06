<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomRanking;
use App\Services\RoomFlowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomRankingController extends Controller
{
    public function __construct(
        protected RoomFlowService $roomFlowService
    )
    {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Room $room)
    {
        return $this->roomFlowService
            ->submitRankings(Auth::user(), $room, $request->date_ids, $request->date_rankings);
    }

    /**
     * Display the specified resource.
     */
    public function show(RoomRanking $roomRanking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomRanking $roomRanking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomRanking $roomRanking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomRanking $roomRanking)
    {
        //
    }
}
