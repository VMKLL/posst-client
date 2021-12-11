import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight';
import { useRequestNotification } from './hooks/useRequestNotification';
import { getDimensions } from '../../functions/getDimensions';
import { getContainerHeight } from '../../functions/getContainerHeight';
import { noAction } from '../../functions/noAction';
import {
    checkLocationPermission,
    getCurrentLocation,
} from '../../functions/Managers/LocationManager';
import {
    checkCameraPermission,
    requestCameraPermission,
    showLocationPermissionAlert,
    showCameraPermissionAlert,
} from '../../functions/Managers/PermissionManager';
import { getReportImageUri } from '../../functions/Managers/StorageManager';
import { animateToRegion } from './../HomeScrn/ui/Map/functions/animateToRegion';
import { searchRegion } from '../../functions/searchRegion';
import { submitReport } from './functions/submitReport';
import { clearError } from '../../functions/auth/clearError';
import { emailSignIn } from '../../functions/auth/emailSignIn';
import { emailSignUp } from '../../functions/auth/emailSignUp';
import { Map } from './../HomeScrn/ui/Map';
import { AccountButton, CloseCameraButton } from '../../components/IconButton';
import { SettingsButton } from '../../components/IconButton';
import { LocationMapButton } from '../../components/IconButton';
import { CameraButton } from '../../components/IconButton';
import { InputCarNumber } from '../../components/InputCarNumber';
import { SimpleButton } from '../../components/Button';
import { DisabledButton } from '../../components/DisabledButton';
import { Popup } from '../../components/Popup';
import { AuthContainer } from '../../components/AuthContainer';
import { Authentication } from './../HomeScrn/ui/Authentication';
//import { ReportType } from './../HomeScrn/ui/ReportType';
import { Header2, Header3 } from '../../components/Header';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';
dayjs.extend(utc);
dayjs.locale('ru');

console.log(dayjs().format('HH:MM Z, dddd, D MMMM YYYY г.'));
console.log(dayjs.utc().format('HH:MM Z, dddd, D MMMM YYYY г.'));

const { screenHeight, screenWidth } = getDimensions();

export const HomeScrn = ({ route, navigation }) => {
    const mapRef = useRef(null);
    const [message, setMessage] = useState({
        carNumber: '',
        carRegion: '',
        imageUri: '',
    });
    const [isMessagePopupVisible, setIsMessagePopupVisible] = useState(false);
    const { isAnonymous, errorMessage, notification, messageData } =
        useSelector((state: RootStateOrAny) => state);
    const [reportType, setReportType] = useState(null);
    const [carLocation, setCarLocation] = useState(null);
    const [carAddress, setCarAddress] = useState(null);
    const [carPhotoUri, setCarPhotoUri] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [carRegion, setCarRegion] = useState('');
    const [switchButton, setSwitchButton] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPosstPressed, setIsPosstPressed] = useState(false);

    const keyboardHeight = useKeyboardHeight();
    const containerHeight = getContainerHeight(screenHeight, keyboardHeight);
    const locationButtonHeight = {
        bottom: !keyboardHeight ? screenHeight / 2.1 : keyboardHeight + 55,
    };

    useRequestNotification(isAnonymous, notification.status);

    useEffect(() => {
        if (screenHeight <= 667 && errorMessage) {
            setTimeout(() => {
                clearError();
            }, 2500);
        }
    }, [errorMessage]);

    useEffect(() => {
        const fetchPhotoUri = async () => {
            const number = messageData.carNumber + messageData.carRegion;
            const uri = await getReportImageUri(number, messageData.imageName);
            setMessage({
                carNumber: messageData.carNumber,
                carRegion: messageData.carRegion,
                imageUri: uri,
            });
            setIsMessagePopupVisible(true);
        };
        if (messageData) {
            fetchPhotoUri();
        }
    }, [messageData]);

    useEffect(() => {
        if (route.params.reportData) {
            setReportType(route.params.reportData.reportType);
            setCarLocation(route.params.reportData.carLocation);
            setCarAddress(route.params.reportData.carAddress);
            setCarPhotoUri(route.params.reportData.carPhotoUri);
            setCarNumber(route.params.reportData.carNumber);
            setCarRegion(route.params.reportData.carRegion);
        }
    }, [route.params.reportData]);

    useEffect(() => {
        const unsubscribeOnFocus = navigation.addListener('focus', () => {
            clearError();
        });
        return unsubscribeOnFocus;
    }, [navigation]);

    useEffect(() => {
        const unsubscribeOnBlur = navigation.addListener('blur', () => {
            navigation.setParams({
                reportData: null,
            });
            resetCarState();
        });
        return unsubscribeOnBlur;
    }, [navigation]);

    useEffect(() => {
        if (password.length === 0) {
            setConfirmPassword('');
        }
    }, [password.length]);

    function resetCarNavigationRouteParams() {
        navigation.setParams({
            reportData: null,
        });
    }
    function resetCarState() {
        setReportType(null);
        setCarLocation(null);
        setCarAddress(null);
        setCarPhotoUri('');
        setCarNumber('');
        setCarRegion('');
    }
    function openAuthPopup() {
        setIsPopupVisible(true);
    }
    function navigateToSettings() {
        navigation.navigate('Settings');
    }
    async function onPressLocationMapButton() {
        const p = await checkLocationPermission();
        if (p) {
            const location = await getCurrentLocation();
            setCarLocation(location);
            animateToRegion(mapRef, location);
        } else {
            showLocationPermissionAlert('map');
        }
    }
    async function onPressPosst() {
        if (!isPosstPressed) {
            setIsPosstPressed(true);
        } else {
            setIsPosstPressed(false);
        }
    }
    async function onPressType(type: string) {
        setIsPosstPressed(false);
        const p = await checkCameraPermission();
        if (p === 'granted') {
            navigation.navigate('Camera', { reportType: type });
        } else if (p === 'denied') {
            const req = await requestCameraPermission();
            if (req === 'granted') {
                navigation.navigate('Camera', { reportType: type });
            }
        } else if (p === 'blocked') {
            showCameraPermissionAlert();
        }
    }
    async function onPressSubmitReport() {
        setSwitchButton(true);
        const code = searchRegion(carAddress.state);
        const address = {
            regionCode: code,
            city: carAddress.city,
            district: carAddress.district,
            road: carAddress.road,
            building: carAddress.building,
        };
        await submitReport(
            reportType,
            carNumber,
            carRegion,
            address,
            carLocation,
            carPhotoUri,
        );
        setTimeout(() => {
            resetCarNavigationRouteParams();
            resetCarState();
            setSwitchButton(false);
        }, 2500);
    }
    async function onPressSignIn() {
        setSwitchButton(true);
        let notificationStatus: boolean;
        if (Platform.OS === 'android') {
            if (notification.status === 'denied') {
                notificationStatus = false;
            } else if (notification.status === 'granted') {
                notificationStatus = true;
            } else if (notification.status === 'blocked') {
                notificationStatus = false;
            }
        } else if (Platform.OS === 'ios') {
            if (
                notification.isProvisional === true &&
                notification.status === 'granted'
            ) {
                notificationStatus = false;
            } else if (
                notification.isProvisional === false &&
                notification.status === 'granted'
            ) {
                notificationStatus = true;
            } else if (
                notification.isProvisional === false &&
                notification.status === 'blocked'
            ) {
                notificationStatus = false;
            }
        }
        const isResult = await emailSignIn(email, password, notificationStatus);
        if (isResult) {
            setIsPopupVisible(false);
            navigateToSettings();
        }
        setSwitchButton(false);
    }
    async function onPressSignUp() {
        setSwitchButton(true);
        let notificationStatus: boolean;
        if (Platform.OS === 'android') {
            if (notification.status === 'denied') {
                notificationStatus = false;
            } else if (notification.status === 'granted') {
                notificationStatus = true;
            } else if (notification.status === 'blocked') {
                notificationStatus = false;
            }
        } else if (Platform.OS === 'ios') {
            if (
                notification.isProvisional === true &&
                notification.status === 'granted'
            ) {
                notificationStatus = false;
            } else if (
                notification.isProvisional === false &&
                notification.status === 'granted'
            ) {
                notificationStatus = true;
            } else if (
                notification.isProvisional === false &&
                notification.status === 'blocked'
            ) {
                notificationStatus = false;
            }
        }
        const isResult = await emailSignUp(
            carNumber,
            carRegion,
            email,
            password,
            confirmPassword,
            notificationStatus,
        );
        if (isResult) {
            setIsPopupVisible(false);
            navigateToSettings();
        }
        setSwitchButton(false);
    }
    function onPressRegister() {
        clearError();
        setIsRegistered(false);
    }
    function onPressAlreadyRegistered() {
        clearError();
        setIsRegistered(true);
    }
    function onPopupClose() {
        if (!switchButton) {
            clearError();
            setCarNumber('');
            setCarRegion('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setIsRegistered(false);
            setIsPopupVisible(false);
        } else {
            noAction();
        }
    }
    function onMessagePopupClose() {
        setIsMessagePopupVisible(false);
    }

    const SubmitReportView = (
        <>
            {!carPhotoUri ? (
                <View style={[styles.cameraButtonView, withShadow]}>
                    {!isPosstPressed ? (
                        <CameraButton onPress={() => onPressPosst()} />
                    ) : (
                        <CloseCameraButton onPress={() => onPressPosst()} />
                    )}
                </View>
            ) : (
                <>
                    <View style={[styles.submitReportView, withShadow]}>
                        <View style={styles.reportElementView}>
                            {reportType === 'DEER' ? (
                                <Header2 label={'Хам'} />
                            ) : null}
                            {reportType === 'EVAC' ? (
                                <Header2 label={'Эвакуация'} />
                            ) : null}
                        </View>
                        <View style={styles.reportElementView}>
                            <InputCarNumber
                                number={carNumber}
                                region={carRegion}
                                onNumberChange={setCarNumber}
                                onRegionChange={setCarRegion}
                                uri={carPhotoUri}
                                onPress={() => {
                                    if (!switchButton) {
                                        resetCarNavigationRouteParams();
                                        resetCarState();
                                    } else {
                                        noAction();
                                    }
                                }}
                            />
                        </View>
                        <View style={[styles.reportElementView]}>
                            {!switchButton &&
                            carNumber.length === 6 &&
                            carRegion.length > 1 ? (
                                <SimpleButton
                                    label="Отправить"
                                    onPress={() => onPressSubmitReport()}
                                />
                            ) : (
                                <DisabledButton label="Отправить" />
                            )}
                        </View>
                        <View
                            style={[
                                styles.reportElementView,
                                styles.reportTypeDescription,
                            ]}>
                            {reportType === 'DEER' ? (
                                <Header3
                                    label={
                                        'Пользователи, подписанные на этот номер, получат оповещения.'
                                    }
                                />
                            ) : null}
                            {reportType === 'EVAC' ? (
                                <Header3
                                    label={
                                        'Пользователи, подписанные на этот номер, получат оповещения об эвакуации.'
                                    }
                                />
                            ) : null}
                        </View>
                    </View>
                </>
            )}
        </>
    );

    const scr = { height: screenHeight };

    return (
        <View style={isPopupVisible ? scr : containerHeight}>
            <Map
                mapRef={mapRef}
                carPhotoUri={carPhotoUri}
                carLocation={carLocation}>
                <View style={[styles.settingsButtonView, withShadow]}>
                    {isAnonymous ? (
                        <AccountButton
                            onPress={() => {
                                if (!switchButton) {
                                    resetCarNavigationRouteParams();
                                    resetCarState();
                                    setIsPosstPressed(false);
                                    openAuthPopup();
                                } else {
                                    noAction();
                                }
                            }}
                        />
                    ) : (
                        <SettingsButton
                            onPress={() => {
                                if (!switchButton) {
                                    resetCarNavigationRouteParams();
                                    resetCarState();
                                    setIsPosstPressed(false);
                                    navigateToSettings();
                                } else {
                                    noAction();
                                }
                            }}
                        />
                    )}
                </View>
                <View
                    style={[
                        styles.locationButtonView,
                        locationButtonHeight,
                        withShadow,
                    ]}>
                    <LocationMapButton
                        onPress={async () => {
                            if (!switchButton) {
                                onPressLocationMapButton();
                            } else {
                                noAction();
                            }
                        }}
                    />
                </View>
                {isPosstPressed ? (
                    <View style={[styles.typesContainer, withShadow]}>
                        <TouchableWithoutFeedback
                            onPress={() => onPressType('EVAC')}>
                            <View style={styles.typeContainer}>
                                <View
                                    style={[
                                        styles.typeCircle,
                                        { backgroundColor: yellow },
                                    ]}
                                />
                                <View
                                    style={[
                                        styles.typeView,
                                        withShadow,
                                        { backgroundColor: yellow },
                                    ]}>
                                    <View style={styles.textView}>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: black },
                                            ]}>
                                            Эвакуация
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => onPressType('DEER')}>
                            <View style={styles.typeContainer}>
                                <View
                                    style={[
                                        styles.typeCircle,
                                        { backgroundColor: yellow },
                                    ]}
                                />
                                <View
                                    style={[
                                        styles.typeView,
                                        withShadow,
                                        { backgroundColor: yellow },
                                    ]}>
                                    <View style={styles.textView}>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: black },
                                            ]}>
                                            Хам
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}
                {SubmitReportView}
                <Popup {...{ isPopupVisible, onPopupClose }}>
                    <AuthContainer
                        {...{ errorMessage, containerHeight, onPopupClose }}>
                        <Authentication
                            {...{
                                isRegistered,
                                switchButton,
                                carNumber,
                                setCarNumber,
                                carRegion,
                                setCarRegion,
                                email,
                                setEmail,
                                password,
                                setPassword,
                                confirmPassword,
                                setConfirmPassword,
                                onPressAlreadyRegistered,
                                onPressSignIn,
                                onPressSignUp,
                                onPressRegister,
                            }}
                        />
                    </AuthContainer>
                </Popup>
                <Popup
                    isPopupVisible={isMessagePopupVisible}
                    onPopupClose={onMessagePopupClose}>
                    <View style={styles.transparentContainer}>
                        <TouchableWithoutFeedback onPress={noAction}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: message.imageUri }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Popup>
            </Map>
        </View>
    );
};

const lightGrey = 'rgb(196, 196, 196)';
const grey = 'rgb(83, 83, 83)';
const white = 'rgb(255, 255, 255)';

const yellow = 'rgb(246, 247, 227)';
//const red = 'rgb(229, 104, 110)';
const black = 'rgb(69, 69, 69)';
//const green = 'rgb(92, 182, 147)';

const withShadow = {
    shadowColor: lightGrey,
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 15,
};

const styles = StyleSheet.create({
    typesContainer: {
        //backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: screenHeight * 0.04 + 65,
        width: '94%',
        borderRadius: 10,
        paddingTop: 20,
        alignSelf: 'center',
    },
    typeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    typeCircle: {
        height: 50,
        width: 50,
        borderRadius: 35,
        marginRight: 10,
    },
    typeView: {
        height: 50,
        justifyContent: 'center',
        borderRadius: 35,
        paddingHorizontal: 30,
    },
    textView: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 19,
        fontWeight: '300',
    },
    settingsButtonView: {
        position: 'absolute',
        top: screenHeight * 0.06,
        left: '3%',
    },
    locationButtonView: {
        position: 'absolute',
        right: '3%',
    },
    cameraButtonView: {
        position: 'absolute',
        bottom: screenHeight * 0.04,
        alignSelf: 'center',
    },
    submitReportView: {
        position: 'absolute',
        bottom: screenHeight * 0.03,
        width: '94%',
        borderRadius: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor: white,
    },
    reportElementView: {
        paddingTop: 10,
        alignSelf: 'center',
    },
    reportTypeDescription: {
        width: 244,
        paddingBottom: 5,
    },
    transparentContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: grey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    image: {
        height: screenHeight - 150,
        width: screenWidth - 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
});
