<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function showAddManager($id)
    {
        $department = Departments::findOrFail($id);
        return inertia('super_admin/add_manager', ['department' => $department]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'department_id' => 'required|exists:departments,id',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'manager',
            'department_id' => $request->department_id,
        ]);

        return Auth::user()->role === 'admin' ? redirect()->route('departments.show', $request->department_id)
            ->with('success', 'Employee added successfully.') : redirect()->route('employees.view');
    }
}
