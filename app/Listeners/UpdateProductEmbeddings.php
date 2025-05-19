<?php

namespace App\Listeners;

use App\Cnn\CnnClient;
use App\Events\ProductUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateProductEmbeddings
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
    public function handle(ProductUpdated $event): void
    {
        $this->cnnClient->updateProductEmbeddings($event->product->id);
    }
}
