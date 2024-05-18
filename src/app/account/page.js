"use client"

import { useAuthContext } from "@/context/AuthContext";
import React,{ useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore, auth } from '@/config/firebase';
import Navbar from "@/components/Navbar";
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation";

export default function AccountPage() {

    const { currentUser } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const router = useRouter()

    useEffect(() => {
        if(currentUser) {
           async function fetchOrder() {
                const ordersRef = collection(firestore, "orders");
                const q = query(ordersRef, where("userId", "==", currentUser?.uid));
                const querySnapshot = await getDocs(q);
                const orders = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                  }));

                  setOrders(orders)  
           }
           fetchOrder()
        }
    },[currentUser])

    return (
        <div className="max-w-screen-xl mx-auto">
            <Navbar />
            <div className="min-h-screen  w-full p-6">
      <div className=" mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Account Details</h1>
        {currentUser && (
          <div className="mb-6">
            <p className="text-lg"><strong>Name:</strong> {currentUser.displayName}</p>
            <p className="text-lg"><strong>Email:</strong> {currentUser.email}</p>
            <p className="text-lg"><strong>Virtual Balance:</strong> ${currentUser.virtualBalance}</p>
            <button onClick={async() => {
              await signOut(auth)
              router.push("/")
            }}  className="bg-red-500 text-white mt-3 px-5 py-1">Logout</button>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        <table className="min-w-full text-left bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">${order.totalPrice}</td>
                <td className="py-2 px-4 border-b">{new Date(order.createdAt.toDate()).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <ul className="flex gap-x-2">
                    {order.items.map((item, index) => (
                      <React.Fragment>
                          <img className="h-10 w-10" src={item?.image} />
                        <li key={index}>{item.name} (x{item.quantity})</li>
                      
                      </React.Fragment>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    )
}