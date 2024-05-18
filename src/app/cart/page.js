"use client"
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { useCart } from 'react-use-cart';
import { collection, addDoc, doc, updateDoc, increment, writeBatch } from "firebase/firestore";
import { firestore } from '@/config/firebase';
import { useAuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const CartItem = ({ name, image, price, quantity, id, stock }) => {
  const {  updateItemQuantity } = useCart()

  const handleIncrement = (id, qty) => {
    if(qty > stock) {
      toast.error("Invalid qty")
      return
    } 
    updateItemQuantity(id, qty)
  };

  const handleDecrement = (id, qty) => {
    updateItemQuantity(id, qty)
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-4 border-b">
      <div className="flex items-center">
        <img src={image} alt={name} className="w-16 h-16 object-cover mr-4" />
        
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">${price}</p>
      <div className="flex ">
        <button
          onClick={() => {
            if(quantity > 1) {
              handleDecrement(id, quantity - 1)
            }
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded-l"
        >
          -
        </button>
        <span className="bg-white text-gray-800 font-semibold py-1 px-4">{quantity}</span>
        <button
        onClick={() => {
         
            handleIncrement(id, quantity + 1)
         
        }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded-r"
        >
          +
        </button>
      </div>
      <p className="text-lg font-semibold text-right">${(price * quantity).toFixed(2)}</p>
    </div>
  );
};

const CartPage = () => {

  const { items, cartTotal, emptyCart } = useCart()
  const { currentUser } = useAuthContext()
  const [isLoading, setLoading] = useState(false)



  const handleCheckout = async() => {
    setLoading(true)
    const db = firestore
    const userId = currentUser?.uid

    if(!userId) {
      toast.error("Please Login")
      return
    }

    if (currentUser?.virtualBalance < cartTotal) {
      alert("Insufficient balance!");
      return;
    }

    try {
      const orderData = {
        userId:currentUser?.uid,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice : cartTotal,
        createdAt: new Date(),
      };
  
      await addDoc(collection(db, "orders"), orderData);
      const batch = writeBatch(db);
  
      items.forEach(item => {
        const productRef = doc(db, "products", item.id);
        batch.update(productRef, {
          stock: increment(-item.quantity),
        });
      })
  
      const userRef = doc(db, "users", userId);
  
      batch.update(userRef, {
        virtualBalance: increment(-cartTotal),
      });
  
      await batch.commit();
  
      toast.success("Order Placed")

      emptyCart()

    }catch(err) {
      console.log(err)

    }

    setLoading(false)
  }

  return (
    <div className=" max-w-screen-xl mx-auto">
        <Navbar />
      <h1 className="text-3xl font-bold mb-10">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 bg-gray-50 px-5 py-2 gap-4 mb-6">
        <div className="font-semibold">Image</div>
        <div className="font-semibold">Name</div>
        <div className="font-semibold">Price</div>
        <div className="font-semibold">Quantity</div>
        <div className="font-semibold text-right">Total</div>
      </div>
      {items.map((item) => (
        <CartItem
        id={item.id}
          key={item.id}
          name={item.name}
          image={item.image}
          stock={item.stock}
          price={item.price}
          quantity={item.quantity}

        />
      ))}
      <div className="flex flex-col items-end py-4">
        <p className="text-lg font-semibold">
          Total: $
          {cartTotal}
        </p>
        <button onClick={handleCheckout} className="bg-orange-600 w-56 mt-2 py-2 hover:bg-orange-800  text-center text-white">
          {isLoading ? "Wait.." : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;