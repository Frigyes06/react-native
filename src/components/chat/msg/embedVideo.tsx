import React, { useMemo } from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '../../../store'
import Button from '../../common/Button'
import Typography from '../../common/Typography'

import WebViewVideo from './webViewVideo'
import { getYoutubeVideoID } from './utils'

type EmbedVideoTypes = {
  link: string
  type: 'rumble' | 'youtube'
  onLongPress: () => void
}

const EmbedVideo: React.FC<EmbedVideoTypes> = ({ type, link, onLongPress }) => {
  const embedLink = useMemo(() => {
    if (!link || !type) return ''
    if (type === 'rumble') return `${link.split('?')[0]}?rel=0`
    const youtubeVideoID = getYoutubeVideoID(link)
    if (!youtubeVideoID) return ''
    return `https://www.youtube.com/embed/${youtubeVideoID}`
  }, [link, type])

  return (!!embedLink ?
    <PaidEmbedWrapper>
      <WebViewVideo embedLink={embedLink} onLongPress={onLongPress} />
    </PaidEmbedWrapper> : null)
}

const PaidEmbedWrapper = ({ children }) => {
  const theme = useTheme()
  const isMessageMissingPayment = false // TODO: check if the user already paid the video
  const amountToPay = 50 // TODO: Bring the value of payment
  return (
    <View>
      {children}
      {/* Displays a button do enable user buy this content */}
      {isMessageMissingPayment && 
              <Button
                color={theme.dark ? theme.primary : theme.main}
                round={0}
                onPress={() => console.log("TODO")}
                style={{borderBottomLeftRadius: 25, borderBottomRightRadius: 25}}
                loading={false} // TODO
                icn={() => (
                  <MaterialCommunityIcon
                    name="arrow-top-right"
                    color={theme.dark ? theme.white : theme.icon}
                    direction="ltr"
                    size={18}
                  />
                )}
              >
                <Typography size={12}>{`Pay ${amountToPay} sat`}</Typography>
              </Button>
}
    </View>
  )
}
export default EmbedVideo
