import auth from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { serverApi } from '../../api/serverApi';
import { store } from '../../reducer/AuthReducer';

export async function emailSignUp(
    carNumber: string,
    carRegion: string,
    email: string,
    password: string,
    confirmPassword: string,
    notificationStatus: boolean,
) {
    try {
        if (
            carNumber.length === 6 &&
            (carRegion.length === 2 || carRegion.length === 3)
        ) {
            if (!email && !password) {
                store.dispatch(ERROR.invalid_email);
                return false;
            } else if (email && !password) {
                store.dispatch(ERROR.weak_password);
                return false;
            } else if (!email && password) {
                store.dispatch(ERROR.invalid_email);
                return false;
            } else if (email && password) {
                if (password === confirmPassword) {
                    const anonymousUid = auth().currentUser.uid;
                    await auth().currentUser.updateProfile({ displayName: email });
                    console.log('USER: ', auth().currentUser);
                    const token = await auth().currentUser.getIdToken(true);
                    const deviceUid = DeviceInfo.getUniqueId();
                    const deviceToken = await messaging().getToken();
                    const response = await serverApi.post(
                        '/user/signup',
                        {
                            anonymousUid,
                            email,
                            password,
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
                                userEmail: email,
                                userCarNumber: carNumber,
                                userCarRegion: carRegion,
                            },
                        });
                        return true;
                    }
                } else {
                    store.dispatch(ERROR.password_mismatch);
                    return false;
                }
            }
        } else {
            store.dispatch(ERROR.wrong_car_number);
            return false;
        }
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            store.dispatch(ERROR.email_already_in_use);
            return false;
        } else if (err.code === 'auth/invalid-email') {
            store.dispatch(ERROR.invalid_email);
            return false;
        } else if (err.code === 'auth/weak-password') {
            store.dispatch(ERROR.weak_password);
            return false;
        } else {
            store.dispatch(ERROR.connection_error);
            console.log('Email sign up:\n', err.message);
            return false;
        }
    }
}

const ERROR = {
    invalid_email: {
        type: 'SEND_ERROR',
        payload: 'Введите адрес электронной почты',
    },
    wrong_car_number: {
        type: 'SEND_ERROR',
        payload: 'Введите номер автомобиля',
    },
    email_already_in_use: {
        type: 'SEND_ERROR',
        payload: 'Адрес электронной почты уже используется',
    },
    weak_password: {
        type: 'SEND_ERROR',
        payload: 'Введите надежный пароль',
    },
    password_mismatch: {
        type: 'SEND_ERROR',
        payload: 'Пароли не совпадают',
    },
    connection_error: {
        type: 'SEND_ERROR',
        payload: 'Ошибка соединения',
    },
};
