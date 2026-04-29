import { useEffect } from 'react';

import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error } = useSelector((state) => state.products);

  // ALL SECTIONS (ADD FUTURE HERE ONLY)
  const sections = [
    "suggested",
    "topBrands",
    "topOffers",
    "recommended"
  ];

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    //  DYNAMIC FETCH
    sections.forEach((sec) => {
      dispatch(getSliderProducts(sec));
    });

  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Online Shopping Site..." />

      <main className="flex flex-col gap-3 px-2 mt-2">

        {/* Banner */}
        <Banner />

        {/* Spotlight (static - same) */}
        <DealSlider
          title="Brands in Spotlight"
          spotlight={true}
        />

        {/* DYNAMIC SLIDERS */}

        {sections.includes("suggested") && (
          <ProductSlider
            title="Suggested for You"
            tagline="Based on Your Activity"
            section="suggested"
          />
        )}

        {sections.includes("topBrands") && (
          <DealSlider
            title="Top Brands, Best Price"
            section="topBrands"
          />
        )}

        {sections.includes("recommended") && (
          <ProductSlider
            title="You May Also Like..."
            tagline="Based on Your Interest"
            section="recommended"
          />
        )}

        {sections.includes("topOffers") && (
          <DealSlider
            title="Top Offers On"
            section="topOffers"
          />
        )}

        {sections.includes("suggested") && (
          <ProductSlider
            title="Don't Miss These!"
            tagline="Inspired by your order"
            section="suggested"
          />
        )}

      </main>
    </>
  );
};

export default Home;