import React from 'react';
import { FlatList, Text, Alert,View, StyleSheet, 
   ActivityIndicator, Button, TextInput,
   Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const numColumns = 3;
import Modal from 'react-native-modal';
import {AddTeam} from './AddTeam';
let seleccionados =[];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
export default class RegionesApi extends React.Component {
  
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
      page:1,
    };

  }

componentDidMount(){this.getPokemon();}

createTeam=(items,nombre)=>{
  if(items.length<6)
  {
    Alert.alert('Your team must have at least 6 pokemon');
  }
  else if(nombre.length<1){
    Alert.alert('Insert a team name');
  }
  else{
    lista=[];
    items.forEach(function(item, key){
      lista[key]=item.name;
    });
    AddTeam(lista,this.nombre,this.props.navigation.state.params.region);
    lista=[];
    this.setState({ visibleModal: null });
    seleccionados=[];
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
      style={styles.img}
      source={{uri: 'http://pokestadium.com/sprites/xy/'+item.name+'.gif'}}
      />
      <Text style={styles.itemText}>{item.name} </Text>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modalContent}>
        <Text>Crea tu equipo</Text>
          <TextInput
            style={{width:200,height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder="Insert a team name"
          />
        <FlatList
          data ={seleccionados}
          initialNumToRender={12}
          removeClippedSubviews={true}
          maxToRenderPerBatch={12}
          renderItem ={this.renderTeamItem}
          keyExtractor ={(item,index)=> index.toString()}
          numColumns={numColumns}
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
                  onPress={() => this.createTeam(seleccionados,this.state.text)}
                  title="New Team"
                />
              </TouchableOpacity>  
        </View> 
    
    </View>   
  );

  seleccionar=(name) =>{this.setState({selected:true});
  if(seleccionados.length==0 || (seleccionados.length<6 && !seleccionados.includes(name))){
      seleccionados.push(name);
  }
  else if(!seleccionados.includes(name) && seleccionados.length>=6){
    Alert.alert('You can only select a maximum of 6 Pokemon');
  }
  else if(seleccionados.includes(name)){
    seleccionados = seleccionados.filter(item => item!== name);
    this.setState({selected:false});
  }
};

renderItem = ({ item, index }) => {
  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
    
      <View style={styles.item}>
        <TouchableOpacity  onPress={()=>this.seleccionar(item)}>
            <Image
            style={styles.img}
            source={{uri: 'http://pokestadium.com/sprites/xy/'+item.name+'.gif'}}
            />
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.name} </Text>
      </View>
    
  );
};

  render(){
    const itemNumber = seleccionados.length;
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
       
        <FlatList 
            data = {formatData(this.state.pokemon, numColumns)}
            initialNumToRender={6}
            removeClippedSubviews={true}
            maxToRenderPerBatch={6}
            renderItem ={this.renderItem} 
            numColumns={numColumns}
            keyExtractor = {(item, index) => index.toString()}
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



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 0,
      flexDirection: 'column',
    },
    item: {
      backgroundColor: '#73C8A9',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
    },
    itemInvisible: {
      backgroundColor: 'transparent'
    },
    itemText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 18
    },
    img: {
      resizeMode: 'contain',
      width: 100,
      height: 120,
    },
    selected: {backgroundColor: "#FA7B5F"},

    numberBox: {
      position: "absolute",
      bottom: 75,
      width: 50,
      height: 50,
      borderRadius: 15,  
      left: 330,
      zIndex: 3,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"
    },
    number: {fontSize: 16,color: "#fff"},
    modalContent: {
      flex:1,
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    viewModalButtons:{
      width:200,
      height:40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalButtons:{
      marginLeft:50,
      flex:1,
    }
  });

