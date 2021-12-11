import React from 'react';

interface Props {
    navigation: any;
}

export const navigationRef: any = React.createRef();

export const navigate = (name: any, params: any) => {
    navigationRef.current?.navigate(name, params);
};
