<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomDateSelection;
use App\Services\RoomFlowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomDateSelectionController extends Controller
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
            ->submitDateSelection(Auth::user(), $room, $request->date_ids);
    }

    /**
     * Display the specified resource.
     */
    public function show(RoomDateSelection $roomDateSelection)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoomDateSelection $roomDateSelection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoomDateSelection $roomDateSelection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomDateSelection $roomDateSelection)
    {
        //
    }
}
