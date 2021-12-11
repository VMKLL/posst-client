import { store } from '../reducer/AuthReducer';

interface NotificationStatus {
    isProvisional: boolean;
    status: string;
}

export async function dispatchNotificationStatus(status: NotificationStatus) {
    try {
        if (status) {
            store.dispatch({
                type: 'SEND_NOTIFICATION_STATUS',
                payload: status,
            });
        }
    } catch (err) {
        console.log('Dispatch notification status:\n', err.message);
    }
}
