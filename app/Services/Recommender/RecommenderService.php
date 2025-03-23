<?php

namespace App\Services\Recommender;

use App\Gorse\Feedback;
use App\Gorse\Gorse;
use App\Gorse\Item;
use App\Gorse\User as GorseUser;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class RecommenderService
{
    public function __construct(private Gorse $client)
    {
    }

    /**
     * @param Collection<int, User> $users
     * @param int $chunkSize
     * @return void
     */
    public function sendUsers(Collection $users, int $chunkSize = 100): void
    {
        $userChunks = $users->map(function (User $user) {
            return new GorseUser(
                userId: $user->id,
                labels: $user->getLabels(),
            );
        })->chunk($chunkSize);

        foreach ($userChunks as $userChunk) {
            $this->client->insertUsers($userChunk);
        }
    }

    /**
     * @param Collection<int, Product> $products
     * @param int $chunkSize
     * @return void
     */
    public function sendProducts(Collection $products, int $chunkSize = 100): void
    {
        $userChunks = $products->map(function (Product $product) {
            return new Item(
                item_id: $product->id,
                categories: $product->getCategories(),
                labels: $product->getLabels(),
                is_hidden: $product->isHidden(),
                comment: $product->description,
                timestamp: $product->created_at->toISOString(),
            );
        })->chunk($chunkSize);

        foreach ($userChunks as $userChunk) {
            $this->client->insertItems($userChunk);
        }
    }

    public function sendFeedback(string $userId, FeedbackType $feedbackType, string $productId, ?Carbon $dateTime = null): void
    {
        $timestamp = $dateTime ?? Carbon::now();

        $this->client->insertFeedback([
            new Feedback(
                feedback_type: $feedbackType->value,
                user_id: $userId,
                item_id: $productId,
                timestamp: $timestamp->format('Y-m-d')
            )
        ]);
    }
}
