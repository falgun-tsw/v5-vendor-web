import React, { Suspense } from 'react'
import { V5GlobalLoading } from 'src/FormElements/app/components'

const V5GlobalSuspense = ({ children }) => {
    return <Suspense fallback={<V5GlobalLoading />}>{children}</Suspense>
}

export default V5GlobalSuspense
