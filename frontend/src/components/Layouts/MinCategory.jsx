import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const categories = [
  "For You",
  "Fashion",
  "Mobiles",
  "Beauty",
  "Electronics",
  "Home",
  "Appliances",
  "2 Wheelers",
  "Sports & Fitness",
  "Books",
  "Furniture"
];

const MinCategory = () => {
  return (
    <section className="hidden sm:block bg-white w-full px-6 border-b">

      <div className="flex items-center justify-between">

        {categories.map((el, i) => {

          const linkPath =
            el === "For You"
              ? "/"
              : `/products?category=${encodeURIComponent(el)}`;

          return (
            <Link
              to={linkPath}
              key={i}
              className="text-sm py-2 text-gray-800 font-medium hover:text-blue-600 flex items-center gap-1 group"
            >
              {el}

              <span className="text-gray-400 group-hover:text-blue-600">
                <ExpandMoreIcon sx={{ fontSize: "16px" }} />
              </span>

            </Link>
          );
        })}

      </div>

    </section>
  );
};

export default MinCategory;