<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataRekening extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_rekening',
        'nomor_rekening',
        'gambar_rekening',
    ];
}
