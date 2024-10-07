import React from 'react'
import { V5GlobalLayouts } from './index'
import { V5GlobalSuspense } from 'src/FormElements/app/components'
import useSettings from 'src/FormElements/app/hooks/useSettings'

const V5GlobalLayout = (props) => {
    const { settings } = useSettings()
    const Layout = V5GlobalLayouts[settings.activeLayout]

    return (
        <V5GlobalSuspense>
            <Layout {...props} />
        </V5GlobalSuspense>
    )
}

export default V5GlobalLayout
