import React, { useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import { StyleSheet, View, Modal } from 'react-native'
import FastImage from 'react-native-fast-image'
import { IconButton } from 'react-native-paper'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '../../../../store'
import { SCREEN_WIDTH, SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from '../../../../constants'

export default function Photo({ visible, close, photo }) {
  const [photoH, setPhotoH] = useState(0)
  const theme = useTheme()

  const h = SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 60
  const w = SCREEN_WIDTH

  return useObserver(() => (
    <Modal visible={visible} animationType='slide' presentationStyle='fullScreen' onDismiss={close}>
      <View style={{ ...styles.wrap, backgroundColor: theme.black }}>
        <IconButton
          icon={() => <MaterialCommunityIcon name='close' color={theme.icon} size={30} />}
          onPress={close}
          style={{ ...styles.closeButton }}
        />
        <View style={styles.content}>
          <FastImage
            resizeMode='cover'
            source={{ uri: photo }}
            onLoad={(evt) => {
              setPhotoH((evt.nativeEvent.height / evt.nativeEvent.width) * w)
            }}
            style={{
              ...styles.photo,
              width: w,
              height: photoH,
            }}
          />
        </View>
      </View>
    </Modal>
  ))
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + 1,
    right: 0,
    zIndex: 1,
  },
  photo: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  locked: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
