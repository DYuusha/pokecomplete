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
    height: 48,
    resizeMode: 'contain',
    // marginVertical: 10,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    backgroundColor: '#000',
    marginVertical: 5,
  },
  container: {
    paddingVertical: 5,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Region;