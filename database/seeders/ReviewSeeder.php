<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        $reviews = [
            [
                'user_id' => 1,
                'anime_id' => 1,
                'content' => "This anime completely exceeded my expectations. The world-building was immersive, and each episode left me wanting more. The character development is phenomenal, especially the protagonist's journey from a naive dreamer to a hardened hero. The animation quality is top-notch, and the soundtrack perfectly complements the emotional moments.",
                'rating_amount' => 4.8,
                'like_count' => 12,
                'dislike_count' => 1,
                'status' => 'accepted',
            ],
            [
                'user_id' => 2,
                'anime_id' => 2,
                'content' => "Visually stunning, but the pacing was inconsistent. Some episodes dragged while others rushed important plot points. That said, the main theme resonates well, and the use of symbolism throughout the series was clever. It's not perfect, but definitely worth watching for the art and underlying message.",
                'rating_amount' => 3.5,
                'like_count' => 8,
                'dislike_count' => 2,
                'status' => 'accepted',
            ],
        ];

        $now = Carbon::now();
        foreach ($reviews as &$review) {
            $review['created_at'] = $now;
            $review['updated_at'] = $now;
        }

        DB::table('reviews')->insert($reviews);
    }
}
