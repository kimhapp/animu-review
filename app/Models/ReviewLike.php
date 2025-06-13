<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewLike extends Model
{
    //
    protected $fillable = [
        'user_id',
        'review_id',
        'type', // 'like' or 'dislike'
    ];

    // Each ReviewLike belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Each ReviewLike belongs to a Review
    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
