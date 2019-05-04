import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Regions from '../regions/Regions';
import Logout from '../logout/containers/Logout';
import CreateTeam from '../pokemons/containers/CreateTeam';

const StackNavigationHome = createStackNavigator(
  {
    Regions: {
      screen: Regions,
    },
    CreateTeam: {
      screen: CreateTeam,
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
        title: 'Cerrar sesión'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#FF0000',
      labelStyle: {
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        fontWeight: '800'
      }
    }
  }
)
export default createAppContainer(AppNavigator);
