<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\Frontend\ProductResource;
use App\Services\Recommender\RecommenderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecommendationController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, RecommenderService $recommenderService)
    {
        $userId = $request->user()?->id;

        $tshirtRecommendations = $recommenderService->popularProducts(5, $userId, 'Tshirts');
        $jacketRecommendations = $recommenderService->popularProducts(5, $userId, 'Jackets');
        $trouserRecommendations = $recommenderService->popularProducts(5, $userId, 'Trousers');
        $topRecommendations = $recommenderService->popularProducts(5, $userId, 'Tops');

        $tshirtRecommendations = ProductResource::collection($tshirtRecommendations);
        $jacketRecommendations = ProductResource::collection($jacketRecommendations);
        $trouserRecommendations = ProductResource::collection($trouserRecommendations);
        $topRecommendations = ProductResource::collection($topRecommendations);

        return Inertia::render('Recommendation', compact('tshirtRecommendations', 'jacketRecommendations', 'trouserRecommendations', 'topRecommendations'));
    }
}
