import PopOver from "@/Components/PopOver";
import Navbar from "@/Layouts/Navbar";
import { Head, useForm } from "@inertiajs/react";
import React from "react";

function Data({ dataUndangan }) {
    const { data, setData, put, processing } = useForm({
        id: dataUndangan?.id,
        nama_mempelai_pria: dataUndangan?.nama_mempelai_pria,
        nama_mempelai_wanita: dataUndangan?.nama_mempelai_wanita,
        nama_lengkap_mempelai_pria: dataUndangan?.nama_lengkap_mempelai_pria,
        nama_lengkap_mempelai_wanita:
            dataUndangan?.nama_lengkap_mempelai_wanita,
        ortu_mempelai_pria: dataUndangan?.ortu_mempelai_pria,
        ortu_mempelai_wanita: dataUndangan?.ortu_mempelai_wanita,
        tanggal_mulai_acara: dataUndangan?.tanggal_mulai_acara,
        tanggal_selesai_acara: dataUndangan?.tanggal_selesai_acara,
        tanggal_akad_nikah: dataUndangan?.tanggal_akad_nikah,
        jam_akad_nikah: dataUndangan?.jam_akad_nikah,
        alamat_akad_nikah: dataUndangan?.alamat_akad_nikah,
        google_maps: dataUndangan?.google_maps,
        google_calender: dataUndangan?.google_calender,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/update-data-undangan/${data.id}`);
    };

    return (
        <div className="w-96 relative mx-auto">
            <Head title="Data Undangan" />
            <Navbar />
            <div className="m-5">
                <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-2 h-32 rounded-md">
                    <div className="flex gap-3 items-center border-b border-dotted pb-2">
                        <img src="idea.png" alt="" className="w-7 h-7" />
                        <p className="font-bold text-white">
                            Panduan halaman ini
                        </p>
                    </div>
                    <p className="text-white text-[10px] mt-2 mx-2">
                        Rubahlah data sesuai dengan kebutuhan, data yang telah
                        dirubah akan ditampilkan kepada tamu secara real-time,
                        mohon berhati-hati dalam membuat perubahan di halaman
                        ini. Perhatikan nomor rekening.
                    </p>
                </div>
                <h1 className="font-bold mb-2 mt-5 border-b border-dotted pb-2 text-sm">
                    Data Pengguna
                </h1>
                <div className="mt-5">
                    <form
                        onSubmit={handleSubmit}
                        className="text-[10px] flex flex-col gap-2 pb-20"
                    >
                        <label htmlFor="nama_mempelai_pria">
                            Nama depan mempelai pria
                        </label>
                        <input
                            type="text"
                            id="nama_mempelai_pria"
                            value={data.nama_mempelai_pria}
                            onChange={(e) =>
                                setData("nama_mempelai_pria", e.target.value)
                            }
                            className="text-[10px] h-8 border-none outline-none rounded-sm text-blue-500"
                        />
                        <label
                            htmlFor="nama_mempelai_wanita"
                            className="border-t pt-2"
                        >
                            Nama depan mempelai wanita
                        </label>
                        <input
                            type="text"
                            id="nama_mempelai_wanita"
                            value={data.nama_mempelai_wanita}
                            onChange={(e) =>
                                setData("nama_mempelai_wanita", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="nama_lengkap_mempelai_pria"
                            className="border-t pt-2"
                        >
                            Nama lengkap mempelai pria
                        </label>
                        <input
                            type="text"
                            id="nama_lengkap_mempelai_pria"
                            value={data.nama_lengkap_mempelai_pria}
                            onChange={(e) =>
                                setData(
                                    "nama_lengkap_mempelai_pria",
                                    e.target.value
                                )
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="nama_lengkap_mempelai_wanita"
                            className="border-t pt-2"
                        >
                            Nama lengkap mempelai wanita
                        </label>
                        <input
                            type="text"
                            id="nama_lengkap_mempelai_wanita"
                            value={data.nama_lengkap_mempelai_wanita}
                            onChange={(e) =>
                                setData(
                                    "nama_lengkap_mempelai_wanita",
                                    e.target.value
                                )
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="ortu_mempelai_pria"
                            className="border-t pt-2"
                        >
                            Nama orang tua mempelai pria
                        </label>
                        <input
                            type="text"
                            id="ortu_mempelai_pria"
                            value={data.ortu_mempelai_pria}
                            onChange={(e) =>
                                setData("ortu_mempelai_pria", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="ortu_mempelai_wanita"
                            className="border-t pt-2"
                        >
                            Nama orang tua mempelai wanita
                        </label>
                        <input
                            type="text"
                            id="ortu_mempelai_wanita"
                            value={data.ortu_mempelai_wanita}
                            onChange={(e) =>
                                setData("ortu_mempelai_wanita", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="tanggal_mulai_acara"
                            className="border-t pt-2"
                        >
                            Tanggal mulai acara
                        </label>
                        <input
                            type="date"
                            id="tanggal_mulai_acara"
                            value={data.tanggal_mulai_acara}
                            onChange={(e) =>
                                setData("tanggal_mulai_acara", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="tanggal_selesai_acara"
                            className="border-t pt-2"
                        >
                            Tanggal selesai acara
                        </label>
                        <input
                            type="date"
                            id="tanggal_selesai_acara"
                            value={data.tanggal_selesai_acara}
                            onChange={(e) =>
                                setData("tanggal_selesai_acara", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="tanggal_akad_nikah"
                            className="border-t pt-2"
                        >
                            Tanggal akad nikah
                        </label>
                        <input
                            type="date"
                            id="tanggal_akad_nikah"
                            value={data.tanggal_akad_nikah}
                            onChange={(e) =>
                                setData("tanggal_akad_nikah", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="jam_akad_nikah"
                            className="border-t pt-2"
                        >
                            Jam akad nikah
                        </label>
                        <input
                            type="time"
                            id="jam_akad_nikah"
                            value={data.jam_akad_nikah}
                            onChange={(e) =>
                                setData("jam_akad_nikah", e.target.value)
                            }
                            className="text-[10px] h-8 rounded-sm border-none outline-none text-blue-500"
                        />
                        <label
                            htmlFor="alamat_akad_nikah"
                            className="border-t pt-2"
                        >
                            Alamat akad nikah
                        </label>
                        <textarea
                            type="text"
                            id="alamat_akad_nikah"
                            value={data.alamat_akad_nikah}
                            onChange={(e) =>
                                setData("alamat_akad_nikah", e.target.value)
                            }
                            className="text-[10px] h-32 rounded-sm border-none outline-none text-blue-500"
                        ></textarea>
                        <label htmlFor="google_maps" className="border-t pt-2">
                            Google maps
                        </label>
                        <textarea
                            type="text"
                            id="google_maps"
                            value={data.google_maps}
                            onChange={(e) =>
                                setData("google_maps", e.target.value)
                            }
                            className="text-[10px] h-20 rounded-sm border-none outline-none text-blue-500"
                        ></textarea>
                        <label
                            htmlFor="google_calender"
                            className="border-t pt-2"
                        >
                            Google calender
                        </label>
                        <textarea
                            type="text"
                            id="google_calender"
                            value={data.google_calender}
                            onChange={(e) =>
                                setData("google_calender", e.target.value)
                            }
                            className="text-[10px] h-32 rounded-sm border-none outline-none text-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={processing}
                            className="absolute top-32 mt-5 ml-[282px] bg-gradient-to-r from-sky-500 to-blue-500 text-white text-[10px] p-1 cursor-pointer w-[60px] text-center rounded-md"
                        >
                            {processing ? "Menyimpan..." : "Simpan"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Data;
