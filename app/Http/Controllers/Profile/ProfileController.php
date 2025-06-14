<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function create(Request $request): Response
    {
        $user = $request->user()->load('favorites', 'reviews.anime'); // eager load relations

        $favoriteAnime = $user->favorites()->with('genres')->paginate(12);
        $reviewedAnime = $user->reviews()->with(['anime.genres'])->paginate(12);
    
        return Inertia::render('profile/index', [
            'user' => $user,
            'favoriteAnime' => $favoriteAnime,
            'reviewedAnime' => $reviewedAnime,
        ]);
    }
}
