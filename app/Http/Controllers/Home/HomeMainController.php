<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeMainController extends Controller
{
    //
    public function create() {
        return Inertia::render('home/index');
    }
}
