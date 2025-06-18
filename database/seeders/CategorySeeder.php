<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'TV', 'description' => 'Television series'],
            ['name' => 'Movie', 'description' => 'Anime movies'],
            ['name' => 'OVA', 'description' => 'Original Video Animation'],
            ['name' => 'ONA', 'description' => 'Original Net Animation'],
            ['name' => 'Special', 'description' => 'Special episodes'],
        ];

        $now = Carbon::now();

        foreach ($categories as &$category) {
            $category['created_at'] = $now;
            $category['updated_at'] = $now;
        }

        DB::table('categories')->insert($categories);
    }
}
