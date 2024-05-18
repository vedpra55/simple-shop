"use client"

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from '@/config/firebase';
import Link from 'next/link';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(firestore, "products");
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "products", id));
    setProducts(products.filter(product => product.id !== id));
  };

  return (
  <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/add">
          <p className="px-4 py-2 bg-blue-500 text-white rounded">Add Product</p>
        </Link>
      </div>
      <table className="min-w-full text-left bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Image</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Price</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
                  <th className="py-2 px-4 border-b border-gray-200">
                    <img className='w-16 h-16' src={product.image} />
                  </th>
              <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">${product.price}</td>
              <td className="py-2 px-4 flex items-center h-16 gap-x-2 flex-wrap  border-gray-200">
                <Link href={`/admin/products/edit/${product.id}`}>
                  <p className="px-2 py-1 w-20 bg-yellow-500 text-white rounded">Edit</p>
                </Link>
                <button
                  className="ml-2 px-2 py-1 w-20 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default Products;
