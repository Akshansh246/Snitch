import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Home from "../features/auth/pages/Home";
import Loading from "../features/auth/pages/Loading";
import Error from "../features/auth/pages/Error";
import CreateProduct from "../features/products/pages/CreateProduct";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<h1>Helloo</h1>,
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
        path:'/seller/create-product',
        element:<CreateProduct/>
    },
    {
        path:'*',
        element:<Error/>
    }
])