<?php

namespace App\Http\Resources\Frontend;

use App\Models\ArticleType;
use Illuminate\Http\Request;

class SubCategoryResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'subCategory',
            'id' => (string)$this->id,
            'attributes' => [
                'title' => $this->name,
                'description' => $this->description,
            ],
            'relationships' => $this->when($this->includeRelationships, fn() => [
                'articleTypes' => [
                    'links' => [], # todo
                    'data' => $this->articleTypes
                        ->map(fn(ArticleType $articleType) => ['type' => 'articleType', 'id' => (string)$articleType->id])
                        ->toArray(),
                ]
            ]),
            'links' => [
                'self' => $this->url()
            ],
            'includes' => $this->when($this->includeRelationships, ArticleTypeResource::collection($this->whenLoaded('articleTypes')))
        ];
    }
}
