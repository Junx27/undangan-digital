<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TamuController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/57766-75{id}76-868683', [TamuController::class, "welcome"]);
Route::post('/ucapan{id}', [TamuController::class, "updateUcapan"]);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [AdminController::class, "dashboard"])->name('dashboard');
    Route::get('/template', [AdminController::class, "template"])->name('template');
    Route::get('/template/{id}', [AdminController::class, "getTemplate"])->name('getTemplate');
    Route::put('/template/{id}', [AdminController::class, "updateTemplate"])->name('updateTemplate');
    Route::get('/galeri', [AdminController::class, "galeri"])->name('galeri');
    Route::get('/galeri/{id}', [AdminController::class, "getGaleri"])->name('getGaleri');
    Route::put('/galeri/{id}', [AdminController::class, "updateGaleri"])->name('updateGaleri');
    Route::post('/create-rek', [AdminController::class, "createRek"])->name('createRek');
    Route::get('/rek/{id}', [AdminController::class, "getRek"])->name('getRek');
    Route::put('/rek/{id}', [AdminController::class, "updateRek"])->name('updateRek');
    Route::delete('/rek/{id}', [AdminController::class, "deleteRek"])->name('deleteRek');
    Route::get('/data', [AdminController::class, "data"])->name('data');
    Route::put('/update-data-undangan/{id}', [AdminController::class, 'updateData']);
    Route::get('/tamu', [AdminController::class, "tamu"])->name('tamu');
    Route::get('/tamu/{id}', [AdminController::class, "getTamu"])->name('getTamu');
    Route::put('/tamu/{id}', [AdminController::class, "updateTamu"])->name('updateTamu');
    Route::delete('/tamu/{id}', [AdminController::class, "deleteTamu"])->name('deleteTamu');
    Route::post('/ucapan{id}', [AdminController::class, "updateUcapan"]);
    Route::post('/tamu', [AdminController::class, "createTamu"])->name('createTamu');
    Route::get('/preview', [AdminController::class, "preview"])->name('preview');
});

Route::fallback(function () {
    return Inertia::render("NotFound");
});

require __DIR__ . '/auth.php';
