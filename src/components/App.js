import React, { Component } from'react';
import { View, Text } from 'react-native';
import store from "../store";
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';


import Home from "./Home";
import Struk from "./Struk";
import Login from './Login';
import WelcomeScreen from './Welcome';
import Activity from "./Activity";
import Manual from "./Manual";
import Inventory from "./Inventory";
import Favorites from "./Favorites";
import AddCustomer from "./AddCustomer";

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppNavigator = createDrawerNavigator({
  Home: {screen: Home},
  Favorites: {screen: Activity},
  Activity: {screen: Activity},
  Setting: {screen: WelcomeScreen},
  Manual: {screen: Manual},
  Inventory: {screen: Inventory}
});
const AppSwitchNavigator = createSwitchNavigator({
  Home: {screen: AppNavigator},
  Login: { screen: Login },
  Struk: {screen: Struk},
  AddCustomer: {screen: AddCustomer},
  Activity: { screen: Activity },
  Inventory: {screen: AppNavigator},
  Welcome: {screen: WelcomeScreen},
  Manual: { screen: Manual },
  Favorites: {screen: Activity},

});

const AppContainer =  createAppContainer(AppSwitchNavigator);
