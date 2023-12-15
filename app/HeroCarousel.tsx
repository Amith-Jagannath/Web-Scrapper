"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "phone" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "micro" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "tv" },
];
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={45}
            height={45}
            key={image.alt}
          />
        ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        height={175}
        width={185}
        alt="Arrow"
        className="max-xl:hidden absolute -left-[15%] bottom-0"
      ></Image>
    </div>
  );
};

export default HeroCarousel;
