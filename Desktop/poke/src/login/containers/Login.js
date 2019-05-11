import React, { Component } from 'react';
import {connect} from 'react-redux';
import LoginView from '../components/LoginView';
import GoogleAuth from './GoogleAuth';
import firebase from 'react-native-firebase'
const user = firebase.auth().currentUser;
import SiteLa from '../../nave/SiteLa';
class Login extends Component {
  
  render() {

    if (user) {
          return (<SiteLa/>);
    } else {
      return(
        <LoginView styles={{flex:1}}>
          <GoogleAuth />
        </LoginView>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize
  }
}

export default connect(mapStateToProps)(Login)
