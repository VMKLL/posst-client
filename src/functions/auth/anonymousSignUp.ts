import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function anonymousSignUp(
    carNumber: string,
    carRegion: string,
    notificationStatus: boolean,
) {
    try {
        if (
            carNumber.length === 6 &&
            (carRegion.length === 2 || carRegion.length === 3)
        ) {
            console.log('auth().currentUser: ', auth().currentUser);
            const token = await auth().currentUser.getIdToken(true);
            const deviceUid = DeviceInfo.getUniqueId();
            const deviceToken = await messaging().getToken();
            const response = await serverApi.post(
                '/user/signup',
                {
                    carNumber,
                    carRegion,
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
                        userEmail: 'No Name',
                        userCarNumber: carNumber,
                        userCarRegion: carRegion,
                    },
                });
                return true;
            }
        } else {
            store.dispatch(ERROR.wrong_car_number);
            return false;
        }
    } catch (err) {
        store.dispatch(ERROR.connection_error);
        console.log('Anonymous sign up:\n', err.message);
        return false;
    }
}

const ERROR = {
    wrong_car_number: {
        type: 'SEND_ERROR',
        payload: 'Введите номер автомобиля',
    },
    connection_error: {
        type: 'SEND_ERROR',
        payload: 'Ошибка соединения',
    },
};
