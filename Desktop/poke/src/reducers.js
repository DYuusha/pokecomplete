const INITIAL_STATE = {
    authorize: false, //is logged?
    baseUrl: 'https://pokeapi.co/api/v2/', 
    user: {} //user data
  };
  
  function data(state=INITIAL_STATE, action) {
    switch (action.type) {
      case 'SET_AUTH': //login
        return {
          ...state,
          ...action.payload
        }
      case 'SET_USER_INFO': //getting data or send it to firebase
        return {
          ...state,
          user: {
            ...action.payload
          }
        }
      case 'DESTROY_SESSION': //logout
        return INITIAL_STATE;
      default:
        return state;
    }
  }
  export default data;
  