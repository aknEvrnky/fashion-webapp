<?php

namespace App\Gorse;

use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class Gorse
{
    private PendingRequest $client;

    function __construct(string $endpoint, string $apiKey)
    {
        $this->client = Http::baseUrl($endpoint)->withHeader('X-API-Key', $apiKey);
    }

    /**
     * @throws GuzzleException
     */
    function insertUser(User $user): RowAffected
    {
        $response = $this->client->post('/api/user/', $user);
        return RowAffected::fromJSON($response->object());
    }

    /**
     *
     * @param Collection<int, User> $users
     * @return RowAffected
     * @throws GuzzleException
     */
    function insertUsers(Collection $users): RowAffected
    {
        $response = $this->client->post('/api/users/', $users);

        return RowAffected::fromJSON($response->object());
    }

    /**
     * @throws GuzzleException
     */
    function getUser(string $user_id): User
    {
        $response = $this->client->get('/api/user/' . $user_id);
        return User::fromJSON($response->object());
    }

    /**
     * @throws GuzzleException
     */
    function deleteUser(string $user_id): RowAffected
    {
        $response = $this->client->delete('/api/user/' . $user_id);
        return RowAffected::fromJSON($response->object());
    }

    /**
     * @param array<int, Feedback> $feedbacks
     * @throws GuzzleException
     */
    function insertFeedback(array $feedbacks): RowAffected
    {
        $response = $this->client->post('/api/feedback/', $feedbacks);
        return RowAffected::fromJSON($response->object());
    }

    /**
     * @throws GuzzleException
     */
    function getRecommend(string $user_id): array
    {
        $response = $this->client->get('/api/recommend/' . $user_id);
        return $response->json();
    }

    public function insertItem(Item $item): RowAffected
    {
        $response = $this->client->post('/api/item/', $item);
        return RowAffected::fromJSON($response->object());
    }

    public function insertItems(Collection $items): RowAffected
    {
        $response = $this->client->post('/api/items/', $items);
        return RowAffected::fromJSON($response->object());
    }

    /**
     * @return array<array{Id: string, Result: integer}>
     * @throws GuzzleException
     */
    public function latestProducts(int $n = 10, ?int $userId = null): array
    {
        $query = [
            'n' => $n,
        ];

        if ($userId) {
            $query['user_id'] = $userId;
        }

        return $this->client->get('/api/latest', $query)->json();
    }
    /**
     * @return array<array{Id: string, Result: integer}>
     * @throws GuzzleException
     */
    public function latestProductsByCategory(string $category, int $n = 10, ?int $userId = null): array
    {
        $query = [
            'n' => $n,
        ];

        if ($userId) {
            $query['user_id'] = $userId;
        }

        return $this->client->get('/api/latest/'. $category, $query)->json();
    }

    /**
     * @return array<array{Id: string, Result: integer}>
     * @throws GuzzleException
     */
    public function popularProducts(int $n = 5, ?int $userId = null): array
    {
        $query = [
            'n' => $n,
        ];

        if ($userId) {
            $query['user_id'] = $userId;
        }

        return $this->client->get('/api/popular', $query)->json();
    }

    /**
     * @return array<array{Id: string, Result: integer}>
     * @throws GuzzleException
     */
    public function popularProductsByCategory(string $category, int $n = 5, ?int $userId = null): array
    {
        $query = [
            'n' => $n,
        ];

        if ($userId) {
            $query['user_id'] = $userId;
        }

        return $this->client->get('/api/popular/'. $category, $query)->json();
    }

    /**
     * @return array<array{Id: string, Result: integer}>
     * @throws GuzzleException
     */
    public function productNeighbors(string $productId, int $n = 5): array
    {
        $query = [
            'n' => $n,
        ];

        return $this->client->get('/api/item/'. $productId . '/neighbors', $query)->json();
    }
}
