<?php

namespace App\Http\Controllers\Admin\Anime;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Anime;

class AnimeListController extends Controller
{
    //
    public function create()
    {
        return Inertia::render('admin/anime/anime-list', [
            'animes' => Anime::with(['genres', 'category']) // eager load relationships
                ->orderBy('title')
                ->get()
                ->map(function ($anime) {
                    return [
                        'id' => $anime->id,
                        'title' => $anime->title,
                        'native_title' => $anime->native_title,
                        'country' => $anime->country,
                        'release_date' => $anime->release_date,
                        'director' => $anime->director,
                        'studio' => $anime->studio,
                        'genre_names' => $anime->genres->pluck('name'),
                        'category_name' => optional($anime->category)->name,
                        'cover' => $anime->imageUrl,
                    ];
                }),
        ]);
    }

    public function destroy(Anime $anime): RedirectResponse
    {
        $anime->delete();

        return redirect()->route('admin.anime.create')
            ->with('success', 'Anime deleted successfully.');
    }
}
