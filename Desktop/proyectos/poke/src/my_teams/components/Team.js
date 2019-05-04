import React from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';

function Team(props){
  const urlImage = `http://localhost:8081/src/assets/images/regions/${props.regionName}.png`
  return(
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: urlImage}} 
          style={styles.image}
        />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Region:</Text>
        <Text style={styles.value}>{props.regionName}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Pokemons:</Text>
        <Text style={styles.value}>{props.team.length}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Codigo:</Text>
        <Text style={styles.value}>{props.id}</Text>
      </View>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={props.onEditTeam}
        >
          <Text style={styles.blue}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onDestroyTeam}
        >
          <Text style={styles.red}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 15,
    borderWidth: 3,
    borderColor: '#f9f9f9',
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center'
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
  value: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Lato-Light',
  },
  center: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  red: {
    color: 'red',
    fontFamily: 'Lato-Light',
    fontSize: 14
  },
  blue: {
    color: 'blue',
    fontFamily: 'Lato-Light',
    fontSize: 14
  }
})
export default Team;