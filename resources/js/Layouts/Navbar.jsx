import { usePage } from "@inertiajs/react";
import React from "react";

function Navbar() {
    const { url } = usePage();
    const data = [
        {
            nama: "Dashboard",
            link: "/dashboard",
            image: "dashboard.png",
        },
        {
            nama: "Template",
            link: "/template",
            image: "app.png",
        },
        {
            nama: "Galeri",
            link: "/galeri",
            image: "images.png",
        },
        {
            nama: "Data",
            link: "/data",
            image: "settings.png",
        },
        {
            nama: "Tamu",
            link: "/tamu",
            image: "people.png",
        },
        {
            nama: "Preview",
            link: "/preview",
            image: "preview.png",
        },
    ];
    return (
        <div className="fixed bg-white w-96 bottom-0 z-50">
            <div className="flex justify-between text-[8px] border-t">
                {data.map((i) => (
                    <a
                        key={i.nama}
                        href={i.link}
                        className={`cursor-pointer flex w-full flex-col hover:bg-blue-50 items-center gap-1 p-1 py-2 ${
                            url === i.link
                                ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
                                : "text-black"
                        }`}
                    >
                        <img src={i.image} alt="" className="w-5 h-5" />
                        {i.nama}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Navbar;
