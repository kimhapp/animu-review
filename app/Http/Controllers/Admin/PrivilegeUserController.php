<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PrivilegeUserRequest;
use App\Models\PendingPromotion;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class PrivilegeUserController extends Controller
{
    public function create()
    {
        return Inertia::render('admin/reviewer-create');
    }

    public function store(PrivilegeUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'User not found.']);
        }

        // Check if there is already a pending promotion for this user
        $existingPromotion = PendingPromotion::where('user_id', $user->id)
            ->where('accepted', false)
            ->first();

        if ($existingPromotion) {
            return redirect()->back()->withErrors(['email' => 'There is already a pending promotion for this user.']);
        }

        // Create a pending promotion record
        PendingPromotion::create([
            'user_id' => $user->id,
            'new_role' => $data['role'],
            'accepted' => false,
        ]);

        return redirect()->route('admin.privilege.index')
            ->with('success', 'Pending promotion created successfully.');
    }

    public function index()
    {
        $pendingPromotions = PendingPromotion::with('user')->where('accepted', false)->get();

        return Inertia::render('admin/pending-promotions-index', [
            'pendingPromotions' => $pendingPromotions,
        ]);
    }

    // Admin accepts a pending promotion, updates user role, marks promotion accepted
    public function accept(PendingPromotion $pendingPromotion): RedirectResponse
    {
        $user = $pendingPromotion->user;

        $user->role = $pendingPromotion->new_role;
        $user->save();

        $pendingPromotion->accepted = true;
        $pendingPromotion->save();

        return redirect()->route('admin.privilege.index')
            ->with('success', 'User role updated and promotion accepted.');
    }

    // Optionally reject promotion
    public function reject(PendingPromotion $pendingPromotion): RedirectResponse
    {
        $pendingPromotion->delete();

        return redirect()->route('admin.privilege.index')
            ->with('success', 'Pending promotion rejected.');
    }
}
