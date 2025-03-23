<?php

namespace App\Services\Recommender;

enum FeedbackPositivity: string
{
    case POSITIVE = 'positive';
    case READ = 'read';
}
