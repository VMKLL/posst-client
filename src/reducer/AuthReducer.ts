import { createStore } from 'redux';

interface ACTION {
    type: string;
    payload: any;
}

const reducer = (state: object, action: ACTION) => {
    switch (action.type) {
        case 'SEND_ERROR':
            return {
                ...state,
                errorMessage: action.payload,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                errorMessage: undefined,
            };
        case 'SEND_MESSAGE':
            return {
                ...state,
                messageData: action.payload,
            };
        case 'SEND_NOTIFICATION_STATUS':
            return {
                ...state,
                notification: action.payload,
            };
        case 'SIGN_UP':
            return {
                ...state,
                isLoading: false,
                isAnonymous: action.payload.isAnonymous,
                token: action.payload.token,
                userEmail: action.payload.userEmail,
                userCarNumber: action.payload.userCarNumber,
                userCarRegion: action.payload.userCarRegion,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isLoading: false,
                isAnonymous: true,
                token: '',
                userEmail: '',
                userCarNumber: '',
                userCarRegion: '',
            };
        default:
            return {
                isLoading: true,
                notification: { status: '', isProvisional: undefined },
            };
    }
};

export const store = createStore(reducer);
