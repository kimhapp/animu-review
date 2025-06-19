<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PrivilegeUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Only admins are allowed to initiate promotions
        return Auth::check() && Auth::user()->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'new_role' => ['required', 'string', 'in:user,admin,moderator'], // Customize as needed
        ];
    }
}
