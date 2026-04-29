import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';

const MainData = () => {

    const dispatch = useDispatch();

    const { products = [] } = useSelector((state) => state.products);
    const { orders = [] } = useSelector((state) => state.allOrders);
    const { users = [] } = useSelector((state) => state.users);

    let outOfStock = 0;

    products.forEach((item) => {
        if (item?.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    // ✅ SAFE total calculation
    let totalAmount = orders.reduce(
        (total, order) => total + (order?.totalPrice || 0),
        0
    );

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date();

    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
                data: months.map((m, i) =>
                    orders.filter((od) =>
                        new Date(od?.createdAt).getMonth() === i &&
                        new Date(od?.createdAt).getFullYear() === date.getFullYear() - 2
                    ).reduce((total, od) => total + (od?.totalPrice || 0), 0)
                ),
            },
            {
                label: `Sales in ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) =>
                    orders.filter((od) =>
                        new Date(od?.createdAt).getMonth() === i &&
                        new Date(od?.createdAt).getFullYear() === date.getFullYear() - 1
                    ).reduce((total, od) => total + (od?.totalPrice || 0), 0)
                ),
            },
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) =>
                    orders.filter((od) =>
                        new Date(od?.createdAt).getMonth() === i &&
                        new Date(od?.createdAt).getFullYear() === date.getFullYear()
                    ).reduce((total, od) => total + (od?.totalPrice || 0), 0)
                ),
            },
        ],
    };

    const statuses = ['Processing', 'Shipped', 'Delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) =>
                    orders.filter((item) => item?.orderStatus === status).length
                ),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: categories,
        datasets: [
            {
                label: "Products",
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: categories.map((cat) =>
                    products.filter((item) => item?.category === cat).length
                ),
            },
        ],
    };

    return (
        <>
            <MetaData title="Admin Dashboard | Flipkart" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                <div className="flex flex-col bg-purple-600 text-white p-6">
                    <h4>Total Sales Amount</h4>
                    <h2>₹{totalAmount.toLocaleString()}</h2>
                </div>

                <div className="flex flex-col bg-red-500 text-white p-6">
                    <h4>Total Orders</h4>
                    <h2>{orders.length}</h2>
                </div>

                <div className="flex flex-col bg-yellow-500 text-white p-6">
                    <h4>Total Products</h4>
                    <h2>{products.length}</h2>
                </div>

                <div className="flex flex-col bg-green-500 text-white p-6">
                    <h4>Total Users</h4>
                    <h2>{users.length}</h2>
                </div>
            </div>

            <Line data={lineState} />
            <Pie data={pieState} />
            <Bar data={barState} />
            <Doughnut data={doughnutState} />
        </>
    );
};

export default MainData;