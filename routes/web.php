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
use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\PrivilegeUserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::prefix('home')->group(function () {
    Route::get('/', [HomeMainController::class, 'create'])->name('home.index');
    Route::get('{id}', [ShowAnimeController::class, 'create'])->name('home.show');

    Route::middleware('auth')->group(function () {
        Route::post('favorite/{id}', [ShowAnimeController::class, 'favorite'])->name('home.show.favorite');
    });
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin/dashboard', [DashboardController::class, 'create'])->name('admin.dashboard');
    
    Route::get('admin/anime', [AnimeController::class, 'create'])->name('admin.anime');
    Route::post('admin/anime-store', [AnimeController::class, 'store'])->name('admin.anime.store');
    Route::get('admin/anime/{anime}/edit', [AnimeController::class, 'edit'])->name('admin.anime.edit');
    Route::put('admin/anime/{anime}/update', [AnimeController::class, 'update'])->name('admin.anime.update');
    Route::delete('admin/anime/{anime}/destroy', [AnimeController::class, 'destroy'])->name('admin.anime.destroy');

    Route::get('admin/category', [CategoryController::class, 'create'])->name('admin.category');
    Route::post('admin/category', [CategoryController::class, 'store'])->name('admin.category.store');
    Route::get('admin/category/{category}/edit', [CategoryController::class, 'edit'])->name('admin.category.edit');
    Route::put('admin/category/{category}/update', [CategoryController::class, 'update'])->name('admin.category.update');
    Route::delete('admin/category/{category}/destroy', [CategoryController::class, 'destroy'])->name('admin.category.destroy');
    
    Route::get('admin/genre', [GenreController::class, 'create'])->name('admin.genre');
    Route::post('admin/genre-store', [GenreController::class, 'store'])->name('admin.genre.store');
    Route::get('admin/genre/{genre}/edit', [GenreController::class, 'edit'])->name('admin.genre.edit');
    Route::put('admin/genre/{genre}/update', [GenreController::class, 'update'])->name('admin.genre.update');
    Route::delete('admin/genre/{genre}/destroy', [GenreController::class, 'destroy'])->name('admin.genre.destroy');

    Route::get('admin/privilege', [PrivilegeUserController::class, 'create'])->name('admin.privilege');
    Route::post('admin/privilege', [PrivilegeUserController::class, 'store'])->name('admin.privilege.store');
    Route::get('admin/privilege/{user}/edit', [PrivilegeUserController::class, 'edit'])->name('admin.privilege.edit');
    Route::put('admin/privilege/{user}/update', [PrivilegeUserController::class, 'update'])->name('admin.privilege.update');
    Route::delete('admin/privilege/{user}/destroy', [PrivilegeUserController::class, 'destroy'])->name('admin.privilege.destroy');

    Route::get('admin/country', [CountryController::class, 'create'])->name('admin.country'); 
    Route::post('admin/country', [CountryController::class, 'store'])->name('admin.country.store');  
    Route::get('admin/country/{country}/edit', [CountryController::class, 'edit'])->name('admin.country.edit');  
    Route::put('admin/country/{country}/edit', [CountryController::class, 'update'])->name('admin.country.update');  
    Route::delete('admin/country{country}/destroy', [CountryController::class, 'destroy'])->name('admin.country.destroy');  
});

Route::middleware(['auth', 'aboveUser'])->group(function () {
    Route::get('review/create', [CreateReviewController::class, 'create'])->name('review.create');
    Route::post('review/store', [CreateReviewController::class, 'store'])->name('review.store');
    Route::get('review/{review}/edit', [CreateReviewController::class, 'edit'])->name('review.edit');
    Route::put('review/{review}/update', [CreateReviewController::class, 'update'])->name('review.update');
    Route::delete('review/{review}/destroy', [CreateReviewController::class, 'destroy'])->name('review.destroy');
});

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');

Route::get('/auth/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

require __DIR__.'/profile.php';
require __DIR__.'/auth.php';
