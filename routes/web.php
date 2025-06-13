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
<<<<<<< HEAD

    Route::get('/homepage', function () {
        return Inertia::render('home/homepage');
    })->name('homepage');

    Route::get('/lates', function () {
        return Inertia::render('home/lates');
    })->name('lates');
=======
>>>>>>> 77dbe4da881710b6c131ccec73cc600210785815
});

Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect'])
    ->name('google.login');


Route::get('/auth/callback', [GoogleAuthController::class, 'callback'])
    ->name('google.callback');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
