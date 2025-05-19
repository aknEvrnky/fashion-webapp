<?php

namespace App\Services\Cnn;

use App\Cnn\CnnClient;
use App\Models\Product;
use Illuminate\Support\Collection;

class CnnService
{
    public function __construct(private CnnClient $client)
    {

    }

    public function getSimilarProducts(string $productId, int $limit = 5): Collection
    {
        $response = $this->client->getSimilarProducts($productId, $limit);

        if (isset($response['error'])) {
            throw new \Exception('Error fetching similar products: ' . $response['error']);
        }

        $productIds = collect($response['similar_products'])->pluck('id');

        return Product::query()->whereIn('id', $productIds)->get();
    }
}
