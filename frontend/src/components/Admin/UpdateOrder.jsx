import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import { formatDate } from '../../utils/functions';
import TrackStepper from '../Order/TrackStepper';
import Loading from './Loading';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MetaData from '../Layouts/MetaData';

const UpdateOrder = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const [status, setStatus] = useState("");

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { isUpdated, error: updateError } = useSelector((state) => state.order);

    // API + errors
    useEffect(() => {

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            enqueueSnackbar("Order Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(params.id));

    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar]);

    // Sync status from backend
    useEffect(() => {
        if (order?.orderStatus) {
            setStatus(order.orderStatus);
        }
    }, [order]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        if (!status || status === order.orderStatus) return;

        dispatch(updateOrder(params.id, { status }));
    };

    return (
        <>
            <MetaData title="Admin: Update Order | Flipkart" />

            {loading ? <Loading /> : (
                <>
                    {order && order.user && order.shippingInfo && (

                        <div className="flex flex-col gap-4">

                            <Link to="/admin/orders" className="ml-1 flex items-center gap-1 font-medium text-primary-blue uppercase">
                                <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
                                Go Back
                            </Link>

                            <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">

                                {/* LEFT */}
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="font-medium text-lg">Delivery Address</h3>
                                        <h4 className="font-medium">{order.user.name}</h4>
                                        <p className="text-sm">
                                            {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}
                                        </p>

                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Email:</p>
                                            <p>{order.user.email}</p>
                                        </div>

                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">Phone:</p>
                                            <p>{order.shippingInfo.phoneNo}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <form onSubmit={updateOrderSubmitHandler} className="flex flex-col gap-3 p-8">

                                    <h3 className="font-medium text-lg">Update Status</h3>

                                    <div className="flex gap-2">
                                        <p className="text-sm font-medium">Current Status:</p>
                                        <p className="text-sm">
                                            {order.orderStatus === "Ordered" && `Ordered on ${formatDate(order.createdAt)}`}
                                            {order.orderStatus === "Shipped" && `Shipped on ${formatDate(order.shippedAt)}`}
                                            {order.orderStatus === "Delivered" && `Delivered on ${formatDate(order.deliveredAt)}`}
                                        </p>
                                    </div>

                                    
                                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                                        <InputLabel>Status</InputLabel>

                                        <Select
                                            value={status}
                                            label="Status"
                                            onChange={(e) => setStatus(e.target.value)}
                                        >

                                            {/* Current status */}
                                            <MenuItem value={order.orderStatus}>
                                                {order.orderStatus}
                                            </MenuItem>

                                            {/* Next step */}
                                            {order.orderStatus === "Ordered" && (
                                                <MenuItem value="Shipped">Shipped</MenuItem>
                                            )}

                                            {order.orderStatus === "Shipped" && (
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                            )}

                                        </Select>
                                    </FormControl>

                                    <button
                                        type="submit"
                                        disabled={status === order.orderStatus}
                                        className="bg-primary-orange p-2.5 text-white font-medium rounded shadow hover:shadow-lg disabled:opacity-50"
                                    >
                                        Update
                                    </button>

                                </form>

                            </div>

                            {/* ITEMS */}
                            {order.orderItems?.map((item) => {

                                const { _id, image, name, price, quantity } = item;

                                return (
                                    <div key={_id} className="flex flex-col sm:flex-row min-w-full shadow-lg rounded-lg bg-white px-2 py-5">

                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">

                                            <div className="w-32 h-24">
                                                <img className="h-full w-full object-contain" src={image} alt={name} />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm">
                                                    {name.length > 45 ? `${name.substring(0, 45)}...` : name}
                                                </p>
                                                <p className="text-xs text-gray-600">Qty: {quantity}</p>
                                                <p className="text-xs text-gray-600">Price: ₹{price}</p>
                                                <span className="font-medium">
                                                    Total: ₹{quantity * price}
                                                </span>
                                            </div>

                                        </div>

                                        <div className="flex flex-col w-full sm:w-1/2">
                                            <h3 className="font-medium sm:text-center">Order Status</h3>

                                            <TrackStepper
                                                orderOn={order.createdAt}
                                                shippedAt={order.shippedAt}
                                                deliveredAt={order.deliveredAt}
                                                activeStep={
                                                    order.orderStatus === "Delivered"
                                                        ? 2
                                                        : order.orderStatus === "Shipped"
                                                            ? 1
                                                            : 0
                                                }
                                            />
                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateOrder;