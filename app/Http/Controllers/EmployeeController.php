<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index($id)
    {
        $department = Departments::findOrFail($id);
        return inertia('super_admin/add_employee', ['department' => $department]);
    }

    public function store(Request $request)
    {
        // This validation block was missing in your original
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
            'role' => 'employee',
            'department_id' => $request->department_id,
        ]);

        return Auth::user()->role === 'admin' ? redirect()->route('departments.show', $request->department_id)
            ->with('success', 'Employee added successfully.') : redirect()->route('employees.view');
    }

    public function dashboard(Request $request)
    {
        $user = $request->user();
        $department = $user->department->latest()->first();
        return inertia('employees/index', ['department' => $department]);
    }

    public function destroy($id)
    {
        $employee = User::findOrFail($id);

        $employee->delete();

        // Check user role and redirect accordingly

        return redirect()->route('employees.view')
            ->with('success', 'Employee deleted successfully.');
    }

    public function edit($id)
    {
        $user = User::findOrfail($id);

        return inertia('manager/edit_employees', ['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrfail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'role' => 'required|string|in:manager,employee',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        return redirect()->route('employees.view');
    }
}
