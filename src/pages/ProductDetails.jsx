import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddToCart from '../components/AddToCart.jsx';
import AddToWishList from '../components/AddToWishList.jsx';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(data)
            })
            .catch(console.error);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-300 bg-gradient-to-tr from-black via-gray-900 to-gray-800">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-green-700 mb-8 drop-shadow-md">
                    {product.title}
                </h2>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full max-h-96 object-contain rounded-xl shadow-lg mb-8"
                />
                <p className="text-lg text-gray-700 max-w-3xl mb-6 leading-relaxed">
                    {product.description}
                </p>
                <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-gray-800 font-semibold mb-10">
                    <div>
                        <span className="block text-2xl text-green-600">${product.price}</span>
                        Price
                    </div>
                    <div>
                        <span className="block text-2xl">{product.brand}</span>
                        Brand
                    </div>
                    <div>
                        <span className="block text-2xl">{product.rating}⭐</span>
                        Rating
                    </div>
                    <div>
                        <span className="block text-2xl">{product.stock}</span>
                        Stock
                    </div>
                </div>
                <div className="flex gap-6">
                    <AddToCart alert={true} product={product} />
                    <AddToWishList product={product} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
