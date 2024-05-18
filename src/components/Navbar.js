"use client"

import { useAuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { useCart } from "react-use-cart"


export default function Navbar() {

    const { currentUser } = useAuthContext()
    const { totalItems } = useCart()

    return (
        <div>
            <div className="flex items-center my-10 justify-between">
                <Link href={"/"}>
                <img className="  h-16 w-16 rounded-md " src="https://thumbs.dreamstime.com/b/letter-w-logo-template-clock-perfect-to-use-watch-shop-accessories-fashion-236593287.jpg" /></Link>
                <div className="flex gap-x-3 ">
                    <div className="bg-black text-white px-5 py-1">Home</div>
                    <div className="bg-gray-100 text-black px-5 py-1">About</div>
                    <div className="bg-gray-100 text-black px-5 py-1">Contact us</div>
                    {
                        currentUser?.isAdmin && (
                            <Link href={"/admin/products"} className="bg-gray-100 text-black px-5 py-1">Admin</Link>
                        )
                    }
                </div>
                {currentUser ? (
                    <div className="px-5 flex gap-x-2 items-center text-nowrap py-2 ">
                    <Link href={"/account"} className="bg-orange-600 text-white px-5 py-1">Account</Link>
                    <Link className="bg-black text-white px-5 py-1" href={"/cart"}>
                        Cart <span className="bg-gray-100 px-2 py-1 text-black  rounded-2xl">{totalItems}</span>
                    </Link>
                </div>
                ): (
                    <div className="flex gap-x-2 items-center text-nowrap  ">
                    <Link className="bg-orange-600 px-5 py-1  text-white" href={"/login"}>Login</Link>
                    <Link className="bg-black text-white px-5 py-1" href={"/cart"}>
                        Cart <span className="bg-gray-100 px-2 py-1 text-black  rounded-2xl">{totalItems}</span>
                    </Link>
                </div>
                )}
             
            </div>
           
        </div>
    )
}