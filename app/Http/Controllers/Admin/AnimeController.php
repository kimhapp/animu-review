<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AnimeRequest;
use App\Models\Anime;
use App\Models\Genre;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class AnimeController extends Controller
{
    // Show the create form with all animes and genres
    public function create()
    {
        return Inertia::render('admin/anime', [
            'animes' => Anime::all()
        ]);
    }

    // Store a new anime
    public function store(AnimeRequest $request): RedirectResponse
    {
        Anime::create($request->validated());

        return redirect()->route('admin.anime.create')
            ->with('success', 'Anime created successfully.');
    }

    // Show the edit form for an anime
    public function edit(Anime $anime)
    {
        return Inertia::render('admin/anime-edit', [
            'anime' => $anime,
            'genres' => Genre::all(),
        ]);
    }

    // Update an existing anime
    public function update(AnimeRequest $request, Anime $anime): RedirectResponse
    {
        $anime->update($request->validated());

        return redirect()->route('admin.anime.create')
            ->with('success', 'Anime updated successfully.');
    }

    // Delete an anime
    public function destroy(Anime $anime): RedirectResponse
    {
        $anime->delete();

        return redirect()->route('admin.anime.create')
            ->with('success', 'Anime deleted successfully.');
    }
}
