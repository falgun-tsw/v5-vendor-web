import React, { lazy } from 'react'
import ReportsList from './ReportsList';
import ReportDetails from './ReportDetails';

const reportsRoutes = [
    {
        path: '/modules/:moduleId/reports',
        element: <ReportsList />,
    },
    {
        path: '/modules/:moduleId/reports/:reportId',
        element: <ReportDetails />,
    },
]

export default reportsRoutes;
