import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

import MyOrders from '../Order/MyOrders';
import Wishlist from '../Wishlist/Wishlist';

const Account = () => {

    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector(state => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = user?.name?.split(" ") || [];
        return nameArray[nameArray.length - 1];
    };

    //  PROFILE COMPONENT
    const ProfileContent = () => (
        <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">

            {/* PERSONAL INFO */}
            <div className="flex flex-col gap-5 items-start">
                <span className="font-medium text-lg">
                    Personal Information
                    <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-8">Edit</Link>
                </span>

                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={user?.name?.split(" ")[0] || ""}
                        disabled
                        className="border px-3 py-2 bg-gray-100"
                    />
                    <input
                        type="text"
                        value={getLastName()}
                        disabled
                        className="border px-3 py-2 bg-gray-100"
                    />
                </div>
            </div>

            {/* EMAIL */}
            <div>
                <span className="font-medium text-lg">Email Address</span>
                <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="border px-3 py-2 block bg-gray-100 mt-2"
                />
            </div>

        </div>
    );

    return (
        <>
            <MetaData title="My Profile" />

            {loading ? <Loader /> :
                <>
                    <MinCategory />

                    <main className="w-full mt-12 sm:mt-0">
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            {/* LEFT SIDEBAR */}
                            <Sidebar />

                            {/* RIGHT CONTENT  */}
                            <div className="flex-1 overflow-hidden shadow bg-white">

                                <Routes>

                                    {/* DEFAULT = PROFILE */}
                                    <Route index element={<ProfileContent />} />

                                    {/*  DYNAMIC PAGES */}
                                    <Route path="orders" element={<MyOrders />} />
                                    <Route path="wishlist" element={<Wishlist />} />

                                    {/* TEMP PAGES */}
                                    <Route path="wallet" element={<h1 className="p-5">Wallet Page</h1>} />
                                    <Route path="address" element={<h1 className="p-5">Address Page</h1>} />
                                    <Route path="giftcards" element={<h1 className="p-5">Gift Cards</h1>} />
                                    <Route path="notifications" element={<h1 className="p-5">Notifications</h1>} />

                                </Routes>

                            </div>

                        </div>
                    </main>
                </>
            }
        </>
    );
};

export default Account;