import React, { useState, useEffect } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Platform,
    TouchableOpacity,
    Button,
} from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { store } from '../../reducer/AuthReducer';
import { noAction } from '../../functions/noAction';
import {
    checkNotification,
    requestNotification,
} from '../../functions/Managers/NotificationManager';
import { dispatchNotificationStatus } from '../../functions/dispatchNotificationStatus';
import { ArrowBackNavigation } from '../../components/IconButton';
import { openSettings } from 'react-native-permissions';
import { clearError } from '../../functions/auth/clearError';
import { signOut } from '../../functions/auth/signOut';
import { deleteAndSignOut } from '../../functions/auth/deleteAndSignOut';
import { Settings } from '../../screens/SettingsScrn/ui/Settings';
import { Popup } from '../../components/Popup';
import { AuthContainer } from '../../components/AuthContainer';
import { DeleteUser } from '../SettingsScrn/ui/DeleteUser';
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight';
import { getContainerHeight } from '../../functions/getContainerHeight';
import { getDimensions } from '../../functions/getDimensions';

export const SettingsScrn = ({ navigation }) => {
    const {
        isAnonymous,
        userEmail,
        userCarNumber,
        userCarRegion,
        errorMessage,
        notification,
    } = useSelector((state: RootStateOrAny) => state);
    const [isEditBtnPressed, setIsEditBtnPressed] = useState(false);
    const [password, setPassword] = useState('');
    const [switchEnabled, setSwitchEnabled] = useState(false);
    const [switchButton, setSwitchButton] = useState(false);
    const [notificationDescription, setNotificationDescription] = useState(
        'Уведомления выключены! Вы не будете получать оповещения от других пользователей.',
    );
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const { screenHeight } = getDimensions();
    const keyboardHeight = useKeyboardHeight();
    const containerHeight = getContainerHeight(screenHeight, keyboardHeight);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            if (
                notification.isProvisional === true &&
                notification.status === 'granted'
            ) {
                setSwitchEnabled(false);
                setNotificationDescription(
                    'Уведомления выключены! Вы не будете получать оповещения от других пользователей.',
                );
                setTimeout(() => {
                    showNotificationPermissionAlert();
                }, 600);
            } else if (
                notification.isProvisional === false &&
                notification.status === 'granted'
            ) {
                setSwitchEnabled(true);
                setNotificationDescription(
                    'Вы будете получать оповещения от других пользователей.',
                );
            } else if (
                notification.isProvisional === false &&
                notification.status === 'blocked'
            ) {
                setSwitchEnabled(false);
                setNotificationDescription(
                    'Уведомления выключены! Вы не будете получать оповещения от других пользователей.',
                );
            }
        } else if (Platform.OS === 'android') {
            if (notification.status === 'denied') {
                setSwitchEnabled(false);
                setNotificationDescription(
                    'Уведомления выключены! Вы не будете получать оповещения от других пользователей.',
                );
                setTimeout(() => {
                    showNotificationPermissionAlert();
                }, 600);
            } else if (notification.status === 'granted') {
                setSwitchEnabled(true);
                setNotificationDescription(
                    'Вы будете получать оповещения от других пользователей.',
                );
            } else if (notification.status === 'blocked') {
                setSwitchEnabled(false);
                setNotificationDescription(
                    'Уведомления выключены! Вы не будете получать оповещения от других пользователей.',
                );
            }
        }
    }, [
        isAnonymous,
        navigation,
        notification.isProvisional,
        notification.status,
    ]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.leftNavContainer}
                    onPress={() => {
                        if (!switchButton) {
                            navigation.goBack();
                        } else {
                            noAction();
                        }
                    }}>
                    <ArrowBackNavigation
                        onPress={() => {
                            if (!switchButton) {
                                navigation.goBack();
                            } else {
                                noAction();
                            }
                        }}
                    />
                    <Text style={styles.leftNavText}>Назад</Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={styles.rightNavContainer}
                    onPress={() => {
                        if (!switchButton) {
                            !isEditBtnPressed
                                ? setIsEditBtnPressed(true)
                                : setIsEditBtnPressed(false);
                        } else {
                            noAction();
                        }
                    }}>
                    <Text style={styles.rightNavText}>
                        {!isEditBtnPressed ? 'Изм.' : 'Готово'}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [isEditBtnPressed, navigation, switchButton]);

    useEffect(() => {
        const unsubscribeOnFocus = navigation.addListener('focus', () => {
            clearError();
        });
        return unsubscribeOnFocus;
    }, [navigation]);

    useEffect(() => {
        const unsubscribeOnBlur = navigation.addListener('blur', () => {
            resetState();
        });
        return unsubscribeOnBlur;
    }, [navigation]);

    async function toggleNotificationSwitch() {
        if (Platform.OS === 'ios') {
            if (
                switchEnabled === false &&
                notification.isProvisional === true &&
                notification.status === 'granted'
            ) {
                if (!switchButton) {
                    const status = await requestNotification(false);
                    dispatchNotificationStatus(status);
                } else {
                    noAction();
                }
            } else if (
                switchEnabled === true &&
                notification.isProvisional === false &&
                notification.status === 'granted'
            ) {
                if (!switchButton) {
                    openSettings();
                } else {
                    noAction();
                }
            } else if (
                switchEnabled === false &&
                notification.isProvisional === false &&
                notification.status === 'blocked'
            ) {
                if (!switchButton) {
                    openSettings();
                } else {
                    noAction();
                }
            }
        } else if (Platform.OS === 'android') {
            if (switchEnabled === false && notification.status === 'denied') {
                if (!switchButton) {
                    const status = await checkNotification();
                    dispatchNotificationStatus(status);
                } else {
                    noAction();
                }
            } else if (
                switchEnabled === true &&
                notification.status === 'granted'
            ) {
                if (!switchButton) {
                    openSettings();
                } else {
                    noAction();
                }
            } else if (
                switchEnabled === false &&
                notification.status === 'blocked'
            ) {
                if (!switchButton) {
                    openSettings();
                } else {
                    noAction();
                }
            }
        }
    }
    function showNotificationPermissionAlert() {
        Alert.alert(
            'Разрешите отправку уведомлений',
            'Чтобы Вы могли получать оповещения от других пользователей, пожалуйста, разрешите Evac отправлять Вам уведомления.',
            [
                {
                    text: 'Не сейчас',
                    style: 'cancel',
                },
                {
                    text: 'Запросить',
                    onPress: async () => {
                        const status = await requestNotification(false);
                        dispatchNotificationStatus(status);
                    },
                },
            ],
            { cancelable: false },
        );
    }
    async function resetState() {
        setIsEditBtnPressed(false);
    }
    async function singOutPromise() {
        setSwitchButton(true);
        await signOut();
    }
    function onPressSignOut() {
        !isEditBtnPressed ? singOutPromise() : setIsPopupVisible(true);
    }
    async function onPressDeleteAndSignOut() {
        setSwitchButton(true);
        const isResult = await deleteAndSignOut();
        if (isResult) {
            await auth().currentUser.delete();
            store.dispatch(SIGN_OUT);
        } else {
            setSwitchButton(false);
        }
    }
    function onPopupClose() {
        if (!switchButton) {
            clearError();
            setPassword('');
            setIsPopupVisible(false);
        } else {
            noAction();
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.settingsContainer}>
                    <Button title='PUSH ME' onPress={() => {
                        console.log('currentUser:', auth().currentUser);
                    }} />
                    <Settings
                        {...{
                            userCarNumber,
                            userCarRegion,
                            userEmail,
                            toggleNotificationSwitch,
                            switchEnabled,
                            notification,
                            notificationDescription,
                            onPressSignOut,
                            isEditBtnPressed,
                            switchButton,
                        }}
                    />
                </View>
            </ScrollView>
            <Popup {...{ isPopupVisible, onPopupClose }}>
                <AuthContainer
                    {...{ errorMessage, containerHeight, onPopupClose }}>
                    <DeleteUser
                        {...{
                            onPressDeleteAndSignOut,
                            switchButton,
                        }}
                    />
                </AuthContainer>
            </Popup>
        </View>
    );
};

const SIGN_OUT = {
    type: 'SIGN_OUT',
    payload: undefined,
};

const blue = 'rgb(33, 135, 251)';
const red = 'rgb(245, 62, 80)';

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    settingsContainer: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    leftNavContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 5,
    },
    leftNavText: {
        color: blue,
        fontSize: 19,
        fontWeight: '400',
    },
    rightNavContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
    },
    rightNavText: {
        color: red,
        fontSize: 19,
        fontWeight: '400',
    },
});
