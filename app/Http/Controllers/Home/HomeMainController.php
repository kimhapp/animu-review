<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Anime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Genre;
use App\Models\Category;
use App\Models\Country;

class HomeMainController extends Controller
{
    //
    public function create(Request $request)
    {
        $query = Anime::query();

        // Filter by genre
        if ($request->filled('genre')) {
            $query->whereHas('genres', fn($q) => $q->where('name', $request->genre));
        }
    
        // Filter by category
        if ($request->filled('category')) {
            $query->whereHas('category', fn($q) => $q->where('name', $request->category));
        }

        // Filter by country
        if ($request->filled('country')) {
            $query->whereHas('country', fn($q) => $q->where('name', $request->category));
        }
    
        // Filter by reviewed only
        if ($request->boolean('reviewed_only')) {
            $query->whereHas('review');
        }
    
        // Sorting
        switch ($request->input('sort')) {
            case 'popular':
                $query->orderByDesc('favorite_count');
                break;
            case 'recent':
                $query->orderByDesc('release_date');
                break;
            case 'rating':
                $query->with('review')->get()->each(function ($anime) {
                    $anime->computed_rating = $anime->review?->rating + $anime->user_rating ?? $anime->user_rating * 2;
                })->sortByDesc('computed_rating');
                break;
            case 'alphabetical':
                $query->orderBy('title');
                break;
            default:
                $query->latest(); // fallback
        }
    
        return Inertia::render('home/index', [
            'animes' => $query->with(['genres', 'category', 'review'])->get(),
            'filters' => $request->only(['genre', 'category', 'country', 'sort', 'reviewed_only']),
            'countries' => Country::all(),
            'genres' => Genre::all(),
            'categories' => Category::all()
        ]);
    }
}
