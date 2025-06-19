<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Review;

class ReviewPosted extends Notification implements ShouldQueue
{
    use Queueable;

    protected $review;

    /**
     * Create a new notification instance.
     */
    public function __construct(Review $review)
    {
        $this->review = $review;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        $url = route('home.show', $this->review->id);

        return (new MailMessage)
            ->subject('New Review Posted')
            ->greeting("Hi {$notifiable->name},")
            ->line("{$this->review->user->name} posted a new review on {$this->review->anime->title}.")
            ->action('View Review', $url)
            ->line('Thank you for using our website!');
    }
    
    public function toDatabase($notifiable)
    {
        return [
            'review_id' => $this->review->id, 
            'reviewer_id' => $this->review->user_id,
            'reviewer_name' => $this->review->user->name,
            'anime_id' => $this->review->anime_id,
            'message' => "{$this->review->user->name} posted a new review on {$this->review->anime->title}.",
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
