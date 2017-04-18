import React from 'react'

import { View, Text } from 'react-native'
import { Link } from 'react-router-native'
import { wrap } from 'react-native-style-tachyons'

const Row = props => {
  return (
    <Link to={`/show?url=${props.url}&title=${props.title}`}>
      <View cls='jcc aifs bb'>
        <Text cls='f4 mh2 pv2'>{props.title}</Text>
      </View>
    </Link>
  )
}

export default wrap(Row)
