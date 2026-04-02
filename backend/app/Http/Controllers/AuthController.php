<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function user()
    {
        $user = Auth::user()
            ->load(['profile', 'friendsOfMine', 'friendOf'])
            ->append('friends')
            ->makeHidden(['friendsOfMine', 'friendOf']);

        return $user;
    }
}
