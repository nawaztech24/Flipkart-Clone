import API from "../../api/axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import { EMPTY_CART } from "../../constants/cartConstants";

const Payment = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [method, setMethod] = useState("COD");
  const [processing, setProcessing] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const submitHandler = async () => {
    if (processing) return;

    if (!cartItems || cartItems.length === 0) {
      enqueueSnackbar("Cart is empty!", { variant: "warning" });
      return;
    }

    if (!shippingInfo) {
      enqueueSnackbar("Shipping info missing!", { variant: "warning" });
      return;
    }

    try {
      setProcessing(true);

      const order = {
        shippingInfo,
        orderItems: cartItems.map((item) => ({
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          product: item.product || item._id,
          image: item.image,
        })),
        totalPrice,
        paymentMethod: method === "COD" ? "COD" : "CARD",
        paymentInfo:
          method === "COD"
            ? { id: "COD", status: "Pending" }
            : { id: "FAKE_PAYMENT", status: "succeeded" },
      };

      console.log("SENDING ORDER:", order);

      
      const res = await API.post("/order/new", order, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const orderId = res.data?.order?._id;

      if (!orderId) {
        throw new Error("Order ID missing");
      }

      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId,
          totalPrice,
          paymentStatus: order.paymentInfo.status,
        })
      );

      // clear cart
      dispatch({ type: EMPTY_CART });
      localStorage.removeItem("cartItems");

      enqueueSnackbar("Order Placed Successfully!", { variant: "success" });

      
      navigate("/", { replace: true });

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);

      enqueueSnackbar(
        err.response?.data?.message || "Order Failed",
        { variant: "error" }
      );
    } finally {
      setProcessing(false);
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