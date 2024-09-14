import PopOver from "@/Components/PopOver";
import Slider from "@/Components/Slider";
import Navbar from "@/Layouts/Navbar";
import { Head, useForm } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";

function Preview({
    dataUndangan,
    tamus,
    rekening,
    cover_sampul,
    cover_mempelai,
    cover_detail,
    cover_tanggal,
    cover_ucapan,
    cover_penutup,
    galeri,
}) {
    const [pin, setPin] = useState();
    const [openPin, setOpenPin] = useState(false);
    const [open, setOpen] = useState(false);
    const { data, setData, post } = useForm({
        ucapan: "",
    });
    const [currentId, setCurrentId] = useState("1");
    const handleSubmit = () => {
        if (pin === tamu.pin) {
            post(`/ucapan${tamu.id}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition >= 0 && scrollPosition < 500) {
                setCurrentId("1");
            } else if (scrollPosition >= 500 && scrollPosition < 1000) {
                setCurrentId("2");
            } else if (scrollPosition >= 1000 && scrollPosition < 1500) {
                setCurrentId("3");
            } else if (scrollPosition >= 1500 && scrollPosition < 2000) {
                setCurrentId("4");
            } else if (scrollPosition >= 2000 && scrollPosition < 2500) {
                setCurrentId("5");
            } else if (scrollPosition >= 2700 && scrollPosition < 3500) {
                setCurrentId("6");
            } else if (scrollPosition >= 3500 && scrollPosition < 4000) {
                setCurrentId("7");
            } else {
                setCurrentId("1");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

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
    const tanggalAkadNikah = new Date(dataUndangan.tanggal_akad_nikah);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentDate, setCurrentDate] = useState(new Date());
    const calculateCountdown = () => {
        const now = new Date();
        const target = new Date(tanggalAkadNikah);
        const difference = target - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            setTimeLeft({ days, hours, minutes, seconds });
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
            calculateCountdown();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [tanggalAkadNikah]);

    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("Nomor rekening berhasil disalin!");
            })
            .catch((err) => {
                console.error("Gagal menyalin: ", err);
            });
    };
    return (
        <div className="w-96 mx-auto relative">
            <Navbar />
            {open && (
                <div className="fixed bottom-4 right-3 z-50">
                    <button onClick={handlePlayPause}>
                        {isPlaying ? (
                            <div>
                                <iframe
                                    src="https://lottie.host/embed/c6f31f94-365d-49f1-ae09-7a587b3b9859/XexwRJFjnI.json"
                                    className="w-10 h-10 rounded-full shadow-md z-50"
                                ></iframe>
                                <p className="inset-0 absolute w-full h-full cursor-pointer bg-transparent"></p>
                            </div>
                        ) : (
                            <div className="text-[10px] relative">
                                <iframe
                                    src="https://lottie.host/embed/47148d44-b4a4-4e7d-848d-91021d8f6b5b/yxJYHa2XU1.json"
                                    className="w-10 h-10 rounded-full shadow-md z-50"
                                ></iframe>
                                <p className="inset-0 absolute w-full h-full cursor-pointer bg-transparent"></p>
                            </div>
                        )}
                    </button>
                </div>
            )}
            <Head title="Undangan Agus & Fifi" />
            <div className="fixed z-20 top-20">
                <iframe src="https://lottie.host/embed/ffa54b63-0993-4d60-ab7d-a0e3803ca97d/nIliIgsKJ2.json"></iframe>
            </div>
            <div
                className={`transition-all duration-1000 h-screen relative overflow-hidden ${
                    isPlaying ? "-mt-32" : "mt-0"
                }`}
            >
                <div className="audio-player">
                    <audio ref={audioRef} src="song.mp3" />
                </div>
                <img
                    src={`storage/${cover_sampul.cover}`}
                    alt=""
                    className={`transition-all duration-1000 w-full h-screen object-cover saturate-150 contrast-125 ${
                        isPlaying ? "scale-125" : "scale-100"
                    }`}
                />
                <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-64 -top-1"></div>
                <div className="inset-0 absolute top-32">
                    <img src="overlay.png" alt="" />
                </div>
                <div className="relative z-40 -mt-[300px] text-center">
                    <div
                        className={`transition-all duration-1000 ${
                            isPlaying ? "opacity-0" : "opacity-100"
                        }`}
                    >
                        <p className="montecarlo-regular">The Wedding Of</p>
                        <div className="playball-regular text-3xl mt-1">
                            <h1>{dataUndangan.nama_mempelai_pria}</h1>
                            <p>&</p>
                            <h1>{dataUndangan.nama_mempelai_wanita}</h1>
                        </div>
                        <p className="text-xs mt-3">
                            Kepada Yth. Bapak/Ibu/Saudara/I:
                        </p>
                        <h2 className="mt-3 capitalize font-bold">Nama Tamu</h2>
                        <button
                            className="shadow-md mt-3 text-[10px] p-2 rounded-md"
                            onClick={() => setOpen(true)}
                        >
                            Buka undangan
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`h-screen relative overflow-hidden ${
                    isPlaying ? "block" : "hidden"
                }`}
            >
                <div className="relative">
                    <img
                        src={`storage/${cover_tanggal.cover}`}
                        alt=""
                        className={`transition-all duration-1000 w-full h-full object-cover saturate-150 contrast-125 ${
                            currentId == 2 ? "scale-125" : "scale-100"
                        }`}
                    />
                    <div className="inset-0 absolute rotate-180">
                        <img
                            src="overlay-3.png"
                            alt=""
                            className="mt-[395px]"
                        />
                    </div>
                    <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-64 -top-1 z-40">
                        <p className="montecarlo-regular text-center mt-20 border-b-2 p-2 border-dotted">
                            Save The Date
                        </p>
                        <div className="backdrop-opacity-10 bg-white/50 p-5 w-64 shadow-md rounded-md mx-auto mt-5">
                            <p className="text-center border-b pb-2 border-dotted">
                                {formateDate(tanggalAkadNikah)}
                            </p>
                            <div className="font-bold text-4xl text-center mt-5">
                                <p>
                                    {timeLeft.days}:{timeLeft.hours}:
                                    {timeLeft.minutes}:{timeLeft.seconds}
                                </p>
                            </div>
                        </div>
                        <div className="w-64 h-[40px] mt-3 rounded-md shadow-md p-1 bg-white flex flex-row items-center mx-auto">
                            <iframe
                                src="https://lottie.host/embed/42f76815-1dd9-418e-a88b-ed4ca55c5705/qJJq5vFLoi.json"
                                className="w-20 h-20 -ml-3"
                            ></iframe>
                            <a
                                href={dataUndangan.google_calender}
                                target="_blank"
                                className="text-[10px]"
                            >
                                Tambahkan acara ke Google Kalender
                            </a>
                        </div>
                    </div>
                    <div className="inset-0 absolute top-20">
                        <img src="overlay.png" alt="" />
                    </div>
                </div>
            </div>
            <div
                className={`h-screen relative overflow-hidden ${
                    isPlaying ? "block" : "hidden"
                }`}
            >
                <div className="relative">
                    <img
                        src={`storage/${cover_mempelai.cover}`}
                        alt=""
                        className={`transition-all duration-1000 w-full h-full object-cover saturate-150 contrast-125 ${
                            currentId == 3 ? "scale-125" : "scale-100"
                        }`}
                    />
                    <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-64 -top-1 z-40">
                        <div>
                            <p className="text-center">
                                بسم الله الرحمن الرحيم
                            </p>
                            <p className="text-[10px] text-justify mx-10 mt-3 indent-8">
                                Di antara tanda-tanda (kebesaran)-Nya ialah
                                bahwa Dia menciptakan pasangan-pasangan untukmu
                                dari (jenis) dirimu sendiri agar kamu merasa
                                tenteram kepadanya. Dia menjadikan di antaramu
                                rasa cinta dan kasih sayang. Sesungguhnya pada
                                yang demikian itu benar-benar terdapat
                                tanda-tanda (kebesaran Allah) bagi kaum yang
                                berpikir.
                            </p>
                            <p className="text-center mt-3">
                                (Al-Qur'an Surat Ar-Rum Ayat ke-21)
                            </p>
                            <div className="backdrop-opacity-10 backdrop-invert bg-white/30 w-[300px] shadow-md rounded-md mx-auto mt-12 p-2">
                                <div className="mix-blend-darken text-center z-50 border border-dotted p-2 rounded-md">
                                    <h1 className="playball-regular text-3xl border-b border-dotted pb-2 capitalize">
                                        {
                                            dataUndangan.nama_lengkap_mempelai_pria
                                        }
                                    </h1>
                                    <p className="saturate-200 contrast-200 text-[10px] mt-1">
                                        {dataUndangan.ortu_mempelai_pria}
                                    </p>
                                    <p className="playball-regular text-5xl my-5">
                                        &
                                    </p>
                                    <h1 className="playball-regular text-3xl border-b border-dotted pb-2 capitalize">
                                        {
                                            dataUndangan.nama_lengkap_mempelai_wanita
                                        }
                                    </h1>
                                    <p className="saturate-200 contrast-200 text-[10px] mt-1">
                                        {dataUndangan.ortu_mempelai_wanita}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-20 z-10">
                        <img src="overlay.png" alt="" />
                    </div>
                </div>
            </div>
            <div
                className={`h-screen relative overflow-hidden ${
                    isPlaying ? "block" : "hidden"
                }`}
            >
                <div className="inset-0">
                    <img
                        src={`storage/${cover_detail.cover}`}
                        alt=""
                        className={`transition-all duration-1000 w-full h-full object-cover saturate-150 contrast-125 ${
                            currentId == 4 ? "scale-125" : "scale-100"
                        }`}
                    />
                </div>
                <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-64 -top-1 z-40">
                    <div className="backdrop-opacity-10 backdrop-invert bg-white/30 w-[300px] shadow-md rounded-md mx-auto mt-12 p-3 py-5">
                        <h1 className="text-center border-b border-dotted pb-2">
                            السلام عليكم ورحمة الله وبركاته
                        </h1>
                        <p className="text-[10px] text-justify indent-8 mt-5">
                            Dengan rahmat dan ridho Allah SWT. kami bermaksud
                            mengundang Bapak/Ibu/Saudara/I ke pernikahan anak
                            kami yang akan dilaksanakan pada:
                        </p>
                        <div className="backdrop-opacity-10 backdrop-invert bg-white/50 p-2 rounded-md mt-3 text-[10px]">
                            <p>Acara:</p>
                            <p>
                                {" "}
                                {formateDate(
                                    new Date(dataUndangan.tanggal_mulai_acara)
                                )}{" "}
                                -{" "}
                                {formateDate(
                                    new Date(dataUndangan.tanggal_selesai_acara)
                                )}
                            </p>
                        </div>
                        <div className="backdrop-opacity-10 backdrop-invert bg-white/50 p-2 rounded-md mt-3 text-[10px]">
                            <table border="1" cellpadding="8" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th className="flex items-center backdrop-opacity-10 backdrop-invert bg-white/75 rounded-md">
                                            <iframe
                                                src="https://lottie.host/embed/ef1df445-bf11-4252-8250-ddedcf8497fc/Vatr23aHke.json"
                                                className="w-10 h-10"
                                            ></iframe>
                                            Akad Nikah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="flex justify-start">
                                        <td className="w-10">Tanggal</td>
                                        <td>:</td>
                                        <td className="font-bold">
                                            {formateDate(tanggalAkadNikah)}
                                        </td>
                                    </tr>
                                    <tr className="flex justify-start">
                                        <td className="w-10">Pukul</td>
                                        <td>:</td>

                                        <td className="font-bold">
                                            {formatTime(
                                                dataUndangan.jam_akad_nikah
                                            )}{" "}
                                            WIB - Selesai
                                        </td>
                                    </tr>
                                    <tr className="flex justify-start">
                                        <td className="w-10">Alamat</td>
                                        <td>:</td>
                                        <td className="text-justify font-bold capitalize">
                                            {dataUndangan.alamat_akad_nikah}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="backdrop-opacity-10 backdrop-invert bg-white/50 p-1 rounded-md mt-3 text-[10px] flex justify-between items-center">
                            <div className="flex gap-5 items-center">
                                <iframe
                                    src="https://lottie.host/embed/ea5a6828-69a0-470d-a5af-446872d5f458/2FCkrEyUi6.json"
                                    className="w-10 h-10"
                                ></iframe>
                                <a
                                    href={dataUndangan.google_maps}
                                    target="blank"
                                >
                                    <p>Temukan lokasi Google Map disini</p>
                                </a>
                            </div>
                        </div>
                        <p className="text-[10px] text-justify mt-3">
                            Merupakan suatu kehormatan dan kebahagiaan bagi kami
                            apabila Bapak/Ibu/Saudara/I berkenan menghadiri
                            untuk memberikan do'a restu kepada kedua mempelai.
                        </p>
                        <h1 className="text-center mt-5 border-t border-dotted pt-2">
                            والسلام عليكم ورحمة الله وبركاته
                        </h1>
                    </div>
                </div>
                <div className="inset-0 absolute top-56">
                    <img src="overlay.png" alt="" />
                </div>
            </div>
            <div
                className={`h-screen relative overflow-hidden ${
                    isPlaying ? "block" : "hidden"
                }`}
            >
                <div className="inset-0">
                    <Slider data={galeri} />
                </div>
            </div>
            <div
                className={`h-screen relative overflow-hidden ${
                    isPlaying ? "block" : "hidden"
                }`}
            >
                <div className="inset-0">
                    <img
                        src={`storage/${cover_ucapan.cover}`}
                        alt=""
                        className={`transition-all duration-1000 w-full h-full object-cover saturate-150 contrast-125 ${
                            currentId == 6 ? "scale-125" : "scale-100"
                        }`}
                    />
                </div>
                <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-64 -top-1 z-40">
                    <div className="flex gap-5 overflow-x-scroll p-2 mx-10 mt-10">
                        {rekening.map((i) => (
                            <div
                                key={i.id}
                                className="bg-white p-3 shadow-md rounded-md flex justify-between gap-5 items-center"
                            >
                                <img
                                    src={i.gambar_rekening}
                                    alt=""
                                    className="w-10 h-10 rounded-md object-cover"
                                />
                                <div className="text-[10px] w-32">
                                    <h1>{i.nomor_rekening}</h1>
                                    <p className="text-gray-500">
                                        {i.nama_rekening}
                                    </p>
                                </div>
                                <div className="text-[10px]">
                                    <button
                                        className="bg-blue-500 text-white p-1 rounded-sm mr-1"
                                        onClick={() =>
                                            copyToClipboard(i.nomor_rekening)
                                        }
                                    >
                                        Salin
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-2 mt-2 pb-3 border-b border-dotted">
                        {rekening.map((i) => (
                            <div
                                key={i.id}
                                className="h-2 w-2 bg-white shadow-md rounded-full"
                            ></div>
                        ))}
                    </div>
                    <div className="mt-3 flex justify-center">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-[10px]">
                                Kirim ucapan:
                            </label>
                            <form className="relative" onSubmit={handleSubmit}>
                                <img
                                    src="send-message.png"
                                    alt=""
                                    className="w-4 h-4 absolute right-2 top-2 z-40"
                                    onClick={() => setOpenPin(true)}
                                />
                                <input
                                    type="text"
                                    value={data.ucapan}
                                    onChange={(e) =>
                                        setData("ucapan", e.target.value)
                                    }
                                    className="p-1 px-2 outline-none border-none rounded-md w-[300px] text-[10px]"
                                    required
                                />
                                {openPin && (
                                    <PopOver>
                                        <div className="relative bg-white flex flex-col gap-5 p-5 pt-10 w-64 rounded-md">
                                            {pin !== tamu.pin && (
                                                <p className="text-red-500 text-[9px] absolute top-5">
                                                    Masukan PIN:
                                                </p>
                                            )}

                                            <input
                                                type="text"
                                                value={pin}
                                                onChange={(e) =>
                                                    setPin(e.target.value)
                                                }
                                                className="p-1 px-2 rounded-md text-[10px]"
                                            />
                                            {pin === tamu.pin ? (
                                                <button className="bg-blue-500 p-2 text-xs rounded-md text-white">
                                                    kirim
                                                </button>
                                            ) : (
                                                <p
                                                    className="bg-blue-500 p-2 text-xs rounded-md text-white text-center"
                                                    onClick={() =>
                                                        setOpenPin(false)
                                                    }
                                                >
                                                    Batal
                                                </p>
                                            )}
                                        </div>
                                    </PopOver>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="backdrop-opacity-10 backdrop-invert bg-white/50 p-3 rounded-md mt-3 w-[300px] mx-auto">
                        <div className="flex flex-col gap-3 h-96 overflow-auto">
                            {tamus
                                .filter((i) => i.ucapan !== null)
                                .map((i) => (
                                    <div
                                        className="bg-white p-3 rounded-md shadow-md"
                                        key={i.id}
                                    >
                                        <div className="text-[10px]">
                                            <h1>{i.nama_tamu_undangan}</h1>
                                            <p className="text-gray-500 px-2 line-clamp-3 h-12">
                                                {i.ucapan}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="absolute top-32">
                    <img src="overlay.png" alt="" />
                </div>
            </div>
            <div
                className={`h-screen relative overflow-hidden ${
                    isPlaying ? "block" : "hidden"
                }`}
            >
                <div className="inset-0">
                    <img
                        src={`storage/${cover_penutup.cover}`}
                        alt=""
                        className={`transition-all duration-1000 w-full object-cover saturate-150 contrast-125 ${
                            currentId == 7 ? "scale-125" : "scale-100"
                        }`}
                    />
                </div>
                <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-64 -top-1">
                    <div className="mt-5">
                        <h1 className="montecarlo-regular text-3xl text-center">
                            Thank You
                        </h1>
                        <p className="text-[10px] mt-3 text-center mx-10">
                            " Kami ingin mengucapkan terima kasih yang
                            sebesar-besarnya atas perhatian dan kesediaan Anda
                            menerima undangan kami. Kehadiran Anda akan sangat
                            berarti bagi kami dan membuat acara ini menjadi
                            lebih istimewa."
                        </p>
                        <h2 className="playball-regular text-xl mt-3 text-center border-b border-dotted pb-2">
                            Agus & Fifi
                        </h2>
                    </div>
                </div>
                <div className="relative z-40 bg-white p-3 px-5 shadow-md rounded-md text-[10px] mx-auto w-64">
                    <h1 className="pb-3 border-b border-dotted text-center">
                        Directed by Junx Web Developer
                    </h1>
                    <div className="mt-10 flex justify-center gap-2 pb-3">
                        <a href="https://wa.me/6281217114742" target="blank">
                            <img
                                src="whatsapp.png"
                                alt=""
                                className="w-7 h-7"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/tri-saptono"
                            target="blank"
                        >
                            <img
                                src="linkedin.png"
                                alt=""
                                className="w-7 h-7"
                            />
                        </a>
                        <a href="https://github.com/Junx27" target="blank">
                            <img src="web.png" alt="" className="w-7 h-7" />
                        </a>
                    </div>
                </div>
                <div className="absolute top-12">
                    <img src="overlay.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Preview;
