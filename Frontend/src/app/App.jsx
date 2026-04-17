import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router'
import './App.css'
import { routes } from './app.routes.jsx'

const App = () => {
    return (
        <>
        <RouterProvider router={routes}/>
        <ToastContainer />
        </>
    )
}

export default App
