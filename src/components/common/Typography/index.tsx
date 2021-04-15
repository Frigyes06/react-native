import React from 'react'
import { Text } from 'react-native'

export default function Typography(props) {
  const { children, style, color, size, fw } = props

  return <Text style={{ ...style, color, fontSize: size, fontWeight: fw }}>{children}</Text>
}

Typography.defaultProps = {}
