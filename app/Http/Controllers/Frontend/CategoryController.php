<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\SubCategoryResource;
use App\Models\MasterCategory;

class CategoryController extends Controller
{
    public function subCategories(MasterCategory $masterCategory)
    {
        $subCategories = $masterCategory->subCategories()->get();

        return SubCategoryResource::collection($subCategories);
    }
}
