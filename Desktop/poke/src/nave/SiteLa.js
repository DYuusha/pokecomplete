import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Regions from '../regions/Regions';
import Logout from '../logout/containers/Logout';
import CreateTeam from '../pokemons/containers/CreateTeam';
import Seestats from '../pokemons/containers/Seestats';
import MyTeams from '../my_teams/containers/MyTeams';
const StackNavigationHome = createStackNavigator(
  {
    Regions: {
      screen: Regions,
    },
    MyTeams: {
      screen: MyTeams,
    },
    CreateTeam: {
      screen: CreateTeam,
    },
 
    Seestats:{
      screen: Seestats
    },
  }
);


const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: StackNavigationHome,
      navigationOptions: {
        title: 'Regions'
      }
    },

    Logout: {
      screen: Logout,
      navigationOptions: {
        title: 'Logout'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#FF0000',
      labelStyle: {
        fontSize: 14,
        fontFamily: 'Lato-Light',
      }
    }
  }
)
export default createAppContainer(AppNavigator);
