export default function CategoryItem({ name, image, onClick }) {
    return (
        <div
            role="button"
            onClick={onClick}
            className="block w-full sm:w-64 bg-indigo-300 rounded-2xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-200"
        >
            <img
                src={image}
                alt={name}
                className="h-44 w-full object-cover"
            />
            <div className="py-4 px-3 bg-gradient-to-r from-gray-100 to-gray-200 text-center">
                <h3 className="text-xl font-semibold text-gray-800 capitalize tracking-wide">
                    {name.replace('-', ' ')}
                </h3>
            </div>
        </div>
    );
}
