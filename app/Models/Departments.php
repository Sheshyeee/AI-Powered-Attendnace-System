<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    protected $fillable = ['name', 'user_id'];

    // This relationship is for the user who CREATED the department
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // This gets all users who belong to this department
    public function allUsers()
    {
        return $this->hasMany(User::class, 'department_id');
    }

    // This gets the manager of this department
    public function manager()
    {
        return $this->hasMany(User::class, 'department_id')->where('role', 'manager');
    }
    public function employee()
    {
        return $this->hasMany(User::class, 'department_id')->where('role', 'employee');
    }

    // Alternative: if you want to keep the 'user' relationship name for the creator
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
