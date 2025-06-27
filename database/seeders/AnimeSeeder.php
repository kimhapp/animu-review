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
        $countryIds = DB::table('countries')->pluck('id', 'name');
        $now = Carbon::now();

        $animes = [
            [
                'title' => 'Attack on Titan',
                'native_title' => '進撃の巨人',
                'country_id' => $countryIds['Japan'],
                'description' => 'Humans fight against gigantic humanoid Titans.',
                'user_rating' => 4.5,
                'release_date' => '2013-04-07',
                'duration' => null,
                'total_episodes' => 75,
                'is_finished' => true,
                'director' => 'Tetsurō Araki',
                'studio' => 'Wit Studio',
                'favorite_count' => 5000,
                'view_count' => 900000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/aot.jpg',
            ],
            [
                'title' => 'Your Name',
                'native_title' => '君の名は。',
                'country_id' => $countryIds['Japan'],
                'description' => 'A body-swapping romance drama.',
                'user_rating' => 4.6,
                'release_date' => '2016-08-26',
                'duration' => 106,
                'total_episodes' => null,
                'is_finished' => null,
                'director' => 'Makoto Shinkai',
                'studio' => 'CoMix Wave Films',
                'favorite_count' => 8000,
                'view_count' => 1200000,
                'category_id' => $categoryIds['Movie'],
                'imageUrl' => 'https://example.com/images/yourname.jpg',
            ],
            [
                'title' => 'Fullmetal Alchemist: Brotherhood',
                'native_title' => '鋼の錬金術師 FULLMETAL ALCHEMIST',
                'country_id' => $countryIds['Japan'],
                'description' => 'Two brothers search for the Philosopher\'s Stone.',
                'user_rating' => 4.6,
                'release_date' => '2009-04-05',
                'duration' => null,
                'total_episodes' => 64,
                'is_finished' => true,
                'director' => 'Yasuhiro Irie',
                'studio' => 'Bones',
                'favorite_count' => 7000,
                'view_count' => 1000000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/fma.jpg',
            ],
            [
                'title' => 'Demon Slayer',
                'native_title' => '鬼滅の刃',
                'country_id' => $countryIds['Japan'],
                'description' => 'A boy becomes a demon slayer to save his sister.',
                'user_rating' => 4.5,
                'release_date' => '2019-04-06',
                'duration' => null,
                'total_episodes' => 26,
                'is_finished' => false,
                'director' => 'Haruo Sotozaki',
                'studio' => 'ufotable',
                'favorite_count' => 6000,
                'view_count' => 950000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/demonslayer.jpg',
            ],
            [
                'title' => 'One Punch Man',
                'native_title' => 'ワンパンマン',
                'country_id' => $countryIds['Japan'],
                'description' => 'A superhero who defeats enemies with one punch.',
                'user_rating' => 4.4,
                'release_date' => '2015-10-05',
                'duration' => null,
                'total_episodes' => 24,
                'is_finished' => false,
                'director' => 'Shingo Natsume',
                'studio' => 'Madhouse',
                'favorite_count' => 5500,
                'view_count' => 870000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/opm.jpg',
            ],
            [
                'title' => 'Naruto',
                'native_title' => 'ナルト',
                'country_id' => $countryIds['Japan'],
                'description' => 'A young ninja seeks recognition and dreams to become Hokage.',
                'user_rating' => 4.2,
                'release_date' => '2002-10-03',
                'duration' => null,
                'total_episodes' => 220,
                'is_finished' => true,
                'director' => 'Hayato Date',
                'studio' => 'Pierrot',
                'favorite_count' => 9000,
                'view_count' => 2000000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/naruto.jpg',
            ],
            [
                'title' => 'Spirited Away',
                'native_title' => '千と千尋の神隠し',
                'country_id' => $countryIds['Japan'],
                'description' => 'A girl enters a mysterious spirit world.',
                'user_rating' => 4.7,
                'release_date' => '2001-07-20',
                'duration' => 125,
                'total_episodes' => null,
                'is_finished' => null,
                'director' => 'Hayao Miyazaki',
                'studio' => 'Studio Ghibli',
                'favorite_count' => 8500,
                'view_count' => 1100000,
                'category_id' => $categoryIds['Movie'],
                'imageUrl' => 'https://example.com/images/spiritedaway.jpg',
            ],
            [
                'title' => 'Death Note',
                'native_title' => 'デスノート',
                'country_id' => $countryIds['Japan'],
                'description' => 'A notebook allows killing anyone whose name is written in it.',
                'user_rating' => 4.5,
                'release_date' => '2006-10-04',
                'duration' => null,
                'total_episodes' => 37,
                'is_finished' => true,
                'director' => 'Tetsurō Araki',
                'studio' => 'Madhouse',
                'favorite_count' => 7800,
                'view_count' => 980000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/deathnote.jpg',
            ],
            [
                'title' => 'My Hero Academia',
                'native_title' => '僕のヒーローアカデミア',
                'country_id' => $countryIds['Japan'],
                'description' => 'A boy dreams of becoming a hero in a superpowered world.',
                'user_rating' => 4.2,
                'release_date' => '2016-04-03',
                'duration' => null,
                'total_episodes' => 113,
                'is_finished' => false,
                'director' => 'Kenji Nagasaki',
                'studio' => 'Bones',
                'favorite_count' => 6400,
                'view_count' => 860000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/mha.jpg',
            ],
            [
                'title' => 'Tokyo Ghoul',
                'native_title' => '東京喰種トーキョーグール',
                'country_id' => $countryIds['Japan'],
                'description' => 'A college student becomes a half-ghoul after an attack.',
                'user_rating' => 4.0,
                'release_date' => '2014-07-04',
                'duration' => null,
                'total_episodes' => 12,
                'is_finished' => true,
                'director' => 'Shūhei Morita',
                'studio' => 'Pierrot',
                'favorite_count' => 4800,
                'view_count' => 750000,
                'category_id' => $categoryIds['TV'],
                'imageUrl' => 'https://example.com/images/tokyoghoul.jpg',
            ],
        ];

        foreach ($animes as &$anime) {
            $anime['created_at'] = $now;
            $anime['updated_at'] = $now;

            if (array_key_exists('is_finished', $anime)) {
                if ($anime['is_finished'] === true) {
                    $anime['is_finished'] = DB::raw('TRUE');
                } elseif ($anime['is_finished'] === false) {
                    $anime['is_finished'] = DB::raw('FALSE');
                } else {
                    // leave null as-is
                    $anime['is_finished'] = null;
                }
            }
        }

        DB::table('animes')->insert($animes);
    }
}
