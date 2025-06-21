<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Anime extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'native_title',
        'country',
        'description',
        'user_rating',
        'release_date',
        'duration',
        'total_episodes',
        'is_finished',
        'director',
        'studio',
        'favorite_count',
        'view_count',
        'category_id',
        'imageUrl',
    ];

    protected $casts = [
        'user_rating' => 'float',
        'is_finished' => 'bool'
    ];
    

    /**
     * Genres associated with this anime (many-to-many).
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'anime_genres');
    }

    /**
     * Type of the anime (movie, series, etc.)
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function country()
    {
        return $this->hasOne(Country::class);
    }
}
