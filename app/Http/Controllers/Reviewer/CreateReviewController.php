<?php

namespace App\Http\Controllers\Reviewer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Anime;
use App\Notifications\ReviewPosted;
use App\Http\Requests\Reviewer\ReviewRequest;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class CreateReviewController extends Controller
{
    // Show create form
    public function create()
    {
        $animeList = Anime::whereDoesntHave('review')
            ->select('id', 'title', 'imageUrl')
            ->orderBy('title')
            ->get();
    
        return Inertia::render('reviewer/create-review', [
            'animeList' => $animeList,
        ]);
    }

    // Store review
    public function store(ReviewRequest $request): RedirectResponse
    {
        $anime = Anime::find($request->input('anime_id'));

        if (!$anime) {
            return redirect()->back()->withErrors(['anime_id' => 'Selected anime not found.']);
        }
    
        $review = Review::create([
            'user_id' => $request->user()->id,
            'anime_id' => $anime->id,
            'content' => $request->input('content'),
            'rating_amount' => $request->input('rating_amount'),
            'status' => 'pending',
        ]);
    
        foreach ($request->user()->followers as $follower) {
            $follower->notify(new ReviewPosted($review));
        }
    
        return redirect()->route('home.index')->with('success', 'Review submitted for approval.');
    }

    // Show edit form
    public function edit(Review $review)
    {
        $review->load('anime');
    
        return Inertia::render('reviewer/edit-review', [
            'initialReview' => [
                'anime_id' => $review->anime_id,
                'rating' => $review->rating_amount,
                'content' => $review->content,
                'anime' => [
                    'id' => $review->anime->id,
                    'name' => $review->anime->title,
                    'imageUrl' => $review->anime->imageUrl,
                ],
            ],
        ]);
    }

    // Update review
    public function update(ReviewRequest $request, Review $review): RedirectResponse
    {
        $this->authorize('update', $review);

        $review->update($request->only('content', 'rating_amount'));

        return redirect()->route('profile.index')->with('success', 'Review updated.');
    }

    // Delete review
    public function destroy(Request $request, Review $review): RedirectResponse
    {
        $this->authorize('delete', $review);

        $review->delete();

        return redirect()->route('profile.index')->with('success', 'Review deleted.');
    }
}
