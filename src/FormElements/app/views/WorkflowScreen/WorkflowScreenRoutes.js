import React, { lazy } from 'react'
import WorkflowScreen from './WorkflowScreen';

const workflowScreenRoutes = [
    {
        path: '/workflow-screen/:id',
        element: <WorkflowScreen />,
    },
    {
        path: 'modules/:mid/submodules/:smid/workflow-screen/:id/form/:formId',
        element: <WorkflowScreen />,
    },
]

export default workflowScreenRoutes;
