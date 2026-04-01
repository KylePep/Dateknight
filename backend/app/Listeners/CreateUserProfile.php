<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateUserProfile
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $event->user->profile()->create([
            'bio' => null,
            'avatar' => 'https://i.pravatar.cc/150?u=' . $event->user->id,
            'preferences' => json_encode([]),
        ]);
    }
}
