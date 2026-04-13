import { useDispatch } from "react-redux"
import { login, register } from "../services/auth.api"
import { setLoading, setUser } from "../state/auth.slice"

const useAuth = () => {
    
    const dispatch = useDispatch()

    async function handleRegister({email, contact, password, fullname, isSeller = false}) {
        dispatch(setLoading(true))
        const data = await register({email, contact, password, fullname, isSeller})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }

    async function handleLogin({email, password}) {
        dispatch(setLoading(true))
        const data = await login({email, password})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
    }
    
    return {
        handleRegister,
        handleLogin
    }
}

export default useAuth