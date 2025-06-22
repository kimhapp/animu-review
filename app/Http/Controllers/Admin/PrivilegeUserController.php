<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PrivilegeUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PrivilegeUserController extends Controller
{
    public function create(): Response
    {
        // Fetch users who are not 'user'
        $privilegedUsers = User::where('role', '!=', 'user')->get(['id', 'name', 'email', 'role']);
        $registeredUsers = User::where('role', 'user')->get(['id', 'name', 'email']);

        return Inertia::render('admin/privilege', [
            'privilegedUsers' => $privilegedUsers,
            'registeredUsers' => $registeredUsers,
        ]);
    }

    public function store(PrivilegeUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $user = User::find($data['user_id']);
        if (!$user) {
            return redirect()->back()->withErrors(['user_id' => 'User not found.']);
        }

        $user->role = $data['new_role'];
        $user->save();

        return redirect()->route('admin.privilege');
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/privilege', [
            'user' => $user,
        ]);
    }

    public function update(PrivilegeUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
    
        $user->role = $data['new_role'];  // use new_role here as well
        $user->save();
    
        return redirect()->route('admin.privilege');
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->role = 'user';
        $user->save();

        return redirect()->route('admin.privilege')
            ->with('success', "{$user->name} has been demoted to user.");
    }
}
