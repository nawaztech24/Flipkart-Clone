import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import { EMPTY_CART } from "../../constants/cartConstants"; 

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { enqueueSnackbar } = useSnackbar();

  const [method, setMethod] = useState("COD");
  const [processing, setProcessing] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const generateOrderId = () =>
    "OD" + Math.floor(100000000 + Math.random() * 900000000);

  const submitHandler = async () => {
    if (processing) return;

    try {
      if (method === "ONLINE") {
        setProcessing(true);
        await new Promise((r) => setTimeout(r, 1200));
        setProcessing(false);
        enqueueSnackbar("Payment Successful!", { variant: "success" });
      }

      const order = {
        orderId: generateOrderId(),
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
        paymentMethod: method === "COD" ? "COD" : "CARD",
        paymentInfo:
          method === "COD"
            ? { id: "COD", status: "Pending" }
            : { id: "FAKE_PAYMENT", status: "succeeded" },
      };

      const res = await axios.post("/api/v1/order/new", order, {
        withCredentials: true,
      });

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: res.data.order._id,
          totalPrice: order.totalPrice,
          paymentStatus: order.paymentInfo.status,
        })
      );

      
      localStorage.removeItem("cartItems");
      dispatch({ type: EMPTY_CART }); 

      navigate("/orders/success");

    } catch (err) {
      setProcessing(false);
      console.log(err.response?.data || err.message);

      enqueueSnackbar(
        err.response?.data?.message || "Order Failed",
        { variant: "error" }
      );
    }
  };

  return (
    <>
      <MetaData title="Payment" />

      <main className="w-full mt-24 bg-gray-100 py-6 pb-24 min-h-screen">
        <div className="w-full sm:w-11/12 m-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            <div className="lg:col-span-8">
              <div className="bg-white p-6 rounded shadow-sm border">

                <h2 className="text-lg font-semibold mb-4">
                  Select Payment Method
                </h2>

                <label className="flex items-center gap-2 mb-3 cursor-pointer">
                  <input
                    type="radio"
                    value="COD"
                    checked={method === "COD"}
                    onChange={() => setMethod("COD")}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2 mb-3 cursor-pointer">
                  <input
                    type="radio"
                    value="ONLINE"
                    checked={method === "ONLINE"}
                    onChange={() => setMethod("ONLINE")}
                  />
                  Pay Online (Demo)
                </label>

                {processing && (
                  <p className="text-blue-500 text-sm mt-2">
                    Processing Payment...
                  </p>
                )}

              </div>
            </div>

            <div className="lg:col-span-4">
              <PriceSidebar
                cartItems={cartItems}
                totalPrice={totalPrice}
                submitHandler={submitHandler}
              />
            </div>

          </div>

        </div>
      </main>
    </>
  );
};

export default Payment;