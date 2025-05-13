<?php

namespace App\Http\Resources\Frontend;

use App\Models\Product;
use Illuminate\Http\Request;

class ArticleTypeResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'articleType',
            'id' => (string)$this->id,
            'attributes' => [
                'title' => $this->name,
                'description' => $this->description,
            ],
            'relationships' => $this->when($this->includeRelationships, fn() => [
                'products' => [
                    'links' => [], # todo
                    'data' => $this->products
                        ->map(fn(Product $product) => ['type' => 'product', 'id' => (string)$product->id])
                        ->toArray(),
                ]
            ]),
            'links' => [
                'self' => $this->url()
            ],
            'includes' => $this->when($this->includeRelationships, ProductResource::collection($this->whenLoaded('products')))
        ];
    }
}
