<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\MasterCategoryResource;
use App\Http\Resources\Frontend\ProductResource;
use App\Models\MasterCategory;
use App\Services\Recommender\RecommenderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, RecommenderService $recommenderService)
    {
        $userId = $request->user()?->id ?? session()->get('recommender-id');

        // Get the latest products from Gorse
        $latestProducts = $recommenderService->latestProducts(10, $userId);
        $popularProducts = $recommenderService->popularProducts(5, $userId);

        $latestProducts = ProductResource::collection($latestProducts);
        $popularProducts = ProductResource::collection($popularProducts);


        return Inertia::render('Home', compact( 'latestProducts', 'popularProducts'));
    }
}
