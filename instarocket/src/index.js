/**
 * @format
 */
/**
 * @format
 */
/*
import {AppRegistry} from 'react-native';
import App from '..';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
*/
import { YellowBox } from 'react-native';
import React from 'react';
import Routes from './routes'

YellowBox.ignoreWarnings([
    'Unrecognized Websocket'
])

export default function App(){
    return <Routes />
}
