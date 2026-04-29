import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex items-center bg-white border-2 border-blue-500 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-200 transition"
        >

            {/* SEARCH ICON */}
            <SearchIcon className="text-gray-500 mr-3" />

            {/* INPUT FIELD */}
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search for Products, Brands and More"
                className="flex-1 outline-none text-sm bg-transparent"
            />

        </form>
    );
};

export default Searchbar;