import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Empty(props){
  return(
    <View style={styles.container}>
      <Text>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: '#f9f9f9',
  }
})

export default Empty;