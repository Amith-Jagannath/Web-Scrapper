import React from "react";
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import HeroCarousel from "./HeroCarousel";
const page = () => {
  return (
    <>
      <section className="px-6 md:px-2 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping starts here:
              <Image
                src="/assets/icons/arrow-right.svg"
                height={16}
                width={16}
                alt="image"
              ></Image>
            </p>
            <h1 className="head-text">Unleash the power of Pricewise</h1>
            <p className="mt-6">Powerful self serve product growth analytics</p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Apple Iphone", "Book", "Sneakers"].map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
