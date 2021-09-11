import React, { useState, useEffect } from 'react'
import { RootStore, setupRootStore } from 'store/mst'

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  return <h1>Zion</h1>
}

export default App
