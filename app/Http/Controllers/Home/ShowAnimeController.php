<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Anime;
use Inertia\Inertia;

class ShowAnimeController extends Controller
{
    //
    public function create($id)
    {
        $anime = Anime::with(['genres', 'category', 'review'])->findOrFail($id);
        

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

        return Inertia::render('home/show', [
            'similarAnime' => $similarAnime,
            'latestAnime' => $latestAnime,
            'selectedAnime' => $anime,
        ]);
    }
}
