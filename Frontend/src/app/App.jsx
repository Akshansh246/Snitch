/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router'
import './App.css'
import { routes } from './app.routes.jsx'
import { useEffect } from 'react';
import useAuth from '../features/auth/hooks/useAuth.js';

const App = () => {

    const {handleGetMe} = useAuth()

    useEffect(()=>{
        handleGetMe()
    },[])


    return (
        <>
        <RouterProvider router={routes}/>
        <ToastContainer 
            position="bottom-left"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            toastStyle={{
                backgroundColor: "#18181B",
                color: "#D4D4D8",
                border: "1px solid #3F3F46",
                borderRadius: "12px",
                padding: "12px 16px"
            }}
        />
        </>
    )
}

export default App
