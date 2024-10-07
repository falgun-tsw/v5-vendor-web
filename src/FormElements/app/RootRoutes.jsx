import React from 'react'
import { Redirect } from 'react-router-dom'

import dashboardRoutes from './views/Dashboard/DashboardRoutes';
import moduleManagementRoutes from './views/ModuleManagement/ModuleManagementRoutes';
import userProfileRoutes from './views/UserProfile/UserProfileRoutes';

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard" />,
    },
    {
        path: '/ModuleManagement',
        exact: true,
        component: () => <Redirect to="/ModuleManagement" />,
    }
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...dashboardRoutes,
    ...moduleManagementRoutes,
    ...redirectRoute,
    ...errorRoute,
    ...userProfileRoutes
]

export default routes
