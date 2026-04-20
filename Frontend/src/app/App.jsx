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
        <ToastContainer />
        </>
    )
}

export default App
