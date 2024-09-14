<?php

namespace App\Http\Controllers;

use App\Models\DataGaleri;
use App\Models\DataRekening;
use App\Models\DataTamu;
use App\Models\DataTemplate;
use App\Models\DataUndangan;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TamuController extends Controller
{
    public function welcome(string $id)
    {
        $cover_sampul = DataTemplate::where("keterangan", "cover sampul")->first();
        $cover_mempelai = DataTemplate::where("keterangan", "cover mempelai")->first();
        $cover_tanggal = DataTemplate::where("keterangan", "cover tanggal")->first();
        $cover_detail = DataTemplate::where("keterangan", "cover detail")->first();
        $cover_ucapan = DataTemplate::where("keterangan", "cover ucapan")->first();
        $cover_penutup = DataTemplate::where("keterangan", "cover penutup")->first();
        $dataUndangan = DataUndangan::first();
        $tamu = DataTamu::findOrFail($id);
        $tamus = DataTamu::orderBy('updated_at', 'desc')->get();
        $rekening = DataRekening::all();
        $galeri = DataGaleri::all();
        return Inertia::render("Welcome", ["dataUndangan" => $dataUndangan, "tamu" => $tamu, "tamus" => $tamus, "rekening" => $rekening, "cover_sampul" => $cover_sampul, "cover_mempelai" => $cover_mempelai, "cover_tanggal" => $cover_tanggal, "cover_detail" => $cover_detail, "cover_ucapan" => $cover_ucapan, "cover_penutup" => $cover_penutup, "galeri" => $galeri]);
    }
    public function updateUcapan(Request $request, String $id)
    {
        $validated = $request->validate([
            "ucapan" => 'required',
        ]);
        $data = DataTamu::findOrFail($id);
        $data->update($validated);
    }
}
