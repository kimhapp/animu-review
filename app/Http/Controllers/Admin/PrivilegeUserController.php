<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PrivilegeUserController extends Controller
{
    //
    public function create() {
        return Inertia::render('admin/reviewer');
    }
}
