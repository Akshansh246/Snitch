import { useDispatch } from "react-redux"
import { getMe, login, register } from "../services/auth.api"
import { setLoading, setUser } from "../state/auth.slice"

const useAuth = () => {
    
    const dispatch = useDispatch()

    async function handleRegister({email, contact, password, fullname, isSeller = false}) {
        dispatch(setLoading(true))
        const data = await register({email, contact, password, fullname, isSeller})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
    }

    async function handleLogin({email, password}) {
        dispatch(setLoading(true))
        const data = await login({email, password})
        dispatch(setUser(data.user))
        dispatch(setLoading(false))
        return data.user
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
    
    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }
}

export default useAuth