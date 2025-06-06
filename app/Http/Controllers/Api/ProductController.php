<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()->paginate(100);

        return ProductResource::collection($products);
    }

    public function show(Request $request, Product $product)
    {
        return new ProductResource($product);
    }
}
