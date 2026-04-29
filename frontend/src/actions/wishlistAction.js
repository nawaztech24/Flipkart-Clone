import API from "../api/axios";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../constants/wishlistConstants";

// ADD TO WISHLIST
export const addToWishlist = (id) => async (dispatch, getState) => {
    try {
        const { data } = await API.get(`/api/v1/product/${id}`);

        const product = data.product;

        dispatch({
            type: ADD_TO_WISHLIST,
            payload: {
                product: product._id,
                name: product.name,
                price: product.price,
                cuttedPrice: product.cuttedPrice,
                image: product.images?.[0]?.url || "/profile.png",
                ratings: product.ratings,
                reviews: product.numOfReviews,
            },
        });

        localStorage.setItem(
            "wishlistItems",
            JSON.stringify(getState().wishlist.wishlistItems)
        );

    } catch (error) {
        console.log("Wishlist Add Error:", error.response?.data || error.message);
    }
};


// REMOVE FROM WISHLIST
export const removeFromWishlist = (id) => (dispatch, getState) => {
    try {
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: id,
        });

        localStorage.setItem(
            "wishlistItems",
            JSON.stringify(getState().wishlist.wishlistItems)
        );

    } catch (error) {
        console.log("Wishlist Remove Error:", error);
    }
};