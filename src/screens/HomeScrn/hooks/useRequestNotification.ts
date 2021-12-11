import { useEffect } from 'react';
import { requestNotification } from '../../../functions/Managers/NotificationManager';
import { dispatchNotificationStatus } from '../../../functions/dispatchNotificationStatus';
import { Platform } from 'react-native';

export const useRequestNotification = (
    isAnonymous: boolean,
    notificationStatus: string,
) => {
    useEffect(() => {
        const requestNotificationPermission = async (
            isProvisional: boolean,
        ) => {
            const status = await requestNotification(isProvisional);
            dispatchNotificationStatus(status);
        };
        if (Platform.OS === 'ios') {
            if (isAnonymous && notificationStatus === 'denied') {
                requestNotificationPermission(true);
            } else if (!isAnonymous && notificationStatus === 'denied') {
                requestNotificationPermission(false);
            }
        }
    }, [isAnonymous, notificationStatus]);
};
