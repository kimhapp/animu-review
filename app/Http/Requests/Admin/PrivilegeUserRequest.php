<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PrivilegeUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'new_role' => ['required', 'string', 'in:user,admin,moderator'], // Customize as needed
        ];
    }
}
