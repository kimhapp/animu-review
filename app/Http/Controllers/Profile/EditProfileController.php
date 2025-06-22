<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EditProfileController extends Controller
{
    // Show edit form with user data
    public function edit(Request $request)
    {

        $user = $request->user();

        return Inertia::render('profile/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'bio' => $user->bio,
                'imageUrl' => $user->imageUrl,
                'bannerUrl' => $user->bannerUrl,
            ],
        ]);
    }

    // Update user profile
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $data = $request->validated();

        // Here, since you use imageUrl, assume client sends full URLs or strings
        if ($request->filled('imageUrl')) {
            $data['imageUrl'] = $request->imageUrl;
        }

        if ($request->filled('bannerUrl')) {
            $data['bannerUrl'] = $request->bannerUrl;
        }

        $user->update($data);

        return redirect()->route('profile');
    }

    // Delete user account
    public function destroy(Request $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
