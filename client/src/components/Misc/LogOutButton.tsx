import { Text, View } from 'react-native'

// Components
import Button from './Button'

// Type
import type { NavigationProps } from '../../types/Props/NavigationProps'

// Redux
import { useDispatch } from 'react-redux'

const LogOutButton = (navigation: NavigationProps) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch({ type: 'user/loggedOut' })
    }

    return (
        <View
            style={{
                width: '90%',
                alignItems: 'center',
                marginVertical: 20,
            }}
        >
            <Button
                onClick={() => handleLogout()}
            >
                <Text>Logout</Text>
            </Button>
        </View>
    )
}

export default LogOutButton