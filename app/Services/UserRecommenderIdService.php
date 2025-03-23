<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserRecommenderIdService
{
    public function getUserId(): string
    {
        if (Auth::check()) {
            return Auth::id();
        } else {
            return Session::get('recommender_id');
        }
    }
}
