import React, { FC } from 'react'
import { View, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { Button, Screen, GradientBackground, AutoImage as Image } from '../../components2'
import { color, spacing, typography } from '../../theme'
import { NavigatorParamList } from 'navigation'
import { useEffect } from 'react'

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, 'home'>> = observer(({ navigation }) => {
  const nextScreen = () => navigation.navigate('onboard')
  useEffect(() => {
    navigation.setOptions({ title: 'Zion' })
  }, [])

  return (
    <View style={{ position: 'absolute', backgroundColor: 'black', width: '100vw', height: '100vh' }}>
      <View testID='OnboardScreen' style={FULL}>
        <GradientBackground colors={['#1a242f', '#141d27']} />
        <Screen style={CONTAINER} preset='scroll' backgroundColor={color.transparent}>
          <Image source={logo} style={LOGO} />
          <Button
            testID='next-screen-button'
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text='Subscribe to the waitlist'
            onPress={nextScreen}
          />
          <Button
            testID='next-screen-button'
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text='I have an invite code'
            onPress={nextScreen}
          />
          <Button
            testID='next-screen-button'
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            text='I have a backup code'
            onPress={nextScreen}
          />
        </Screen>
      </View>
    </View>
  )
})

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: 'bold' }

const LOGO: ImageStyle = {
  alignSelf: 'center',
  marginVertical: spacing[5],
  maxWidth: '100%',
  width: 400,
  height: 230,
  resizeMode: 'contain',
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.orange,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const logo = require('./zion-dark-theme.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}
