<?php

namespace App\Services\Recommender;

use App\Gorse\Gorse;
use App\Gorse\Item;
use App\Gorse\User as GorseUser;
use App\Models\Product;
use App\Models\User;
use GuzzleHttp\Exception\GuzzleException;
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

    /**
     * @return Collection<Product>
     * @throws GuzzleException
     */
    public function latestProducts(int $limit, ?int $userId = null, ?string $category = null): Collection
    {
        $products = $category
            ? $this->client->latestProductsByCategory($category, $limit, $userId)
            : $this->client->latestProducts($limit, $userId);

            $productIds = collect($products)->pluck('Id');

        return Product::query()->whereIn('id', $productIds)->get();
    }

    /**
     * @return Collection<Product>
     * @throws GuzzleException
     */
    public function popularProducts(int $limit, ?int $userId = null, ?string $category = null): Collection
    {
        $products = $category
            ? $this->client->popularProductsByCategory($category, $limit, $userId)
            : $this->client->popularProducts($limit, $userId);

        $productIds = collect($products)->pluck('Id');

        return Product::query()->whereIn('id', $productIds)->get();
    }

    public function similarProducts(string $productId, int $limit = 5): Collection
    {
        $products = $this->client->productNeighbors($productId, $limit);

        $productIds = collect($products)->pluck('Id');

        return Product::query()->whereIn('id', $productIds)->get();

    }

    public function recommendedProductsForCategory(string $userId, string $category, int $limit = 5): Collection
    {
        $productIds = $this->client->getRecommendationsForCategory($userId, $category, $limit);

        return Product::query()->whereIn('id', $productIds)->get();
    }
}
