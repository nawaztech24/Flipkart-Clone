import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(saved);
  }, []);

  const handleDelete = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  return (
    <div className="mt-20 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Saved Addresses</h2>
        <button
          onClick={() => navigate("/account/address/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <p>No address found</p>
      ) : (
        addresses.map((addr, index) => (
          <div key={index} className="border p-4 mb-3 rounded">
            <p><strong>{addr.name}</strong></p>
            <p>{addr.address}</p>
            <p>{addr.city}, {addr.state}</p>
            <p>{addr.pincode}</p>
            <p>{addr.phone}</p>

            <div className="mt-3 flex gap-3">
              <button
                onClick={() => navigate(`/account/address/edit/${index}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Address;