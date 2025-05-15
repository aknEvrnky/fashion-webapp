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
        $subCategory = $request->get('sub_category', null);

        $query = Product::query()
            ->when($gender, fn(Builder $query) => $query->where('gender', $gender))
            ->when(count($colors), fn(Builder $query) => $query->whereHas('baseColour', function (Builder $query) use ($colors) {
                $query->whereIn('base_colours.id', $colors);
            }));

        if ($subCategory) {
            $query = $query->whereHas('articleType.subCategory', function (Builder $query) use ($subCategory) {
                $query->where('sub_categories.id', $subCategory);
            });
        } else if ($masterCategory) {
            $query = $query->whereHas('articleType.subCategory.masterCategory', function (Builder $query) use ($masterCategory) {
                $query->where('master_categories.id', $masterCategory);
            });
        }

        $products = $query->paginate($request->get('per_page', 20));
        return ProductResource::collection($products);
    }

    public function show(Request $request)
    {
        return Inertia::render('Product/Show');
    }
}
