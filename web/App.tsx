import React, { useState, useEffect } from 'react'
import { AppNavigator, useNavigationPersistence } from 'navigation'
import { RootStore, RootStoreProvider, setupRootStore } from 'stores'
import { webStorage as storage } from 'store/storage'

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
  if (!rootStore) return null //  || !isNavigationStateRestored

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <AppNavigator
      // initialState={initialNavigationState} onStateChange={onNavigationStateChange}
      />
    </RootStoreProvider>
  )
}

export default App
