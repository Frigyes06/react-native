import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from 'components/Home'

type PrimaryParamList = {
  Home: undefined
}

const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  )
}
