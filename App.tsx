import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/functions/Managers/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/reducer/AuthReducer';
import { ScrnsStack } from './src/ScrnsStack';

export const App = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Provider store={store}>
                <ScrnsStack />
            </Provider>
        </NavigationContainer>
    );
};
