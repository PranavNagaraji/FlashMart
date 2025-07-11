import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCart from '../components/AddToCart.jsx';
import AddToWishList from '../components/AddToWishList.jsx';

function ProductList() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
            .catch(console.error);
    }, []);

    const handleClick = (productId) => {
        navigate(`/products/${category}/${productId}`);
    };

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-10 capitalize">
                {category}
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
                {products.map(product => (
                    <div
                        key={product.id}
                        onClick={() => handleClick(product.id)}
                        className="bg-white rounded-xl shadow-lg p-4 cursor-pointer w-56 hover:shadow-xl hover:scale-105 transition-all duration-200"
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="text-lg font-semibold text-red-600 mt-3 text-center truncate">
                            {product.title}
                        </h3>
                        <p className="text-center text-gray-700 font-medium mt-1">${product.price}</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <AddToCart alert={true} product={product} />
                            <AddToWishList product={product} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
