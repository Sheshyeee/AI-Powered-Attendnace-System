<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate; // ✅ use the Facade

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Departments::with('manager', 'employee')

            ->latest()
            ->get();

        return inertia('super_admin/departments', [
            'departments' => $departments,

        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('manage-all-departments'); // ✅ check before storing

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Departments::create([
            'name'    => $request->name,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('departments.index')
            ->with('success', 'Department added successfully.');
    }

    public function destroy($id)
    {
        Gate::authorize('manage-all-departments'); 
        $department = Departments::findOrFail($id);
        $department->delete();

        return redirect()->route('departments.index')
            ->with('success', 'Department deleted successfully.');
    }

    public function show($id)
    {
        $department = Departments::with('manager', 'employee')->findOrFail($id);

        return inertia('super_admin/department_details', [
            'department' => $department,
        ]);
    }
}
