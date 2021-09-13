import React from 'react'
import { getFocusedRouteNameFromRoute, NavigationProp, RouteProp } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Code, Home } from 'components/onboard'
// import { LoginScreen } from 'views/auth'
// import { Changelog } from 'views/comms'
// import { ChangeLanguage } from 'views/comms'
// import { stackOptions } from './onboarding-navigator'

type PrimaryParamList = {
  Home: undefined
  Code: undefined
  Login: undefined
  changelog: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

interface StackProps {
  route: RouteProp<any, any>
  navigation: NavigationProp<any>
}

export function AuthNavigator({ route }: StackProps) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login'
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: routeName === 'changelog',
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Code' component={Code} />
      {/* <Stack.Screen name='changelog' component={Changelog} options={stackOptions} /> */}
      {/* <Stack.Screen name='changeLanguage' component={ChangeLanguage} options={stackOptions} /> */}
    </Stack.Navigator>
  )
}
