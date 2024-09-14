import { Head } from "@inertiajs/react";
import React from "react";

function NotFound() {
    return (
        <div className="w-96 h-screen mx-auto">
            <Head title="Not Found" />
            <img src="page.png" alt="" className="mt-64 w-20 h-20 mx-auto" />
            <p className="text-center text-[10px] mt-5">
                Halaman tidak tersedia
            </p>
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
            <p className="text-center text-[10px] mt-5">
                Directed By Junx Web Developer
            </p>
        </div>
    );
}

export default NotFound;
