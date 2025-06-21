<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\PendingPromotion;

class PromotionOffered extends Notification implements ShouldQueue
{
    use Queueable;

    protected $promotion;

    public function __construct(PendingPromotion $promotion) 
    {
        $this->promotion = $promotion;
    }

    public function via($notifiable)
    {
        return ['database', 'mail']; // optional: just use 'database' if you don't want emails
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => "You’ve been offered a promotion to {$this->promotion->new_role}. Please check your email inbox!",
            'promotion_id' => $this->promotion->id,
        ];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('You\'ve been offered a promotion!')
            ->line("You\'ve been invited to become a {$this->promotion->new_role}.")
            ->action('Accept Promotion', route('promotions.accept', $this->promotion->id))
            ->line('If you don\'t want to accept, you can ignore this.');
    }
}
