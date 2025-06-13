<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.login');


Route::get('/auth/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
