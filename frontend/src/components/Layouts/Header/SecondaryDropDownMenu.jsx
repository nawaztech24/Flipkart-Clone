import { Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SecondaryDropDownMenu = () => {

    const navs = [
        {
            title: "Become a Seller",
            icon: <BusinessCenterIcon sx={{ fontSize: "18px" }} />,
            redirect: "/seller",
        },
        {
            title: "Notification Settings",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
            redirect: "/notifications",
        },
        {
            title: "24x7 Customer Care",
            icon: <LiveHelpIcon sx={{ fontSize: "18px" }} />,
            redirect: "/support",
        },
        {
            title: "Advertise on Flipkart",
            icon: <TrendingUpIcon sx={{ fontSize: "18px" }} />,
            redirect: "/advertise",
        },
    ];

    return (
        <div className="absolute right-0 top-12 w-[260px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">

            {navs.map((item, i) => {

                const { title, icon, redirect } = item;

                return (
                    <Link
                        key={i}
                        to={redirect}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition border-b last:border-none"
                    >
                        <span className="text-blue-600">
                            {icon}
                        </span>
                        <span className="text-gray-700">
                            {title}
                        </span>
                    </Link>
                );
            })}

        </div>
    );
};

export default SecondaryDropDownMenu;