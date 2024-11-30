<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\v1\ArticleTypeResource;
use App\Http\Resources\Frontend\v1\MasterCategoryResource;
use App\Http\Resources\Frontend\v1\SubCategoryResource;
use App\Models\MasterCategory;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class SubCategoryController extends Controller
{
    public function show(Request $request, MasterCategory $masterCategory, SubCategory $subCategory)
    {
        if ($masterCategory->id !== $subCategory->master_category_id) {
            throw new BadRequestException();
        }

        $articleTypes = $subCategory->articleTypes()->paginate();

        return Inertia::render('SubCategory/Show', [
            'subCategory' => SubCategoryResource::make($subCategory),
            'articleTypes' => ArticleTypeResource::collection($articleTypes)
        ]);
    }
}
