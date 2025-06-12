<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Genre;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AnimeController extends Controller
{
    public function create() {
        return Inertia::render('admin/anime', [
            'animes' => Anime::all()
        ]);
    }
    
    //
    public function genres() {
        return Genre::select('id', 'name')->get();
    }

    public function store(Request $request)  {

    }
}