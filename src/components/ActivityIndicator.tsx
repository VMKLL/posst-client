import React from 'react';
import { ActivityIndicator } from 'react-native';

export const StatusIndicator = ({ color }) => {
    return <ActivityIndicator size="large" color={color} />;
};
