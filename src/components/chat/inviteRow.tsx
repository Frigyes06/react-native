import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
import Toast from 'react-native-simple-toast'

import { constantCodes } from '../../constants'
import { useStores, useTheme } from '../../store'

export default function InviteRow(props) {
  const theme = useTheme()
  const { contacts, ui, details } = useStores()
  const { name, invite } = props
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const statusString = constantCodes['invite_statuses'][invite.status]

  const expiredStatus = props.invite.status === 5
  const yesterday = moment().utc().add(-24, 'hours')
  const isExpired = moment(invite.created_at || new Date())
    .utc()
    .isBefore(yesterday)
  if (isExpired || expiredStatus) return <></>

  const actions = {
    payment_pending: () => {
      if (!confirmed) setDialogOpen(true)
    },
    ready: () => ui.setShareInviteModal(invite.invite_string),
    delivered: () => ui.setShareInviteModal(invite.invite_string)
  }
  function doAction() {
    if (actions[statusString]) actions[statusString]()
  }
  function setDialogOpenToFalseHandler() {
    setDialogOpen(false)
  }
  async function onConfirmHandler() {
    const balance = details.balance
    if (balance < invite.price) {
      Toast.showWithGravity('Not Enough Balance', Toast.SHORT, Toast.TOP)

      setDialogOpen(false)
    } else {
      setLoading(true)
      await contacts.payInvite(invite.invite_string)
      setConfirmed(true)
      setDialogOpen(false)
      setLoading(false)
    }
  }

  return (
    <TouchableOpacity style={{ ...styles.chatRow, backgroundColor: theme.main }} activeOpacity={0.5} onPress={doAction}>
      <View style={styles.inviteQR}>
        <Image style={{ height: 40, width: 40 }} source={require('../../assets/invite-qr.png')} />
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatContentTop}>
          <Text style={{ ...styles.chatName, color: theme.text }}>{`Invite: ${name}`}</Text>
          {invite.price && <Text style={styles.invitePrice}>{invite.price}</Text>}
        </View>
        <View style={styles.chatMsgWrap}>
          {inviteIcon(statusString, theme)}
          <Text style={{ ...styles.chatMsg, color: theme.subtitle }}>{inviteMsg(statusString, name, confirmed)}</Text>
        </View>
      </View>

      <Portal>
        <Dialog visible={dialogOpen} style={{ bottom: 10 }} onDismiss={setDialogOpenToFalseHandler}>
          <Dialog.Title>{`Pay for invitation?`}</Dialog.Title>
          <Dialog.Actions style={{ justifyContent: 'space-between' }}>
            <Button onPress={setDialogOpenToFalseHandler} labelStyle={{ color: 'grey' }}>
              <MaterialIcon name='cancel' size={14} color={theme.icon} />
              <View style={{ width: 4, height: 6 }}></View>
              <Text>Cancel</Text>
            </Button>
            <Button icon='credit-card' loading={loading} onPress={onConfirmHandler}>
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  )
}

function inviteIcon(statusString, theme) {
  switch (statusString) {
    case 'payment_pending':
      return <MaterialIcon name='credit-card' size={14} color={theme.icon} style={{ marginRight: 4 }} />
    case 'ready':
      return <MaterialIcon name='check' size={14} color={theme.icon} style={{ marginRight: 4 }} />
    case 'delivered':
      return <MaterialIcon name='check' size={14} color={theme.icon} style={{ marginRight: 4 }} />
    default:
      return <></>
  }
}

function inviteMsg(statusString: string, name: string, confirmed?: boolean) {
  switch (statusString) {
    case 'pending':
      return `${name} is on the waitlist`
    case 'payment_pending':
      return confirmed ? 'Awaiting confirmation...' : 'Tap to pay and activate the invite'
    case 'ready':
      return 'Ready! Tap to share. Expires in 24 hours'
    case 'delivered':
      return 'Ready! Tap to share. Expires in 24 hours'
    case 'in_progress':
      return `${name} is signing on`
    case 'expired':
      return 'Expired'
    default:
      return 'Signup complete'
  }
}

export const styles = StyleSheet.create({
  inviteQR: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    marginLeft: 18
  },
  avatarWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    marginRight: 18,
    marginLeft: 10
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  chatRow: {
    height: 80,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  chatContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  chatContentTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    maxHeight: 28
  },
  invitePrice: {
    height: 22,
    color: 'white',
    backgroundColor: '#64c684',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 3,
    fontSize: 12,
    marginRight: 20
  },
  chatName: {
    marginRight: 12,
    marginBottom: 4
  },
  chatDate: {
    marginRight: 12
  },
  chatMsgWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatMsg: {
    fontSize: 13
  }
})
