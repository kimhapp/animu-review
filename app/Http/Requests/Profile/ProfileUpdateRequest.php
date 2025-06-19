<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Auth;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Any authenticated user can update their profile
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user()->id),
            ],

            'imageUrl' => ['nullable', 'string', 'url', 'max:2048'],
            'bio' => ['nullable', 'string'],
            'bannerUrl' => ['nullable', 'string', 'url', 'max:2048'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'], // optional change with confirmation
        ];
    }
}
