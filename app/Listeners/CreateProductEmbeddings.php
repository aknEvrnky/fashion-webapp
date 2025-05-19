<?php

namespace App\Listeners;

use App\Cnn\CnnClient;
use App\Events\ProductCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateProductEmbeddings
{
    /**
     * Create the event listener.
     */
    public function __construct(private readonly CnnClient $cnnClient)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ProductCreated $event): void
    {
        $this->cnnClient->generateProductEmbeddings($event->product->id);
    }
}
