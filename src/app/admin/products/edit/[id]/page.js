"use client"

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, firestore, storage } from '@/config/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useRouter } from 'next/navigation';

const EditProduct = ({params  }) => {
  const router = useRouter();
  const id = params.id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  const [isLoading , setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productDoc = await getDoc(doc(firestore, "products", id));
        if (productDoc.exists()) {
          const product = productDoc.data();
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setImageUrl(product.image);
          setStock(product.stock);
        }
      }
    };

    fetchProduct();
  }, [id]);

  console.log(name)

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedImageUrl = imageUrl;
    setLoading(true)
    if (image) {
      const imageRef = ref(storage, `products/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      updatedImageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(firestore, "products", id), {
      name,
      description,
      price: parseFloat(price),
      image: updatedImageUrl,
      stock: parseInt(stock)
    });

    setLoading(false)

    router.push('/admin/products');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Name {id}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <img src={imageUrl} />
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {isLoading ? "Wait..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
