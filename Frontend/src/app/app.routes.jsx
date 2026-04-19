import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Home from "../features/auth/pages/Home";
import Loading from "../features/auth/pages/Loading";
import Error from "../features/auth/pages/Error";
import CreateProduct from "../features/products/pages/CreateProduct";
import Dashboard from "../features/products/pages/Dashboard";
import SellerInventory from "../features/products/pages/SellerInventory";
import Drafts from "../features/products/pages/Drafts";
import Protected from "../features/auth/components/Protected";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Protected><h1>Helloo</h1></Protected>,
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/seller',
        children:[
            {
                path:'/seller/create-product',
                element: <Protected role="seller"><CreateProduct/></Protected>
            },
            {
                path:'/seller/dashboard',
                element: <Protected role="seller"><Dashboard/></Protected>
            },
            {
                path:'/seller/all-products',
                element: <Protected role="seller"><SellerInventory/></Protected>
            },
            {
                path: '/seller/drafts',
                element: <Protected role="seller"><Drafts/></Protected>
            }
        ]
    },
    {
        path:'*',
        element:<Error/>
    }
])