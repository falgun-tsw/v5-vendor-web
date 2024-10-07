import React, { useState, useEffect } from 'react'
import { getUserProfilePhoto } from '../../../redux/Dashboard/dashboardService'
import { Avatar } from '@mui/material'

const UserAvatar = ({ user }) => {
    const [profilePic, setProfilePic] = useState('')
    useEffect(() => {
        if (user?.profileid) {
            async function getUserProfilePic() {
                const blobResponse = await getUserProfilePhoto(user.profileid)
                setProfilePic(window.URL.createObjectURL(blobResponse))
            }
            getUserProfilePic()
        }
    }, [user])

    if (user?.profileid) {
        return <Avatar src={profilePic} />
    }
    return (
        user ? <Avatar
            style={{
                backgroundColor: '#FE4B7E',
            }}
        >
            {user.name?.slice(0, 2).toUpperCase()}
        </Avatar> : <></>
    )
}
export default React.memo(UserAvatar)
