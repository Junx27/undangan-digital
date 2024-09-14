import PopOver from "@/Components/PopOver";
import Navbar from "@/Layouts/Navbar";
import { Head, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported if it's used

function Tamu({ tamu, dataUndangan }) {
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [openKirim, setOpenKirim] = useState(false);
    const [nama, setNama] = useState("");
    const [error, setError] = useState(null);
    function formateDate(date) {
        return date.toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
    };
    const waktu = formateDate(new Date(dataUndangan.tanggal_akad_nikah));
    const jam = formatTime(dataUndangan.jam_akad_nikah);

    useEffect(() => {
        if (id !== null) {
            const fetchTamu = async () => {
                try {
                    const response = await axios.get(`/tamu/${id}`);
                    setNama(response.data.nama_tamu_undangan);
                } catch (error) {
                    setError(error);
                }
            };
            fetchTamu();
        }
    }, [id]);

    const message = encodeURIComponent(
        `*Assalamu'alaikum Warahmatullahi Wabarakatuh*,\n\n\nKepada Yth. *${nama}*,\n\nDengan penuh rasa syukur dan kebahagiaan, kami mengundang Anda untuk menghadiri acara istimewa kami pada:\n\n*Tanggal*: ${waktu}\n*Pukul*: ${jam} WIB - Selesai\n*Tempat*: ${dataUndangan.alamat_akad_nikah}\n\n*Link: https://junxwebdev.my.id/57766-75${id}76-868683*\n\nPIN Komentar: *agusfifi*\n\nSemoga acara ini menjadi momen penuh berkah dan kebahagiaan. Kehadiran Anda akan menambah kebahagiaan kami dan memberikan keberkahan pada acara ini. Atas perhatian dan kehadirannya. Kami sangat berharap bisa berbagi kebahagiaan bersama Anda.\n\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh,\n\n\n*-Agus&Fifi-*`
    );

    // Initialize form with useForm
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
    } = useForm({
        nama_tamu_undangan: "", // Initialize data with default value
    });

    const handleOpen = (id) => {
        setId(id);
        setOpen(true);
    };
    const handleWhatsapp = () => {
        const whatsappUrl = `https://wa.me/?text=${message}`;
        window.open(whatsappUrl, "_blank");
        window.location.reload();
    };

    const handleKirim = (id) => {
        setId(id);
        setOpenKirim(true);
        put(`/tamu/${id}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/tamu");
    };

    const deleteTamu = async (id) => {
        try {
            await destroy(`/tamu/${id}`);
            // Optionally handle successful deletion
        } catch (error) {
            // Optionally handle deletion error
            console.error(error);
        }
    };

    return (
        <div className="w-96 relative mx-auto">
            <Head title="Daftar Tamu" />
            {open && (
                <PopOver>
                    <div className="bg-white p-2 rounded-md text-[10px] pb-5">
                        <div
                            className="flex justify-end cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <img
                                src="cancel.png"
                                alt="Cancel"
                                className="w-5 h-5 mb-2"
                            />
                        </div>
                        <p className="px-5">
                            Apakah ingin menghapus pesan ini?
                        </p>
                        <div
                            className="mt-5 mx-12 text-center bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-2 rounded-md cursor-pointer"
                            onClick={() => {
                                deleteTamu(id);
                                setOpen(false); // Close the popover after deletion
                            }}
                        >
                            <p>Hapus</p>
                        </div>
                    </div>
                </PopOver>
            )}
            {openKirim && (
                <PopOver>
                    <div className="bg-white p-2 rounded-md text-[10px] pb-5">
                        <p className="px-5 pt-5">
                            Selesaikan pengiriman pesan ini
                        </p>
                        <div
                            className="mt-5 mx-12 text-center bg-gradient-to-r from-sky-500 to-blue-500 text-white p-2 rounded-md cursor-pointer"
                            onClick={handleWhatsapp}
                        >
                            <p>Kirim</p>
                        </div>
                    </div>
                </PopOver>
            )}
            <Navbar />
            <div className="">
                <div className="m-5 bg-gradient-to-r from-violet-500 to-purple-500 p-2 h-32 rounded-md">
                    <div className="flex gap-3 items-center border-b border-dotted pb-2">
                        <img src="idea.png" alt="Idea" className="w-7 h-7" />
                        <p className="font-bold text-white">
                            Panduan halaman ini
                        </p>
                    </div>
                    <p className="text-white text-[10px] mt-2 mx-2">
                        Tambahkan tamu undangan, lanjutkan untuk menyelsaikan
                        pengiriman selanjutnya jika sudah terkirim jangan
                        dihapus dahulu untuk tamu dapat melihat undangan yang
                        dikirim, akan tetapi jika terdapat kesalahan, mohon
                        ulangi.
                    </p>
                </div>
                <h1 className="m-5 font-bold mb-2 mt-5 border-b border-dotted pb-2 text-sm">
                    Daftar Tamu Undangan
                </h1>
                <div className="sticky top-0 py-3 flex justify-center bg-white">
                    <div className="flex flex-col gap-2">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                name="nama_tamu_undangan"
                                value={data.nama_tamu_undangan}
                                onChange={(e) =>
                                    setData(
                                        "nama_tamu_undangan",
                                        e.target.value
                                    )
                                }
                                className="p-1 px-2 outline-none border-blue-500 rounded-md w-[300px] text-[10px]"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2"
                            >
                                <img
                                    src="send-message.png"
                                    alt="Send"
                                    className="transition-all duration-700 cursor-pointer w-4 h-4 hover:-rotate-45"
                                />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-5 pb-32">
                    {tamu.map((i, index) => (
                        <div
                            key={i.id}
                            className="flex justify-between items-center gap-5 border-b py-3 hover:bg-blue-50 px-5 cursor-pointer"
                            onClick={() =>
                                i.status === "terkirim"
                                    ? handleOpen(i.id)
                                    : handleKirim(i.id)
                            }
                        >
                            <p className="text-[10px] capitalize">
                                {index + 1}. {i.nama_tamu_undangan}
                            </p>
                            <p
                                className={`text-[10px] ${
                                    i.status === "terkirim"
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {i.status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tamu;
