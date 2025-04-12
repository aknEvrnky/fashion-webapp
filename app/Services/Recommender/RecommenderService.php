<?php

namespace App\Services\Recommender;

use App\Gorse\Gorse;
use App\Gorse\Item;
use App\Gorse\User as GorseUser;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Collection;

class RecommenderService
{
    public function __construct(private Gorse $client)
    {
    }

    /**
     * @param Collection<int, User> $users
     */
    public function sendUsers(Collection $users): void
    {
        $users = $users->map(function (User $user) {
            return new GorseUser(
                userId: $user->id,
                labels: $user->getLabels(),
            );
        });

        $this->client->insertUsers($users);
    }

    /**
     * @param Collection<int, Product> $products
     */
    public function sendProducts(Collection $products): void
    {
        $products = $products->map(function (Product $product) {
            return new Item(
                item_id: $product->id,
                categories: $product->getCategories(),
                labels: $product->getLabels(),
                is_hidden: $product->isHidden(),
                comment: $product->description,
                timestamp: $product->created_at->toISOString(),
            );
        });

        $this->client->insertItems($products);
    }
}
