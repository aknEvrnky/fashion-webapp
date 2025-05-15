<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetProductRequest;
use App\Http\Resources\Frontend\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(GetProductRequest $request)
    {
        $gender = $request->get('gender');
        $colors = $request->get('colors', []);
        $masterCategory = $request->get('master_category', null);

        $products = Product::query()
            ->when($gender, fn(Builder $query) => $query->where('gender', $gender))
            ->when(count($colors), fn(Builder $query) => $query->whereHas('baseColour', function (Builder $query) use ($colors) {
                $query->whereIn('base_colours.id', $colors);
            }))
            ->when($masterCategory, fn(Builder $query) => $query->whereHas('articleType.subCategory.masterCategory', function (Builder $query) use ($masterCategory) {
                $query->where('master_categories.id', $masterCategory);
            }))
            ->paginate($request->get('per_page', 20));

        return ProductResource::collection($products);
    }

    public function show(Request $request)
    {
        return Inertia::render('Product/Show');
    }
}
