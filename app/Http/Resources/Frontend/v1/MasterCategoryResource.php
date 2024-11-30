<?php

namespace App\Http\Resources\Frontend\v1;

use App\Models\SubCategory;
use Illuminate\Http\Request;

class MasterCategoryResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'masterCategory',
            'id' => (string)$this->id,
            'attributes' => [
                'title' => $this->name,
                'description' => $this->description,
            ],
            'relationships' => $this->when($this->includeRelationships, fn () => [
                'subCategories' => [
                    'links' => [], # todo
                    'data' => $this->subCategories
                        ->map(fn(SubCategory $subCategory) => ['type' => 'subCategory', 'id' => (string) $subCategory->id])
                        ->toArray(),
                ]
            ]),
            'links' => [
                'self' => $this->url()
            ],
            'includes' => $this->when($this->includeRelationships, SubCategoryResource::collection($this->whenLoaded('subCategories')))
        ];
    }
}
