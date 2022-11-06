import './src/utils/firebase'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { PisangProvider } from './src/utils'
import Landing from './src/components/Landing'
import Login from './src/components/Login'
import Register from './src/components/Register'
import Home from './src/components/Home'
import PisangList from './src/components/PisangList'
import PisangDetail from './src/components/PisangDetail'

const Stack = createNativeStackNavigator()
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme,
    background: 'transparent'
  },
}
const auth = getAuth()

function App() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setUser(user))
    return unsubscribe
  }, [])

  if (!user) {
    return (
      <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
        <NavigationContainer theme={customTheme}>
          <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView >
    )
  }

  return (
    <PisangProvider>
      <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
        <NavigationContainer theme={customTheme}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PisangList" component={PisangList} options={{
              headerShown: true,
              headerTitle: 'Daftar Pisang',
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#FFC100' }
            }} />
            <Stack.Screen name="PisangDetail" component={PisangDetail} options={{
              headerShown: true,
              headerTitle: 'Daftar Pisang',
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#FFC100' }
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView >
    </PisangProvider>
  )

}

export default App