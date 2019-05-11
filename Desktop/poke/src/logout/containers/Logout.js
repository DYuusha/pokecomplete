import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
const user = firebase.auth().currentUser;
class Logout extends Component {
  async componentDidMount() {
   
      try {
        if(user){
        await firebase.auth().signOut(); //disconnect firebase
        await GoogleSignin.revokeAccess(); //disconnect google
        await GoogleSignin.signOut();
        this.props.dispatch({
          type: 'DESTROY_SESSION',
          payload: {}
        })
        }
        else{
          this.props.dispatch({
            type: 'DESTROY_SESSION',
            payload: {}
          })
        }
      } catch (error) {
        console.error(error);
      }
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
