<?php

namespace App\Listeners;

use App\Cnn\CnnClient;
use App\Events\ProductDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class DeleteProductEmbeddings
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
    public function handle(ProductDeleted $event): void
    {
        $this->cnnClient->deleteProductEmbeddings($event->product->id);
    }
}
