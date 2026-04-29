import { Link } from 'react-router-dom';

const Product = ({ _id, name, images }) => {
    return (
        <Link to={`/product/${_id}`} className="flex flex-col items-center gap-1.5 p-6 cursor-pointer">

            <div className="w-36 h-36 transform hover:scale-110 transition-transform duration-150 ease-out">
                <img
                    draggable="false"
                    className="w-full h-full object-contain"
                    src={images?.[0]?.url || "https://via.placeholder.com/150"}
                    alt={name}
                />
            </div>

            <h2 className="font-medium text-sm mt-2 text-center">
                {name}
            </h2>

        </Link>
    );
};

export default Product;