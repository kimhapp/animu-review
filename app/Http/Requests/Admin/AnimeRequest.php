<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class AnimeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role === 'admin';
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
            'country' => ['required', Rule::exists('countries', 'id')],
            'description' => ['required', 'string'],
            'user_rating' => ['required', 'numeric', 'between:0,5'],
            'release_date' => ['required', 'date'],
            'duration' => ['nullable', 'integer', 'min:1'],
            'total_episodes' => ['nullable', 'integer', 'min:1'],
            'is_finished' => ['nullable', 'boolean'],
            'director' => ['required', 'string', 'max:255'],
            'studio' => ['required', 'string', 'max:255'],
            'favorite_count' => ['nullable', 'integer', 'min:0'],
            'view_count' => ['nullable', 'integer', 'min:0'],
            'category_id' => ['required', Rule::exists('categories', 'id')],
            'imageUrl' => ['nullable', 'string', 'url', 'max:2048'],
        ];
    }
}
