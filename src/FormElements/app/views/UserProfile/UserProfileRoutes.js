import React from 'react';
import { authRoles } from '../../auth/authRoles';
import UserProfile from './UserProfile';

const userProfileRoutes = [
    {
        path: '/user-profile',
        element: <UserProfile />,
        auth: authRoles.sa,
    }
]

export default userProfileRoutes;
