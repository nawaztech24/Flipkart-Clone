import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successfull from '../../assets/images/Transaction/success.png';
import failed from '../../assets/images/Transaction/failed.png';

const OrderSuccess = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const success = location.state?.success;
    const method = location.state?.method; 

    const [time, setTime] = useState(3);

    const orderData = useMemo(() => {
        return JSON.parse(localStorage.getItem("lastOrder")) || {};
    }, []);

    useEffect(() => {

        if (time === 0) {
            if (success) {
                navigate("/");
            } else {
                navigate("/cart");
            }
            return;
        }

        const intervalId = setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);

    }, [time, navigate, success]);

    return (
        <>
            <MetaData title={`Transaction ${success ? "Successful" : "Failed"}`} />

            <main className="w-full mt-20">

                <div className="flex flex-col gap-3 items-center justify-center sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow rounded p-6 pb-12">

                    <img
                        draggable="false"
                        className="w-1/2 h-60 object-contain"
                        src={success ? successfull : failed}
                        alt="Transaction Status"
                    />

                    {/* UPDATED TITLE */}
                    <h1 className="text-2xl font-semibold">
                        {success
                            ? method === "COD"
                                ? "Order Placed Successfully"
                                : "Payment Successful 🎉"
                            : "Transaction Failed"}
                    </h1>

                    {success && (
                        <div className="text-center mt-2">
                            <p className="text-lg font-medium">
                                Order ID: <span className="text-blue-600">{orderData?.orderId || "N/A"}</span>
                            </p>
                            <p className="text-gray-700">
                                Payment Status: <span className="font-medium">{orderData?.paymentStatus || "N/A"}</span>
                            </p>
                            <p className="text-gray-700">
                                Total Amount: ₹{orderData?.totalPrice || 0}
                            </p>
                        </div>
                    )}

                    <p className="mt-3 text-lg text-gray-800">
                        Redirecting in {time} sec
                    </p>

                    <Link
                        to="/"
                        className="bg-primary-blue mt-2 py-2.5 px-6 text-white uppercase shadow hover:shadow-lg rounded-sm"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </main>
        </>
    );
};

export default OrderSuccess;