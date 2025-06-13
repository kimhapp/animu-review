<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    //
    protected $fillable = [
        'user_id', 'anime_id', 'content', 'rating_amount', 'like_count', 'dislike_count', 'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function anime()
    {
        return $this->belongsTo(Anime::class);
    }

    public function reviewLikes()
    {
        return $this->hasMany(ReviewLike::class);
    }
}
