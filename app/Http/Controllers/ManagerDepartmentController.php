<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagerDepartmentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $department = $user->department;


        return inertia('manager/index', [
            'department' => $department,

        ]);
    }

    public function view(Request $request)
    {
        $user = $request->user();
        $department = Departments::with('manager', 'employee')->findOrFail($user->department->id);

        return inertia('manager/employees', [
            'department' => $department,
        ]);
    }
}
