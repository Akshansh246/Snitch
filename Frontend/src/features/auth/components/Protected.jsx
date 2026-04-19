
import { useSelector } from 'react-redux'
import Loading from '../pages/Loading'
import { Navigate } from 'react-router'

const Protected = ({children, role = 'buyer'}) => {

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    
    if(loading){
        return <Loading/>
    }

    if(!user){
        return <Navigate to={'/home'}/>
    }

    if(user.role !== role){
        return <Navigate to={'/'}/>
    }

    return children
}

export default Protected
