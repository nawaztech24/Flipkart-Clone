import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const { products = [], loading, error, resultPerPage, filteredProductsCount } =
        useSelector((state) => state.products);

    const keyword = params.keyword;

    // CATEGORY FROM URL
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const newCategory = query.get("category") || "";
        setCategory(newCategory);
    }, [location.search]);

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    };

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setRatings(0);
    };

    // FETCH PRODUCTS
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        dispatch(getProducts(keyword, category, price, ratings, currentPage));

    }, [dispatch, keyword, category, price, ratings, currentPage, error, enqueueSnackbar]);

    // IDS LOGIC (SAFE)
    const query = new URLSearchParams(location.search);
    const ids = query.get("ids");

    let selectedProducts = products || [];
    let similarProducts = [];

    if (ids && products && products.length > 0) {
        const idArray = ids.split(",");

        selectedProducts = products.filter(p =>
            idArray.includes(String(p._id))
        );

        const categoriesList = selectedProducts.map(p => p.category);

        similarProducts = products.filter(p =>
            categoriesList.includes(p.category) &&
            !selectedProducts.some(sp => String(sp._id) === String(p._id))
        );
    }

    return (
        <>
            <MetaData title="All Products | Flipkart" />
            <MinCategory />

            <main className="w-full mt-14 sm:mt-0">
                <div className="flex gap-3 mt-2 sm:mx-3 m-auto mb-7">

                    {/* Sidebar */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">
                        <div className="flex flex-col bg-white rounded-sm shadow">

                            <div className="flex items-center justify-between px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span
                                    className="uppercase text-primary-blue text-xs cursor-pointer font-medium"
                                    onClick={clearFilters}
                                >
                                    clear all
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm">

                                {/* PRICE */}
                                <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">PRICE</span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={200000}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2">
                                        <span>₹{price[0]}</span>
                                        <span>to</span>
                                        <span>₹{price[1]}</span>
                                    </div>
                                </div>

                                {/* CATEGORY */}
                                <div className="flex flex-col border-b px-4">
                                    <div
                                        className="flex justify-between cursor-pointer py-2"
                                        onClick={() => setCategoryToggle(!categoryToggle)}
                                    >
                                        <p className="font-medium text-xs uppercase">Category</p>
                                        {categoryToggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </div>

                                    {categoryToggle && (
                                        <RadioGroup
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {categories.map((el, i) => (
                                                <FormControlLabel
                                                    key={i}
                                                    value={el}
                                                    control={<Radio size="small" />}
                                                    label={el}
                                                />
                                            ))}
                                        </RadioGroup>
                                    )}
                                </div>

                                {/* RATINGS */}
                                <div className="flex flex-col border-b px-4">
                                    <div
                                        className="flex justify-between cursor-pointer py-2"
                                        onClick={() => setRatingsToggle(!ratingsToggle)}
                                    >
                                        <p className="font-medium text-xs uppercase">ratings</p>
                                        {ratingsToggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </div>

                                    {ratingsToggle && (
                                        <RadioGroup
                                            value={ratings}
                                            onChange={(e) => setRatings(e.target.value)}
                                        >
                                            {[4, 3, 2, 1].map((el, i) => (
                                                <FormControlLabel
                                                    key={i}
                                                    value={el}
                                                    control={<Radio size="small" />}
                                                    label={`${el}+`}
                                                />
                                            ))}
                                        </RadioGroup>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* PRODUCTS */}
                    <div className="flex-1">

                        {loading ? <Loader /> : (
                            <div className="bg-white p-2">

                                {/* MAIN PRODUCTS */}
                                <div className="grid grid-cols-1 sm:grid-cols-4">
                                    {(ids ? selectedProducts : products)?.map((product) => (
                                        <Product key={product._id} {...product} />
                                    ))}
                                </div>

                                {/* SIMILAR PRODUCTS */}
                                {ids && similarProducts.length > 0 && (
                                    <div className="mt-6">
                                        <h2 className="text-lg font-semibold mb-2">
                                            Similar Products
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-4">
                                            {similarProducts.slice(0, 8).map(p => (
                                                <Product key={p._id} {...p} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PAGINATION */}
                                {!ids && filteredProductsCount > resultPerPage && (
                                    <Pagination
                                        count={Math.ceil(filteredProductsCount / resultPerPage)}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                    />
                                )}

                            </div>
                        )}

                    </div>

                </div>
            </main>
        </>
    );
};

export default Products;