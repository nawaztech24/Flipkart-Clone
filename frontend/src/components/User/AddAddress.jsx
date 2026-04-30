import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("addresses")) || [];
    const updated = [...existing, form];

    localStorage.setItem("addresses", JSON.stringify(updated));

    navigate("/account/address");
  };

  return (
    <div className="mt-20 p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Address</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <input name="state" placeholder="State" onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />

        <button className="bg-green-600 text-white py-2 rounded">
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;