import PopOver from "@/Components/PopOver";
import Navbar from "@/Layouts/Navbar";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard({ auth, tamus, rekening, galeri }) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const [editRek, setEditRek] = useState(false);
    const [createRek, setCreateRek] = useState(false);
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
    } = useForm({
        nama_rekening: "",
        nomor_rekening: "",
        gambar_rekening: "",
        ucapan: null,
    });

    useEffect(() => {
        if (id !== null) {
            const fetchRek = async () => {
                try {
                    const response = await axios.get(`/rek/${id}`);
                    setData({
                        nama_rekening: response.data.nama_rekening,
                        nomor_rekening: response.data.nomor_rekening,
                        gambar_rekening: response.data.gambar_rekening,
                    });
                } catch (error) {
                    console.error("Error fetching rekening:", error);
                }
            };
            fetchRek();
        }
    }, [id]);

    const handleOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleRek = (id) => {
        setId(id);
        setEditRek(true);
    };
    const handleCreateRek = () => {
        setCreateRek(true);
    };
    const handleSubmitCreateRek = (e) => {
        e.preventDefault();
        post("/create-rek");
    };

    const handleSubmitRek = (e) => {
        e.preventDefault();
        if (id !== null) {
            put(`/rek/${id}`, data);
        }
    };
    const handleDelete = (id) => {
        destroy(`/rek/${id}`);
    };
    const handleSubmit = (id) => {
        post(`/ucapan${id}`);
    };

    return (
        <div className="w-96 relative mx-auto">
            <Head title="Dashboard" />
            {createRek && (
                <PopOver>
                    <div className="bg-white p-2 rounded-md text-[10px] pb-5">
                        <div
                            className="flex justify-end cursor-pointer"
                            onClick={() => setCreateRek(false)}
                        >
                            <img
                                src="cancel.png"
                                alt="Cancel"
                                className="w-5 h-5 mb-2"
                            />
                        </div>
                        <form
                            onSubmit={handleSubmitCreateRek}
                            className="flex flex-col gap-2 text-[10px] mx-2"
                        >
                            <label htmlFor="nama_rekening">Nama Rekening</label>
                            <input
                                type="text"
                                id="nama_rekening"
                                value={data.nama_rekening}
                                onChange={(e) =>
                                    setData("nama_rekening", e.target.value)
                                }
                                className="rounded-sm h-8 text-[10px] w-64"
                                required
                            />
                            <label htmlFor="nomor_rekening">
                                Nomor Rekening
                            </label>
                            <input
                                type="text"
                                id="nomor_rekening"
                                value={data.nomor_rekening}
                                onChange={(e) =>
                                    setData("nomor_rekening", e.target.value)
                                }
                                className="rounded-sm h-8 text-[10px] w-64"
                                required
                            />
                            <label htmlFor="gambar_rekening">
                                Gambar Rekening
                            </label>
                            <select
                                name="gambar_rekening"
                                id="gambar_rekening"
                                value={data.gambar_rekening}
                                onChange={(e) =>
                                    setData("gambar_rekening", e.target.value)
                                }
                                className="text-[10px] h-10 rounded-sm mt-2"
                                required
                            >
                                <option value="">Pilih</option>
                                <option value="/rek/dana.jpg">Dana</option>
                                <option value="/rek/bri.jpg">BRI</option>
                                <option value="/rek/bca.jpg">BCA</option>
                                <option value="/rek/bni.jpg">BNI</option>
                                <option value="/rek/link.jpg">Link Aja</option>
                                <option value="/rek/shopee.jpg">
                                    Shopee Pay
                                </option>
                                <option value="/rek/ovo.jpg">Ovo</option>
                                <option value="/rek/gopay.jpg">Gopay</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white text-[10px] py-2 rounded-sm mt-2"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </PopOver>
            )}
            {editRek && (
                <PopOver>
                    <div className="bg-white p-2 rounded-md text-[10px] pb-5">
                        <div
                            className="flex justify-end cursor-pointer"
                            onClick={() => setEditRek(false)}
                        >
                            <img
                                src="cancel.png"
                                alt="Cancel"
                                className="w-5 h-5 mb-2"
                            />
                        </div>
                        <form
                            onSubmit={handleSubmitRek}
                            className="flex flex-col gap-2 text-[10px] mx-2"
                        >
                            <label htmlFor="nama_rekening">Nama Rekening</label>
                            <input
                                type="text"
                                id="nama_rekening"
                                value={data.nama_rekening}
                                onChange={(e) =>
                                    setData("nama_rekening", e.target.value)
                                }
                                className="rounded-sm h-8 text-[10px] w-64"
                            />
                            <label htmlFor="nomor_rekening">
                                Nomor Rekening
                            </label>
                            <input
                                type="text"
                                id="nomor_rekening"
                                value={data.nomor_rekening}
                                onChange={(e) =>
                                    setData("nomor_rekening", e.target.value)
                                }
                                className="rounded-sm h-8 text-[10px] w-64"
                            />
                            <label htmlFor="gambar_rekening">
                                Gambar Rekening
                            </label>
                            <select
                                name="gambar_rekening"
                                id="gambar_rekening"
                                value={data.gambar_rekening}
                                onChange={(e) =>
                                    setData("gambar_rekening", e.target.value)
                                }
                                className="text-[10px] h-10 rounded-sm mt-2"
                            >
                                <option value="">Pilih</option>
                                <option value="/rek/dana.jpg">Dana</option>
                                <option value="/rek/bri.jpg">BRI</option>
                                <option value="/rek/bca.jpg">BCA</option>
                                <option value="/rek/bni.jpg">BNI</option>
                                <option value="/rek/link.jpg">Link Aja</option>
                                <option value="/rek/shopee.jpg">
                                    Shopee Pay
                                </option>
                                <option value="/rek/ovo.jpg">Ovo</option>
                                <option value="/rek/gopay.jpg">Gopay</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white text-[10px] py-2 rounded-sm mt-2"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </PopOver>
            )}
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
                            className="cursor-pointer mt-5 mx-12 text-center bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-2 rounded-md"
                            onClick={() => handleSubmit(id)}
                        >
                            <p>Hapus</p>
                        </div>
                    </div>
                </PopOver>
            )}
            <Navbar />
            <div className="w-full h-32 rounded-b-xl overflow-auto">
                <img
                    src="line.png"
                    alt="Background Line"
                    className="w-full h-full object-cover"
                />
                <div className="inset-0 absolute left-5 top-10 text-white">
                    <h1 className="font-bold capitalize">{auth.user.name}</h1>
                    <p className="text-[10px]">{auth.user.email}</p>
                </div>
                <div className="inset-0 absolute left-72 ml-8 top-12">
                    <div>
                        <Link
                            href="/logout"
                            method="post"
                            className="bg-white text-black text-[9px] w-12 h-2 text-center rounded-sm mr-5 p-2 hover:bg-blue-50"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-md h-32 mx-5 -mt-10 relative text-[10px] z-20">
                <h1 className="pb-3 border-b border-dotted text-center pt-5">
                    Directed by Junx Web Developer
                </h1>
                <div className="mt-10 flex justify-center gap-2 pb-3">
                    <a href="https://wa.me/6281217114742" target="blank">
                        <img src="whatsapp.png" alt="" className="w-7 h-7" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/tri-saptono"
                        target="blank"
                    >
                        <img src="linkedin.png" alt="" className="w-7 h-7" />
                    </a>
                    <a href="https://github.com/Junx27" target="blank">
                        <img src="web.png" alt="" className="w-7 h-7" />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-5 mx-5">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 text-[10px] text-white rounded-md">
                    <p>Galeri</p>
                    <p className="font-bold">{galeri.length} Foto</p>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-sky-500 p-2 text-[10px] text-white rounded-md">
                    <p>Rekening</p>
                    <p className="font-bold">{rekening.length} Rekening</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-2 text-[10px] text-white rounded-md">
                    <p>Undangan</p>
                    <p className="font-bold">{tamus.length} Orang</p>
                </div>
            </div>
            <div className="mt-5 relative">
                <h1 className="font-bold text-[10px] mb-2 px-5 pt-5">
                    Daftar Rekening
                </h1>
                {rekening.map((i) => (
                    <div
                        key={i.id}
                        className="flex justify-between gap-5 border-b p-5 pt-2 cursor-pointer"
                    >
                        <div className="flex gap-5">
                            <img
                                src={i.gambar_rekening}
                                alt="Rekening"
                                className="w-8 h-8 rounded-md object-cover"
                            />
                            <div className="text-[10px]">
                                <p className="font-bold">{i.nomor_rekening}</p>
                                <p>{i.nama_rekening}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="w-4 h-4 cursor-pointer"
                                onClick={() => handleRek(i.id)}
                            >
                                <img src="compose.png" alt="" />
                            </button>
                            <button
                                className="w-4 h-4 cursor-pointer"
                                onClick={() => handleDelete(i.id)}
                            >
                                <img src="delete.png" alt="" />
                            </button>
                        </div>
                    </div>
                ))}
                <div
                    className="mt-5 flex justify-center"
                    onClick={handleCreateRek}
                >
                    <button className="text-[10px] shadow-md w-32 h-8 rounded-md cursor-pointer">
                        Tambah Rekening
                    </button>
                </div>
            </div>
            <div className="mt-1 pb-32">
                <h1 className="sticky top-0 bg-white z-40 font-bold text-[10px] mb-2 p-3">
                    Riwayat Ucapan
                </h1>
                <div className="relative flex flex-col">
                    {tamus
                        .filter((i) => i.ucapan !== null)
                        .map((i) => (
                            <div
                                key={i.id}
                                className="text-[10px] h-[60px] px-5 border-b hover:bg-blue-50 cursor-pointer p-2"
                                onClick={() => handleOpen(i.id)}
                            >
                                <p className="font-bold capitalize">
                                    {i.nama_tamu_undangan}
                                </p>
                                <p className="mt-1 line-clamp-2 px-2 text-gray-500">
                                    {i.ucapan}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
