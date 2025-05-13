<?php

namespace App\Gorse;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\RequestOptions;
use Illuminate\Support\Collection;

class Gorse
{
    private string $endpoint;
    private string $apiKey;

    function __construct(string $endpoint, string $apiKey)
    {
        $this->endpoint = $endpoint;
        $this->apiKey = $apiKey;
    }

    /**
     * @throws GuzzleException
     */
    function insertUser(User $user): RowAffected
    {
        return RowAffected::fromJSON($this->request('POST', '/api/user/', $user));
    }

    /**
     *
     * @param Collection<int, User> $users
     * @return RowAffected
     * @throws GuzzleException
     */
    function insertUsers(Collection $users): RowAffected
    {
        return RowAffected::fromJSON($this->request('POST', '/api/users/', $users));
    }

    /**
     * @throws GuzzleException
     */
    function getUser(string $user_id): User
    {
        return User::fromJSON($this->request('GET', '/api/user/' . $user_id, null));
    }

    /**
     * @throws GuzzleException
     */
    function deleteUser(string $user_id): RowAffected
    {
        return RowAffected::fromJSON($this->request('DELETE', '/api/user/' . $user_id, null));
    }

    /**
     * @param array<int, Feedback> $feedbacks
     * @throws GuzzleException
     */
    function insertFeedback(array $feedbacks): RowAffected
    {
        return RowAffected::fromJSON($this->request('POST', '/api/feedback/', $feedbacks));
    }

    /**
     * @throws GuzzleException
     */
    function getRecommend(string $user_id): array
    {
        return $this->request('GET', '/api/recommend/' . $user_id, null);
    }

    /**
     * @throws GuzzleException
     */
    private function request(string $method, string $uri, $body)
    {
        $client = new Client(['base_uri' => $this->endpoint]);
        $options = [RequestOptions::HEADERS => ['X-API-Key' => $this->apiKey]];
        if ($body != null) {
            $options[RequestOptions::JSON] = $body;
        }
        $response = $client->request($method, $uri, $options);
        return json_decode($response->getBody());
    }

    public function insertItem(Item $item): RowAffected
    {
        return RowAffected::fromJSON($this->request('POST', '/api/item/', $item));
    }

    public function insertItems(Collection $items): RowAffected
    {
        return RowAffected::fromJSON($this->request('POST', '/api/items/', $items));
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

        return $this->request('GET', '/api/latest/', $query);
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

        return $this->request('GET', '/api/popular/', $query);
    }
}
