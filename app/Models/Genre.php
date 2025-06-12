<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    // Optional: define fillable fields for mass assignment
    protected $fillable = [
        'name',
        'description',
    ];
}
