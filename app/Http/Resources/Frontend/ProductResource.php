<?php

namespace App\Http\Resources\Frontend;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string)$this->id,
            'slug' => $this->slug,
            'title' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'gender' => $this->gender,
            'season' => $this->season,
            'year' => $this->year,
            'imageUrl' => $this->imageUrl(),
            'baseColour' => $this->baseColour->name,
            'usage' => $this->usage->name,
        ];
    }
}
