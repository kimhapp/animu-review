<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('animes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('native_title');
            $table->text('description');
            $table->decimal('user_rating', 1, 1)->default(0.0);
            $table->date('release_date');
            $table->unsignedSmallInteger('duration');
            $table->string('director');
            $table->string('studio');
            $table->unsignedInteger('favorite_count')->default(0);
            $table->foreignId('type_id')->constrained('types')->onDelete('cascade');
            $table->foreignId('review_id')->constrained('reviews')->onDelete('cascade')->nullable();
            $table->string('imageUrl')->nullable();
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};
