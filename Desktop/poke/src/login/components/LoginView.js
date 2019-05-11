import React from 'react';
import { View, StyleSheet } from 'react-native';

function LoginView(props) {
  return(
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LoginView;