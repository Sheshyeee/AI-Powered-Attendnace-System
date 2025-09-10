<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ManagerDepartmentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
    Route::post('/departments/store', [DepartmentController::class, 'store'])->name('departments.store');
    Route::get('/departments/{id}/delete', [DepartmentController::class, 'destroy'])->name('departments.destroy');
    Route::get('/departments/detail/{id}', [DepartmentController::class, 'show'])->name('departments.show');

    Route::get('/manager/employees', [ManagerDepartmentController::class, 'index'])->name('employees.index');
    Route::get('/manager/table/view', [ManagerDepartmentController::class, 'view'])->name('employees.view');

    Route::get('/departments/{id}/AddEmployee/show', [EmployeeController::class, 'index']);
    Route::post('/employees/store', [EmployeeController::class, 'store'])->name('employees.store');
    Route::get('/employees/dashboard', [EmployeeController::class, 'dashboard'])->name('employees.dashboard');
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
    Route::get('/employees/{id}/edit', [EmployeeController::class, 'edit'])->name('employees.edit');
    Route::put('/employee/details/edit/store/{id}', [EmployeeController::class, 'update'])->name('employees.update');

    Route::get('/departments/{id}/AddManager/show', [UserController::class, 'showAddManager'])->name('departments.showAddManager');
    Route::post('/managers/store', [UserController::class, 'store']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
