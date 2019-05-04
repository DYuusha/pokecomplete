import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

class FacebookAuth extends Component{

  handlePress = () => {
    
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('You cancelled the sign in.');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            firebase.auth().signInWithCredential(credential).then(user => {
              this.props.dispatch({
                type: 'SET_USER_INFO',
                payload: {
                  name: user.user._user.displayName,
                  email: user.user._user.email,
                  photo: user.user._user.photoURL,
                  uid: user.user._user.uid,
                }
              });
              this.props.dispatch({
                type: 'SET_AUTH',
                payload: {
                  authorize: true
                }
              });
            }).catch((error) => {
              console.log(error)
            });
          });
        }
      },
      (error) => {
        console.log(error)
      },
    );
  }

  render(){
    return(
      <View>
        <Button 
          title='Iniciar sesion con facebook'
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize
  }
}

export default connect(mapStateToProps)(FacebookAuth);