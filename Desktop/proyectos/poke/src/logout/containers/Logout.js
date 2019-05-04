import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase';

class Logout extends Component {
  componentDidMount() {
    signOut = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (error) {
        console.error(error);
      }
    };
    this.props.dispatch({
      type: 'DESTROY_SESSION',
      payload: {}
    })
  }
  render() {
    return(null);
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize
  }
}

export default connect(mapStateToProps)(Logout)
