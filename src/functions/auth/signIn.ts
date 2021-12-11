import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function signIn() {
    try {
        let result = null;
        const currentUser = auth().currentUser;
        if (currentUser) {
            const isAnonymous = auth().currentUser.isAnonymous;
            if (isAnonymous) {
                result = anonymousSignIn();
            } else {
                result = emailSignIn();
            }
        } else {
            result = anonymousSignUp();
        }
        return result;
    } catch (err) {
        console.log('Sign in:\n', err.message);
        return false;
    }
}

async function anonymousSignIn() {
    try {
        const token = await auth().currentUser.getIdToken(true);
        const response = await serverApi.post(
            '/user/signin',
            {},
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
                    isAnonymous: true,
                    token,
                    userEmail: '',
                    userCarNumber: '',
                    userCarRegion: '',
                },
            });
            return true;
        } else {
            await auth().signOut();
            store.dispatch(SIGN_OUT);
            return false;
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
            console.log('Anonymous auto sign in:\n', err.message);
            return false;
        }
    }
}

async function emailSignIn() {
    try {
        const token = await auth().currentUser.getIdToken(true);
        const deviceUid = DeviceInfo.getUniqueId();
        const deviceToken = await messaging().getToken();
        const response = await serverApi.post(
            '/user/signin',
            {
                deviceUid,
                deviceToken,
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
            console.log('Email auto sign in:\n', err.message);
            return false;
        }
    }
}

async function anonymousSignUp() {
    try {
        await auth().signInAnonymously();
        const token = await auth().currentUser.getIdToken(true);
        const response = await serverApi.post(
            '/user/signup',
            {},
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
                    isAnonymous: true,
                    token,
                    userEmail: '',
                    userCarNumber: '',
                    userCarRegion: '',
                },
            });
            return true;
        }
    } catch (err) {
        store.dispatch(ERROR.connection_error);
        console.log('Anonymous sign up:\n', err.message);
        return false;
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
