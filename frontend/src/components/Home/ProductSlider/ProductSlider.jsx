import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getDiscount } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import StarIcon from '@mui/icons-material/Star';

const ProductSlider = ({ title, tagline, section, products: propProducts }) => {

    const { loading, sectionProducts, products } = useSelector((state) => state.products);

    const finalProducts =
        propProducts ||
        sectionProducts?.[section] ||
        products ||
        [];

    const isEmpty = !finalProducts || finalProducts.length === 0;

    const isRecommended = section === "recommended";
    const isSuggested = section === "suggested";

    return (
        <section className="w-full">

            {(isSuggested || isRecommended) ? (
                <div className={`p-4 rounded-xl mx-2 ${isSuggested ? "bg-[#cfe4db]" : "bg-[#dbeafe]"}`}>

                    {/* HEADER */}
                    <div className="flex px-4 py-3 justify-between items-center bg-white rounded-lg mb-3">
                        <div>
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-sm text-gray-600">{tagline}</p>
                        </div>

                        <Link
                            to="/products"
                            className="bg-primary-blue text-xs font-medium text-white px-5 py-2 rounded-sm"
                        >
                            VIEW ALL
                        </Link>
                    </div>

                    {/* HORIZONTAL SCROLL */}
                    <div className="bg-white px-4 py-4 rounded-lg overflow-x-auto">
                        <div className="flex gap-4">

                            {!loading && !isEmpty && finalProducts.map((item) => (

                                <Link
                                    key={item._id}
                                    to={`/product/${item._id}`}
                                    className="min-w-[220px] mr-2"
                                >

                                    <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition p-3">

                                        {/* IMAGE */}
                                        <div className="w-full h-44 flex items-center justify-center mb-3 bg-gray-50 rounded-md">
                                            <img
                                                src={item.images?.[0]?.url}
                                                alt={item.name}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        </div>

                                        {/* DETAILS */}
                                        <div className="text-center">

                                            <h2 className="text-sm font-medium text-gray-800 truncate">
                                                {item.name}
                                            </h2>

                                            <div className="flex justify-center items-center gap-1 mt-1 text-xs">
                                                <span className="px-1.5 py-0.5 bg-green-600 text-white rounded-sm flex items-center gap-0.5">
                                                    {item.ratings?.toFixed(1)}
                                                    <StarIcon sx={{ fontSize: "12px" }} />
                                                </span>
                                                <span className="text-gray-500">
                                                    ({item.numOfReviews})
                                                </span>
                                            </div>

                                            <div className="flex justify-center items-center gap-2 mt-1 text-sm font-medium">
                                                <span>₹{item.price?.toLocaleString()}</span>
                                                <span className="text-gray-500 line-through text-xs">
                                                    ₹{item.cuttedPrice?.toLocaleString()}
                                                </span>
                                                <span className="text-green-600 text-xs font-medium">
                                                    {getDiscount(item.price, item.cuttedPrice)}% off
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                        {isEmpty && (
                            <p className="text-center text-gray-500 py-5">
                                No products available
                            </p>
                        )}
                    </div>

                </div>
            ) : (

                // DEFAULT (UNCHANGED)
                <section className="bg-white w-full shadow overflow-hidden">

                    <div className="flex px-6 py-4 justify-between items-center">
                        <div className="flex flex-col">
                            <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#212121" }}>
                                {title}
                            </h1>
                            <p style={{ fontSize: "14px", color: "#878787", marginTop: "2px" }}>
                                {tagline}
                            </p>
                        </div>

                        <Link
                            to="/products"
                            className="bg-primary-blue text-xs font-semibold text-white px-5 py-2 rounded-sm shadow-md uppercase tracking-wide"
                        >
                            VIEW ALL
                        </Link>
                    </div>

                    <hr />

                    <div className="bg-gray-100 p-4">
                        {!loading && !isEmpty && (
                            <Slider {...settings}>
                                {finalProducts.map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/product/${item._id}`}
                                        className="block px-2"
                                    >
                                        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition duration-300 p-3">

                                            <div className="w-full h-44 flex items-center justify-center mb-3">
                                                <img
                                                    src={item.images?.[0]?.url}
                                                    alt={item.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>

                                            <div className="text-center">

                                                <h2 className="text-sm font-medium text-gray-800 truncate">
                                                    {item.name}
                                                </h2>

                                                <div className="flex justify-center items-center gap-1 mt-1 text-xs">
                                                    <span className="px-1.5 py-0.5 bg-green-600 text-white rounded-sm flex items-center gap-0.5">
                                                        {item.ratings?.toFixed(1)}
                                                        <StarIcon sx={{ fontSize: "12px" }} />
                                                    </span>
                                                    <span className="text-gray-500">
                                                        ({item.numOfReviews})
                                                    </span>
                                                </div>

                                                <div className="flex justify-center items-center gap-2 mt-1 text-sm font-medium">
                                                    <span>₹{item.price?.toLocaleString()}</span>
                                                    <span className="text-gray-500 line-through text-xs">
                                                        ₹{item.cuttedPrice?.toLocaleString()}
                                                    </span>
                                                    <span className="text-green-600 text-xs font-medium">
                                                        {getDiscount(item.price, item.cuttedPrice)}% off
                                                    </span>
                                                </div>

                                            </div>

                                        </div>
                                    </Link>
                                ))}
                            </Slider>
                        )}
                    </div>

                </section>
            )}

        </section>
    );
};

export default ProductSlider;