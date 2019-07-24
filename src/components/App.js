import React, { Component } from'react';
import { View, Text } from 'react-native';
import store from "../store";
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';



import Home from "./Home";
import WelcomeScreen from './Welcome';
import Activity from "./Activity";
import Manual from "./Manual";
import Inventory from "./Inventory";
import Favorites from "./Favorites";



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
  Favorites: {screen: Favorites},
  Activity: {screen: Activity},
  Setting: {screen: WelcomeScreen},
  Manual: {screen: Manual},
  Inventory: {screen: Inventory}
});
const AppSwitchNavigator = createSwitchNavigator({
  Activity: { screen: Activity },
  Home: {screen: AppNavigator},
  Welcome: {screen: WelcomeScreen},
  Manual: { screen: Manual },
  Inventory: {screen: Inventory},
  Favorites: {screen: Favorites},
});

const AppContainer =  createAppContainer(AppSwitchNavigator);
