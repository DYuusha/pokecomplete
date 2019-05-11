import React from 'react';
import {Text, Alert,View, 
   ActivityIndicator, Button, TextInput,
   Image} from 'react-native';
import { connect } from 'react-redux';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import {TouchableOpacity } from 'react-native-gesture-handler';
const numColumns = 3;
import Modal from 'react-native-modal';
import {AddTeam} from './AddTeam';
let sel =[];
import uuid from 'react-native-uuid';
import styles from './sty.js';

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
class CreateTeam extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    };
  };
  constructor(props){
    super(props);
    this.state = {
      pokemon : [],
      url : this.props.navigation.state.params.region,
      loading : false,
      selected: false,
      visibleModal: null,
      pokedexUrl: '',
    };
    sel=[];
  }
  componentDidMount(){this.getPokemon();}
  createTeam=(items,nombre)=>{
    if(items.length<3)
    {
      Alert.alert('Your team must have at least 3 pokemon');
    }
    else if(nombre.length<1){
      Alert.alert('Insert a team name');
    }
    else{
      lista=[];
      items.forEach(function(item, key){
        lista[key]=item.name;
      });
      let generateUuid = uuid.v1();
      let teamid = generateUuid.split('-')[0];
       AddTeam(this.props.user.uid,teamid,lista,nombre,this.props.navigation.state.params.title,this.props.navigation.state.params.region);
      lista=[];
      this.setState({ visibleModal: null });
      sel=[];
    }
   
  };
  getPokemon = () => {this.setState({loading:true});
  fetch(this.state.url)
  .then( response => response.json())
  .then(responseJson =>{
    this.setState({
        loading : false,
        pokemon : responseJson.results, 
        url : responseJson.next,
        selected: false,
        text: '',
  });
}).catch((error) =>{
  console.error(error);
});
};
  renderTeamItem = ({item}) => (
    <TouchableOpacity>
      <Image
      style={styles.imgModal}
      source={{uri: 'http://pokestadium.com/sprites/xy/'+item.name+'.gif'}}
      />
      <Text style={styles.itemTextModal}>{item.name} </Text>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
        <Text>Crea tu equipo</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Insert a team name"
          />
        <OptimizedFlatList
          data ={sel}
          keyExtractor ={(item,index)=> index.toString()}
          numColumns={numColumns}
          renderItem ={this.renderTeamItem}
        />

      <View style={styles.viewModalButtons}>
              <TouchableOpacity>
                  <Button
                  style={styles.modalButtons}
                  onPress={() => this.setState({ visibleModal: null })}
                  title="Cancel"
                  />
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  onPress={() => this.createTeam(sel,this.state.text)}
                  title="New Team"
                />
              </TouchableOpacity>  
        </View> 
    
    </View>   
  );

  selection=(name) =>{this.setState({selected:true});
  if(sel.length==0 || (sel.length<6 && !sel.includes(name))){
      sel.push(name);
  }
  else if(!sel.includes(name) && sel.length>=6){
    Alert.alert('You can only select a maximum of 6 Pokemon');
  }
  else if(!sel.includes(name) && sel.length<3){
    Alert.alert('You should select minimun 3 pokemons');}
  else if(sel.includes(name)){
    sel = sel.filter(item => item!== name);
    this.setState({selected:false});
  }
};

renderItem = ({ item, index}) => {
  //console.log('dv' +item.url);
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
    <TouchableOpacity  onPress={()=>this.selection(item)} onLongPress={() => this.props.navigation.navigate('Seestats',{pokedata:item})}>
      <View style={styles.item}>
        
            <Image
            style={styles.img}
            source={{uri: 'http://pokestadium.com/sprites/xy/'+item.name+'.gif'}}
            />
        
        <Text style={styles.itemText}>{item.name} </Text>
      </View>
      </TouchableOpacity>
  );
};
  render(){
    const itemNumber = sel.length;
    if(this.state.loading){
      return(
        <View>
        <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    return(
      <View style={styles.container} >
      <TouchableOpacity >
        <Button
        onPress={() => this.setState({ visibleModal: 1 })}
        title="See selected"
        />
      </TouchableOpacity>
        <OptimizedFlatList 
            data = {formatData(this.state.pokemon, numColumns)}
            keyExtractor = {(item, index) => index.toString()}
            numColumns={numColumns}
            renderItem ={this.renderItem} 
        />
        <View style={styles.numberBox}>
        <Text style={styles.number} onPress={() => this.setState({ visibleModal: 1 })} >{itemNumber}</Text>
        </View>

        <Modal isVisible={this.state.visibleModal === 1}>
          {this._renderModalContent()}
        </Modal>
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
export default connect(mapStateToProps)(CreateTeam);
 

