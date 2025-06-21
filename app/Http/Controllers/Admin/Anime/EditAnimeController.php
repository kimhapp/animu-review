<?php

namespace App\Http\Controllers\Admin\Anime;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Category;
use App\Models\Country;
use App\Models\Anime;
use Inertia\Inertia;
use App\Http\Requests\Admin\AnimeRequest;
use Illuminate\Http\RedirectResponse;
use DB;
use Illuminate\Http\Request;

class EditAnimeController extends Controller
{
    //
    public function create(Anime $anime)
    {
        return Inertia::render('admin/anime/edit-anime', [
            'anime' => [
                'id' => $anime->id,
                'title' => $anime->title,
                'native_title' => $anime->native_title,
                'country' => $anime->country,
                'description' => $anime->description,
                'release_date' => $anime->release_date,
                'duration' => $anime->duration,
                'total_episodes' => $anime->total_episodes,
                'is_finished' => $anime->is_finished,
                'director' => $anime->director,
                'studio' => $anime->studio,
                'category_id' => $anime->category_id,
                'genre_ids' => $anime->genres->pluck('id'), // Ensure you eager load 'genres'
                'imageUrl' => $anime->imageUrl,
            ],
            'genres' => Genre::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
            'countries' => Country::select('id', 'name')->get(),
        ]);
    }
    
    public function update(AnimeRequest $request, Anime $anime): RedirectResponse
    {
        $validated = $request->validated();

        $isFinished = null;
        if ($request->has('is_finished')) {
            if (filter_var($request->is_finished, FILTER_VALIDATE_BOOLEAN)) {
                $isFinished = DB::raw('TRUE');
            } else {
                $isFinished = DB::raw('FALSE');
            }
        }
    
        $updateData = [
            'title' => $validated['title'],
            'native_title' => $validated['native_title'],
            'country' => $validated['country'],
            'description' => $validated['description'],
            'release_date' => $validated['release_date'],
            'duration' => $validated['duration'],
            'total_episodes' => $validated['total_episodes'],
            'is_finished' => $isFinished,
            'director' => $validated['director'],
            'studio' => $validated['studio'],
            'category_id' => $validated['category_id'],
            'user_rating' => $anime->user_rating,
            'imageUrl' => $validated['imageUrl'] ?? $anime->imageUrl,
        ];
    
        $anime->update($updateData);
    
        if (isset($validated['genre_ids'])) {
            $anime->genres()->sync($validated['genre_ids']);
        }
    
        return redirect()->route('admin.anime')
            ->with('success', 'Anime updated successfully.');
    }
    
}
