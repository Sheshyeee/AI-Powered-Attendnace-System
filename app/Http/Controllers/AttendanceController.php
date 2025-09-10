<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'status' => 'required|string|in:time_in,time_out',

        ]);

        $today = Carbon::today()->toDateString();

        if ($request->status === 'time_in') {
            Attendance::create([
                'user_id' => Auth::id(),
                'date' => $today,
                'time_in' => Carbon::now()->format('H:i:s'),
            ]);
        } elseif ($request->status === 'time_out') {
            $attendance = Attendance::where('user_id', Auth::id())
                ->where('date', $today)
                ->first();

            if ($attendance && !$attendance->time_out) {
                $attendance->update([
                    'time_out' => Carbon::now()->format('H:i:s'),
                ]);
            }
        }

        return back()->with('success', 'Attendance recorded.');
    }
}
