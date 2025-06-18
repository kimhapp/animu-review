<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateReviewController extends Controller
{
    //
    public function create(Request $request) {
        return Inertia::render('create-review');
    }
}
