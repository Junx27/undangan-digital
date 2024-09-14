import React, { useState, useEffect } from "react";

function Slider({ data }) {
    const slides = (data || []).map((item, index) => ({
        id: index + 1,
        galeri: item.galeri,
    }));

    const [selectedIndex, setSelectedIndex] = useState(slides[0]?.id || 1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSelectedIndex((prevIndex) =>
                prevIndex === slides.length ? 1 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, [slides.length]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="relative">
            {slides.map((slide) => (
                <div
                    key={slide.id}
                    style={{
                        display: slide.id === selectedIndex ? "block" : "none",
                    }}
                >
                    <img
                        src={`storage/${slide.galeri}`}
                        alt={`Slide ${slide.id}`}
                        onLoad={handleImageLoad}
                        className={`transition-all duration-1000 w-full h-screen object-cover saturate-125 contrast-125 ${
                            loading
                                ? "opacity-0 scale-110"
                                : "opacity-1 scale-100"
                        }`}
                    />
                    <div className="absolute rotate-180 top-0">
                        <img src="overlay-3.png" alt="" className="" />
                    </div>
                    <div className="inset-0 absolute bg-gradient-to-b from-white to-transparent h-32 -top-1"></div>
                    <div className="absolute -bottom-32 z-10">
                        <img src="overlay.png" alt="" />
                    </div>
                </div>
            ))}
            <div className="absolute top-12 left-32 z-50">
                <h1 className="text-center montecarlo-regular border-b border-dotted pb-2">
                    Our Moments
                </h1>
                <div className="flex justify-center gap-1 mt-3">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`relative overflow-hidden transition-all duration-1000 h-[3px] rounded-full ${
                                slide.id === selectedIndex
                                    ? "bg-white/30 w-10"
                                    : "bg-white w-[3px]"
                            }`}
                            onClick={() => setSelectedIndex(slide.id)}
                        >
                            <div
                                className={`transition-all duration-[4000ms] h-2 rounded-full ${
                                    slide.id === selectedIndex
                                        ? "w-full"
                                        : "w-0"
                                }`}
                            >
                                <div
                                    className="inset-0 bg-white h-2"
                                    style={{
                                        width: `${
                                            slide.id === selectedIndex
                                                ? "100%"
                                                : "0%"
                                        }`,
                                        transition: "width 1s ease-in-out",
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;
