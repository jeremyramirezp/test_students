<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(StudentController::class)->middleware('throttle:60,1')->group(function() {
    Route::get('/students', 'getStudents');
    Route::get('/students/{id}', 'getStudentById');
    Route::post('/students', 'addStudent');
    Route::put('/students/{id}', 'updateStudentById');
    Route::delete('/students/{id}', 'deleteStudentById');
});
