<?php

use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomDateSelectionController;
use App\Http\Controllers\RoomRankingController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
        Route::get('/', [RoomController::class, 'index']);
        
        Route::post('/', [RoomController::class, 'store']);

        Route::get('/{room}', [RoomController::class, 'show']);

        Route::post('/{room}/leave', [RoomController::class, 'leave']);

        Route::post('/{room}/messages', [RoomController::class, 'sendMessage']);
        
        Route::get('/{room}/messages', [RoomController::class, 'messages']);

        Route::post('/{room}/select-dates', [RoomDateSelectionController::class, 'store']);

        Route::post('/{room}/rank-dates', [RoomRankingController::class, 'store']);
});