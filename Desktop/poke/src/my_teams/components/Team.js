import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';

function Team(props){
 // console.log(props);
  renderTeamItem = ({item}) => (
    
    <TouchableOpacity onPress={props.onEditTeam}>
      <View style={styles.item}>
        <Image
        style={styles.imgModal}
        source={{uri: 'http://pokestadium.com/sprites/xy/'+item+'.gif'}}
        />
      </View>
    </TouchableOpacity>
  );
  return(
    <View style={styles.main}>
    <View style={styles.imageContainer}>
      <OptimizedFlatList 
          data={props.team}
          keyExtractor={(item,index)=> index.toString()}
          renderItem={this.renderTeamItem}
        />
      </View>
    <View style={styles.container}>
      
      <View style={styles.center}>
        <Text style={styles.title}>Region:</Text>
        <Text style={styles.value}>{props.region}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Team:</Text>
        <Text style={styles.value}>{props.name}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Code:</Text>
        <Text style={styles.value}>{props.id}</Text>
      </View>
      <View style={styles.center}>
        
        
        <TouchableOpacity
          onPress={props.onDestroyTeam}
        >
          <Text style={styles.red}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    flexDirection:'row',
    flex:1
  },
  imageContainer:{
    marginVertical: 5,
  },
  container: {
    flexDirection: 'row',
    flex:1,
    marginVertical: 5,
    borderWidth: 3,
    borderColor: '#f9f9f9',
  },
  imgModal: {
    resizeMode: 'contain',
    width: 60,
    height: 30,
    
  },
  item: {
    
    backgroundColor: '#73C8A9',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    flexDirection:'column',
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