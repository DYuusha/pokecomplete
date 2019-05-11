import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

function Loading(props) {
  return(
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Loading;