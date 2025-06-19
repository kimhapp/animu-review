<?php

namespace App\Http\Controllers\Reviewer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Notifications\ReviewPosted;
use App\Http\Requests\Reviewer\ReviewRequest;
use Inertia\Inertia;

class CreateReviewController extends Controller
{
    //
    public function create(Request $request) {
        return Inertia::render('create-review');
    }

    public function store(ReviewRequest $request, Review $review) {
        
        // After review is saved...
        $followers = $review->user->followers;

        foreach ($followers as $follower) {
            $follower->notify(new ReviewPosted($review));
        }
    }
}
