import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";
import { extraCurrency } from "../utils";
export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 2225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    const response = await axios.get(url, options);
    console.log("yes");
    // console.log(response.data);
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );
    const original_price = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );
    const currency = $(".a-price-symbol").text().trim().slice(0, 1);
    // const currency: any = [];
    const discountRate = $(".savingPriceOverride").text().replace(/[-%]/g, "");
    const outOfStock = $("#availability span").text().trim();
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image");
    const imageUrls = Object.keys(JSON.parse(images || ""));
    console.log({
      title,
      currentPrice,
      original_price,
      outOfStock,
      images,
      currency,
      discountRate,
    });
    const description = "Availability";
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(currentPrice),
      originaltPrice: Number(original_price) || Number(original_price),
      priceHistory: [],
      discountRate: Number(discountRate) || 0,
      category: "category",
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(original_price),
      highestPrice: Number(original_price) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(original_price),
    };
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape`);
  }
}
