import toast from "react-hot-toast"
import { useCart } from "react-use-cart"


export default function ProductCard({data}) {

    const { addItem } = useCart()

    function addToCart() {
        if(data?.stock == 0) {
            toast.error("Item out of stock")
            return
        }
        addItem(data)
        toast.success("Item added to cart")
    }

    return(
        <div className="col-span-3 bg-gray-50 shadow-xl">
            <img className=" w-full h-56 " src={data?.image} />
            <div className="mt-5 flex items-end justify-between px-3">
                <p className="text-lg font-bold w-full truncate">{data.name}</p>
                <p className="font-medium">${data.price}</p>
            </div>
            <div className="text-[14px] px-3">
                {data.description}
            </div>
            {
                data?.stock > 0 ? (
                    <div className="text-green-700 mt-2 px-3 text-[14px]">Stock:{data?.stock}</div>
                ) : (
                    <div className="text-red-700 mt-2 px-3 text-[14px]">Out Of Stock</div>
                )
            }
            <div className="mt-2">
                <button onClick={addToCart} className="bg-orange-600 w-full py-2 hover:bg-orange-800  text-center text-white">Add To Cart</button>
            </div>
        </div>
    )
}