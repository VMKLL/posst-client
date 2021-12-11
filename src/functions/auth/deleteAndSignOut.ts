import auth from '@react-native-firebase/auth';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function deleteAndSignOut(password: string) {
    try {
        let isResult = await reAuth(password);
        if (isResult) {
            const token = await auth().currentUser.getIdToken(true);
            const response = await serverApi.delete('/user/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            isResult = response.data.result;
            if (isResult) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (err) {
        store.dispatch(ERROR.connection_error);
        console.log('Delete user and sign out:\n', err.message);
        return false;
    }
}

async function reAuth(password: string) {
    try {
        if (password) {
            const user = auth().currentUser;
            const cred = auth.EmailAuthProvider.credential(
                user.email,
                password,
            );
            await user.reauthenticateWithCredential(cred);
            return true;
        } else {
            store.dispatch(ERROR.wrong_password);
            return false;
        }
    } catch (err) {
        if (err.code === 'auth/wrong-password') {
            store.dispatch(ERROR.wrong_password);
            return false;
        } else if (err.code === 'auth/too-many-requests') {
            store.dispatch(ERROR.too_many_requests);
            return false;
        } else if (
            err.code === 'auth/user-mismatch' ||
            err.code === 'auth/user-not-found' ||
            err.code === 'auth/invalid-credential' ||
            err.code === 'auth/invalid-email' ||
            err.code === 'auth/invalid-verification-code' ||
            err.code === 'auth/invalid-verification-id'
        ) {
            store.dispatch(ERROR.connection_error);
            return false;
        } else {
            store.dispatch(ERROR.connection_error);
            console.log('Reauthenticate:\n', err.message);
            return false;
        }
    }
}

const ERROR = {
    wrong_password: {
        type: 'SEND_ERROR',
        payload: 'Введите правильный пароль',
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
