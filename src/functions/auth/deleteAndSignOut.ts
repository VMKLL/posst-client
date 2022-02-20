import auth from '@react-native-firebase/auth';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function deleteAndSignOut() {
    try {
        const token = await auth().currentUser.getIdToken(true);
        const response = await serverApi.delete('/user/delete', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const isResult = response.data.result;
        if (isResult) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        store.dispatch(ERROR.connection_error);
        console.log('Delete user and sign out:\n', err.message);
        return false;
    }
}

const ERROR = {
    connection_error: {
        type: 'SEND_ERROR',
        payload: 'Ошибка соединения',
    },
};
