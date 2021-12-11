import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function updateToken(deviceToken: string) {
    try {
        const currentUser = auth().currentUser;
        if (currentUser) {
            const token = await auth().currentUser.getIdToken(true);
            const deviceUid = DeviceInfo.getUniqueId();
            await serverApi.post(
                '/user/token',
                { deviceUid, deviceToken },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        }
    } catch (err) {
        if (
            err.code === 'auth/user-not-found' ||
            err.code === 'auth/user-disabled' ||
            err.code === 'auth/user-token-expired'
        ) {
            store.dispatch(SIGN_OUT);
            return false;
        } else {
            store.dispatch(ERROR.connection_error);
            console.log('Update token:\n', err.message);
            return false;
        }
    }
}

const SIGN_OUT = {
    type: 'SIGN_OUT',
    payload: undefined,
};
const ERROR = {
    connection_error: {
        type: 'SEND_ERROR',
        payload: 'Ошибка соединения',
    },
};
