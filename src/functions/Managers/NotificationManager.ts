import { Platform } from 'react-native';
import {
    checkNotifications,
    requestNotifications,
} from 'react-native-permissions';

export async function checkNotification() {
    try {
        if (Platform.OS === 'ios') {
            const notification = await checkNotifications();
            const result = {
                status: notification.status,
                isProvisional: notification.settings.provisional,
            };
            return result;
        } else if (Platform.OS === 'android') {
            const notification = await checkNotifications();
            const result = {
                status: notification.status,
                isProvisional: undefined,
            };
            return result;
        }
    } catch (err) {
        console.log('Check notification permission:\n', err.message);
    }
}

export async function requestNotification(isProvisional: boolean) {
    try {
        if (Platform.OS === 'ios') {
            let result = { status: '', isProvisional: undefined };
            if (isProvisional) {
                const notification = await requestNotifications([
                    'provisional',
                ]);
                result = {
                    status: notification.status,
                    isProvisional: notification.settings.provisional,
                };
            } else {
                const notification = await requestNotifications([
                    'alert',
                    'badge',
                    'sound',
                ]);
                result = {
                    status: notification.status,
                    isProvisional: notification.settings.provisional,
                };
            }
            return result;
        }
    } catch (err) {
        console.log('Request notification permission:\n', err.message);
    }
}
