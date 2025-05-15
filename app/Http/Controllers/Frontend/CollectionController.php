<?php

namespace App\Http\Controllers\Frontend;

use App\Enums\Gender;
use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\BaseColourResource;
use App\Http\Resources\Frontend\MasterCategoryResource;
use App\Models\BaseColour;
use App\Models\MasterCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $genders = Gender::cases();
        $colors = BaseColourResource::collection(BaseColour::all());
        $masterCategories = MasterCategoryResource::collection(MasterCategory::all());

        return Inertia::render('Collection', [
            'genders' => $genders,
            'colors' => $colors,
            'masterCategories' => $masterCategories,
        ]);
    }
}
