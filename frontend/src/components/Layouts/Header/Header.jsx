import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Searchbar from './Searchbar';
import logo from '../../../assets/images/logo.png';
import travelIcon from '../../../assets/images/travel-icon.png';
import minutesIcon from '../../../assets/images/flipkart-minutes.png';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import Categories from '../Categories';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const [showLocationBox, setShowLocationBox] = useState(false);
  const [location, setLocation] = useState("");

  const handleEnter = (setter) => {
    if (timeoutId) clearTimeout(timeoutId);
    setter(true);
  };

  const handleLeave = (setter) => {
    const id = setTimeout(() => setter(false), 200);
    setTimeoutId(id);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();

            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state;

            setLocation(city);
          } catch {
            setLocation("Location not found");
          }

          setShowLocationBox(false);
        },
        () => alert("Permission denied")
      );
    }
  };

  return (
    <>
     
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">

        {/* TOP STRIP */}
        <div className="border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-2 text-sm text-gray-600">

            <div className="flex items-center gap-4">
              <Link to="/">
                <img src={logo} className="h-16 object-contain" alt="logo" />
              </Link>

              <Link to="/minutes">
                <img src={minutesIcon} className="h-14 object-contain" alt="minutes" />
              </Link>

              <Link to="/travel">
                <img src={travelIcon} className="h-16 object-contain" alt="travel" />
              </Link>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-2 text-gray-700">
              <span className="truncate max-w-[120px]">
                {location || "Location not set"}
              </span>

              <button
                onClick={() => setShowLocationBox(true)}
                className="text-blue-600 hover:underline"
              >
                Select delivery location
              </button>
            </div>

          </div>

          {/* SEARCH + RIGHT */}
          <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto gap-6">

            <div className="flex-1 max-w-3xl">
              <Searchbar />
            </div>

            <div className="flex items-center gap-8 text-gray-700 relative">

              {/* LOGIN */}
              <div
                onMouseEnter={() => handleEnter(setTogglePrimaryDropDown)}
                onMouseLeave={() => handleLeave(setTogglePrimaryDropDown)}
                className="relative"
              >
                <span className="flex items-center gap-1 cursor-pointer">
                  <AccountCircleIcon />
                  {isAuthenticated ? user?.name?.split(" ")[0] : "Login"}
                  {togglePrimaryDropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </span>

                {togglePrimaryDropDown && (
                  <div className="absolute right-0 top-10 z-50">
                    <PrimaryDropDownMenu user={isAuthenticated ? user : null} />
                  </div>
                )}
              </div>

              {/* MORE */}
              <div
                onMouseEnter={() => handleEnter(setToggleSecondaryDropDown)}
                onMouseLeave={() => handleLeave(setToggleSecondaryDropDown)}
                className="relative"
              >
                <span className="flex items-center gap-1 cursor-pointer">
                  More
                  {toggleSecondaryDropDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </span>

                {toggleSecondaryDropDown && (
                  <div className="absolute right-0 top-10 z-50">
                    <SecondaryDropDownMenu />
                  </div>
                )}
              </div>

              {/* CART */}
              <Link to="/cart" className="flex items-center gap-2 relative">
                <ShoppingCartIcon />

                {cartItems.length > 0 && (
                  <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}

                Cart
              </Link>

            </div>
          </div>
        </div>

      </header>

      
      <div className="border-t border-b border-gray-200 bg-white">
        <Categories />
      </div>

      {/* LOCATION POPUP */}
      {showLocationBox && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="font-semibold mb-3">Select Location</h2>

            <button
              onClick={detectLocation}
              className="w-full bg-blue-600 text-white py-2 rounded mb-3"
            >
              Detect My Location
            </button>

            <button
              onClick={() => setShowLocationBox(false)}
              className="w-full bg-gray-200 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;