<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use App\Models\Genre;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CreateAnimeController extends Controller
{
    public function create() {
        return Inertia::render('admin/anime');
    }
    
    //
    public function genres() {
        $this->authorize('create', Anime::class);
        return Genre::select('id', 'name')->get();

    }
}