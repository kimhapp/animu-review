<?php

use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Profile\EditProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'create'])->name('profile');
    Route::get('profile/edit', [EditProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile/update', [EditProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile-delete', [EditProfileController::class, 'destroy'])->name('profile.delete');
});
