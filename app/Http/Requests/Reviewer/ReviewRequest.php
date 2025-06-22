<?php

namespace App\Http\Requests\Reviewer;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
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