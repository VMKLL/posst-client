/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { App } from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Пришло сообщение в бекграунде:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
