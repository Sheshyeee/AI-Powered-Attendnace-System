<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Departments;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
    */
    public function boot(): void
    {
        Gate::define('manage-all-departments', function ($user) {
            return $user->role === 'admin';
        });
        Gate::define('manage-own-department', function ($user) {
            return $user->role === 'manager';
        });
        Gate::define('employees', function ($user) {
            return $user->role === 'employee';
        });

        // Share with all Inertia pages

    }
}
