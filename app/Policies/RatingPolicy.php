<?php

namespace App\Policies;

use App\Models\Rating;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RatingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Rating $rating): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Rating $rating): bool
    {
        return $user->id === $rating->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Rating $rating): bool
    {
        return $user->id === $rating->user_id || $user->isAdmin();
    }
}
