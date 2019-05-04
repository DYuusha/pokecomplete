import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

class GoogleAuth extends Component{ 
  handlePress = () => {
    GoogleSignin.configure({
      webClientId: '963976667270-lu42e6gn93i70dnvmqmbr000j1m1pul1.apps.googleusercontent.com',   
      offlineAccess: false,
    });
    GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })

    GoogleSignin.signIn().then(data => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

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
      }).catch(error =>{
        console.log(error)
      }).done();
    }).catch(error => {
      console.log(error)
    });
  }

  render(){
    return(
      <View style={styles.container}>
         <ImageBackground source={require('../../assets/images/background/login.jpg')} style={{width: '100%', height: '100%',alignItems: 'center',justifyContent: 'center'}}>
         <GoogleSigninButton
          style={{ width:250, height:70}}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.handlePress}
        />
        </ImageBackground>
      </View>
    )
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'row',
  },
});
export default connect(mapStateToProps)(GoogleAuth);