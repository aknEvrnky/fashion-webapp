<?php

use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('feedback', [FeedbackController::class, 'store']);

Route::get('products', [ProductController::class, 'index']);
