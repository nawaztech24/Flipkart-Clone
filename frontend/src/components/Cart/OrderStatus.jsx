import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { newOrder, clearErrors } from '../../actions/orderAction';
import { EMPTY_CART } from '../../constants/cartConstants';
import Loader from '../Layouts/Loader';

const OrderStatus = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { loading, order, error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
        paymentMethod: "COD",
        paymentInfo: {
            id: "COD",
            status: "Pending"
        }
    };

    useEffect(() => {
        dispatch(newOrder(orderData));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!loading) {
            if (order) {
                enqueueSnackbar("Order Placed Successfully", { variant: "success" });

                localStorage.removeItem("cartItems");
                dispatch({ type: EMPTY_CART });

                navigate("/orders/success");
            }
        }
    }, [loading, order, dispatch, navigate, enqueueSnackbar]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
    }, [error, dispatch, enqueueSnackbar]);

    return <Loader />;
};

export default OrderStatus;