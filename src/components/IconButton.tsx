import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Reload from '../images/Reload1.svg';
import Account from '../images/Account.svg';
import Settings from '../images/Settings.svg';
import Camera from '../images/Camera.svg';
import ArrowBack from '../images/ArrowBack.svg';
import Lens from '../images/Lens.svg';
import ArrowForward from '../images/ArrowForward.svg';
import Location from '../images/Location.svg';
import CancelCircle from '../images/CancelCircle.svg';
import ArrowBack1 from '../images/ArrowBack1.svg';
import Close from '../images/Close.svg';

const white = 'rgb(255, 255, 255)';

export const CloseCameraButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Close'}
            onPress={onPress}
            height={60}
            width={60}
            iconHeight={'40%'}
            iconWidth={'40%'}
            borderColor={null}
            backgroundColor={white}
            borderWidth={0}
            borderRadius={35}
        />
    );
};
export const CloseButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Close'}
            onPress={onPress}
            height={33}
            width={33}
            iconHeight={'70%'}
            iconWidth={'70%'}
            borderColor={null}
            backgroundColor={white}
            borderWidth={0}
            borderRadius={25}
        />
    );
};
export const ArrowBackNavigation = ({ onPress }) => {
    return (
        <IconButton
            icon={'ArrowBack1'}
            onPress={onPress}
            height={25}
            width={25}
            iconHeight={'100%'}
            iconWidth={'100%'}
            borderColor={null}
            backgroundColor={null}
            borderWidth={0}
            borderRadius={25}
        />
    );
};
export const CancelCircleButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'CancelCircle'}
            onPress={onPress}
            height={25}
            width={25}
            iconHeight={'100%'}
            iconWidth={'100%'}
            borderColor={null}
            backgroundColor={white}
            borderWidth={0}
            borderRadius={25}
        />
    );
};
export const LocationMapButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Location'}
            onPress={onPress}
            height={43}
            width={43}
            iconHeight={'60%'}
            iconWidth={'60%'}
            borderColor={null}
            backgroundColor={white}
            borderWidth={0}
            borderRadius={25}
        />
    );
};
export const CameraBackButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'ArrowBack'}
            onPress={onPress}
            height={60}
            width={60}
            iconHeight={55}
            iconWidth={55}
            borderColor={null}
            backgroundColor={null}
            borderWidth={0}
            borderRadius={0}
        />
    );
};
export const CameraCaptureButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Lens'}
            onPress={onPress}
            height={57}
            width={57}
            iconHeight={52}
            iconWidth={52}
            borderColor={white}
            backgroundColor={null}
            borderWidth={4}
            borderRadius={30}
        />
    );
};
export const CameraForwardButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'ArrowForward'}
            onPress={onPress}
            height={57}
            width={57}
            iconHeight={52}
            iconWidth={52}
            borderColor={white}
            backgroundColor={null}
            borderWidth={3}
            borderRadius={30}
        />
    );
};
export const CameraButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Camera'}
            onPress={onPress}
            height={60}
            width={60}
            iconHeight={'80%'}
            iconWidth={'80%'}
            borderColor={null}
            backgroundColor={white}
            borderWidth={0}
            borderRadius={35}
        />
    );
};
export const SettingsButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Settings'}
            onPress={onPress}
            height={33}
            width={33}
            iconHeight={'100%'}
            iconWidth={'100%'}
            borderColor={null}
            backgroundColor={null}
            borderWidth={0}
            borderRadius={null}
        />
    );
};
export const AccountButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Account'}
            onPress={onPress}
            height={33}
            width={33}
            iconHeight={'100%'}
            iconWidth={'100%'}
            borderColor={null}
            backgroundColor={null}
            borderWidth={0}
            borderRadius={null}
        />
    );
};
export const ReloadButton = ({ onPress }) => {
    return (
        <IconButton
            icon={'Reload'}
            onPress={onPress}
            height={60}
            width={60}
            iconHeight={60}
            iconWidth={60}
            borderColor={null}
            backgroundColor={null}
            borderWidth={0}
            borderRadius={0}
        />
    );
};
const IconButton = ({
    icon,
    onPress,
    height,
    width,
    iconHeight,
    iconWidth,
    borderColor,
    backgroundColor,
    borderWidth,
    borderRadius,
}) => {
    const container: StyleProp<ViewStyle> = {
        height: height,
        width: width,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
    };
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                {icon === 'Reload' ? (
                    <Reload height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'Account' ? (
                    <Account height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'Settings' ? (
                    <Settings height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'Camera' ? (
                    <Camera height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'ArrowBack' ? (
                    <ArrowBack height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'Lens' ? (
                    <Lens height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'ArrowForward' ? (
                    <ArrowForward height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'Location' ? (
                    <Location height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'CancelCircle' ? (
                    <CancelCircle height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'ArrowBack1' ? (
                    <ArrowBack1 height={iconHeight} width={iconWidth} />
                ) : null}
                {icon === 'Close' ? (
                    <Close height={iconHeight} width={iconWidth} />
                ) : null}
            </View>
        </TouchableOpacity>
    );
};
