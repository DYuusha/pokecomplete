import firebase from 'react-native-firebase';
import {Alert} from 'react-native';

export const AddTeam =(numuser,numteam,item1, nameTeam,regions,urlregions) =>{
    firebase.database().ref(`users/${numuser}/regions/${numteam}`).set({
        name:nameTeam,
        team:item1,
        urlregion:urlregions,
        region:regions    }).then(()=>{Alert.alert('Team Successfully Entered');}).catch((error)=>{
        console.log(error);
    });
  }