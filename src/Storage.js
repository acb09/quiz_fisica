import AsyncStorage from "@react-native-community/async-storage";
import Perguntas from "./Perguntas";
import Dialogos from "./Dialogos";

/*
* Perguntas é passado por referência para this.dataSave.perguntas, fazendo que 
* Perguntas e this.dataSave.perguntas apontem para o mesmo ponteiro.
* Está variável faz uma cópia do objeto Perguntas e passa cópia para this.state.
*/
const perguntas_stringify = JSON.stringify(Perguntas);

const initialState = {
  fase: 0,
  score: 0,
  perguntas: JSON.parse(perguntas_stringify),
  dialogos: Dialogos,
  dialogoAtual: "",
  nome: null,
  relatorioEnviado: false,
  estatisticas: {
    nerros: 0,
    questoesqueerrou: []
  },
  system: {
    info: {
      IMEI: null
    }
  }
};

// Reinicia ao padrão de fábrica
const ResetOrInitAsyncStorage = async (relatorioEnviado = false) => { 
  initialState.relatorioEnviado = relatorioEnviado;
  await SaveAsyncStorage(initialState); 
}

// Save os dados recebidos por parâmetros via AsyncStorage
const SaveAsyncStorage = async data => {
  await AsyncStorage.setItem("dataSave", JSON.stringify(data))
};

// Retorna os dados salvos em JSON
const GetAsyncStorage = async () => {
  await AsyncStorage.getItem("dataSave").then(jsonStructData => result = JSON.parse(jsonStructData))
  return result ? result : initialState;
};

export { ResetOrInitAsyncStorage, SaveAsyncStorage, GetAsyncStorage };
