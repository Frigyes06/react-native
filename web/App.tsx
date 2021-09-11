import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { AppNavigator, useNavigationPersistence } from 'navigation'
import { RootStore, RootStoreProvider, setupRootStore } from 'stores'
import { Provider as PaperProvider } from 'react-native-paper'
import { webStorage as storage } from 'store/storage'
import { paperTheme } from 'src/theme'
import { useTheme } from 'store'

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE_2'

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  // const {
  //   initialNavigationState,
  //   onNavigationStateChange,
  //   isRestored: isNavigationStateRestored,
  // } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  const theme = useTheme()
  const pTheme = paperTheme(theme)

  if (!rootStore) return null //  || !isNavigationStateRestored

  // otherwise, we're ready to render the app
  return (
    <PaperProvider theme={pTheme}>
      <React.Fragment>
        {Platform.OS === 'web' ? (
          <style type='text/css'>
            {`@font-face {
                font-family: 'MaterialCommunityIcons';
                src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
              }`}
          </style>
        ) : null}
        <RootStoreProvider value={rootStore}>
          <AppNavigator
          // initialState={initialNavigationState} onStateChange={onNavigationStateChange}
          />
        </RootStoreProvider>
      </React.Fragment>
    </PaperProvider>
  )
}

export default App
