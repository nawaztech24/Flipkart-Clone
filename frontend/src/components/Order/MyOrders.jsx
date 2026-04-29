import { useEffect, useState } from 'react';
import { myOrders, clearErrors } from '../../actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import { useSnackbar } from 'notistack';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const orderStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];

const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [status, setStatus] = useState("");
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    //  SAFE DEFAULT
    const { orders = [], loading, error } = useSelector((state) => state.myOrders);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (!loading) {
            setFilteredOrders(orders || []);
        }
    }, [loading, orders]);

    //  FILTER
    useEffect(() => {

        if (!orders) return;

        let filtered = [...orders];

        if (status) {
            filtered = filtered.filter((o) => o.orderStatus === status);
        }

        if (orderTime) {
            if (+orderTime === dt.getMonth()) {
                filtered = filtered.filter(
                    (o) => new Date(o.createdAt).getMonth() === +orderTime
                );
            } else {
                filtered = filtered.filter(
                    (o) => new Date(o.createdAt).getFullYear() === +orderTime
                );
            }
        }

        setFilteredOrders(filtered);

    }, [status, orderTime, orders]);

    // SEARCH
    const searchOrders = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            enqueueSnackbar("Empty Input", { variant: "warning" });
            return;
        }

        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems?.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        }));

        setFilteredOrders(arr);
    };

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
    };

    return (
        <>
            <MetaData title="My Orders | Flipkart" />
            <MinCategory />

            <main className="w-full mt-16 sm:mt-0">

                <div className="flex gap-3.5 mt-2 sm:mt-6 sm:mx-3 m-auto mb-7">

                    {/* LEFT FILTER */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">

                        <div className="flex flex-col bg-white rounded-sm shadow">

                            <div className="flex justify-between px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span
                                    onClick={clearFilters}
                                    className="text-blue-600 text-sm cursor-pointer"
                                >
                                    clear all
                                </span>
                            </div>

                            {/* STATUS */}
                            <div className="px-4 py-3 text-sm">
                                <span className="font-medium">ORDER STATUS</span>

                                <FormControl>
                                    <RadioGroup
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                    >
                                        {orderStatus.map((el, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={el}
                                                control={<Radio size="small" />}
                                                label={
                                                    <span className={`text-sm ${el === "Cancelled" ? "text-red-500 font-medium" : ""}`}>
                                                        {el}
                                                    </span>
                                                }
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>

                            {/* TIME */}
                            <div className="px-4 py-3 text-sm">
                                <span className="font-medium">ORDER TIME</span>

                                <FormControl>
                                    <RadioGroup
                                        onChange={(e) => setOrderTime(e.target.value)}
                                        value={orderTime}
                                    >
                                        {ordertime.map((el, i) => (
                                            <FormControlLabel
                                                key={i}
                                                value={el}
                                                control={<Radio size="small" />}
                                                label={i === 0 ? "This Month" : el}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1">

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-3 sm:mr-4">

                                {/* SEARCH */}
                                <form onSubmit={searchOrders} className="flex bg-white border rounded">
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        placeholder="Search your orders"
                                        className="p-2 flex-1"
                                    />
                                    <button className="px-4 bg-blue-600 text-white flex items-center gap-1">
                                        <SearchIcon />
                                        Search
                                    </button>
                                </form>

                                {/* EMPTY */}
                                {filteredOrders?.length === 0 && (
                                    <div className="p-6 bg-white text-center">
                                        No Orders Found
                                    </div>
                                )}

                                {/* LIST */}
                                {filteredOrders?.map((order) => {

                                    const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;

                                    return orderItems?.map((item, index) => (
                                        <OrderItem
                                            key={index}
                                            {...item}
                                            orderId={_id}
                                            orderStatus={orderStatus}
                                            createdAt={createdAt}
                                            deliveredAt={deliveredAt}
                                        />
                                    ));
                                }).reverse()}

                            </div>
                        )}

                    </div>

                </div>

            </main>
        </>
    );
};

export default MyOrders;