<?php

use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
        Route::get('/', [RoomController::class, 'index']);

        Route::post('/', [RoomController::class, 'store']);

        Route::post('/{room}/leave', [RoomController::class, 'leave']);

        Route::post('/{room}/messages', [RoomController::class, 'sendMessage']);
        
        Route::get('/{room}/messages', [RoomController::class, 'messages']);
});