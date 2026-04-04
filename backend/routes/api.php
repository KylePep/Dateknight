<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function(){
    Route::middleware('auth:sanctum')->group(function(){
        Route::get('/user', [AuthController::class,'user']);
    });
});

    Route::middleware('auth:sanctum')->group(function(){
        Route::get('/users/search', [UserController::class,'search']);
    });

Route::prefix('dates')->group(base_path('routes/api/dates.php'));
Route::prefix('friends')->group(base_path('routes/api/friendships.php'));