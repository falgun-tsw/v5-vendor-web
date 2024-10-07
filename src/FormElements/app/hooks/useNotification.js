import { useContext } from 'react'
import NotificationContext from 'src/FormElements/app/contexts/NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
