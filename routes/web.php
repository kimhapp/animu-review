<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Home\HomeMainController;
use App\Http\Controllers\Admin\CreateAnimeController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/home', [HomeMainController::class, 'create'])
->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/anime', [CreateAnimeController::class, 'create']);
    Route::get('/admin/anime/genres', [CreateAnimeController::class, 'genres']);
});

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.redirect');


Route::get('/auth/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
