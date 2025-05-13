<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\MasterCategoryResource;
use App\Http\Resources\Frontend\SubCategoryResource;
use App\Models\MasterCategory;
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
        $subCategories = $masterCategory->subCategories()
            ->with('masterCategory')
            ->paginate();

        return Inertia::render('MasterCategory/Show', [
            'masterCategory' => MasterCategoryResource::make($masterCategory),
            'subCategories' => SubCategoryResource::collection($subCategories)
        ]);
    }
}
