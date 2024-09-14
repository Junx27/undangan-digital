<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_undangans', function (Blueprint $table) {
            $table->id();
            $table->string("nama_mempelai_pria");
            $table->string("nama_mempelai_wanita");
            $table->string("nama_lengkap_mempelai_pria");
            $table->string("nama_lengkap_mempelai_wanita");
            $table->string("ortu_mempelai_pria");
            $table->string("ortu_mempelai_wanita");
            $table->date("tanggal_mulai_acara");
            $table->date("tanggal_selesai_acara");
            $table->date("tanggal_akad_nikah");
            $table->time("jam_akad_nikah");
            $table->string("alamat_akad_nikah");
            $table->string("google_maps");
            $table->string("google_calender");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_undangans');
    }
};
