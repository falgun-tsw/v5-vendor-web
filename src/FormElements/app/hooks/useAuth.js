import { useContext } from 'react'
import AuthContext from 'src/FormElements/app/contexts/JWTAuthContext'

const useAuth = () => useContext(AuthContext)

export default useAuth
