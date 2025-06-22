<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GenreRequest;
use App\Models\Genre;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    //
    public function create() {
        return Inertia::render('admin/genre', [
            'genres' => Genre::all()
        ]);
    }

    public function store(GenreRequest $request)  {
        $validated = $request->validated();
        Genre::create($validated);

        return redirect()->route('admin.genre');
    }

    public function edit(Genre $genre)
    {
        return Inertia::render('admin/genre', [
            'genre' => $genre,
        ]);
    }

    public function update(GenreRequest $request, Genre $genre) {
        $validated = $request->validated();
        $genre->update($validated);
    
        return redirect()->route('admin.genre');
    }

    public function destroy(Genre $genre){    
        $genre->delete();

        return redirect()->route('admin.genre')->with('success', 'Genre deleted successfully.');
    }
}
