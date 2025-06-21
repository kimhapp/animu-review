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

class CreateAnimeController extends Controller
{
    //
    public function create()
    {
        return Inertia::render('admin/anime/create-anime', [
            'genres' => Genre::select('id', 'name')->orderBy('name')->get(),
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
            'countries' => Country::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(AnimeRequest $request): RedirectResponse
    {
        // Determine is_finished value for PostgreSQL
        $isFinished = null;
        if ($request->has('is_finished')) {
            if (filter_var($request->is_finished, FILTER_VALIDATE_BOOLEAN)) {
                $isFinished = DB::raw('TRUE');
            } else {
                $isFinished = DB::raw('FALSE');
            }
        }
    
        $anime = Anime::create([
            'title' => $request->title,
            'native_title' => $request->native_title,
            'country' => $request->country,
            'description' => $request->description,
            'release_date' => $request->release_date,
            'duration' => $request->duration,
            'total_episodes' => $request->total_episodes,
            'is_finished' => $isFinished,
            'director' => $request->director,
            'studio' => $request->studio,
            'user_rating' => $request->user_rating ?? 0,
            'category_id' => $request->category_id,
            'imageUrl' => $request->imageUrl,
        ]);
    
        // Attach genres (many-to-many)
        if ($request->has('genre_ids')) {
            $anime->genres()->sync($request->genre_ids);
        }
    
        return redirect()->route('admin.anime')
            ->with('success', 'Anime created successfully.');
    }
}
