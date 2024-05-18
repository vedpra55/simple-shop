"use client"

import { useEffect, useState } from 'react';

import { deleteDoc, doc, collection, getDocs } from "firebase/firestore";
import { firestore } from '@/config/firebase';


const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const ordersRef = collection(firestore, "orders");
            const querySnapshot = await getDocs(ordersRef);
            const orders = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
          
            setOrders(orders)
            return orders;
          } catch (error) {
            console.error("Error fetching orders: ", error);
            return [];
          }
    };

    fetchData();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(firestore, "orders", orderId));
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Items</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.userId}</td>
                <td className="py-2 px-4 border-b">${order.totalPrice}</td>
                <td className="py-2 px-4 border-b">{new Date(order.createdAt.toDate()).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} (x{item.quantity})</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
