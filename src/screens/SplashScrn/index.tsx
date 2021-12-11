import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { clearError } from '../../functions/auth/clearError';
import { signIn } from '../../functions/auth/signIn';
import { SafeContainer } from '../../components/SafeContainer';
import { ReloadButton } from '../../components/IconButton';
import { StatusIndicator } from '../../components/ActivityIndicator';

export const SplashScrn = () => {
    const { errorMessage } = useSelector((state: RootStateOrAny) => state);

    return (
        <SafeContainer>
            {errorMessage ? (
                <>
                    <ReloadButton
                        onPress={() => {
                            clearError();
                            signIn();
                        }}
                    />
                </>
            ) : (
                <StatusIndicator color={grey} />
            )}
        </SafeContainer>
    );
};

const grey = 'rgb(173, 173, 173)';
