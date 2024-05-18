
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from '@/config/firebase';

import ProductCard from './ProductCard';

const ProductsList = (
    {searchValue}
) => {
  const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true)
      const productCollection = collection(firestore, "products");
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false)
      setProducts(productList);
      setFilteredProducts(productList);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchValue) {
      const filtered = products.filter(product => 
        product.description.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchValue, products]);

  return (

    <div className="grid mt-5 grid-cols-12 gap-5">
        {isLoading && (
            <p className='col-span-12 text-lg font-bold mt-5 text-center'>Loading...</p>
        )}
        {filteredProducts?.length === 0 && !isLoading &&(
            <p className='col-span-12 font-bold mt-5 text-center'>No Product Found</p>
        )}
        {filteredProducts?.map((item, i) => (
            <ProductCard key={i} data={item}/>
        ))}
    </div>

  );
};

export default ProductsList;
