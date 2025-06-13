<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
    
            $user = User::where('google_id', $googleUser->id)->first();
    
            if (!$user) {
                $user = User::where('email', $googleUser->email)->first();
    
                if ($user) {
                    return redirect('/login')->withErrors([
                        'google' => 'An account already exists with this email. Please log in with your password instead.'
                    ]);
                } else {
                    $user = User::create([
                        'name' => $googleUser->name ?? $googleUser->nickname,
                        'email' => $googleUser->email,
                        'google_id' => $googleUser->id,
                        'google_token' => $googleUser->token,
                        'google_refresh_token' => $googleUser->refreshToken,
                    ]);
                }
            } else {
                $user->update([
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                ]);
            }
    
            Auth::login($user, true);
    
            return redirect('/dashboard');
    
        } catch (\Exception $e) {
            return redirect('/login')->withErrors([
                'google' => 'Failed to authenticate with Google: '.$e->getMessage()
            ]);
        }
    }
}
