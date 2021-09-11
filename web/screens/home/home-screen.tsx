import React, { FC } from 'react'
import { View, ViewStyle, TextStyle, ImageStyle, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { observer } from 'mobx-react-lite'
import { Screen, GradientBackground, AutoImage as Image } from 'components/common'
import { color, spacing, typography } from 'theme'
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
    <View style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
      <GradientBackground colors={[theme.orange, theme.orangeSecondary]} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
        <View
          style={{
            backgroundColor: theme.transparent,
            paddingHorizontal: 30,
            borderRadius: 30,
            marginBottom: 45,
          }}
        >
          <Image source={logo} style={{ width: 140, height: 100 }} resizeMode={'contain'} />
        </View>
        <View style={{ width: 500, justifyContent: 'center', alignItems: 'center' }}>
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
        </View>
      </View>
    </View>
  )
})

const logo = require('./zion-dark-theme.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  imageWrapper: {
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 45,
  },
})
