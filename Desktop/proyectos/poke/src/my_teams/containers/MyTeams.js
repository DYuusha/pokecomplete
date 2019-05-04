import React, { Component } from 'react';
import { FlatList, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from  'react-native-firebase';

import MyTeamLayout from '../components/MyTeamLayout';
import Loading from '../../shared/components/Loading';
import Empty from '../../shared/components/Empty';
import Team from '../components/Team';

class MyTeams extends Component {
  state = {
    loading: true,
    db: firebase.database(),
    myTeamList: []
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
    this.state.db.ref(`pokedexes/${this.props.user.uid}`).on("value", (data) => {
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
    return(<Empty message='No se encontro ningún equipo' />);
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
    const navigationAction = NavigationActions.navigate({
      routeName: 'EditTeam',
      params: {
        item: item,
        regionName: item.regionName
      }
    })
    this.props.navigation.dispatch(navigationAction)
  }

  alertDestroyTeam = (item) => {
    Alert.alert(
      'Eliminar equipo',
      `¿Esta seguro de eliminar el equipo de la region ${item.regionName}?`,
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Eliminar', onPress: () => this.destroyTeam(item)},
      ],
      { cancelable: false }
    )
  }

  destroyTeam = (item) => {
    this.state.db.ref(`pokedexes/${this.props.user.uid}/${item.id}`).remove();
  }

  render() {
    if (this.state.loading) {
      return(<Loading />)
    }
    return(
      <MyTeamLayout>
        <FlatList 
          data={this.state.myTeamList}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.renderEmpty}
          renderItem={this.renderTeam}
        />
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

export default connect(mapStateToProps)(MyTeams)
