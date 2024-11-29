<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MasterCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');
Route::get('/master-categories', [MasterCategoryController::class, 'index'])->name('master-categories.index');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
