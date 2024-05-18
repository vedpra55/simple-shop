"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function Page() {

    const { currentUser } = useAuthContext()
    const router = useRouter()

    if(!currentUser?.isAdmin) {
        router.push("/")
    }

    return (
        <div className="text-2xl font-bold px-5 py-5">Welcome {currentUser?.displayName}</div>
    )
}