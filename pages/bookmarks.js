import React from 'react'
import {View, ListView, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {wrap} from 'react-native-style-tachyons'
import {Octicons} from '@expo/vector-icons'
import {Constants} from 'expo'
import {pluck} from 'ramda'
import {Link} from 'react-router-native'
import Row from '../components/row'

const getBookmarks = (dispatch, getState) => {
  const {db} = getState()
  return db.allDocs({include_docs: true})
    .then(res => dispatch({type: 'SET_BOOKMARKS', payload: pluck('doc', res.rows)}))
}

class Bookmarks extends React.Component {
  componentDidMount () {
    // this.props.db.allDocs({include_docs: true})
    //   .then(res => console.log(res))
    this.props.dispatch(getBookmarks)
  }
  render() {
    return (
      <View>
        <View cls='flx-row h3 bg-lightgray jcsb aic' style={{ paddingTop: Constants.statusBarHeight }}>
          <TouchableOpacity>
            <Octicons name='mark-github' cls='f3 ml2' />
          </TouchableOpacity>
          <Link to="/bookmarks">
            <Octicons name='bookmark' cls='f3 mr2' />
          </Link>
        </View>
        <ListView
          enableEmptySections
          dataSource={this.props.bookmarks}
          renderRow={({_id, ...doc}) => {
            return (
              <Row key={_id} {...doc} />
            )
          }}
        />
        </View>
    )
  }
}

const connector = connect(state => state)

export default connector(wrap(Bookmarks))
