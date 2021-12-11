import { Platform } from 'react-native';

export const getContainerHeight = (
    screenHeight: number,
    keyboardHeight: number,
) => {
    const containerHeight = Platform.select({
        ios: {
            height: screenHeight - keyboardHeight,
        },
        android: {
            height: '100%',
        },
    });

    return containerHeight;
};
