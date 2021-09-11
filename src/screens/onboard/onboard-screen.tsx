export default {}
// import React, { FC, useEffect, useState } from 'react'
// import { View, ViewStyle, TextStyle, ImageStyle } from 'react-native'
// import { StackScreenProps } from '@react-navigation/stack'
// import CheckCircleIcon from '@material-ui/icons/CheckCircle'
// import SendIcon from '@material-ui/icons/Send'
// import { observer } from 'mobx-react-lite'
// import styled from 'styled-components'
// import {
//   Header,
//   Screen,
//   GradientBackground,
//   AutoImage as Image,
// } from '../../components'
// import { NavigatorParamList } from '../../navigators'
// import { color, spacing } from '../../theme'
// import { useStores } from '../../models'
// import { palette } from '../../theme/palette'
// import { sleep } from '../../utils/sleep'
// import { instantiateRelay } from '../../api'
// import { constants } from '../../utils/constants'

// export const OnboardScreen: FC<
//   StackScreenProps<NavigatorParamList, 'onboard'>
// > = observer(({ navigation }) => {
//   useEffect(() => {
//     navigation.setOptions({ title: 'Zion' })
//   }, [])

//   const { contacts, chats, user } = useStores()
//   const goBack = () => navigation.goBack()
//   const [text, setText] = useState(
//     'aXA6Omh0dHA6Ly9ib3gtNS5hcmNhZGUuY2l0eTozMDAxOjpiNmExNTM2NGE3YjY5OWNiMWE0YjZkYTEzNjcyYjkxYg=='
//   )
//   const [showPin, setShowPin] = useState(false)
//   const [checking, setChecking] = useState(false)
//   const [alias, setAlias] = useState('')
//   const [showAliasInput, setShowAliasInput] = useState(false)

//   useEffect(() => {
//     if (!user.authToken || showAliasInput) return
//     setShowAliasInput(true)
//     instantiateRelay(
//       user.currentIP,
//       user.authToken,
//       () => console.log('placeholder setConnected true'), // uiStore.setConnected(true),
//       () => console.log('placeholder setConnected false') // uiStore.setConnected(false)
//     )
//   }, [user.authToken])

//   async function checkCode() {
//     if (!text || checking) return
//     try {
//       const codeString = atob(text)
//       if (codeString.startsWith('keys::')) {
//         setShowPin(true)
//         return
//       }
//       if (codeString.startsWith('ip::')) {
//         signupWithIP(codeString)
//         return
//       }
//     } catch (e) {}

//     const r = await user.signupWithCode(text)
//     if (!r) {
//       setChecking(false)
//       return
//     }
//     const { ip, password } = r
//     await sleep(200)
//     if (ip) {
//       const token = await user.generateToken(password || '')
//       if (token) setShowAliasInput(true)
//     }
//     setChecking(false)
//   }

//   // from relay QR code
//   async function signupWithIP(s) {
//     const a = s.split('::')
//     if (a.length === 1) return
//     setChecking(true)
//     const ip = a[1]
//     const pwd = a.length > 2 ? a[2] : ''
//     await user.signupWithIP(ip)
//     await sleep(200)
//     const token = await user.generateToken(pwd)
//     if (token) {
//       setShowAliasInput(true)
//     }
//     setChecking(false)
//   }

//   async function aliasEntered(alias) {
//     if (checking || !alias) return
//     setChecking(true)
//     const publicKey = '' // await rsa.genKeys()
//     await contacts.updateContact(user.myid, {
//       alias,
//       contact_key: publicKey, // set my pubkey in relay
//     })
//     user.setAlias(alias)
//     await Promise.all([
//       contacts.addContact({
//         alias: user.invite.inviterNickname,
//         public_key: user.invite.inviterPubkey,
//         status: constants.contact_statuses.confirmed,
//         // route_hint: user.invite.inviterRouteHint,
//       }),
//       // actions(user.invite.action),
//       user.finishInvite(),
//       chats.joinDefaultTribe(),
//     ])
//     setChecking(false)
//     console.log('Done now set signed up...')
//     // await sleep(240)
//     //   setSignedUp(true)
//     //   const isPin = await userPinCode()
//     //   if(isPin) setPinned(true)
//     // props.onRestore()
//   }

//   // async function pinEntered(pin) {
//   //   try {
//   //     const restoreString = atob(text)
//   //     if (restoreString.startsWith('keys::')) {
//   //       const enc = restoreString.substr(6)
//   //       const dec = await aes.decrypt(enc, pin)
//   //       if (dec) {
//   //         await setPinCode(pin)
//   //         const priv = await user.restore(dec)
//   //         if (priv) {
//   //           rsa.setPrivateKey(priv)
//   //           return props.onRestore()
//   //         }
//   //       }
//   //     }
//   //   } catch (e) {}
//   //   // wrong PIN
//   //   setShowPin(false)
//   //   setChecking(false)
//   // }

//   let componentToRender
//   if (showPin) {
//     componentToRender = <></>
//   } else if (!showAliasInput) {
//     componentToRender = (
//       <InputWrap>
//         <Input
//           id={'onboard-enter-code'}
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder='Enter Code...'
//         />
//         <SendIcon
//           id={'onboard-send-button'}
//           onClick={checkCode}
//           style={{
//             color: text ? palette.orange : '#A5A5A5',
//             fontSize: 24,
//             position: 'absolute',
//             right: 16,
//             top: 20,
//             cursor: 'pointer',
//           }}
//         />
//       </InputWrap>
//     )
//   } else {
//     componentToRender = (
//       <InputWrap>
//         <Input
//           value={alias}
//           onChange={(e) => setAlias(e.target.value)}
//           placeholder='Choose a username'
//           style={{ maxWidth: 300 }}
//         />
//         <CheckCircleIcon
//           onClick={() => aliasEntered(alias)}
//           style={{
//             color: alias ? palette.orange : '#A5A5A5',
//             fontSize: 32,
//             position: 'absolute',
//             right: 14,
//             top: 16,
//             cursor: 'pointer',
//           }}
//         />
//       </InputWrap>
//     )
//   }

//   return (
//     <View testID='OnboardScreen' style={FULL}>
//       <GradientBackground colors={['#1a242f', '#141d27']} />
//       <Header
//         leftIcon='back'
//         onLeftPress={goBack}
//         style={HEADER}
//         titleStyle={HEADER_TITLE}
//       />
//       <Screen
//         style={CONTAINER}
//         preset='scroll'
//         backgroundColor={color.transparent}
//       >
//         <Image source={bowserLogo} style={BOWSER} />
//         {componentToRender}
//       </Screen>
//     </View>
//   )
// })

// const BOLD: TextStyle = { fontWeight: 'bold' }

// const BOWSER: ImageStyle = {
//   alignSelf: 'center',
//   marginVertical: spacing[5],
//   maxWidth: '100%',
//   width: 400,
//   height: 230,
//   resizeMode: 'contain',
// }

// const bowserLogo = require('./zion-dark-theme.png')

// const FULL: ViewStyle = { flex: 1 }
// const CONTAINER: ViewStyle = {
//   backgroundColor: color.transparent,
//   paddingHorizontal: spacing[4],
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100%',
// }

// const HEADER: TextStyle = {
//   padding: spacing[8],
// }
// const HEADER_TITLE: TextStyle = {
//   ...BOLD,
//   fontSize: 12,
//   lineHeight: 15,
//   textAlign: 'center',
//   letterSpacing: 1.5,
// }

// export const Msg = styled.div`
//   font-size: 18px;
//   max-width: 200px;
//   text-align: center;
//   color: white;
//   font-family: Arial;
// `
// const InputWrap = styled.div`
//   margin-top: 25px;
//   margin-bottom: 25px;
//   position: relative;
// `
// const Input = styled.input`
//   width: 500px;
//   height: 64px;
//   border: none;
//   outline: none;
//   border-radius: 32px;
//   font-size: 16px;
//   padding-left: 32px;
//   padding-right: 52px;
// `
