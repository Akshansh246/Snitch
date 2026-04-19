/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router'
import './App.css'
import { routes } from './app.routes.jsx'
import { useEffect } from 'react';
import useAuth from '../features/auth/hooks/useAuth.js';
import { useSelector } from 'react-redux';

const App = () => {

    const {handleGetMe} = useAuth()
    const user = useSelector(state => state.auth.user)

    useEffect(()=>{
        handleGetMe()
    },[])

    console.log(user)

    return (
        <>
        <RouterProvider router={routes}/>
        <ToastContainer />
        </>
    )
}

export default App
