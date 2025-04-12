<?php

namespace App\Services\Feedback;

enum FeedbackPositivity: string
{
    case POSITIVE = 'positive';
    case READ = 'read';
}
