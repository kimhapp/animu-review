<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class AnimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        $animeId = $this->route('anime')?->id;
    
        return [
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('animes', 'title')->ignore($animeId),
            ],
            'native_title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('animes', 'native_title')->ignore($animeId),
            ],
            'country_id' => ['required', Rule::exists('countries', 'id')],
            'description' => ['required', 'string'],
            'release_date' => ['required', 'date'],
            'duration' => ['nullable', 'integer', 'min:0'],
            'total_episodes' => ['nullable', 'integer', 'min:0'],
            'is_finished' => ['nullable', 'boolean'],
            'director' => ['required', 'string', 'max:255'],
            'studio' => ['required', 'string', 'max:255'],
            'category_id' => ['required', Rule::exists('categories', 'id')],
            'imageUrl' => ['nullable', 'string', 'url', 'max:2048'],
            'genre_ids' => ['required', 'array', 'min:1'],
            'genre_ids.*' => ['integer', Rule::exists('genres', 'id')],
        ];
    }   
}
