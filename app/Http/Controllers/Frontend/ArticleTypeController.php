<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\v1\ArticleTypeResource;
use App\Http\Resources\Frontend\v1\ProductResource;
use App\Models\ArticleType;
use App\Models\MasterCategory;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleTypeController extends Controller
{
    public function show(Request $request, MasterCategory $masterCategory, SubCategory $subCategory, ArticleType $articleType)
    {
        if ($articleType->sub_category_id !== $subCategory->id) {
            return route('home');
        }

        if ($subCategory->id !== $articleType->sub_category_id) {
            return route('home');
        }

        return Inertia::render('ArticleType/Show', [
            'articleType' => ArticleTypeResource::make($articleType),
            'products' => ProductResource::collection($articleType->products()->paginate())
        ]);
    }
}
