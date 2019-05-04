import React, { Component } from 'react';
import {Alert, View, FlatList ,ImageBackground, Button, StyleSheet,TouchableOpacity,Text} from 'react-native';
import { connect } from 'react-redux';


class Regions extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    regionsList: [],
    loading: true
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  render() {
      
    return (  
      <View style={{width: '100%', height: '100%',justifyContent: 'center'}}>   
          <ImageBackground source={require('../assets/images/background/region.jpg')} style={{width: '100%', height: '100%',justifyContent: 'center'}}>
          
            <View style={{flex:1}}>
            <View style={styles.buttonContainer}>
              <Text 
                style={styles.welcomeText}
              >
                Hello {this.props.user.name}, Select your favorite region
              </Text>
                </View>
                <TouchableOpacity >
                      <View style={styles.buttonContainer}>
                        <Button style={styles.button}
                          title="Teams"
                          color="#FF0000"
                        />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151', title:'Kanto',})}
                    title="Kanto"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=152&limit=251', title:'Johto',})}
                    title="Johto"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=252&limit=386', title:'Hoenn',})}
                    title="Hoenn"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=387&limit=493', title:'Sinnoh',})}
                    title="Sinnoh"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=494&limit=649', title:'Teselia',})}
                    title="Teselia"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=650&limit=721', title:'Kalos',})}
                    title="Kalos"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
                <TouchableOpacity >
                <View style={styles.buttonContainer}>
                  <Button style={styles.button}
                    onPress={() => this.props.navigation.navigate('CreateTeam',{region:'https://pokeapi.co/api/v2/pokemon?offset=722&limit=807', title:'Alola',})}
                    title="Alola"
                    color="#222222"
                  />
                </View>
                </TouchableOpacity>
            </View> 
          </ImageBackground>   
      </View>
      );     
}
}

function mapStateToProps(state){
  return {
    authorize: state.authorize,
    user: state.user,
    baseUrl: state.baseUrl
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  buttonContainer: {
    margin: 12,
  },
  welcomeText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    color:'#FFF'
  }
});
export default connect(mapStateToProps)(Regions)
