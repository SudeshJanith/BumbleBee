import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from './components/AdminDashboard';
import GuestLayout from './components/GuestLayout';
import Login from './components/Login';
import Register from './components/Register';
import Products from "./components/Products";
import Profile from "./components/Profile";
import Customers from "./components/Customers";
import CustomerDashboard from "./components/CustomerDashboard";
import CustomerProfile from "./components/CustomerProfile";
import ProductAdd from "./components/ProductAdd";
import ProductUpdate from "./components/ProductUpdate";

const router = createBrowserRouter([

    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
    },
    {
        path: '/customer/dashboard',
        element: <CustomerDashboard />
    },
    {
        path: '/admin/products',
        element: <Products />,
    },
    {
        path: '/admin/products/add',
        element: <ProductAdd />,
    },
    {
        path: '/admin/products/update/:id',
        element: <ProductUpdate />,
    },

    {
        path: '/admin/customers',
        element: <Customers />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/customer/profile',
        element: <CustomerProfile />,
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Register />
            },
        ]
    }
])

export default router