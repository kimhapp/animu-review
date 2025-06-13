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
        'description',
        'user_rating',
        'release_date',
        'duration',
        'director',
        'studio',
        'favorite_count',
        'type_id',
        'imageUrl',
    ];

    /**
     * Genres associated with this anime (many-to-many).
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    /**
     * Type of the anime (movie, series, etc.)
     */
    public function type()
    {
        return $this->belongsTo(Type::class);
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
}
