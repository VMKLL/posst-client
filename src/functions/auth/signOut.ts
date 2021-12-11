import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function signOut() {
    try {
        const token = await auth().currentUser.getIdToken(true);
        const response = await serverApi.post(
            '/user/signout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        const isResult = response.data.result;
        if (isResult) {
            await messaging().deleteToken();
            await auth().signOut();
            store.dispatch(SIGN_OUT);
        }
    } catch (err) {
        console.log('Sign out:\n', err.message);
    }
}

const SIGN_OUT = {
    type: 'SIGN_OUT',
    payload: undefined,
};
