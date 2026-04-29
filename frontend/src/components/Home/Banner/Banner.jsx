import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import { Link } from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Images
import aiPlus from '../../../assets/images/Banners/AIplus-summersale.webp';
import asus from '../../../assets/images/Banners/asus-summersale.webp';
import campus from '../../../assets/images/Banners/campus-summersale.webp';
import cetaphil from '../../../assets/images/Banners/cetaphil-summersale.webp';
import coolers from '../../../assets/images/Banners/coolers-summersale.webp';
import gharsoap from '../../../assets/images/Banners/gharsoap-summersale.webp';
import glow from '../../../assets/images/Banners/glow-summersale.webp';
import originos from '../../../assets/images/Banners/originos-summersale.webp';
import samsung from '../../../assets/images/Banners/samsung-summersale.webp';
import vatika from '../../../assets/images/Banners/vatika-summersale.webp';

// Arrows
export const PreviousBtn = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <ArrowBackIosIcon />
  </div>
);

export const NextBtn = ({ className, onClick }) => (
  <div className={className} onClick={onClick}>
    <ArrowForwardIosIcon />
  </div>
);

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1, centerPadding: "30px" }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, centerPadding: "20px" }
      }
    ]
  };

  //  FINAL DATA (WITH IDS)
  const banners = [
    { img: aiPlus, productIds: ["69e11cf65d70cb875a045bad"] },
    { img: asus, productIds: ["69e8a301a88d8c15238d928d"] },
    { img: campus, productIds: ["69e134775d70cb875a045bc1"] },
    { img: cetaphil, productIds: ["69e1305d5d70cb875a045bbf", "69e5de633addbf96b40e3ad3"] },
    { img: coolers, productIds: ["69e3cdc91fc9aac07e98f671", "69dcd3be6314845ed0062b7c"] },
    { img: gharsoap, productIds: ["69e123905d70cb875a045bb0", "69e120ca5d70cb875a045bae"] },
    { img: glow, productIds: ["69e12b475d70cb875a045bb8", "69e12c575d70cb875a045bba", "69e12d845d70cb875a045bbc", "69e12e995d70cb875a045bbe"] },
    { img: originos, productIds: ["69e119905d70cb875a045ba9"] },
    { img: samsung, productIds: ["69e136275d70cb875a045bc3"] },
    { img: vatika, productIds: ["69e1266b5d70cb875a045bb4", "69e125395d70cb875a045bb2"] }
  ];

  //  SMART LINK LOGIC
  const getLink = (banner) => {
    if (banner.productIds.length === 1) {
      return `/product/${banner.productIds[0]}`;
    }
    return `/products?ids=${banner.productIds.join(",")}`;
  };

  return (
    <section className="w-full">
      <Slider {...settings}>
        {banners.map((el, i) => (
          <div key={i}>
            <Link to={getLink(el)}>
              <img
                src={el.img}
                alt={`banner-${i}`}
                draggable="false"
                className="w-full h-[260px] object-cover object-center rounded-lg cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;