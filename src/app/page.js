"use client"

import Navbar from "@/components/Navbar";
import ProductsList from "@/components/ProductList";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  const [searchValue, setSearchValue] = useState("")

  return (
    <main className=" m-auto max-w-screen-xl ">
      <Navbar />
      <div className="flex w-full gap-x-5">
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className=" w-full  bg-gray-50 px-5 py-2 outline-none " />
          <button onClick={() => {
            setSearchValue(searchTerm)
          }} className="bg-black text-white px-5 py-1">Search</button>
          {searchValue && (
                      <button onClick={() => {
                        setSearchValue("")
                        setSearchTerm("")
                      }} className="bg-gray-100 text-black px-5 py-1">Clear</button>
          )}
      </div>
      <ProductsList searchValue={searchValue}/>
    </main>
  );
}
