import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from  'react-native-firebase';
import {OptimizedFlatList} from 'react-native-optimized-flatlist';
import MyTeamLayout from '../components/MyTeamLayout';
import Loading from '../../shared/components/Loading';
import Empty from '../../shared/components/Empty';
import Team from '../components/Team';
import {Modal, Text, TouchableHighlight, View, Alert,Button,StyleSheet, TouchableOpacity,Image} from 'react-native';
const numColumns = 3;
const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
class MyTeams extends Component {
  state = {
    loading: true,
    db: firebase.database(),
    myTeamList: [],
    modalVisible: false,
    urlModal:'',
    pokemon:[],
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  componentWillMount() {
    this.fetchMyTeams();
    this.setState({
      loading: false
    })
  }

  fetchMyTeams() {
    // "On" is disabled due to performance issues
    this.state.db.ref(`users/${this.props.user.uid}/regions/`).on("value", (data) => {
      const responseData = data.toJSON();

      if(responseData){
        const teamList = [];

        Object.keys(responseData).map((key) => {
          let obj = responseData[key]
          obj['id'] = key
          teamList.push(obj)
        });

        this.setState({
          myTeamList: teamList
        });
      }else{
        this.setState({
          myTeamList: []
        })
      }
    })
  }

  keyExtractor = (item) => {
    return(item.id.toString());
  }

  renderEmpty = () => {
    return(<Empty message='Waiting teams' />);
  }

  renderTeam = ({item}) => {
    return(
      <Team 
        {...item}
        onEditTeam={() => {this.editTeam(item)}} 
        onDestroyTeam={() => {this.alertDestroyTeam(item)}}
      />
    )
  }

  editTeam = (item) => {
    this.setModalVisible(true);
     
      this.setState({loading:true});
     // console.log(item);
      
    fetch(item.urlregion)
    .then( response => response.json())
    .then(responseJson =>{
      this.setState({
          loading : false,
          pokemon : responseJson.results, 
    });
  }).catch((error) =>{
    console.error(error);
  });
  };
  

  alertDestroyTeam = (item) => {
    Alert.alert(
      'Delete Team',
      `do you want to delete ${item.region}?`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => this.destroyTeam(item)},
      ],
      { cancelable: false }
    )
  }
  renderItem = ({ item, index}) => {
    //console.log('dv' +item.url);
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity  >
        <View style={styles.item}>
          
              <Image
              style={styles.img}
              source={{uri: 'http://pokestadium.com/sprites/xy/'+item.name+'.gif'}}
              />
          
          
        </View>
        </TouchableOpacity>
    );
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  destroyTeam = (item) => {
    this.state.db.ref(`users/${this.props.user.uid}/regions/${item.id}`).remove();
  }
  
      
  render() {
    if (this.state.loading) {
      return(<Loading />)
    }
    return(
      <MyTeamLayout>
        <OptimizedFlatList 
          data={this.state.myTeamList}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty}
          renderItem={this.renderTeam}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

            <View style={styles.container}>
            <View style={styles.modalContent}>
            <Text>Choose another pokemon</Text>
            <View style={styles.imageContainer}>
            <OptimizedFlatList 
                data={formatData(this.state.pokemon, numColumns)}
                keyExtractor={(item,index)=> index.toString()}
                numColumns={numColumns}
                renderItem={this.renderItem}
              />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableHighlight>
                
                <Button
                 onPress={() => this.setState({ modalVisible: null })}
                title='Cancel'
                />
              </TouchableHighlight>
              <TouchableHighlight
                >
                <Button
                title='Edit Team'
                />
              </TouchableHighlight>
            </View>
             
            </View>
            </View>
        </Modal>
      </MyTeamLayout>
    );
  }
}

function mapStateToProps(state){
  return {
    authorize: state.authorize,
    user: state.user
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'column',
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height:300,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    margin: 10,
  },
  item: {
    backgroundColor: '#73C8A9',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
  img: {
    resizeMode: 'contain',
    width: 90,
    height: 50,
  },
});
export default connect(mapStateToProps)(MyTeams)
