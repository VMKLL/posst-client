import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function emailSignIn(
    email: string,
    password: string,
    notificationStatus: boolean,
) {
    try {
        if (!email && !password) {
            store.dispatch(ERROR.invalid_email);
            return false;
        } else if (email && !password) {
            store.dispatch(ERROR.wrong_password);
            return false;
        } else if (!email && password) {
            store.dispatch(ERROR.invalid_email);
            return false;
        } else if (email && password) {
            const anonymousUid = auth().currentUser.uid;
            await auth().signInWithEmailAndPassword(email, password);
            const token = await auth().currentUser.getIdToken(true);
            const deviceUid = DeviceInfo.getUniqueId();
            const deviceToken = await messaging().getToken();
            const response = await serverApi.post(
                '/user/signin',
                {
                    anonymousUid,
                    deviceUid,
                    deviceToken,
                    notificationStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            const isResult = response.data.result;
            if (isResult) {
                store.dispatch({
                    type: 'SIGN_UP',
                    payload: {
                        isAnonymous: false,
                        token,
                        userEmail: response.data.userEmail,
                        userCarNumber: response.data.userCarNumber,
                        userCarRegion: response.data.userCarRegion,
                    },
                });
                return true;
            } else {
                await auth().signOut();
                store.dispatch(SIGN_OUT);
                return false;
            }
        }
    } catch (err) {
        if (err.code === 'auth/wrong-password') {
            store.dispatch(ERROR.wrong_password);
            return false;
        } else if (err.code === 'auth/invalid-email') {
            store.dispatch(ERROR.invalid_email);
            return false;
        } else if (err.code === 'auth/user-not-found') {
            store.dispatch(ERROR.user_not_found);
            return false;
        } else if (err.code === 'auth/user-disabled') {
            store.dispatch(ERROR.user_disabled);
            return false;
        } else if (err.code === 'auth/too-many-requests') {
            store.dispatch(ERROR.too_many_requests);
            return false;
        } else {
            store.dispatch(ERROR.connection_error);
            console.log('Email sign in:\n', err.message);
            return false;
        }
    }
}

const SIGN_OUT = {
    type: 'SIGN_OUT',
    payload: undefined,
};
const ERROR = {
    invalid_email: {
        type: 'SEND_ERROR',
        payload: 'Введите адрес электронной почты',
    },
    wrong_password: {
        type: 'SEND_ERROR',
        payload: 'Введите правильный пароль',
    },
    user_not_found: {
        type: 'SEND_ERROR',
        payload: 'Пользователь не зарегистрирован',
    },
    user_disabled: {
        type: 'SEND_ERROR',
        payload: 'Пользователь временно заблокирован',
    },
    too_many_requests: {
        type: 'SEND_ERROR',
        payload: 'Попробуйте позже',
    },
    connection_error: {
        type: 'SEND_ERROR',
        payload: 'Ошибка соединения',
    },
};
