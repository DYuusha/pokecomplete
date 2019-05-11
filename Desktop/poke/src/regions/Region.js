import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

function Region(props) {
  
  return(
    <TouchableOpacity
      onPress={props.onPress}
    >
      <ImageBackground
        style={styles.image}
      >
        <View style={styles.container}>
          <Text style={styles.name}>
            {props.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    height: 40,
    resizeMode: 'contain',
    backgroundColor: '#000',
    marginVertical: 5,
  },
  container: {
    paddingVertical: 5,
  },
  name: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});

export default Region;