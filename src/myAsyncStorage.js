import { Perguntas } from './Perguntas'
import AsyncStorage from '@react-native-community/async-storage';

const dataSaveDefault = {
	fase:0,
	score:0,
	perguntas: Perguntas
}

async function gravarDataSave() {
	if(this.state.dataSave === null) return false
    await AsyncStorage.setItem('dataSave', JSON.stringify(this.state.dataSave))
}

async function obterDataSave() {
	let s = this.state
	await AsyncStorage.getItem('dataSave').then((jsonStructData)=>{
		s.dataSave = JSON.parse(jsonStructData)
	})
	if(s.dataSave !== null) this.setState(s)
	else {
		s.dataSave = dataSaveDefault
		this.setState(s)
	}
}

function atualizarDataSave(timeInSecounds = 5) {
	this.obterDataSave()
	setTimeout(()=>this.atualizarDataSave(), timeInSecounds*1000)
}

export { 
	Perguntas,
	obterDataSave,
	gravarDataSave,
	atualizarDataSave,
}
