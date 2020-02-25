import AsyncStorage from "@react-native-community/async-storage";
import Perguntas from "./Perguntas";
import Dialogos from "./Dialogos";

const initialState = {
  fase: 0,
  score: 0,
  perguntas: Perguntas,
  dialogos: Dialogos,
  dialogoAtual: "",
  nome: null,
  relatorioEnviado: false,
  estatisticas: {
    nerros: 0,
    questoesqueerrou: [],
    questoesqueacertou: []
  }
};

// Reinicia ao padrão de fábrica
const ResetOrInitAsyncStorage = () => SaveAsyncStorage(initialState);

// Save os dados recebidos por parâmetros via AsyncStorage
const SaveAsyncStorage = async data => {
  await AsyncStorage.setItem("dataSave", JSON.stringify(data))};

// Retorna os dados salvos em JSON
const GetAsyncStorage = async () => {
  await AsyncStorage.getItem("dataSave").then(jsonStructData => result = JSON.parse(jsonStructData))
  return result ? result : initialState;
};

export { ResetOrInitAsyncStorage, SaveAsyncStorage, GetAsyncStorage };
