import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { CarNumber } from '../../../components/Header';

export const Settings = ({
    userCarNumber,
    userCarRegion,
    userEmail,
    toggleNotificationSwitch,
    switchEnabled,
    notification,
    notificationDescription,
    onPressSignOut,
    isEditBtnPressed,
    switchButton,
}) => {
    return (
        <>
            <View style={styles.carNumberContainer}>
                <CarNumber label={userCarNumber + ' ' + userCarRegion} />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    Государственный регистрационный номер, по которому будут
                    приходить оповещения от других пользователей.
                </Text>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.emailText}>{userEmail}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    Ваш адрес электронной почты.
                </Text>
            </View>
            <View style={styles.notificationContainer}>
                <Text style={styles.notificationText}>Оповещения</Text>
                <Switch
                    trackColor={notificationSwitchColor}
                    onValueChange={toggleNotificationSwitch}
                    value={switchEnabled}
                />
            </View>
            {Platform.OS === 'ios' ? (
                <View
                    style={[
                        styles.descriptionContainer,
                        notification.status === 'denied' ||
                        (notification.isProvisional === true &&
                            notification.status === 'granted') ||
                        notification.status === 'blocked'
                            ? styles.warningDescriptionContainer
                            : null,
                    ]}>
                    <Text style={[styles.descriptionText]}>
                        {notificationDescription}
                    </Text>
                </View>
            ) : null}
            {Platform.OS === 'android' ? (
                <View
                    style={[
                        styles.descriptionContainer,
                        notification.status === 'denied' ||
                        notification.status === 'blocked'
                            ? styles.warningDescriptionContainer
                            : null,
                    ]}>
                    <Text style={[styles.descriptionText]}>
                        {notificationDescription}
                    </Text>
                </View>
            ) : null}
            <View style={styles.emailContainer}>
                <Text style={styles.emailText}>Сегодня</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    Отрезок времени, за который отображаются отчеты на карте.
                </Text>
            </View>
            {!isEditBtnPressed ? (
                <View style={styles.marginBottom}>
                    {!switchButton ? (
                        <SignOutButton
                            label={'Выйти'}
                            onPress={onPressSignOut}
                        />
                    ) : (
                        <DisabledSignOutButton label={'Выйти'} />
                    )}
                </View>
            ) : (
                <>
                    <SignOutButton
                        label={'Удалить и выйти'}
                        onPress={onPressSignOut}
                    />
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>
                            Все связанные данные будут удалены. Вы не сможете
                            восстановить их.
                        </Text>
                    </View>
                </>
            )}
        </>
    );
};

const SignOutButton = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.signOutContainer} onPress={onPress}>
            <Text style={styles.signOutText}>{label}</Text>
        </TouchableOpacity>
    );
};

const DisabledSignOutButton = ({ label }) => {
    return (
        <View style={styles.signOutContainer}>
            <Text style={styles.disabledSignOutText}>{label}</Text>
        </View>
    );
};

const white = 'rgb(255, 255, 255)';
const yellow = 'rgb(246, 247, 227)';
const black = 'rgb(40, 44, 52)';
const lightGrey = 'rgb(236, 236, 236)';
const red = 'rgb(245, 62, 80)';
const darkGrey = 'rgb(69, 69, 69)';
const lightGreyNotification = 'rgb(118, 117, 119)';
const green = 'rgb(92, 182, 147)';
const lightGreyButton = 'rgb(196, 196, 196)';

const notificationSwitchColor = {
    false: lightGreyNotification,
    true: green,
};

const styles = StyleSheet.create({
    carNumberContainer: {
        backgroundColor: white,
        borderColor: lightGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        marginTop: 30,
    },
    emailContainer: {
        backgroundColor: white,
        borderColor: lightGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    emailText: {
        color: black,
        fontSize: 21,
        fontWeight: '300',
    },
    notificationContainer: {
        backgroundColor: white,
        borderColor: lightGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    notificationText: {
        color: black,
        fontSize: 21,
        fontWeight: '300',
    },
    signOutContainer: {
        backgroundColor: white,
        borderColor: lightGrey,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    marginBottom: {
        width: '100%',
        marginBottom: 30,
    },
    signOutText: {
        color: red,
        fontSize: 21,
        fontWeight: '300',
    },
    disabledSignOutText: {
        color: lightGreyButton,
        fontSize: 21,
        fontWeight: '300',
    },
    descriptionContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 30,
    },
    descriptionText: {
        color: darkGrey,
        fontSize: 17,
        fontWeight: '300',
    },
    warningDescriptionContainer: {
        backgroundColor: yellow,
        width: '100%',
    },
});
