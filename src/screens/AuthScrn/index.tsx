import React, { useEffect } from 'react';
import { signIn } from '../../functions/auth/signIn';
import { SafeContainer } from '../../components/SafeContainer';
import { StatusIndicator } from '../../components/ActivityIndicator';

export const AuthScrn = () => {
    useEffect(() => {
        signIn();
    }, []);

    return (
        <SafeContainer>
            <StatusIndicator color={red} />
        </SafeContainer>
    );
};

const red = 'rgb(229, 104, 110)';
