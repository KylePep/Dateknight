<?php

use App\Http\Controllers\FriendshipController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [FriendshipController::class, 'index']);
    Route::post('/', [FriendshipController::class, 'store']);
    Route::patch('/{friendship}/accept', [FriendshipController::class, 'accept']);
    Route::patch('/{friendship}/decline', [FriendshipController::class, 'decline']);
    Route::delete('/{friendship}', [FriendshipController::class, 'destroy']);
});