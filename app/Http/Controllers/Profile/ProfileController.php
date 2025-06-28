<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Country;

class ProfileController extends Controller
{
    /**
     * Show the profile page.
     */
    public function create(Request $request): Response
    {
        $user = $request->user()->load('favorites', 'reviews.anime');

        $favoriteAnime = $user->favorites()->with('genres')->paginate(12);
        $reviewedAnime = $user->reviews()->with(['anime.genres'])->paginate(12);
        $ratingAnime = $user->ratings()->with('genres')->paginate(12);

        return Inertia::render('profile/index', [
            'user' => $user,
            'favoriteAnime' => $favoriteAnime,
            'reviewedAnime' => $reviewedAnime,
            'ratingAnime' => $ratingAnime,
        ]);
    }

    /**
     * Fetch more anime for infinite scroll.
     */
    public function paginate(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        $page = $request->input('page', 1);
        $type = $request->input('type');

        if ($type === 'favorites') {
            $favoriteAnime = $user->favorites()->with('genres')->paginate(12, ['*'], 'page', $page);
            return response()->json(['favoriteAnime' => $favoriteAnime]);
        }

        if ($type === 'reviews') {
            $reviewedAnime = $user->reviews()->with(['anime.genres'])->paginate(12, ['*'], 'page', $page);
            return response()->json(['reviewedAnime' => $reviewedAnime]);
        }

        if ($type === 'ratings') {
            $ratingAnime = $user->ratings()->with('genres')->paginate(12, ['*'], 'page', $page);
            return response()->json(['ratingAnime' => $ratingAnime]);
        }

        return response()->json(['error' => 'Invalid type'], 400);
    }
}
