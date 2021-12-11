import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

export const useKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(null);

    const _keyboardShow = (e: any) => {
        const height = e.endCoordinates.height;
        setKeyboardHeight(height);
    };
    const _keyboardHide = () => {
        setKeyboardHeight(null);
    };

    useEffect(() => {
        if (Platform.OS === 'ios') {
            Keyboard.addListener('keyboardWillChangeFrame', _keyboardShow);
            Keyboard.addListener('keyboardWillHide', _keyboardHide);
            return () => {
                Keyboard.removeListener(
                    'keyboardWillChangeFrame',
                    _keyboardShow,
                );
                Keyboard.removeListener('keyboardWillHide', _keyboardHide);
            };
        } else if (Platform.OS === 'android') {
            Keyboard.addListener('keyboardDidShow', _keyboardShow);
            Keyboard.addListener('keyboardDidHide', _keyboardHide);
            return () => {
                Keyboard.removeListener('keyboardDidShow', _keyboardShow);
                Keyboard.removeListener('keyboardDidHide', _keyboardHide);
            };
        }
    }, []);

    return keyboardHeight;
};
