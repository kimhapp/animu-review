<?php

use App\Http\Controllers\Admin\AnimeController;
use App\Http\Controllers\CreateReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Home\HomeMainController;
use App\Http\Controllers\Admin\CreateAnimeController;
use App\Http\Controllers\Home\ShowAnimeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Models\Anime;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::prefix('home')->group(function () {
    Route::get('/', [HomeMainController::class, 'create'])->name('home.index');
    Route::get('{id}', [ShowAnimeController::class, 'create'])->name('home.show');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin/dashboard', [DashboardController::class, 'create'])
        ->name('admin.dashboard');
    
    Route::get('admin/anime', [AnimeController::class, 'create'])
        ->name('admin.anime');

    Route::get('admin/category', function () {
        return Inertia::render('admin/category');
    })->name('admin.category');
    
    Route::get('admin/genre', function () {
        return Inertia::render('admin/genre');
    })->name('admin.genre'); 
    
    Route::get('admin/country', function () {
        return Inertia::render('admin/country');
    })->name('admin.country');  

    Route::get('admin/reviewer', function () {
        return Inertia::render('admin/reviewer');
    })->name('admin.reviewer');
});

Route::middleware(['auth', 'aboveUser'])->group(function () {
    Route::get('create-review', [CreateReviewController::class, 'create'])->name('create.review');
});

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

require __DIR__.'/profile.php';
require __DIR__.'/auth.php';
