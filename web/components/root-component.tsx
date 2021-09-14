import React, { useEffect } from 'react'
import { instantiateRelay } from 'api'
import { useStores } from 'stores'
import EE, { RESET_IP, RESET_IP_FINISHED } from './utils/ee'

export const RootComponent = () => {
  const { ui, user } = useStores()

  useEffect(() => {
    ;(async () => {
      const isSignedUp = user.loggedIn()
      console.tron.display({
        name: 'Initializing',
        preview: `Logged in: ${isSignedUp}`,
      })
      if (isSignedUp) {
        instantiateRelay(
          user.currentIP,
          user.authToken,
          function () {
            ui.setConnected(true)
          },
          function () {
            ui.setConnected(false)
          },
          () => resetIP()
        )
      }
    })()
  }, [])

  async function resetIP() {
    EE.emit(RESET_IP)
    const newIP = await user.resetIP()
    instantiateRelay(
      newIP,
      user.authToken,
      function () {
        ui.setConnected(true)
      },
      function () {
        ui.setConnected(false)
      }
    )
    EE.emit(RESET_IP_FINISHED)
  }

  return <></>
}
