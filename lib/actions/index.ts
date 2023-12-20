"use server";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scaper";
import Product from "../models/product.model";
import { revalidatePath } from "next/cache";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
export async function scrappedAndStoreProduct(productUrl: string) {
  if (!productUrl) return;
  try {
    connectToDB();

    const scrappedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrappedProduct) return;
    let product = scrappedProduct;
    const existingProduct = await Product.findOne({
      url: scrappedProduct?.url,
    });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        existingProduct.priceHistory,
        { price: scrappedProduct.currentPrice },
      ];

      product = {
        ...scrappedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    console.log(product);
    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrappedProduct.url,
      },
      product,
      { upsert: true, new: true }
    );
    console.log(newProduct);
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error) {
    throw new Error("Failed to create product");
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) return null;
    return product;
  } catch (error) {}
}
export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error) {}
}

export async function getSimiliarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);
    if (!currentProduct) return null;
    const getSimiliarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);
    return getSimiliarProducts;
  } catch (error) {}
}
