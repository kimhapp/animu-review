<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PendingPromotion extends Model
{
    protected $fillable = [
        'user_id',
        'new_role',
        'accepted',
    ];

    protected $casts = [
        'accepted' => 'boolean',
    ];

    /**
     * The user who was offered the promotion.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isPending(): bool
    {
        return $this->accepted === false;
    }
    
    public function isAccepted(): bool
    {
        return $this->accepted === true;
    }
}
