import React from 'react'
import useAuth from 'src/FormElements/app/hooks/useAuth'
import { Redirect } from 'react-router-dom'

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth()

    return <>{isAuthenticated ? children : <Redirect to="/session/signin" />}</>
}

export default AuthGuard
