<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class RatingRequest extends FormRequest
{
    public function authorize(): bool
    {
        // If updating, make sure user owns the rating
        if ($this->route('rating')) {
            return Auth::check() && $this->user()->id === $this->route('rating')->user_id;
        }

        // On create
        return Auth::check();
    }

    public function rules(): array
    {
        $rules = [
            'amount' => ['required', 'numeric', 'between:0,5'],
            'content' => ['nullable', 'string'],
        ];

        // Only apply anime_id + unique rule on creation
        if ($this->isMethod('post')) {
            $rules['anime_id'] = [
                'required',
                'exists:animes,id',
                Rule::unique('ratings')->where(function ($query) {
                    return $query->where('user_id', $this->user()->id);
                }),
            ];
        }

        return $rules;
    }
}
