import React,  { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Modal, Image, ScrollView } from 'react-native'
import { AsyncStorage } from "react-native"
import { dialogos } from '../Dialogos'
import { obterDataSave } from '../myAsyncStorage'
import { styles } from '../styles'

export default class Jogo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dialogo: '...',
			indiceDialogos: 0,
			dataSave: null,
		}
		this.obterDataSave = obterDataSave.bind(this)
		// this.recuarDialogo = this.recuarDialogo.bind(this)
		// this.avancarDialogo = this.avancarDialogo.bind(this)
		// this.atualizarDialogo = this.atualizarDialogo.bind(this)
		this.irParaPerguntas = this.irParaPerguntas.bind(this)
		// setInterval(()=>this.obterTodosDialogos(), 1000)
	}

	static navigationOptions = {
		header: null,
	};

	componentDidMount() {
		setInterval(()=>{
			this.obterDataSave()
			// this.obterTodosDialogos()
			// this.atualizarDialogo()
		}, 1000)
		setInterval(()=>this.obterTodosDialogos(), 2000)
	}

	obterTodosDialogos() {
		if(this.state.dataSave === null) return false
		async () => {
			this.reiniciaTexto()
			await setTimeout(()=>{}, 2000) 
		} 
		let s = this.state
		let concatenacaoDeDialogos = ""
		if(dialogos[this.state.dataSave.fase][this.state.indiceDialogos] === "undefined") return false
		for(let i=0; i<dialogos[this.state.dataSave.fase].length; i++) {
			concatenacaoDeDialogos += dialogos[this.state.dataSave.fase][this.state.indiceDialogos]+"\n"
			s.indiceDialogos++
			this.setState(s)
		}
		s.dialogo = concatenacaoDeDialogos
		this.setState(s)
		this.reiniciarDialogoAtual()
	}

	reiniciaTexto() {
		let s = this.state
		s.dialogo = "..."
		this.setState(s)
	}

	reiniciarDialogoAtual() {
		let s = this.state
		s.indiceDialogos = 0
		this.setState(s)
	}

	dialogoAcabou() {
		return (this.state.indiceDialogos + 1 === dialogos[this.state.dataSave.fase].length)
	}

	irParaPerguntas() {
		this.scrollListReftop.scrollTo({x: 0, y: 0, animated: false})
		// this.props.navigation.navigate('Jogo')
		this.obterTodosDialogos()
		this.props.navigation.navigate('Jogo')
	}

	render() {
		return (
			<View style={{flex:1, flexDirection: 'column'}}>
			    <Image source={ImagemFundo} style={{position: 'absolute', top: 0, left: 0, width:'100%', height:'100%'}} />
					<View style={styles.boxTalk}>
						<ScrollView ref={(ref) => { this.scrollListReftop = ref; }}>
							<Text style={styles.texto}>{this.state.dialogo}</Text>
						</ScrollView>
					</View>
					<View style={styles.flechas}>
						<TouchableHighlight style={styles.flecha} onPress={this.irParaPerguntas}>
							<Image source={require('../../images/seta_direita.png')} />
						</TouchableHighlight>
					</View>
					<View style={styles.robo}>
						<Image source={ImagemRobo} />
					</View>
			</View>
		)
	}
}

const ImagemRobo = require('../../images/robo.png')
const ImagemFundo = require('../../images/galaxia.png')
