<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnimeGenreSeeder extends Seeder
{
    public function run()
    {
        // Example anime IDs and genre IDs to link
        // Adjust these IDs according to your actual anime and genre IDs
        $animeGenres = [
            ['anime_id' => 1, 'genre_id' => 1], // Action
            ['anime_id' => 1, 'genre_id' => 5], // Fantasy
            ['anime_id' => 2, 'genre_id' => 2], // Adventure
            ['anime_id' => 2, 'genre_id' => 9], // Slice of Life
            ['anime_id' => 3, 'genre_id' => 3], // Comedy
            ['anime_id' => 3, 'genre_id' => 7], // Romance
            ['anime_id' => 4, 'genre_id' => 4], // Drama
            ['anime_id' => 5, 'genre_id' => 6], // Horror
            ['anime_id' => 6, 'genre_id' => 8], // Sci-Fi
            ['anime_id' => 7, 'genre_id' => 10], // Thriller
            ['anime_id' => 8, 'genre_id' => 1], // Action
            ['anime_id' => 9, 'genre_id' => 5], // Fantasy
            ['anime_id' => 10, 'genre_id' => 7], // Romance
        ];

        $now = Carbon::now();

        foreach ($animeGenres as &$animeGenre) {
            $animeGenre['created_at'] = $now;
            $animeGenre['updated_at'] = $now;
        }

        DB::table('anime_genres')->insert($animeGenres);
    }
}
