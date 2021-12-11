import auth from '@react-native-firebase/auth';
import { serverApi } from '../../../../../api/serverApi';

export async function getReportInfo(reportId: number) {
    try {
        const token = await auth().currentUser.getIdToken(true);
        const response = await serverApi.get('/report', {
            headers: { Authorization: `Bearer ${token}` },
            params: { reportId },
        });
        const isResult = response.data.result;
        if (isResult) {
            return {
                imageName: response.data.imageName,
                carNumber: response.data.carNumber,
                carRegion: response.data.carRegion,
            };
        }
    } catch (err) {
        console.log('Get report info:\n', err.message);
    }
}
