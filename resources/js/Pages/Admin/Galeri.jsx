import PopOver from "@/Components/PopOver";
import Navbar from "@/Layouts/Navbar";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Galeri({ galeri }) {
    const { data, setData, post } = useForm({
        _method: "PUT",
        cover: null,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [image, setImage] = useState(null);
    const [nama, setNama] = useState();

    useEffect(() => {
        if (selectedId !== null) {
            const fetchGaleri = async () => {
                try {
                    const response = await axios.get(`/galeri/${selectedId}`);
                    setNama(response.data.id);
                    setData("galeri", response.data.galeri);
                } catch (error) {
                    setError(error);
                }
            };
            fetchGaleri();
        }
    }, [selectedId]);
    const handleOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/galeri/${selectedId}`);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("galeri", file);
        setImage(URL.createObjectURL(file)); // To preview the image
    };
    return (
        <div className="w-96 relative mx-auto">
            <Head title="Galeri" />
            {open && (
                <PopOver>
                    <div className="w-96 relative">
                        <img
                            src="cancel.png"
                            alt=""
                            className="w-7 h-7 top-32 right-7 cursor-pointer shadow-md backdrop-opacity-10 backdrop-invert bg-white/50 p-1 rounded-md absolute"
                            onClick={() => window.location.reload()}
                        />
                        <img
                            src={
                                image === null
                                    ? `storage/${data.galeri}`
                                    : image
                            }
                            alt=""
                            className="w-full h-screen object-cover"
                        />
                        <div className="absolute bottom-32">
                            <div className="flex justify-between gap-12 mx-5 items-center">
                                <p className="border-b border-dotted pb-2 text-xs font-bold text-white capitalize w-full">
                                    Daftar GAleri Foto ke- {nama}
                                </p>
                                <form
                                    action=""
                                    onSubmit={handleSubmit}
                                    className="text-[10px] p-5 w-96 flex"
                                    encType="multipart/form-data"
                                >
                                    <label
                                        htmlFor="cover"
                                        className={`backdrop-opacity-10 backdrop-invert bg-white/50 p-2 px-4 rounded-md text-center cursor-pointer shadow-md ${
                                            image === null ? "block" : "hidden"
                                        }`}
                                    >
                                        Pilih
                                    </label>
                                    <input
                                        id="cover"
                                        type="file"
                                        name="cover"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        className={`backdrop-opacity-10 backdrop-invert bg-white/50 p-2 rounded-md ${
                                            image === null ? "hidden" : "block"
                                        }`}
                                    >
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </PopOver>
            )}
            <Navbar />
            <div className="m-5">
                <div className="bg-gradient-to-r from-cyan-500 to-sky-500 p-2 h-32 rounded-md">
                    <div className="flex gap-3 items-center border-b border-dotted pb-2">
                        <img src="idea.png" alt="" className="w-7 h-7" />
                        <p className="font-bold text-white">
                            Panduan halaman ini
                        </p>
                    </div>
                    <p className="text-white text-[10px] mt-2 mx-2">
                        Rubahlah foto untuk mengatur template undangan,
                        perhatikan urutan halaman di dalam template, rubahlah
                        sesuai kebutuhan. Berikut tampilan beberapa foto untuk
                        dirubah, jika kesulitan hubungi admin pembuat aplikasi
                        ini.
                    </p>
                </div>
                <h1 className="font-bold mb-2 mt-5 border-b border-dotted pb-2 text-sm">
                    Galeri Foto
                </h1>
                <div className="grid grid-cols-3 gap-5 mt-5 pb-20">
                    {galeri.map((i) => (
                        <div
                            key={i.id}
                            className="relative w-full h-[150px] rounded-md overflow-auto"
                            onClick={() => handleOpen(i.id)}
                        >
                            <img
                                src={`storage/${i.galeri}`}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Galeri;
