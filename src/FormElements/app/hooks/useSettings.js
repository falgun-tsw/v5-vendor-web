import { useContext } from 'react'
import SettingsContext from 'src/FormElements/app/contexts/SettingsContext'

const useSettings = () => useContext(SettingsContext)

export default useSettings
