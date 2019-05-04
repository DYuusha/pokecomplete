import firebase from 'react-native-firebase';
import {Alert} from 'react-native';

export const AddTeam =(item1, nameTeam,regions) =>{
    firebase.database().ref('Teams/').set({
        name:nameTeam,
        region:regions,
        team:item1
    }).then(()=>{Alert.alert('Team Successfully Entered');}).catch((error)=>{
        console.log(error);
    });
  }