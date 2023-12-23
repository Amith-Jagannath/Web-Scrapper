import React from "react";
import { getProductById, getSimiliarProducts } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import Modal from "@/app/components/Modal";
import PriceInfoCard from "@/app/components/PriceInfoCard";
import ProductCard from "@/app/components/ProductCard";
type Props = {
  params: { id: string };
};
const page = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);
  const similiarProducts = await getSimiliarProducts(id);
  if (!product) redirect("/");
  console.log(product);
  return (
    <div className="product-container flex">
      <div className="flex">
        <div>
          <Image
            src={product.image}
            height={400}
            width={580}
            alt={product.title}
          ></Image>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-sdecondary font semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  width={20}
                  height={20}
                  alt="heart"
                ></Image>
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-100">
                <Image
                  src="/assets/icons/bookmark.svg"
                  width={20}
                  height={20}
                  alt="bookmark"
                ></Image>
              </div>
              <div className="p-2 bg-white-200 rounded-100">
                <Image
                  src="/assets/icons/share.svg"
                  width={20}
                  height={20}
                  alt="share"
                ></Image>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency}
                {product.currentPrice}
              </p>
              <p className="text-[17px] text-secondary line-through">
                {product.currency}
                {product.highestPrice}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    width={16}
                    height={16}
                    alt="star"
                  ></Image>
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || 25}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  ></Image>
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount}
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span>{" "}
                buyers have recomended
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${product.currentPrice}`}
                borderColor="#b6dff"
              />
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${product.averagePrice}`}
                borderColor="#b6dff"
              />
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${product.highestPrice}`}
                borderColor="#b6dff"
              />
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${product.lowestPrice}`}
                borderColor="#b6dff"
              />
            </div>
          </div>
          {/* <Modal /> */}
        </div>
      </div>
      <div className="flex flex-col gap-16 border-2">
        <h1 className="text-2xl text-secondary font-semibold">
          Product Description
        </h1>

        <div className="flex flex-col gap-4">
          {product?.description?.split("\n")}
        </div>
      </div>

      <button className="btn w-fit mx-auto flex itemms-center justify--center gap-3 min-w-[200px]">
        <Image src="/assets/icons/bag.svg" width={22} height={22} alt="check" />

        <Link href="/" className="text-base text-white">
          Buy Now
        </Link>
      </button>
      <Modal />

      {similiarProducts && similiarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p> Similiar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similiarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
