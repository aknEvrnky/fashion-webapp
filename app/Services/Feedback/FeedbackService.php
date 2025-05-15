<?php

namespace App\Services\Feedback;

use App\Gorse\Feedback;
use App\Gorse\Gorse;
use Illuminate\Cache\Repository;
use Illuminate\Redis\Connections\Connection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Redis;

class FeedbackService
{
    private readonly Connection $connection;

    public function __construct(private Repository $cacheRepository, private Gorse $client)
    {
        $this->connection = Redis::connection('feedbacks');
    }

    public function feed(int $userId, FeedbackType $feedbackType, string $productId, ?Carbon $datetime = null, ?string $comment = null): void
    {
        $datetime = $datetime ?? Carbon::now();

        $feedback = new Feedback(
            feedback_type: $feedbackType->value,
            user_id: $userId,
            item_id: $productId,
            timestamp: $datetime->toISOString(),
            comment: $comment,
        );

        $this->connection->lPush('feedback_queue', json_encode($feedback));
    }

    public function persist(): void
    {
        $feedbacks = $this->connection->lRange('feedback_queue', 0, -1);
        $feedbacks = array_map(fn(string $f) => json_decode($f, true), $feedbacks);

        $this->client->insertFeedback($feedbacks);
        $this->connection->del('feedback_queue');
    }
}
