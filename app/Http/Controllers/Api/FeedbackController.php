<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Feedback\StoreFeedbackRequest;
use App\Services\Feedback\FeedbackService;
use App\Services\Feedback\FeedbackType;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

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
    }
}
