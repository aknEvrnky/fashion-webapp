<?php

namespace App\Cnn;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class CnnClient
{
    private PendingRequest $client;

    public function __construct(string $baseUrl, string $bearerToken)
    {
        $this->client = Http::baseUrl($baseUrl)
            ->withToken($bearerToken)
            ->acceptJson();
    }

    public function startEmbedGenerating(): array
    {
        $response = $this->client->post('/embeddings/generate');
        if ($response->failed()) {
            throw new \Exception('Failed to start embedding generation: ' . $response->body());
        }
        return $response->json();
    }

    public function generateProductEmbeddings(string $productId): array
    {
        $response = $this->client->post('/embeddings/product/' . $productId);
        if ($response->failed()) {
            throw new \Exception('Failed to generate embeddings for product: ' . $response->body());
        }
        return $response->json();
    }

    public function updateProductEmbeddings(string $productId)
    {
        $response = $this->client->put('/embeddings/product/' . $productId);
        if ($response->failed()) {
            throw new \Exception('Failed to update product embeddings: ' . $response->body());
        }
        return $response->json();
    }

    public function deleteProductEmbeddings(string $productId)
    {
        $response = $this->client->delete('/embeddings/product/' . $productId);
        if ($response->failed()) {
            throw new \Exception('Failed to delete product embeddings: ' . $response->body());
        }
        return $response->json();
    }

    public function getSimilarProducts(string $productId, int $n = 5)
    {
        $response = $this->client->get('/similar-products/' . $productId, [
            'top_n' => $n,
        ]);
        if ($response->failed()) {
            throw new \Exception('Failed to get similar products: ' . $response->body());
        }
        return $response->json();
    }
}
