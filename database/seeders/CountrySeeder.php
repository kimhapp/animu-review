<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $countries = [
            ['name' => 'Japan'],
            ['name' => 'Korea'],
            ['name' => 'China'],
            ['name' => 'America'],
        ];

        $now = Carbon::now();

        foreach ($countries as &$country) {
            $country['created_at'] = $now;
            $country['updated_at'] = $now;
        }

        DB::table('countries')->insert($countries);
    }
}
