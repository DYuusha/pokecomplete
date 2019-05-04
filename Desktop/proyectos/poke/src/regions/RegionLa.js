import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

function RegionLa(props){
  return(
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text 
          style={styles.welcomeText}
        >
          Hello {props.user.name}!
        </Text>
      </View>
      <View>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  }
})
export default RegionLa;