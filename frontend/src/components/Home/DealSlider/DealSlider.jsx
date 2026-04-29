import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// IMAGES
import campus from '../../../assets/images/Spotlights/campus-flipflops.webp';
import kids from '../../../assets/images/Spotlights/kids-car.webp';
import pedia from '../../../assets/images/Spotlights/pediasure.webp';
import raze from '../../../assets/images/Spotlights/raze-buds.webp';

// SLIDER SETTINGS
export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
  swipe: false,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } }
  ]
};

const DealSlider = ({ title, section, spotlight = false }) => {

  const { sectionProducts, loading } = useSelector((state) => state.products);

  const products = sectionProducts?.[section] || [];
  const isEmpty = !products || products.length === 0;

  const isTopOffers = section === "topOffers";
  const isTopBrands = section === "topBrands";

  const spotlightData = [
    { img: pedia, productId: "69e3d82d1fc9aac07e98f673" },
    { img: campus, productId:"69e5d61c3addbf96b40e3acd" },
    { img: kids, productId: "69e5d8aa3addbf96b40e3acf" },
    { img: raze, productId: "69e5d90d3addbf96b40e3ad1" }
  ];

  // ---------- CUSTOM UI (Top Brands + Top Offers) ----------
  if (isTopBrands || isTopOffers) {
    return (
      <section className="w-full">
        <div className={`p-4 rounded-xl mx-2 ${isTopOffers ? "bg-[#cfe4db]" : "bg-[#dbeafe]"}`}>

          {/* HEADER */}
          <div className="flex justify-between items-center px-4 py-2">
            <h1 className="text-xl font-medium">{title}</h1>
            <Link
              to="/products"
              className="bg-primary-blue text-xs font-medium text-white px-5 py-2 rounded-sm"
            >
              VIEW ALL
            </Link>
          </div>

          {/* CONTENT */}
          {!loading && !isEmpty && (
            <div className="bg-white p-4 rounded-lg flex gap-4 overflow-x-auto">

              {products.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="min-w-[220px]"
                >
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">

                    <img
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      className="w-full h-[150px] object-contain bg-white rounded-md"
                    />

                    <p className="text-sm mt-2 line-clamp-2">
                      {item.name}
                    </p>

                    {isTopOffers && (
                      <p className="font-semibold text-sm">
                        Min. 50% Off
                      </p>
                    )}

                  </div>
                </Link>
              ))}

            </div>
          )}

          {isEmpty && (
            <p className="text-center text-gray-500 py-5">
              No products available
            </p>
          )}

        </div>
      </section>
    );
  }

  // ---------- DEFAULT UI ----------
  return (
    <section className="w-full">

      <div className="flex px-6 py-3 justify-between items-center bg-white">
        <h1 className="text-xl font-medium">{title}</h1>
        <Link
          to="/products"
          className="bg-primary-blue text-xs font-medium text-white px-5 py-2 rounded-sm"
        >
          VIEW ALL
        </Link>
      </div>

      {spotlight ? (
        <div className="bg-gray-100 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {spotlightData.map((item, i) => (
              <Link key={i} to={`/product/${item.productId}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition">
                  <div className="w-full aspect-[3/4] bg-white">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white px-4 py-4">

          {!loading && !isEmpty && (
            <Slider {...settings}>
              {products.map((item) => (
                <Product {...item} key={item._id} />
              ))}
            </Slider>
          )}

          {isEmpty && (
            <p className="text-center text-gray-500 py-5">
              No products available
            </p>
          )}

        </div>
      )}

    </section>
  );
};

export default DealSlider;