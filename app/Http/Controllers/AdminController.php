<?php

namespace App\Http\Controllers;

use App\Models\DataGaleri;
use App\Models\DataRekening;
use App\Models\DataTamu;
use App\Models\DataTemplate;
use App\Models\DataUndangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpParser\Node\Expr\Cast\String_;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function dashboard()

    {
        $galeri = DataGaleri::all();
        $rekening = DataRekening::all();
        $tamus = DataTamu::orderBy('updated_at', 'desc')->get();
        return Inertia::render("Admin/Dashboard", ["tamus" => $tamus, "rekening" => $rekening, "galeri" => $galeri]);
    }
    public function createRek(Request $request)
    {
        $validated = $request->validate([
            'nama_rekening' => 'required',
            'nomor_rekening' => "required",
            "gambar_rekening" => "required"
        ]);
        DataRekening::create($validated);
        return Inertia::location("/dashboard");
    }
    public function getRek(String $id)
    {
        $rekening = DataRekening::findOrFail($id);
        return response()->json($rekening);
    }
    public function updateRek(Request $request, String $id)
    {
        $validated = $request->validate([
            'nama_rekening' => 'required',
            'nomor_rekening' => "required",
            "gambar_rekening" => "required"
        ]);
        $rekening = DataRekening::findOrFail($id);
        $rekening->update($validated);
        return Inertia::location("/dashboard");
    }
    public function deleteRek(String $id)
    {

        $rekening = DataRekening::findOrFail($id);
        $rekening->delete();
        return Inertia::location("/dashboard");
    }
    public function template()
    {
        $template = DataTemplate::all();
        return Inertia::render("Admin/Template", ["template" => $template]);
    }
    public function getTemplate(String $id)
    {
        $cover = DataTemplate::findOrFail($id);
        return response()->json($cover);
    }
    public function updateTemplate(Request $request, String $id)
    {
        $data = DataTemplate::findOrFail($id);
        $validated = $request->validate([
            "cover" => 'required',
        ]);
        if ($request->hasFile('cover')) {

            if ($data->cover) {
                Storage::disk('public')->delete($data->cover);
            }


            $validated['cover'] = $request->file('cover')->store('cover', 'public');
        }

        $data->update($validated);
        return Inertia::location("/template");
    }
    public function galeri()
    {
        $galeri = DataGaleri::all();
        return Inertia::render("Admin/Galeri", ["galeri" => $galeri]);
    }
    public function getGaleri(String $id)
    {
        $cover = DataGaleri::findOrFail($id);
        return response()->json($cover);
    }
    public function updateGaleri(Request $request, String $id)
    {
        $data = DataGaleri::findOrFail($id);
        $validated = $request->validate([
            "galeri" => 'required',
        ]);
        if ($request->hasFile('galeri')) {

            if ($data->galeri) {
                Storage::disk('public')->delete($data->galeri);
            }


            $validated['galeri'] = $request->file('galeri')->store('galeri', 'public');
        }

        $data->update($validated);
        return Inertia::location("/galeri");
    }
    public function data()
    {
        $dataUndangan = DataUndangan::first();
        return Inertia::render("Admin/Data", ["dataUndangan" => $dataUndangan]);
    }
    public function updateData(Request $request, String $id)
    {
        $validated = $request->validate([
            'nama_mempelai_pria' => 'required',
            'nama_mempelai_wanita' => 'required',
            'nama_lengkap_mempelai_pria' => 'required',
            'nama_lengkap_mempelai_wanita' => 'required',
            'ortu_mempelai_pria' => 'required',
            'ortu_mempelai_wanita' => 'required',
            'tanggal_mulai_acara' => 'required',
            'tanggal_selesai_acara' => 'required',
            'tanggal_akad_nikah' => 'required',
            'jam_akad_nikah' => 'required',
            'alamat_akad_nikah' => 'required',
            'google_maps' => 'required',
            'google_calender' => 'required',
        ]);

        // Temukan data berdasarkan ID
        $dataUndangan = DataUndangan::findOrFail($id);

        // Update data dengan nilai yang baru
        $dataUndangan->update($validated);
        return Inertia::location("/data");
        // dd($request->all());
    }
    public function tamu()
    {
        $tamu = DataTamu::orderBy('created_at', 'desc')->get();
        $dataUndangan = DataUndangan::first();
        return Inertia::render("Admin/Tamu", ["tamu" => $tamu, "dataUndangan" => $dataUndangan]);
    }
    public function createTamu(Request $request)
    {
        $validated = $request->validate([
            'nama_tamu_undangan' => 'required',

        ]);
        DataTamu::create($validated);
        return Inertia::location("/tamu");
    }
    public function getTamu(String $id)
    {
        $tamu = DataTamu::findOrFail($id);
        return response()->json($tamu);
    }
    public function updateTamu(String $id)
    {
        $tamu = DataTamu::findOrFail($id);
        $tamu->status = "terkirim";
        $tamu->save();
    }
    public function deleteTamu(String $id)
    {
        $tamu = DataTamu::findOrFail($id);
        $tamu->delete();
        return Inertia::location("/tamu");
    }
    public function updateUcapan(Request $request, String $id)
    {

        $data = DataTamu::findOrFail($id);
        $data->ucapan = null;
        $data->save();
        return Inertia::location("/dashboard");
    }
    public function preview()
    {
        $cover_sampul = DataTemplate::where("keterangan", "cover sampul")->first();
        $cover_mempelai = DataTemplate::where("keterangan", "cover mempelai")->first();
        $cover_tanggal = DataTemplate::where("keterangan", "cover tanggal")->first();
        $cover_detail = DataTemplate::where("keterangan", "cover detail")->first();
        $cover_ucapan = DataTemplate::where("keterangan", "cover ucapan")->first();
        $cover_penutup = DataTemplate::where("keterangan", "cover penutup")->first();
        $dataUndangan = DataUndangan::first();
        $tamus = DataTamu::orderBy('updated_at', 'desc')->get();
        $rekening = DataRekening::all();
        $galeri = DataGaleri::all();
        return Inertia::render("Admin/Preview", ["dataUndangan" => $dataUndangan, "tamus" => $tamus, "rekening" => $rekening, "cover_sampul" => $cover_sampul, "cover_mempelai" => $cover_mempelai, "cover_tanggal" => $cover_tanggal, "cover_detail" => $cover_detail, "cover_ucapan" => $cover_ucapan, "cover_penutup" => $cover_penutup, "galeri" => $galeri]);
    }
}
