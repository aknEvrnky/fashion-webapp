<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\v1\ArticleTypeResource;
use App\Http\Resources\Frontend\v1\SubCategoryResource;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubCategoryController extends Controller
{
    public function show(Request $request, SubCategory $subCategory)
    {
        $articleTypes = $subCategory->articleTypes()
            ->with('subCategory.masterCategory')
            ->paginate();

        return Inertia::render('SubCategory/Show', [
            'subCategory' => SubCategoryResource::make($subCategory),
            'articleTypes' => ArticleTypeResource::collection($articleTypes)
        ]);
    }
}
