import AuthGuard from 'src/FormElements/app/auth/AuthGuard'
import NotFound from 'src/FormElements/app/views/sessions/NotFound'
import dashboardRoutes from 'app/views/Dashboard/DashboardRoutes'
import moduleManagementRoutes from 'src/FormElements/app/views/ModuleManagement/ModuleManagementRoutes';
import sessionRoutes from 'src/FormElements/app/views/sessions/SessionRoutes'
import V5GlobalLayout from '../components/V5GlobalLayout/V5GlobalLayout'
import { history } from 'react-router-dom'
import workflowScreenRoutes from 'src/FormElements/app/views/WorkflowScreen/WorkflowScreenRoutes';
import userProfileRoutes from 'src/FormElements/app/views/UserProfile/UserProfileRoutes';
import reportsRoutes from 'src/FormElements/app/views/Reports/ReportsRoutes';


export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <V5GlobalLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes, ...moduleManagementRoutes, ...workflowScreenRoutes, ...userProfileRoutes, ...reportsRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <history to="dashboard" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
