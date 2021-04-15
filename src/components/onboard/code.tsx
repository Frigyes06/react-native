import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Linking, Platform, KeyboardAvoidingView } from 'react-native'
import { Title, IconButton, ActivityIndicator } from 'react-native-paper'
import RadialGradient from 'react-native-radial-gradient'
import { decode as atob } from 'base-64'
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { useStores, useTheme } from '../../store'
import { DEFAULT_HOST } from '../../config'
import * as e2e from '../../crypto/e2e'
import * as rsa from '../../crypto/rsa'
import QR from '../common/Accessories/QR'
import PinCodeModal from '../common/Modals/PinCode'
import PIN, { setPinCode } from '../utils/pin'
import { isLN, parseLightningInvoice } from '../utils/ln'

export default function Code(props) {
  const { onDone, z, onRestore } = props
  const { user } = useStores()

  const [scanning, setScanning] = useState(false)
  const [code, setCode] = useState('')
  const [checking, setChecking] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [wrong, setWrong] = useState('')
  const theme = useTheme()

  async function scan(data) {
    setCode(data)
    setScanning(false)
    setTimeout(() => {
      checkInvite(data)
    }, 333)
  }

  // from relay QR code
  async function signupWithIP(s) {
    const a = s.split('::')
    if (a.length === 1) return
    setChecking(true)
    const ip = a[1]
    const pwd = a.length > 2 ? a[2] : ''
    await user.signupWithIP(ip)
    await sleep(200)
    const token = await user.generateToken(pwd)
    if (token) {
      onDone()
    } else {
      setWrong('Cannot reach server...')
    }
    setChecking(false)
  }

  function detectCorrectString(s) {
    setWrong('')
    let correct = true
    if (s.length === 66 && s.match(/[0-9a-fA-F]+/g)) {
      setWrong("This looks like a pubkey, to sign up you'll need an invite code from:")
      correct = false
    }
    if (isLN(s)) {
      const inv = parseLightningInvoice(s)
      if (inv) {
        setWrong("This looks like an invoice, to sign up you'll need an invite code from:")
        correct = false
      }
    }
    setTimeout(() => setWrong(''), 10000)
    return correct
  }

  // sign up from invitation code (or restore)
  async function checkInvite(theCode) {
    if (!theCode || checking) return

    const correct = detectCorrectString(theCode)
    if (!correct) return

    setChecking(true)
    try {
      // atob decodes the code
      const codeString = atob(theCode)
      if (codeString.startsWith('keys::')) {
        setShowPin(true)

        return
      }
      if (codeString.startsWith('ip::')) {
        signupWithIP(codeString)
        return
      }
    } catch (e) {}

    const isCorrect = theCode.length === 40 && theCode.match(/[0-9a-fA-F]+/g)
    if (!isCorrect) {
      setWrong("We don't recognize this code, to sign up you'll need an invite code from:")
      setTimeout(() => setWrong(''), 10000)
      setChecking(false)
      return
    }

    let theIP = user.currentIP
    let thePassword = ''
    if (!theIP) {
      const codeR = await user.signupWithCode(theCode)
      if (!codeR) {
        setChecking(false)
        return
      }
      const { ip, password } = codeR
      theIP = ip
      thePassword = password
    }
    await sleep(200)
    if (theIP) {
      const token = await user.generateToken(thePassword || '')
      if (token) {
        onDone()
      } else {
        setWrong('Cannot reach server...')
      }
    }
    setChecking(false)
  }

  async function pinEntered(pin) {
    const restoreString = atob(code)
    if (restoreString.startsWith('keys::')) {
      const enc = restoreString.substr(6)
      const dec = await e2e.decrypt(enc, pin)
      if (dec) {
        await setPinCode(pin)
        const priv = await user.restore(dec)
        if (priv) {
          rsa.setPrivateKey(priv)
          return onRestore()
        }
      } else {
        // wrong PIN
        setShowPin(false)

        setChecking(false)
      }
    }
  }

  const isIOS = Platform.OS === 'ios'
  const statusBarHeight = isIOS ? ifIphoneX(50, 20) : 0
  const headerHeight = statusBarHeight + 64

  return (
    <View style={{ ...styles.wrap, zIndex: z }} accessibilityLabel='onboard-code'>
      <RadialGradient style={styles.gradient} colors={[theme.gradient, theme.gradient2]} stops={[0.1, 1]} center={[80, 40]} radius={400}>
        <KeyboardAvoidingView style={{ alignItems: 'center' }} behavior='padding' keyboardVerticalOffset={headerHeight}>
          <Title style={styles.welcome}>Welcome</Title>
          <Text style={styles.msg}>Paste the invitation text or scan the QR code</Text>
          <View style={styles.inputWrap} accessibilityLabel='onboard-code-input-wrap'>
            <TextInput
              autoCorrect={false}
              accessibilityLabel='onboard-code-input'
              placeholder='Enter Code ...'
              style={styles.input}
              value={code}
              onChangeText={text => setCode(text)}
              onBlur={() => checkInvite(code)}
              onFocus={() => {
                if (wrong) setWrong('')
              }}
            />
            <IconButton
              accessibilityLabel='onboard-code-qr-button'
              icon='qrcode-scan'
              color={theme.grey}
              size={28}
              style={{ position: 'absolute', right: 12, top: 38 }}
              onPress={() => setScanning(true)}
            />
          </View>
        </KeyboardAvoidingView>

        <View style={styles.spinWrap}>{checking && <ActivityIndicator animating={true} color='white' />}</View>
        {(wrong ? true : false) && (
          <View style={styles.wrong}>
            <Text style={styles.wrongText}>{wrong}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(DEFAULT_HOST)}>
              <Text style={styles.linkText}>{DEFAULT_HOST}</Text>
            </TouchableOpacity>
          </View>
        )}
      </RadialGradient>
      {scanning && <QR visible={scanning} onCancel={() => setScanning(false)} onScan={data => scan(data)} showPaster={false} />}
      <PinCodeModal visible={showPin}>
        <PIN
          forceEnterMode
          onFinish={async pin => {
            await sleep(240)
            pinEntered(pin)
          }}
        />
      </PinCodeModal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 48,
    lineHeight: 48
  },
  msg: {
    color: 'white',
    fontSize: 20,
    marginTop: 15,
    maxWidth: 240,
    lineHeight: 29,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderColor: 'white',
    backgroundColor: 'white',
    height: 70,
    borderRadius: 35,
    marginTop: 30,
    fontSize: 21,
    paddingLeft: 30,
    paddingRight: 65,
    marginBottom: 50
  },
  inputWrap: {
    width: 320,
    maxWidth: '90%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  spinWrap: {
    height: 20
  },
  wrong: {
    position: 'absolute',
    bottom: 32,
    width: '80%',
    left: '10%',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 145
  },
  wrongText: {
    color: 'white',
    margin: 24,
    fontSize: 15,
    textAlign: 'center'
  },
  linkText: {
    color: '#6289FD',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold'
  }
})

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
