<?php

namespace App\Http\Requests\Home;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class RatingRequest extends FormRequest
{
    public function authorize(): bool
    {
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
