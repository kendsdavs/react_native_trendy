import React from 'react'

import { View, Text, ActivityIndicator } from 'react-native'

import Header from '../containers/header'
import Repos from '../containers/repos'
import {connect} from 'react-redux'


const getTrendingRepos = (dispatch) => {
  dispatch({type: 'ISLOADING', payload: true})
  return fetch('https://runkit.io/twilson63/58f64c0ce5dc270012c6eaa6/branches/master')
    .then(res => res.json())
    .then(repos =>
      dispatch({type: 'SET_REPOS', payload: repos}),
      dispatch({type: 'ISLOADING', payload: false})
  )
}

class List extends React.Component {
  componentDidMount () {
    // get the top showHN
    // dispatch to redux
    this.props.dispatch(getTrendingRepos)
  }
  render () {
    if (this.props.loading) {
      return (
        <View cls="flx-i">
          <ActivityIndicator
            animating
            style={[ styles.centering, { height: 80 }]}
            size='large' />
        </View>
      )
    }
    return (
      <View>
        <Header />
        <Repos dataSource={this.props.dataSource} />
      </View>
    )
  }
}

const connector = connect(state => state)

export default connector(List)
