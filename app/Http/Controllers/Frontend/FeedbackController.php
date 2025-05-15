<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Services\Feedback\FeedbackService;
use App\Services\Feedback\FeedbackType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class FeedbackController extends Controller
{
    public function __construct(private FeedbackService $feedbackService)
    {
    }

    /**
     * Store feedback.
     *
     * @throws ValidationException
     */
    public function store(StoreFeedbackRequest $request)
    {
        $data = $request->validated();

        $userId = Auth::check() ? Auth::id() : session()->get('recommender-id');

        if (!$userId) {
            throw ValidationException::withMessages([
                'user_id' => 'You must be either logged in.',
            ]);
        }

        $feedbackType = FeedbackType::from($data['type']);
        $productId = $data['product_id'];
        $comment = $data['comment'] ?? null;

        $this->feedbackService->feed(
            userId: $userId,
            feedbackType: $feedbackType,
            productId: $productId,
            comment: $comment
        );

        return response()->json([
            'status' => 'success',
        ]);
    }
}
