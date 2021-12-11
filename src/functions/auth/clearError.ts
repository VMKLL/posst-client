import { store } from '../../reducer/AuthReducer';

export function clearError() {
    store.dispatch(CLEAR_ERROR);
}

const CLEAR_ERROR = {
    type: 'CLEAR_ERROR',
    payload: undefined,
};
