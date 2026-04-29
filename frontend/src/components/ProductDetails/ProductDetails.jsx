import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        if (product?.category) {
            dispatch(getSimilarProducts(product.category));
        }
    }, [dispatch, product?.category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product?.name} />
                    <MinCategory />
                    <main className="mt-12 sm:mt-0">

                        <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">

                            {/* LEFT SIDE */}
                            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">

                                        <Slider {...settings}>
                                            {product?.images?.map((item, i) => (
                                                item?.url && (
                                                    <img
                                                        key={i}
                                                        className="w-full h-96 object-contain"
                                                        src={item.url}
                                                        alt={product?.name}
                                                    />
                                                )
                                            ))}
                                        </Slider>

                                        <div className="absolute top-4 right-4 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow">
                                            <span onClick={addToWishlistHandler}
                                                className={`${itemInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"} cursor-pointer`}>
                                                <FavoriteIcon sx={{ fontSize: "18px" }} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        {product?.stock > 0 && (
                                            <button onClick={itemInCart ? goToCart : addToCartHandler}
                                                className="p-4 w-1/2 bg-primary-yellow text-white flex items-center justify-center gap-2">
                                                <ShoppingCartIcon />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button onClick={buyNow}
                                            className="p-4 w-1/2 bg-primary-orange text-white">
                                            <FlashOnIcon />
                                            BUY NOW
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex-1 py-2 px-3">

                                <h2 className="text-xl">{product?.name}</h2>

                                <span className="text-sm text-gray-500 flex gap-2 items-center">
                                    <span className="text-xs px-1.5 py-0.5 bg-primary-green text-white">
                                        {product?.ratings?.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} />
                                    </span>
                                    <span>{product?.numOfReviews} Reviews</span>
                                </span>

                                {/* ✅ PRICE + DISCOUNT */}
                                <div className="flex items-baseline gap-2 text-3xl">
                                    <span>₹{product?.price?.toLocaleString()}</span>
                                    <span className="line-through text-gray-500 text-lg">
                                        ₹{product?.cuttedPrice?.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-primary-green">
                                        {getDiscount(product?.price, product?.cuttedPrice)}% off
                                    </span>
                                </div>

                                {/* ✅ WARRANTY */}
                                <p className="text-sm text-gray-600 mt-2">
                                    Warranty: {product?.warranty || "No Warranty"}
                                </p>
                                <div className="flex gap-6 mt-4 text-center">

  {product?.features?.map((item, i) => (
    <div key={i} className="flex flex-col items-center text-sm text-gray-600">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        ⭐
      </div>
      <span>{item}</span>
    </div>
  ))}

  {product?.cod && (
    <div className="flex flex-col items-center text-sm text-gray-600">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        ₹
      </div>
      <span>Cash on Delivery</span>
    </div>
  )}

  {product?.assured && (
    <div className="flex flex-col items-center text-sm text-gray-600">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
        ✔
      </div>
      <span>Assured</span>
    </div>
  )}

</div>
                                
                                <p className="text-sm text-gray-600 mt-1">
  Return: {
    typeof product?.returnPolicy === "object"
      ? (product.returnPolicy?.isAvailable
          ? `${product.returnPolicy.days} Days Return`
          : "No Return")
      : (product?.returnPolicy || "No Return")
  }
</p>

<p className="text-sm text-gray-600">
  Replacement: {
    typeof product?.replacement === "object"
      ? (product.replacement?.isAvailable
          ? `${product.replacement.days} Days Replacement`
          : "No Replacement")
      : (product?.replacement || "No Replacement")
  }
</p>
    {product?.specifications?.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-2">Specifications</h3>

    <div className="bg-gray-50 p-3 rounded">
      {product.specifications.map((spec, i) => (
        <div key={i} className="flex justify-between border-b py-2 text-sm">
          <span className="text-gray-600">{spec.name}</span>
          <span className="font-medium">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
)}
                            </div>

                        </div>

                        <ProductSlider title={"Similar Products"} tagline={"Based on the category"} />

                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;