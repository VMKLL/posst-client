import { store } from '../reducer/AuthReducer';

interface Message {
    carNumber: string;
    carRegion: string;
    imageName: string;
}

export async function dispatchMessage(data: Message) {
    try {
        if (data) {
            store.dispatch({
                type: 'SEND_MESSAGE',
                payload: data,
            });
        }
    } catch (err) {
        console.log('Dispatch message:\n', err.message);
    }
}
