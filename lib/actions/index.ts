"use server";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scaper";
export async function scrappedAndStoreProduct(productUrl: string) {
  if (!productUrl) return;
  try {
    connectToDB();
    const scrappedProduct = await scrapeAmazonProduct(productUrl);
    // const existingProduct = await
    if (!scrappedProduct) return;
  } catch (error) {
    throw new Error("Failed to create product");
  }
}
