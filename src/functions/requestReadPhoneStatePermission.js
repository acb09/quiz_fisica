import { PermissionsAndroid } from "react-native";

const windowMessage = {
    title: "Solicitação de permissão",
    message:
        "Precisamos da seguinte permissão: \n\n" +
        "* Ler estado do telefone",
    buttonPositive: "Permitir"
};


export default requestReadPhoneStatePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            windowMessage
        );
        
        return (granted === PermissionsAndroid.RESULTS.GRANTED);

    } catch (err) {
        console.log(err);
    }
};