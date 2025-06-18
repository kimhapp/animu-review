<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Notifications\ReviewPosted;
use App\Http\Requests\Admin\ReviewRequest;
use Inertia\Inertia;

class CreateReviewController extends Controller
{
    //
    public function create(Request $request) {
        return Inertia::render('create-review');
    }

    public function store(ReviewRequest $request, Review $review) {
        $followers = $review->user->followers;

        foreach ($followers as $follower) {
            $follower->notify(new ReviewPosted($review));
        }
    }
}
