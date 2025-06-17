<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnimeSeeder extends Seeder
{
    public function run()
    {
        $categoryIds = DB::table('categories')->pluck('id', 'name');

        $animes = [
            [
                'title' => 'Attack on Titan',
                'native_title' => '進撃の巨人',
                'description' => 'Humans fight against gigantic humanoid Titans.',
                'user_rating' => 9.0,
                'release_date' => '2013-04-07',
                'duration' => null,
                'total_episodes' => 75,
                'is_finished' => true,
                'director' => 'Tetsurō Araki',
                'studio' => 'Wit Studio',
                'favorite_count' => 5000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/aot.jpg',
            ],
            [
                'title' => 'Your Name',
                'native_title' => '君の名は。',
                'description' => 'A body-swapping romance drama.',
                'user_rating' => 9.2,
                'release_date' => '2016-08-26',
                'duration' => 106,
                'total_episodes' => null,
                'is_finished' => null,
                'director' => 'Makoto Shinkai',
                'studio' => 'CoMix Wave Films',
                'favorite_count' => 8000,
                'category_id' => $categoryIds['Movie'],
                'imageUrl' => 'https://example.com/images/yourname.jpg',
            ],
            [
                'title' => 'Fullmetal Alchemist: Brotherhood',
                'native_title' => '鋼の錬金術師 FULLMETAL ALCHEMIST',
                'description' => 'Two brothers search for the Philosopher\'s Stone.',
                'user_rating' => 9.1,
                'release_date' => '2009-04-05',
                'duration' => null,
                'total_episodes' => 64,
                'is_finished' => true,
                'director' => 'Yasuhiro Irie',
                'studio' => 'Bones',
                'favorite_count' => 7000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/fma.jpg',
            ],
            [
                'title' => 'Demon Slayer',
                'native_title' => '鬼滅の刃',
                'description' => 'A boy becomes a demon slayer to save his sister.',
                'user_rating' => 8.9,
                'release_date' => '2019-04-06',
                'duration' => null,
                'total_episodes' => 26,
                'is_finished' => false,
                'director' => 'Haruo Sotozaki',
                'studio' => 'ufotable',
                'favorite_count' => 6000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/demonslayer.jpg',
            ],
            [
                'title' => 'One Punch Man',
                'native_title' => 'ワンパンマン',
                'description' => 'A superhero who defeats enemies with one punch.',
                'user_rating' => 8.7,
                'release_date' => '2015-10-05',
                'duration' => null,
                'total_episodes' => 24,
                'is_finished' => false,
                'director' => 'Shingo Natsume',
                'studio' => 'Madhouse',
                'favorite_count' => 5500,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/opm.jpg',
            ],
            [
                'title' => 'Naruto',
                'native_title' => 'ナルト',
                'description' => 'A young ninja seeks recognition and dreams to become Hokage.',
                'user_rating' => 8.3,
                'release_date' => '2002-10-03',
                'duration' => null,
                'total_episodes' => 220,
                'is_finished' => true,
                'director' => 'Hayato Date',
                'studio' => 'Pierrot',
                'favorite_count' => 9000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/naruto.jpg',
            ],
            [
                'title' => 'Spirited Away',
                'native_title' => '千と千尋の神隠し',
                'description' => 'A girl enters a mysterious spirit world.',
                'user_rating' => 9.3,
                'release_date' => '2001-07-20',
                'duration' => 125,
                'total_episodes' => null,
                'is_finished' => null,
                'director' => 'Hayao Miyazaki',
                'studio' => 'Studio Ghibli',
                'favorite_count' => 8500,
                'category_id' => $categoryIds['Movie'],
                'imageUrl' => 'https://example.com/images/spiritedaway.jpg',
            ],
            [
                'title' => 'Death Note',
                'native_title' => 'デスノート',
                'description' => 'A notebook allows killing anyone whose name is written in it.',
                'user_rating' => 9.0,
                'release_date' => '2006-10-04',
                'duration' => null,
                'total_episodes' => 37,
                'is_finished' => true,
                'director' => 'Tetsurō Araki',
                'studio' => 'Madhouse',
                'favorite_count' => 7800,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/deathnote.jpg',
            ],
            [
                'title' => 'My Hero Academia',
                'native_title' => '僕のヒーローアカデミア',
                'description' => 'A boy dreams of becoming a hero in a superpowered world.',
                'user_rating' => 8.4,
                'release_date' => '2016-04-03',
                'duration' => null,
                'total_episodes' => 113,
                'is_finished' => false,
                'director' => 'Kenji Nagasaki',
                'studio' => 'Bones',
                'favorite_count' => 6400,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/mha.jpg',
            ],
            [
                'title' => 'Tokyo Ghoul',
                'native_title' => '東京喰種トーキョーグール',
                'description' => 'A college student becomes a half-ghoul after an attack.',
                'user_rating' => 7.9,
                'release_date' => '2014-07-04',
                'duration' => null,
                'total_episodes' => 12,
                'is_finished' => true,
                'director' => 'Shūhei Morita',
                'studio' => 'Pierrot',
                'favorite_count' => 4800,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/tokyoghoul.jpg',
            ],
        ];

        $now = Carbon::now();

        foreach ($animes as &$anime) {
            // Convert rating to 5-point scale
            $anime['user_rating'] = round($anime['user_rating'] / 2, 1);

            // If it's a movie (duration exists), remove episode-related fields
            if (!is_null($anime['duration'])) {
                $anime['total_episodes'] = null;
                $anime['is_finished'] = null;
            }

            // Cast is_finished to boolean (for PostgreSQL)
            if (!is_null($anime['is_finished'])) {
                $anime['is_finished'] = (bool) $anime['is_finished'];
            }

            $anime['created_at'] = $now;
            $anime['updated_at'] = $now;
        }

        DB::table('animes')->insert($animes);
    }
}
