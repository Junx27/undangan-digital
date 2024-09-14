import PopOver from "@/Components/PopOver";
import Navbar from "@/Layouts/Navbar";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Template({ template }) {
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
            const fetchTemplate = async () => {
                try {
                    const response = await axios.get(`/template/${selectedId}`);
                    setNama(response.data.keterangan);
                    setData("cover", response.data.cover);
                } catch (error) {
                    setError(error);
                }
            };
            fetchTemplate();
        }
    }, [selectedId]);
    const handleOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/template/${selectedId}`);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("cover", file);
        setImage(URL.createObjectURL(file)); // To preview the image
    };
    return (
        <div className="w-96 relative mx-auto">
            <Head title="Template" />
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
                                image === null ? `storage/${data.cover}` : image
                            }
                            alt=""
                            className="w-full h-screen object-cover"
                        />
                        <div className="absolute bottom-32">
                            <div className="flex justify-between gap-12 mx-5 items-center">
                                <p className="border-b border-dotted pb-2 text-xs font-bold text-white capitalize w-full">
                                    {nama}
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
                    Galeri Template
                </h1>
                <div className="grid grid-cols-3 gap-5 mt-5 pb-20">
                    {template.map((i) => (
                        <div
                            key={i.id}
                            className="relative w-full h-[150px] rounded-md overflow-auto"
                            onClick={() => handleOpen(i.id)}
                        >
                            <img
                                src={`storage/${i.cover}`}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <p className="text-white text-[10px] absolute z-20 top-1 left-2 capitalize">
                                {i.keterangan}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Template;
