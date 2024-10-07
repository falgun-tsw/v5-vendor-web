import React from 'react';
import { authRoles } from '../../auth/authRoles';
import ModuleManagement from './ModuleManagement';

const moduleManagementRoutes = [
    // {
    //     path: '/module-management',
    //     component: React.lazy(() => import('./ModuleManagement')),
    //     auth: authRoles.sa,
    // },
    {
        path: '/module-management/modules/:mid/submodules/:smid/wid/:wid/mappedBy/:mBy',
        element: <ModuleManagement />,
    },
    {
        path: '/module-management/modules/:mid/submodules/:smid/wid/:wid',
        element: <ModuleManagement />,
    },
    {
        path: '/module-management/modules/:mid/wid/:wid',
        element: <ModuleManagement />,
    },
]

export default moduleManagementRoutes;
