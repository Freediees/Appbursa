import React, { Component } from'react';
import { View, Text } from 'react-native';
import { Root } from 'native-base';
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
import FormKas from "./FormKas";

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

const AppNavigator = createDrawerNavigator({
  Library: {screen: Home},
  Favorites: {screen: Activity},
  Activity: {screen: Activity},
  Setting: {screen: WelcomeScreen},
  Manual: {screen: Manual},
  Inventory: {screen: Inventory}
});
const AppSwitchNavigator = createSwitchNavigator({
  Home: {screen: AppNavigator},
  Login: { screen: Login },
  AddCustomer: {screen: AddCustomer},
  FormKas: {screen: FormKas},
  Struk: {screen: Struk},
  Activity: { screen: Activity },
  Inventory: {screen: AppNavigator},
  Welcome: {screen: WelcomeScreen},
  Manual: { screen: Manual },
  Favorites: {screen: Activity},

});

const AppContainer =  createAppContainer(AppSwitchNavigator);
