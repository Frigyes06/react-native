import React, { FC } from 'react'
import { View, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { Screen, GradientBackground, AutoImage as Image } from '../../components2'
import { color, spacing, typography } from '../../theme'
import { NavigatorParamList } from 'navigation'
import { useEffect } from 'react'
import Button from 'components/common/Button'
import Typography from 'components/common/Typography'
import theme from '../../../web/theme'

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, 'home'>> = observer(({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: 'Zion' })
  }, [])

  return (
    <View style={{ position: 'absolute', backgroundColor: 'black', width: '100vw', height: '100vh' }}>
      <View testID='OnboardScreen' style={FULL}>
        <GradientBackground colors={[theme.orange, theme.orangeSecondary]} />
        <Screen style={CONTAINER} preset='scroll' backgroundColor={color.transparent}>
          <Image source={logo} style={LOGO} />
          <Button
            color={theme.orangeSecondary}
            w='70%'
            size='large'
            style={{
              borderWidth: 2,
              borderColor: theme.white,
            }}
            onPress={() => navigation.navigate('Invite' as never)}
          >
            <Typography color={theme.white} fw='700'>
              Subscribe to the waitlist
            </Typography>
          </Button>
          <Button
            fw='500'
            color={theme.lightGrey}
            w='70%'
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate('Onboard' as never, { codeType: 'invite' } as never)}
          >
            I have an invite code
          </Button>
          <Button
            fw='500'
            color={theme.lightGrey}
            w='70%'
            style={{ marginTop: 15 }}
            onPress={() => navigation.navigate('Onboard' as never, { codeType: 'backup' } as never)}
          >
            I have a backup code
          </Button>
          {/* <Button
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
          /> */}
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
