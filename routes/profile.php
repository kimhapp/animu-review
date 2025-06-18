<?php

use App\Http\Controllers\Profile\PasswordController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Profile\EditProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'create'])->name('profile');
    Route::get('profile/edit', [EditProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile-update', [EditProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile-delete', [EditProfileController::class, 'destroy'])->name('profile.delete');

    Route::get('profile/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('profile/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('profile/appearance', function () {
        return Inertia::render('profile/appearance');
    })->name('appearance');
});
