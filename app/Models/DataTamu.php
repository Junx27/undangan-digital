<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataTamu extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_tamu_undangan',
        'pin',
        'ucapan',
    ];
}
