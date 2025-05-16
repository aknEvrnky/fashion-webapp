<?php

use App\Http\Controllers\Frontend\AboutController;
use App\Http\Controllers\Frontend\CartController;
use App\Http\Controllers\Frontend\CategoryController;
use App\Http\Controllers\Frontend\CollectionController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\FeedbackController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\ProductController;
use App\Http\Controllers\Frontend\RecommendationController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', HomeController::class)->name('home');

Route::get('/about', AboutController::class)->name('about');
Route::get('/contact', ContactController::class)->name('contact');
Route::get('/recommendation', RecommendationController::class)->name('recommendation');
Route::get('/collection', CollectionController::class)->name('collection');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

Route::get('/master-categories/{masterCategory}/sub-categories', [CategoryController::class, 'subCategories']);
Route::get('/sub-categories/{subCategory}/article-types', [CategoryController::class, 'articleTypes']);

Route::post('feedback', [FeedbackController::class, 'store']);

Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::get('/basket', [CartController::class, 'basket'])->name('cart.basket');
    Route::post('/', [CartController::class, 'store'])->name('cart.store');
    Route::put('/{productId}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/{productId}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::delete('/clear', [CartController::class, 'clear'])->name('cart.clear');
});

// Guest Routes (only accessible when not authenticated)
Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Auth Routes (only accessible when authenticated)
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
