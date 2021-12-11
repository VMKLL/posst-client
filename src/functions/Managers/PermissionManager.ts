import { Platform, Alert } from 'react-native';
import {
    check,
    request,
    openSettings,
    PERMISSIONS,
} from 'react-native-permissions';

export async function checkCameraPermission() {
    try {
        let result = null;
        if (Platform.OS === 'ios') {
            result = await check(PERMISSIONS.IOS.CAMERA);
            return result;
        } else if (Platform.OS === 'android') {
            result = await check(PERMISSIONS.ANDROID.CAMERA);
            return result;
        }
        return result;
    } catch (err) {
        console.log('Check camera permission status:\n', err.message);
    }
}

export async function requestCameraPermission() {
    try {
        let result = null;
        if (Platform.OS === 'ios') {
            result = await request(PERMISSIONS.IOS.CAMERA);
            return result;
        } else if (Platform.OS === 'android') {
            result = await request(PERMISSIONS.ANDROID.CAMERA);
            return result;
        }
        return result;
    } catch (err) {
        console.log('Check camera permission status:\n', err.message);
    }
}

export const showCameraPermissionAlert = () =>
    Alert.alert(
        'Разрешите доступ к камере',
        'Чтобы Вы могли отправлять репорты, пожалуйста, разрешите доступ к камере для Evac в настройках устройства.',
        [
            {
                text: 'Не сейчас',
                style: 'cancel',
            },
            {
                text: 'Настройки',
                onPress: () => {
                    openSettings();
                },
            },
        ],
        { cancelable: false },
    );

export const showLocationPermissionAlert = (type: string) =>
    Alert.alert(
        'Разрешите доступ к геоданным',
        type === 'camera'
            ? 'Чтобы Вы могли отправлять репорты, пожалуйста, разрешите доступ к геопозиции для Evac в настройках устройства.'
            : type === 'map'
            ? 'Чтобы Вы могли просматривать репорты на карте, пожалуйста, разрешите доступ к геопозиции для Evac в настройках устройства.'
            : '',
        [
            {
                text: 'Не сейчас',
                style: 'cancel',
            },
            {
                text: 'Настройки',
                onPress: () => {
                    openSettings();
                },
            },
        ],
        { cancelable: false },
    );
