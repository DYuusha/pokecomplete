import React, { Component } from 'react';
import {connect} from 'react-redux';

import LoginView from '../components/LoginView';
import GoogleAuth from './GoogleAuth';
import FacebookAuth from './FacebookAuth';

class Login extends Component {
  render() {
    return(
      <LoginView styles={{flex:1}}>
        <GoogleAuth />
        <FacebookAuth/>
      </LoginView>
    );
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize
  }
}

export default connect(mapStateToProps)(Login)
