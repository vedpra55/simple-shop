"use client"

import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "react-use-cart";

export default function Provider({children}) {
    return (
        <AuthProvider>
            <Toaster />
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    )
}