<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataUndangan extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama_mempelai_pria',
        'nama_mempelai_wanita',
        'nama_lengkap_mempelai_pria',
        'nama_lengkap_mempelai_wanita',
        'ortu_mempelai_pria',
        'ortu_mempelai_wanita',
        'tanggal_mulai_acara',
        'tanggal_selesai_acara',
        'tanggal_akad_nikah',
        'jam_akad_nikah',
        'alamat_akad_nikah',
        'google_maps',
        'google_calender',
    ];
}
