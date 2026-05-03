import { useParams } from 'react-router-dom';
import Loader from '../Layouts/Loader';

const OrderStatus = () => {

    const { id } = useParams();

   

    if (!id) return <Loader />;

    return (
        <div className="w-full mt-24 flex justify-center items-center">
            <div className="bg-white shadow p-6 rounded text-center">
                <h2 className="text-xl font-semibold mb-2">
                    Order Details Page
                </h2>
                <p className="text-gray-700">
                    Order ID: <span className="font-medium">{id}</span>
                </p>
            </div>
        </div>
    );
};

export default OrderStatus;