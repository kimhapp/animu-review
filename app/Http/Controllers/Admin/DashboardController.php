<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Anime;
use Illuminate\Http\Request;
use App\Models\Review;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function create() {
        return Inertia::render('admin/dashboard', [
            'total_user' => User::where('role', 'user')->count(),
            'total_review' => Review::count(),
            'total_anime' => Anime::count(),
        ]);
    }
}
