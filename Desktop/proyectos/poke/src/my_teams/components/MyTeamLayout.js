import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function MyTeamLayout(props){
  return(
    <View style={styles.container}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});

export default MyTeamLayout;