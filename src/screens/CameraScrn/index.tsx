import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { getDimensions } from '../../functions/getDimensions';
/* import MlkitOcr from 'react-native-mlkit-ocr';
import { CarNumberProcessor } from '../../functions/CarNumberProcessor'; */
import { getAddressByLocation } from '../../functions/Managers/LocationManager';
import {
    checkLocationPermission,
    getCurrentLocation,
} from '../../functions/Managers/LocationManager';
import { showLocationPermissionAlert } from '../../functions/Managers/PermissionManager';
import { noAction } from '../../functions/noAction';
import {
    CameraBackButton,
    CameraCaptureButton,
    CameraForwardButton,
} from '../../components/IconButton';

const { screenHeight } = getDimensions();

export const CameraScrn = ({ route, navigation }) => {
    const cameraRef = useRef(null);
    const [switchButton, setSwitchButton] = useState(false);
    const [carLocation, setCarLocation] = useState(null);
    const [carAddress, setCarAddress] = useState(defaultAddress);
    const [carPhotoUri, setCarPhotoUri] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [carRegion, setCarRegion] = useState('');

    console.log('switchButton: ', switchButton);

    async function resumePreview() {
        if (cameraRef) {
            cameraRef.current.resumePreview();
        }
    }
    async function capture() {
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                // 4032 x 3024
                quality: 0.5,
                height: 2532,
                width: 1170,
                pauseAfterCapture: true,
            });
            const u = data.uri;
            /* const isIdentified = await identifyCarNumberOnPhoto(u);
          if (isIdentified) {
              setCarNumber(isIdentified.carNumber);
              setCarRegion(isIdentified.carRegion);
          } */
            setCarPhotoUri(u);
        }
    }
    /* async function identifyCarNumberOnPhoto(uri: string) {
      let result = null;
      const processed = await MlkitOcr.detectFromUri(uri);
      const BreakException = {};
      try {
          processed.forEach((block: { text: string }) => {
              let t = block.text;
              console.log('BLOCK TEXT: ', t);
              if (/^[ 0-9ABEKkMHOoPpCcTYyXx]*$/.test(t) && t.length > 7) {
                  t = t.toString().replace(/ /g, '');
                  if (t.length > 7) {
                      t = t.toUpperCase();
                      result = CarNumberProcessor(t);
                      if (result) {
                          throw BreakException;
                      }
                  }
              }
          });
      } catch (err) {
          if (err !== BreakException) {
              throw err;
          }
      }
      return result;
  } */
    function onPressBack() {
        navigation.navigate('Home');
    }
    function onPressBackIfCaptured() {
        setSwitchButton(false);
        setCarLocation(null);
        setCarAddress(defaultAddress);
        setCarPhotoUri('');
        setCarNumber('');
        setCarRegion('');
        resumePreview();
    }
    async function onPressCapture() {
        setSwitchButton(true);
        const p = await checkLocationPermission();
        if (p) {
            const location = await getCurrentLocation();
            if (location) {
                const address = await getAddressByLocation(location);
                setCarAddress(address);
                setCarLocation(location);
                capture();
            }
        } else {
            showLocationPermissionAlert('camera');
        }
    }
    async function onPressForward() {
        navigation.navigate('Home', {
            reportData: {
                reportType: route.params.reportType,
                carNumber,
                carRegion,
                carAddress,
                carLocation,
                carPhotoUri,
            },
        });
    }
    const CameraButtonsView = (
        <>
            {!carPhotoUri ? (
                <>
                    <View style={styles.cameraBackButtonView}>
                        <CameraBackButton
                            onPress={() => {
                                if (!switchButton) {
                                    onPressBack();
                                } else {
                                    noAction();
                                }
                            }}
                        />
                    </View>
                    <View style={styles.cameraCaptureButtonView}>
                        <CameraCaptureButton
                            onPress={() => {
                                if (!switchButton) {
                                    console.log('pressed');
                                    onPressCapture();
                                } else {
                                    console.log('pressed no action');
                                    noAction();
                                }
                            }}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.cameraBackButtonView}>
                        <CameraBackButton
                            onPress={() => onPressBackIfCaptured()}
                        />
                    </View>
                    <View style={styles.cameraForwardButtonView}>
                        <CameraForwardButton
                            onPress={async () => onPressForward()}
                        />
                    </View>
                </>
            )}
        </>
    );
    return (
        <RNCamera
            ref={cameraRef}
            type={RNCamera.Constants.Type.back}
            style={styles.cameraView}
            captureAudio={false}
            /* androidCameraPermissionOptions={{
      title: 'Программа «Evac» запрашивает доступ к «Камере»',
      message: 'Set camera usage description',
      buttonPositive: 'Разрешить',
      buttonNegative: 'Запретить',
  }} */
        >
            {CameraButtonsView}
        </RNCamera>
    );
};

const defaultAddress = {
    state: null,
    city: null,
    district: null,
    road: null,
    building: null,
};

const black = 'rgb(0, 0, 0)';

const styles = StyleSheet.create({
    cameraView: {
        flex: 1,
        backgroundColor: black,
    },
    cameraBackButtonView: {
        position: 'absolute',
        left: '3%',
        bottom: screenHeight * 0.04,
        paddingTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cameraCaptureButtonView: {
        position: 'absolute',
        bottom: screenHeight * 0.04,
        paddingTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    cameraForwardButtonView: {
        position: 'absolute',
        right: '3%',
        bottom: screenHeight * 0.04,
        paddingTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});
