// Now we would have to display the categories in the home page
// So we would have fetch each category from a dummyapi 
// Now fetch all those categories and display them as clickable buttons

// useNavigate is a React Router hook that lets you programmatically navigate to a different route in your app.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryItem from '../components/CategoryItem.jsx';

function Home() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // Use useEffect to fetch your api data
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(async (data) => {
                const enriched = await Promise.all(
                    data.map(async (cat) => {
                        const res = await fetch(`https://dummyjson.com/products/category/${cat.slug}?limit=1`);
                        const prod = await res.json();
                        return {
                            ...cat,
                            thumbnail: prod.products[0]?.thumbnail || 'fallback.jpg'
                        };
                    })
                );
                setCategories(enriched);
            })
            .catch(console.error);
    }, []);
    // Without [], it runs on every render, causing an infinite fetch loop.

    const handleClick = (category) => {
        navigate(`/products/${category}`);
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-neutral-900 to-black text-white px-6 py-12">
            <h2 className="text-4xl font-bold text-center text-teal-400 mb-10 tracking-wide">
                Explore Categories
            </h2>

            <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map(cat => (
                    <CategoryItem
                        name={cat.name}
                        image={cat.thumbnail}
                        onClick={() => handleClick(cat.slug)}
                        key={cat.slug}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
