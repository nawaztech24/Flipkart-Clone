const PriceSidebar = ({ cartItems = [], totalPrice = 0, submitHandler }) => {

  const itemsPrice = cartItems.reduce(
    (sum, item) => sum + (item.cuttedPrice * item.quantity),
    0
  );

  const discount = itemsPrice - totalPrice;

  return (
    <div style={{ width: "100%" }}>

      <div style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        overflow: "hidden"
      }}>

        <div style={{ padding: "12px 16px", borderBottom: "1px solid #ddd", fontWeight: 500 }}>
          PRICE DETAILS
        </div>

        <div style={{ padding: "16px", fontSize: "14px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Price ({cartItems.length} items)</span>
            <span>₹{itemsPrice}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "green" }}>
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Delivery</span>
            <span style={{ color: "green" }}>FREE</span>
          </div>

          <hr />

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontWeight: 600 }}>
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

        </div>

        
        <div style={{ padding: "12px" }}>
          <button
            onClick={submitHandler}
            style={{
              width: "100%",
              padding: "12px",
              background: "#fb641b",
              color: "#fff",
              border: "none",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            PLACE ORDER ₹{totalPrice}
          </button>
        </div>

      </div>

    </div>
  );
};

export default PriceSidebar;