<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Home\RatingRequest;
use App\Models\Anime;
use Inertia\Inertia;
use Auth;

class ShowAnimeController extends Controller
{
    //
    public function create($id)
    {
        $anime = Anime::with([
            'genres',
            'category',
            'review.user'
        ])->findOrFail($id);

        // Fetch similar anime by genre (you can adjust this logic)
        $genreIds = $anime->genres->pluck('id');

        $latestAnime = Anime::latest('release_date')
            ->get();

        $similarAnime = Anime::with(['genres'])
            ->where('id', '!=', $anime->id)
            ->whereHas('genres', fn($query) =>
                $query->whereIn('genres.id', $genreIds)
            )
            ->get();

        $user = Auth::user();
        $isFavorited = $user
            ? $user->favorites()->where('anime_id', $anime->id)->exists()
            : false;

        return Inertia::render('home/show', [
            'similarAnime' => $similarAnime,
            'latestAnime' => $latestAnime,
            'selectedAnime' => $anime,
            'isFavorited' => $isFavorited,
        ]);
    }

    public function store_rating(RatingRequest $request) {
        
    }

    public function edit_rating(RatingRequest $request) {

    }

    public function favorite(Request $request, $id) {
        $user = $request->user();
        $anime = Anime::findOrFail($id);
    
        // Check if already favorited
        $alreadyFavorited = $user->favorites()->where('anime_id', $anime->id)->exists();
    
        if ($alreadyFavorited) {
            // Remove from favorites
            $user->favorites()->detach($anime->id);
            $anime->decrement('favorite_count');
            $message = 'Removed from favorites.';
        } else {
            // Add to favorites
            $user->favorites()->attach($anime->id);
            $anime->increment('favorite_count');
            $message = 'Added to favorites.';
        }
    
        return back()->with('status', $message);
    }
}
