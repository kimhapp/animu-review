<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Auth;

class CountryRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Adjust this as needed — e.g., only admin users can manage countries
        return Auth::check();
    }

    public function rules(): array
    {
        $countryId = $this->route('country')->id;

        return [
            'name' => ['required', 'string', 'max:255', Rule::unique('countries', 'name')->ignore($countryId)],
        ];
    }
}
