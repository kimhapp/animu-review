<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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

    public function store(Request $request)  {
        $validated = $request->validate([
            'name' => 'required|string|unique:genres,name',
            'description' => 'nullable|string',
        ]);

        Genre::create($validated);

        return redirect()->route('admin/genre');
    }
}
