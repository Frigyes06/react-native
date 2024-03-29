import React, { useState, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { Portal } from 'react-native-paper'
import { StyleSheet } from 'react-native'
const basex = require('bs58-rn')

import { useStores } from '../../../../store'
import ModalWrap from '../ModalWrap'
import ModalHeader from '../ModalHeader'
import Main from './Main'
import RawInvoice from './RawInvoice'
import QR from '../../Accessories/QR'
import { setTint } from '../../StatusBar'

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const base58 = basex(ALPHABET)

export default function PaymentWrap() {
  const { ui } = useStores()

  function close() {
    ui.clearPayModal()
  }

  return useObserver(() => (
    <ModalWrap onClose={close} visible={ui.showPayModal}>
      {ui.showPayModal && <Payment visible={ui.showPayModal} close={close} />}
    </ModalWrap>
  ))
}

function Payment({ visible, close }) {
  const { ui, user, msg, contacts } = useStores()
  const [main, setMain] = useState(false)
  const [next, setNext] = useState('')
  const [loading, setLoading] = useState(false)
  const [rawInvoice, setRawInvoice] = useState(null)
  const [amtToPay, setAmtToPay] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    if (visible) setMain(true)
    // if(!visible) setTimeout(()=>setMain(false),500)
  }, [visible])

  const chat = ui.chatForPayModal

  const contact_id = chat && chat.contact_ids && chat.contact_ids.find((cid) => cid !== user.myid)

  const contact = contact_id && contacts.contacts.find((c) => c.id === contact_id)

  async function sendPayment(amt, text) {
    if (!amt || loading) return
    setLoading(true)
    await msg.sendPayment({
      contact_id: contact_id || null,
      amt,
      chat_id: (chat && chat.id) || null,
      destination_key: '',
      memo: text,
    })
    setLoading(false)
    ui.clearPayModal()
  }

  async function sendInvoice(amt, text) {
    if (!amt || loading) return
    setLoading(true)
    const inv = await msg.sendInvoice({
      contact_id: contact_id || null,
      amt,
      memo: text,
      chat_id: (chat && chat.id) || null,
    })
    setLoading(false)
    if (chat) ui.clearPayModal() // done (if in a chat)
    return inv
  }

  async function sendContactless(amt, text) {
    if (ui.payMode === 'invoice') {
      if (loading) return
      setLoading(true)
      const inv = await msg.createRawInvoice({ amt, memo: text })
      setRawInvoice({ ...inv, amount: amt })
      setLoading(false)
      setNext(ui.payMode)
    } else if (ui.payMode === 'payment') {
      setNext(ui.payMode)
      setAmtToPay(amt)
    } else if (ui.payMode === 'loopout') {
      setNext(ui.payMode)
      setAmtToPay(amt)
    }
  }
  async function payLoopout(addy) {
    // gen msg?
    setErr('')
    console.log('PAY LOOPOUT')
    if (amtToPay < 250000) {
      return setErr('Minimum 250000 required')
    }
    if (amtToPay > 16777215) {
      return setErr('Amount too big')
    }
    try {
      const decodedAddy = base58.decode(addy)
      if (!decodedAddy) return setErr('Wrong address format')
      if (decodedAddy.length !== 25) return setErr('Wrong address format')
    } catch (e) {
      return setErr('Wrong address format')
    }
    const text = `/loopout ${addy} ${amtToPay}`
    setLoading(true)
    await msg.sendMessage({
      contact_id: null,
      chat_id: chat.id,
      text,
      amount: amtToPay,
      reply_uuid: '',
    })
    setLoading(false)
    close()
  }
  async function payContactless(addy) {
    if (loading) return
    if (ui.payMode === 'loopout') {
      payLoopout(addy)
      return
    }
    setLoading(true)
    await msg.sendPayment({
      contact_id: null,
      chat_id: null,
      destination_key: addy,
      amt: amtToPay,
      memo: '',
    })
    setLoading(false)
    close()
  }

  function clearOut() {
    setTimeout(() => {
      setAmtToPay(null)
      setNext('')
      setRawInvoice(null)
    })
  }
  async function confirmOrContinue(amt, text) {
    if (!chat) {
      sendContactless(amt, text)
      // setTimeout(() => setTint('dark'), 150)
      return
    }
    if (ui.payMode === 'loopout') {
      sendContactless(amt, text)
      // setTimeout(() => setTint('dark'), 150)
      return
    }
    if (ui.payMode === 'payment') await sendPayment(amt, text)
    if (ui.payMode === 'invoice') await sendInvoice(amt, text)
    if (loading) return
    // setTimeout(() => setTint('light'), 150)
    clearOut()
  }

  function handleOnClose() {
    if (!loading) {
      clearOut()
      close()
    }
  }

  const isLoopout = ui.payMode === 'loopout'
  const hasRawInvoice = rawInvoice ? true : false

  return useObserver(() => {
    const label = ui.payMode === 'payment' ? 'Send Payment' : isLoopout ? 'Send Bitcoin' : 'Request Payment'

    return (
      <Portal.Host>
        <ModalHeader title={label} onClose={handleOnClose} />
        {main && (
          <Main
            contactless={!chat ? true : false}
            contact={isLoopout ? null : contact}
            loading={loading}
            confirmOrContinue={confirmOrContinue}
          />
        )}

        {hasRawInvoice && (
          <RawInvoice
            visible={hasRawInvoice}
            onClose={handleOnClose}
            amount={rawInvoice.amount}
            payreq={rawInvoice.invoice}
            paid={rawInvoice.invoice === ui.lastPaidInvoice}
          />
        )}

        <QR
          visible={next === 'payment' || next === 'loopout'}
          onCancel={handleOnClose}
          confirm={payContactless}
          isLoading={loading}
          isLoopout={isLoopout}
          showPaster={true}
        />
      </Portal.Host>
    )
  })
}
