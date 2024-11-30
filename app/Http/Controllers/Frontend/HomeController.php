<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\v1\MasterCategoryResource;
use App\Models\MasterCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $masterCategories = MasterCategoryResource::collection(MasterCategory::query()->get());
        return Inertia::render('Home', compact('masterCategories'));
    }
}
