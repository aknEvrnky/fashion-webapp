<?php

namespace App\Services\Feedback;

/**
 * Feedback represents events that happened between users and items, which can be positive or negative. For example,
 * sharing and liking are the user's positive feedback to an item. If the user does not have further positive
 * feedback after reading, the user's feedback on the item is considered negative. If the user views the item, read
 * feedback will be recorded. Then, if the user gives positive feedback to the item, the read feedback will be
 * overwritten by the positive feedback. Conversely, if the user does not give positive feedback, then the read
 * feedback is considered negative feedback.
 */
enum FeedbackType: string
{
    case PURCHASE = 'purchase';
    case LIKE = 'like';
    case VIEW = 'view';
    case ADD_TO_CART = 'add_to_cart';
    case ADD_TO_WISHLIST = 'add_to_wishlist';
    case CLICK = 'click';

    public function positivity(): FeedbackPositivity
    {
        return match ($this) {
            FeedbackType::PURCHASE => FeedbackPositivity::POSITIVE,
            FeedbackType::LIKE => FeedbackPositivity::POSITIVE,
            FeedbackType::ADD_TO_CART => FeedbackPositivity::POSITIVE,
            FeedbackType::ADD_TO_WISHLIST => FeedbackPositivity::POSITIVE,
            FeedbackType::VIEW => FeedbackPositivity::READ,
            FeedbackType::CLICK => FeedbackPositivity::READ,
        };
    }
}
