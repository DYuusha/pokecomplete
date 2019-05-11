import {StyleSheet} from 'react-native';
export default StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 0,
      
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
      
      fontFamily: 'Lato-Light',
      fontSize: 18
    },
    img: {
      resizeMode: 'contain',
      width: 130,
      height: 70,
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
      height:500,
      backgroundColor: 'white',
      justifyContent: 'space-evenly',
      borderColor: 'rgba(0, 0, 0, 0.1)',
      alignItems: "center"
    },
    viewModalButtons:{
      width:150,
      height:50,
      flexDirection: 'row',
    },
    modalButtons:{
      marginLeft:50,
      flex:1,
      justifyContent: 'space-evenly',
    },
    modalInput:{
      width:300,
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1
    },
    itemTextModal: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 14
    },
    imgModal: {
      resizeMode: 'contain',
      width: 100,
      height: 70,
    },
  });