<?php

namespace App\Http\Resources\Frontend;

use Illuminate\Http\Resources\Json\JsonResource;

class Resource extends JsonResource
{
    protected bool $includeRelationships = false;

    public function includeRelationships(bool $include = true): void
    {
        $this->includeRelationships = $include;
    }
}
