/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Menu from './src/screens/Menu';
import Explicacao from './src/screens/Explicacao';
import Jogo from './src/screens/Jogo';
import Fim from './src/screens/Fim';

const AppNavigator = createStackNavigator({
  Menu: {screen:Menu},
  Explicacao: {screen: Explicacao},
  Jogo: {screen:Jogo},
  Fim: {screen:Fim},
});

export default createAppContainer(AppNavigator);
