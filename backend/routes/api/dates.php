<?php

use App\Http\Controllers\DateController;
use Illuminate\Support\Facades\Route;

// Dev-only endpoints (no auth)
Route::prefix('postman')->group(function(){
  Route::get('/', [DateController::class, 'index']);

  Route::post('/', [DateController::class, 'store']);

  Route::get('/{id}', [DateController::class, 'show']);

  Route::put('/{id}', [DateController::class, 'update']);

  Route::delete('/{id}', [DateController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function(){
  Route::apiResource('/', DateController::class);

   Route::get('dates/user/{id}', [DateController::class, 'userDates']);
});