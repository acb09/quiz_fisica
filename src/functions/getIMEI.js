const IMEI = require('react-native-imei');

export default async () => {
    let codeIMEI;

    await IMEI.getImei().then(imei => codeIMEI = imei);

    return codeIMEI;
}