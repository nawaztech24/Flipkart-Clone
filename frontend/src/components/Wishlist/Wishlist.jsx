import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import MinCategory from '../Layouts/MinCategory';
import Sidebar from '../User/Sidebar';
import { Link } from 'react-router-dom';

const Wishlist = () => {

    const state = useSelector((state) => state);

    //  FULL SAFE ACCESS
    const wishlistItems = state?.wishlist?.wishlistItems || [];

    return (
        <>
            <MetaData title="Wishlist | Flipkart" />

            <MinCategory />
            <main className="w-full mt-12 sm:mt-0">

                <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                    <Sidebar activeTab={"wishlist"} />

                    <div className="flex-1 shadow bg-white">

                        <div className="flex flex-col">

                            {/*  SAFE LENGTH */}
                            <span className="font-medium text-lg px-4 py-4 border-b">
                                My Wishlist ({wishlistItems ? wishlistItems.length : 0})
                            </span>

                            {/* EMPTY */}
                            {(!wishlistItems || wishlistItems.length === 0) && (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <img
                                        src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
                                        alt="Empty"
                                    />
                                    <span className="text-lg font-medium mt-6">
                                        Empty Wishlist
                                    </span>
                                </div>
                            )}

                            {/* LIST */}
                            {wishlistItems && wishlistItems.map((item) => (
                                <div key={item?.product} className="p-4 border-b flex gap-4">

                                    <Link to={`/product/${item?.product}`}>
                                        <img
                                            src={item?.image}
                                            className="w-24 h-24 object-contain"
                                            alt=""
                                        />
                                    </Link>

                                    <div>
                                        <p>{item?.name}</p>
                                        <p>₹{item?.price}</p>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </main>
        </>
    );
};

export default Wishlist;