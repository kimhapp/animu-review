<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AnimeRequest;
use App\Models\Anime;
use App\Models\Genre;
use App\Models\Country;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class AnimeController extends Controller
{
    protected function castIsFinished(array $data): array
{
    if (array_key_exists('is_finished', $data)) {
        if ($data['is_finished'] === true) {
            $data['is_finished'] = \DB::raw('TRUE');
        } elseif ($data['is_finished'] === false) {
            $data['is_finished'] = \DB::raw('FALSE');
        } else {
            $data['is_finished'] = null;
        }
    }
    return $data;
}

    // Show the create form with all animes and genres
    public function create()
    {
        $animes = Anime::with('genres', 'category')->get()->map(function ($anime) {
            $anime->genre_ids = $anime->genres->pluck('id')->toArray();
            return $anime;
        });

        return Inertia::render('admin/anime', [
            'animes' => $animes, // eager load relations if any
            'genres' => Genre::all(),
            'categories' => Category::all(),
            'countries' => Country::all(),
        ]);
    }

    // Store a new anime
    public function store(AnimeRequest $request): RedirectResponse
    {
        $validated = $request->validated();
    
        $genreIds = $validated['genre_ids'] ?? [];
        unset($validated['genre_ids']);
    
        // Add a default user_rating if missing (e.g., 0)
        if (!isset($validated['user_rating'])) {
            $validated['user_rating'] = 0;
        }

        $validated = $this->castIsFinished($validated);
    
        $anime = Anime::create($validated);
    
        // Sync genres
        $anime->genres()->sync($genreIds);
    
        return redirect()->route('admin.anime')
            ->with('success', 'Anime created successfully.');
    }
    
    // Show the edit form for an anime
    public function edit(Anime $anime)
    {
        // load genres relationship (eager load)
        $anime->load('genres');
    
        // convert model to array
        $animeData = $anime->toArray();
    
        // add genre_ids array extracted from genres
        $animeData['genre_ids'] = $anime->genres->pluck('id')->toArray();
    
        return Inertia::render('admin/anime', [
            'anime' => $animeData,
        ]);
    }

    // Update an existing anime
    public function update(AnimeRequest $request, Anime $anime): RedirectResponse
    {
        $validated = $request->validated();
    
        $genreIds = $validated['genre_ids'] ?? [];
        unset($validated['genre_ids']);
        
        $validated = $this->castIsFinished($validated);
    
        $anime->update($validated);
    
        // Sync genres
        $anime->genres()->sync($genreIds);
    
        return redirect()->route('admin.anime')
            ->with('success', 'Anime updated successfully.');
    }
    

    // Delete an anime
    public function destroy(Anime $anime): RedirectResponse
    {
        $anime->delete();

        return redirect()->route('admin.anime')
            ->with('success', 'Anime deleted successfully.');
    }
}
