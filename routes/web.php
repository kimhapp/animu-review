<?php

use App\Http\Controllers\Admin\AnimeController;
use App\Http\Controllers\Reviewer\CreateReviewController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Home\HomeMainController;
use App\Http\Controllers\Home\ShowAnimeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GenreController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::prefix('home')->group(function () {
    Route::get('/', [HomeMainController::class, 'create'])->name('home.index');
    Route::get('{id}', [ShowAnimeController::class, 'create'])->name('home.show');
});

Route::middleware(['admin'])->get('/admin/test', function () {
    return 'You are an admin!';
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin/dashboard', [DashboardController::class, 'create'])
        ->name('admin.dashboard');
    
    Route::get('admin/anime', [AnimeController::class, 'create'])
        ->name('admin.anime');
    Route::post('admin/anime-store', [AnimeController::class, 'store'])
        ->name('admin.anime.store');
    Route::get('admin/anime/{anime}/edit', [AnimeController::class, 'edit'])
        ->name('admin.anime.edit');
    Route::put('admin/anime/{anime}/update', [AnimeController::class, 'update'])
        ->name('admin.anime.update');
    Route::delete('admin/anime/{anime}/destroy', [AnimeController::class, 'destroy'])
        ->name('admin.anime.destroy');

    Route::get('admin/category', [CategoryController::class, 'create'])->name('admin.category');
    Route::post('admin/category', [CategoryController::class, 'store'])->name('admin.category.store');
    Route::get('admin/category/{category}/edit', [CategoryController::class, 'edit'])->name('admin.category.edit');
    Route::put('admin/category/{category}/update', [CategoryController::class, 'update'])->name('admin.category.update');
    Route::delete('admin/category/{category}/destroy', [CategoryController::class, 'destroy'])->name('admin.category.destroy');
    
    Route::get('admin/genre', [GenreController::class, 'create'])
        ->name('admin.genre');

    Route::get('admin/reviewer', function () {
        return Inertia::render('admin/reviewer');
    })->name('admin.reviewer');

    Route::get('admin/country', function () {
        return Inertia::render('admin/country');
    })->name('admin.country');  
});

Route::middleware(['auth', 'aboveUser'])->group(function () {
    Route::get('review/add-review', [CreateReviewController::class, 'create'])->name('create.review');
    Route::post('review/create-review', [CreateReviewController::class, 'store'])->name('review.store');
});

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

require __DIR__.'/profile.php';
require __DIR__.'/auth.php';
