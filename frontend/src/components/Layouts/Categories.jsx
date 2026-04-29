import mobiles from '../../assets/images/Categories/mobiles.jpeg';
import fashion from '../../assets/images/Categories/fashion.jpeg';
import electronics from '../../assets/images/Categories/electronics.jpeg';
import home from '../../assets/images/Categories/home.jpeg';
import appliances from '../../assets/images/Categories/appliances.jpeg';
import furniture from '../../assets/images/Categories/furniture.jpeg';
import beauty from '../../assets/images/Categories/beauty.jpeg';
import books from '../../assets/images/Categories/books.jpeg';
import sports from '../../assets/images/Categories/sports.jpeg';
import twoWheelers from '../../assets/images/Categories/2 wheelers.jpeg';
import forYou from '../../assets/images/Categories/for you.jpeg';

import { Link, useLocation } from 'react-router-dom';

const catNav = [
  { name: "For You", icon: forYou },
  { name: "Fashion", icon: fashion },
  { name: "Mobiles", icon: mobiles },
  { name: "Beauty", icon: beauty },
  { name: "Electronics", icon: electronics },
  { name: "Home", icon: home },
  { name: "Appliances", icon: appliances },
  { name: "2 Wheelers", icon: twoWheelers },
  { name: "Sports & Fitness", icon: sports },
  { name: "Books", icon: books },
  { name: "Furniture", icon: furniture }
];

const Categories = () => {

  const location = useLocation();

  return (
    <section className="hidden sm:block bg-white w-full shadow-sm border-b">

      <div className="flex w-full justify-between px-6">

        {catNav.map((item, i) => {

          //  ROUTE FIX
          const linkPath =
            item.name === "For You"
              ? "/"
              : `/products?category=${encodeURIComponent(item.name)}`;

          //  ACTIVE STATE FIX
          const isActive =
            (item.name === "For You" && location.pathname === "/") ||
            (location.pathname === "/products" &&
              location.search?.includes(encodeURIComponent(item.name)));

          return (
            <Link
              to={linkPath}
              key={i}
              className="flex flex-col items-center justify-center flex-1 py-3 relative cursor-pointer hover:bg-gray-50 transition"
            >

              {/* ICON */}
              <img
                draggable="false"
                src={item.icon}
                alt={item.name}
                className="w-[64px] h-[64px] object-contain"
              />

              {/* UNDERLINE */}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded"></span>
              )}

            </Link>
          );
        })}

      </div>
    </section>
  );
};

export default Categories;