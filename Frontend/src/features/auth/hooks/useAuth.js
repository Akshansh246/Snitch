import { useDispatch } from "react-redux"
import { getMe, login, logout, register, updateProfile } from "../services/auth.api"
import { setLoading, setUser } from "../state/auth.slice"
import { toast } from "react-toastify"

const useAuth = () => {
    
    const dispatch = useDispatch()

    async function handleRegister({email, contact, password, fullname, isSeller = false}) {
        try {
            dispatch(setLoading(true))
            const data = await register({email, contact, password, fullname, isSeller})
            dispatch(setUser(data.user))
            toast.success(data.message || 'Registration Successfully Completed!')
            return data.user
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Registration failed. Please check your credentials.'
            toast.error(errorMsg)
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true))
            const data = await login({email, password})
            dispatch(setUser(data.user))
            toast.success(`Welcome back, ${data.user?.fullname || 'User'}!`)
            return data.user
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Incorrect Email or Password.'
            toast.error(errorMsg)
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(err){
            console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleUpdateProfile(profileData) {
        try {
            dispatch(setLoading(true))
            const data = await updateProfile(profileData)
            dispatch(setUser(data.user))
            toast.success(data.message || 'Profile updated successfully!')
            return data.user
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to update profile.'
            toast.error(errorMsg)
            return null
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true))
            const data = await logout()
            dispatch(setUser(null))
            toast.info('Logged out successfully.')
        } catch (err) {
            toast.error('Logout failed.')
        } finally {
            dispatch(setLoading(false))
        }
    }
    
    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleUpdateProfile,
        handleLogout
    }
}

export default useAuth