import React, { useState, useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { signIn } from './functions/auth/signIn';
import { dispatchMessage } from './functions/dispatchMessage';
import * as RootNavigation from './functions/Managers/RootNavigation';
import { updateToken } from './functions/auth/updateToken';
import { checkNotification } from '../src/functions/Managers/NotificationManager';
import { dispatchNotificationStatus } from './functions/dispatchNotificationStatus';
import { updateStatus } from './functions/auth/updateStatus';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScrn } from './screens/SplashScrn/';
import { AuthScrn } from './screens/AuthScrn';
import { HomeScrn } from './screens/HomeScrn';
import { SettingsScrn } from './screens/SettingsScrn';
import { CameraScrn } from './screens/CameraScrn';

const Stack = createStackNavigator();

export const ScrnsStack = () => {
    const { isAnonymous, isLoading, token, notification } = useSelector(
        (state: RootStateOrAny) => state,
    );
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    console.log('STATE: ', notification);
    const initialState = useSelector((state: RootStateOrAny) => state);
    console.log('STATE: ', initialState);

    useEffect(() => {
        signIn();
    }, []);

    useEffect(() => {
        messaging().onMessage((message) => {
            dispatchMessage({
                carNumber: message.data.carNumber,
                carRegion: message.data.carRegion,
                imageName: message.data.imageName,
            });
            RootNavigation.navigate('Home', undefined);
            /* console.log('Foreground notification:', message); */
        });
        messaging().onNotificationOpenedApp((message) => {
            dispatchMessage({
                carNumber: message.data.carNumber,
                carRegion: message.data.carRegion,
                imageName: message.data.imageName,
            });
            RootNavigation.navigate('Home', undefined);
            /* console.log('Background notification:', message); */
        });
        /* messaging()
        .getInitialNotification()
        .then((message) => {
            console.log('Quit state notification:', message);
        }); */
    }, []);

    useEffect(() => {
        if (!isAnonymous) {
            messaging()
                .getToken()
                .then((deviceToken: string) => {
                    return updateToken(deviceToken);
                });
        }
    }, [isAnonymous]);

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        };
    }, []);

    useEffect(() => {
        const fetchNotificationPermission = async () => {
            const status = await checkNotification();
            dispatchNotificationStatus(status);
        };
        if (appStateVisible === 'active') {
            fetchNotificationPermission();
        }
    }, [appStateVisible]);

    useEffect(() => {
        let notificationStatus: boolean;
        if (Platform.OS === 'android') {
            if (notification.status === 'denied') {
                notificationStatus = false;
            } else if (notification.status === 'granted') {
                notificationStatus = true;
            } else if (notification.status === 'blocked') {
                notificationStatus = false;
            }
        } else if (Platform.OS === 'ios') {
            if (
                notification.isProvisional === true &&
                notification.status === 'granted'
            ) {
                notificationStatus = false;
            } else if (
                notification.isProvisional === false &&
                notification.status === 'granted'
            ) {
                notificationStatus = true;
            } else if (
                notification.isProvisional === false &&
                notification.status === 'blocked'
            ) {
                notificationStatus = false;
            }
        }
        if (notificationStatus !== undefined) {
            updateStatus(notificationStatus);
        }
    }, [notification.isProvisional, notification.status]);

    const _handleAppStateChange = (nextAppState: any) => {
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    };

    const MainScreens = (
        <>
            <Stack.Screen
                name="Home"
                component={HomeScrn}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                }}
                initialParams={{
                    reportData: null,
                }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScrn}
                options={() => ({
                    headerShown: true,
                    headerStyle: null,
                    title: null,
                    headerLeft: null,
                    //gestureDirection: 'horizontal-inverted',
                })}
            />
            <Stack.Screen
                name="Camera"
                component={CameraScrn}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                    //gestureDirection: 'vertical',
                }}
            />
        </>
    );

    return (
        <Stack.Navigator>
            {isLoading && !token ? (
                <Stack.Screen
                    name="Splash"
                    component={SplashScrn}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                />
            ) : !isLoading && !token ? (
                <Stack.Screen
                    name="Auth"
                    component={AuthScrn}
                    options={{
                        headerShown: false,
                        animationEnabled: false,
                    }}
                />
            ) : (
                MainScreens
            )}
        </Stack.Navigator>
    );
};
