<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\v1\MasterCategoryResource;
use App\Http\Resources\Frontend\v1\SubCategoryResource;
use App\Models\MasterCategory;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterCategoryController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('MasterCategory/Index', [
            'masterCategories' => MasterCategoryResource::collection(MasterCategory::all())
        ]);
    }

    public function show(Request $request, MasterCategory $masterCategory)
    {
        $subCategories = SubCategory::paginate();

        return Inertia::render('MasterCategory/Show', [
            'masterCategory' => MasterCategoryResource::make($masterCategory),
            'subCategories' => SubCategoryResource::collection($subCategories)
        ]);
    }
}
