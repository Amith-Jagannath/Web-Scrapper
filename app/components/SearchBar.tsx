"use client";
import React, { FormEvent } from "react";
import { useState } from "react";
import { scrappedAndStoreProduct } from "@/lib/actions";
const SearchBar = () => {
  const [searchPrompt, setsearchPrompt] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isvalidAmazonLink = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      console.log(hostname);
      if (hostname.includes("amazon.com") || hostname.includes("amazon."))
        return true;
    } catch (error) {}
    return false;
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isvalidAmazonLink(searchPrompt);
    if (!isValidLink) return alert("Enter valid link");
    setLoading(true);
    const product = await scrappedAndStoreProduct(searchPrompt);
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setsearchPrompt(e.target.value)}
        placeholder="Enter the product link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn">
        {isLoading ? "Searching.." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
