import React, { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { RootStore, RootStoreProvider, setupRootStore } from 'stores'
import { Provider as PaperProvider } from 'react-native-paper'
import { paperTheme } from '../src/theme'
import { useTheme } from 'store'
import { RootComponent } from 'components/root-component'

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  // Kick off initial async loading actions like setting up rootStore.
  // Any init actions requiring the store, we do instead in RootComponent.
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  const theme = useTheme()
  const pTheme = paperTheme(theme)

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore) return null //  || !isNavigationStateRestored

  // otherwise, we're ready to render the app
  // paper icon shaz is from: https://callstack.github.io/react-native-paper/using-on-the-web.html
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
          <RootComponent />
        </RootStoreProvider>
      </React.Fragment>
    </PaperProvider>
  )
}

export default App
