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
            $table->foreignId('country_id')->constrained('countries')->onDelete('cascade');
            $table->text('description');
            $table->decimal('user_rating', 2, 1);
            $table->date('release_date');
            $table->unsignedSmallInteger('duration')->nullable();
            $table->unsignedSmallInteger('total_episodes')->nullable();
            $table->boolean('is_finished')->nullable();
            $table->string('director');
            $table->string('studio');
            $table->unsignedInteger('favorite_count')->default(0);
            $table->unsignedInteger('view_count')->default(0);
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
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
