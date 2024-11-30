<?php

use App\Http\Controllers\Frontend\ArticleTypeController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\MasterCategoryController;
use App\Http\Controllers\Frontend\ProductController;
use App\Http\Controllers\Frontend\SubCategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

// categories
Route::get('/master-categories', [MasterCategoryController::class, 'index'])->name('master-categories.index');
Route::get('/master-categories/{masterCategory:slug}', [MasterCategoryController::class, 'show'])->name('master-categories.show');

Route::get('/sub-categories/{subCategory:slug}', [SubCategoryController::class, 'show'])->name('sub-categories.show');
Route::get('/article-types/{articleType:slug}', [ArticleTypeController::class, 'show'])->name('article-types.show');

// products
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});
