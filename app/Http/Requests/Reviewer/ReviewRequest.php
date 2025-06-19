<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        // If updating, ensure the user owns the review
        if ($this->route('review')) {
            return Auth::check() && $this->user()->id === $this->route('review')->user_id;
        }

        // Otherwise (creating), just check auth
        return Auth::check() && (Auth::user()->role === 'reviewer' || Auth::user() === 'admin');
    }

    public function rules(): array
    {
        $rules = [
            'content' => ['required', 'string'],
            'rating_amount' => ['required', 'numeric', 'between:0,5'],
        ];

        if ($this->isMethod('post')) {
            // On create, require anime_id and enforce unique per user
            $rules['anime_id'] = [
                'required',
                'exists:animes,id',
                Rule::unique('reviews')->where(function ($query) {
                    return $query->where('user_id', $this->user()->id);
                }),
            ];
        }

        return $rules;
    }
}