import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditAddress = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    if (addresses[id]) {
      setForm(addresses[id]);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    addresses[id] = form;

    localStorage.setItem("addresses", JSON.stringify(addresses));

    navigate("/account/address");
  };

  return (
    <div className="mt-20 p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Address</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" value={form.name} onChange={handleChange} required />
        <input name="address" value={form.address} onChange={handleChange} required />
        <input name="city" value={form.city} onChange={handleChange} required />
        <input name="state" value={form.state} onChange={handleChange} required />
        <input name="pincode" value={form.pincode} onChange={handleChange} required />
        <input name="phone" value={form.phone} onChange={handleChange} required />

        <button className="bg-blue-600 text-white py-2 rounded">
          Update Address
        </button>
      </form>
    </div>
  );
};

export default EditAddress;