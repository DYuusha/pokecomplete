import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function PokemonInfo(props){
  return(
    <View style={styles.container}>
      <Image
            style={styles.img}
            source={{uri: 'http://pokestadium.com/sprites/xy/'+props.pokemon.species.name+'.gif'}}
            />
      <View style={styles.containerInfo}>
        <Text style={styles.title}>
          Name: 
        </Text>
        <Text style={styles.value}>
          {props.pokemon.species.name}
        </Text>
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>
          Number #: 
        </Text>
        <Text style={styles.value}>
          {props.pokemon.id}
        </Text>
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.title}>
          Main Type: 
        </Text>
        <Text style={styles.value}>
        {props.pokemon.types[0].type.name}
        </Text> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    width:300,
    height: 105,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular'
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Lato-Light',
    paddingLeft: 10,
  },container: {
    flex: 1,
    marginVertical: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PokemonInfo;