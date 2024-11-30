<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\v1\ArticleTypeResource;
use App\Http\Resources\Frontend\v1\ProductResource;
use App\Models\ArticleType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleTypeController extends Controller
{
    public function show(Request $request, ArticleType $articleType)
    {
        $products = $articleType->products()->paginate();

        return Inertia::render('ArticleType/Show', [
            'articleType' => ArticleTypeResource::make($articleType),
            'products' => ProductResource::collection($products)
        ]);
    }
}
