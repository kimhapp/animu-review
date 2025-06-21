<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Rating;

class RatingPosted extends Notification implements ShouldQueue
{
    use Queueable;

    protected $rating;

    /**
     * Create a new notification instance.
     */
    public function __construct(Rating $rating)
    {
        $this->rating = $rating;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'rating_id' => $this->rating->id, 
            'user_id' => $this->rating->user_id,
            'user_name' => $this->rating->user->name,
            'anime_id' => $this->rating->anime_id,
            'message' => "{$this->rating->user->name} posted a new rating on {$this->rating->anime->title}.",
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
