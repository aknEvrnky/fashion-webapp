<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\ArticleTypeResource;
use App\Http\Resources\Frontend\SubCategoryResource;
use App\Models\MasterCategory;
use App\Models\SubCategory;

class CategoryController extends Controller
{
    public function subCategories(MasterCategory $masterCategory)
    {
        $subCategories = $masterCategory->subCategories()->get();

        return SubCategoryResource::collection($subCategories);
    }

    public function articleTypes(SubCategory $subCategory)
    {
        $articleTypes = $subCategory->articleTypes()->get();

        return ArticleTypeResource::collection($articleTypes);
    }
}
