<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            ['name' => 'Action', 'description' => 'Fast paced and intense scenes with lots of physical activities.'],
            ['name' => 'Adventure', 'description' => 'Exciting journeys and explorations.'],
            ['name' => 'Comedy', 'description' => 'Humorous and funny content designed to entertain.'],
            ['name' => 'Drama', 'description' => 'Serious, character-driven stories.'],
            ['name' => 'Fantasy', 'description' => 'Magic, supernatural elements, and mythical worlds.'],
            ['name' => 'Horror', 'description' => 'Scary, suspenseful, and frightening themes.'],
            ['name' => 'Romance', 'description' => 'Love stories and emotional relationships.'],
            ['name' => 'Sci-Fi', 'description' => 'Science fiction themes including futuristic technology and space.'],
            ['name' => 'Slice of Life', 'description' => 'Depicts everyday life and personal growth.'],
            ['name' => 'Thriller', 'description' => 'Tense, exciting, and suspenseful storylines.'],
        ];

        $now = Carbon::now();

        foreach ($genres as &$genre) {
            $genre['created_at'] = $now;
            $genre['updated_at'] = $now;
        }

        DB::table('genres')->insert($genres);
    }
}
