import { Link } from "react-router-dom";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarsIcon from '@mui/icons-material/Stars';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardIcon from '@mui/icons-material/Dashboard'; 

const PrimaryDropDownMenu = ({ user }) => {

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="w-[320px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">

      {/*  TOP */}
      <div className="flex justify-between items-center px-4 py-3 border-b text-sm">
        {user ? (
          <span className="font-medium text-gray-800">
            Hello, {user.name}
          </span>
        ) : (
          <>
            <span className="text-gray-600">New customer?</span>
            <Link to="/register" className="text-blue-600 font-semibold">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/*  MENU */}
      <div className="flex flex-col text-sm">

        {/* My Profile */}
        <Link to="/account" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <PersonOutlineIcon fontSize="small" />
          </span>
          My Profile
        </Link>

        {/*  ADMIN DASHBOARD (just below profile) */}
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition text-blue-600 font-medium"
          >
            <span>
              <DashboardIcon fontSize="small" />
            </span>
            Admin Dashboard
          </Link>
        )}

        {/* Orders */}
        <Link to="/account/orders" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <Inventory2OutlinedIcon fontSize="small" />
          </span>
          Orders
        </Link>

        <Link to="/account/supercoin" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <StarsIcon fontSize="small" />
          </span>
          SuperCoin
        </Link>

        <Link to="/account/wallet" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <AccountBalanceWalletIcon fontSize="small" />
          </span>
          Saved Cards & Wallet
        </Link>

        <Link to="/account/address" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <LocationOnIcon fontSize="small" />
          </span>
          Saved Addresses
        </Link>

        <Link to="/account/wishlist" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <FavoriteBorderIcon fontSize="small" />
          </span>
          Wishlist
        </Link>

        <Link to="/account/giftcards" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <CardGiftcardIcon fontSize="small" />
          </span>
          Gift Cards
        </Link>

        <Link to="/account/notifications" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition">
          <span className="text-gray-500">
            <NotificationsNoneIcon fontSize="small" />
          </span>
          Notifications
        </Link>

        {/* Logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="text-left px-4 py-2.5 hover:bg-gray-100 text-red-500 transition"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default PrimaryDropDownMenu;