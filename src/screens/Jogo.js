import React,  { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Modal, Image, ScrollView } from 'react-native'
import { styles } from '../styles.js'
import { Perguntas } from '../Perguntas'
import { 
	obterDataSave,
	gravarDataSave,
	atualizarDataSave,
	criarDataSaveSeNaoExistir
} from '../myAsyncStorage';

export default class Jogo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			modalVisivel: false,
			referenciaSeErrouOuAcertouOModal: false,
			dataSave: null,
		}
		this.abrirModal = this.abrirModal.bind(this)
		this.fechaModal = this.fechaModal.bind(this)
		this.gravarDataSave = gravarDataSave.bind(this)
		this.obterDataSave = obterDataSave.bind(this)
		this.gravarDataSave = gravarDataSave.bind(this)
		this.atualizarDataSave = atualizarDataSave.bind(this)
	}

	static navigationOptions = {
		header: null,
	};
	
	componentDidMount() {
		this.obterDataSave()
	}

	processarResposta(letra) {
		if(!this.acertou(letra)) this.errou()
	}

	acertou(letra) {
		let voltarParaExplicacao = this.state.dataSave.perguntas[0].voltarParaExplicacao
		let acertou = this.compararResposta(letra)
		this.atualizaReferenciaDoModal(acertou)
		if(!acertou) return false
		this.abrirModal()
		setTimeout(()=>this.fechaModal(), 3000)
		this.seAcabouPerguntasRedirecionaParaCreditos(this.acabouPerguntas())
		if(!voltarParaExplicacao) {
			this.aumentaPontuacao()
			this.removerPerguntaDaLista()
			this.gravarDataSave()
			return acertou
		}
		this.aumentaPontuacao()
		this.proximaFase()
		this.removerPerguntaDaLista()
		this.gravarDataSave()
		setTimeout(()=>this.props.navigation.goBack(null), 3000)
		return acertou
	}

	errou() {
		let voltarParaExplicacao = this.state.dataSave.perguntas[0].voltarParaExplicacao
		this.abrirModal()
		setTimeout(()=>this.fechaModal(), 3000)
		if(!voltarParaExplicacao) {
			this.moverPerguntaParaFinalDaLista()
			return true
		}
		this.moverPerguntaParaFinalDaLista()
		this.proximaFase() 
		this.gravarDataSave()
		setTimeout(()=>this.props.navigation.goBack(null), 3000)
	}

	atualizaReferenciaDoModal(acertou) {
		let s = this.state
		s.referenciaSeErrouOuAcertouOModal = acertou
		this.setState(s)
	}

	compararResposta(letra) {
		return (letra === this.state.dataSave.perguntas[0].letraRespostaCorreta)
	}

	proximaFase() {
		let s = this.state
		++s.dataSave.fase
		this.setState(s)
	}

	aumentaPontuacao(quantidadeASerIncrementada = 1) {
		let s = this.state
		s.dataSave.score = s.dataSave.score + quantidadeASerIncrementada
		this.setState(s)
	}

	abrirModal() {
		let s = this.state
		s.modalVisivel = true
		this.setState(s)
	}

  fechaModal() {
		let s = this.state
		s.modalVisivel = false
		this.setState(s)
	}

	moverPerguntaParaFinalDaLista() {
		let s = this.state
		s.dataSave.perguntas[0].voltarParaExplicacao = false
		s.dataSave.perguntas.push(s.dataSave.perguntas.shift())
		this.setState(s)
	}

	acabouPerguntas() {
		return (this.state.dataSave.perguntas.length - 1 === 0)
	}

	removerPerguntaDaLista() {
		let s = this.state
		if(!this.acabouPerguntas()) {
			s.dataSave.perguntas.shift()
		}
		this.setState(s)
	}

	seAcabouPerguntasRedirecionaParaCreditos() {
		if(!(!(this.state.dataSave.perguntas.length-1))) return
		this.props.navigation.navigate('Fim')
	}

	renderModal() {

		const imagemErrou = '../../images/errou.png'
		const imagemAcertou = '../../images/acertou.png'
		const imagemResposta = (this.state.referenciaSeErrouOuAcertouOModal) ? require(imagemAcertou) : require(imagemErrou)

		return (
			<Modal animationType="slide" transparent={false} visible={this.state.modalVisivel} onRequestClose={()=>{}}>
				<View style={styles.modal}>
					<Image source={imagemResposta} style={{width:'100%', height:'100%'}} />
				</View>
			</Modal>
		)

	}

	renderAlternativas() {
		return this.state.dataSave.perguntas[0].alternativas.map((alternativa, index)=>{
			return (
				<TouchableHighlight key={index} onPress={()=>this.processarResposta(letras[index])}	style={styles.alternatives}>
					<View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
						<View style={styles.circle}>
							<Text style={styles.fontComic, {fontSize: 20, textAlign: 'center', lineHeight: 46}}>
								{letras[index]}
							</Text>
						</View>
						<Text style={styles.fontComic}>
							{alternativa}
						</Text>
					</View>
				</TouchableHighlight>
			)
		})
	}

	renderPergunta() {
		return (
			<Text style={styles.textoPergunta}>
				{this.state.dataSave.perguntas[0].pergunta}
			</Text>
		)
	}

	renderImage() {
		return (<Image source={this.state.dataSave.perguntas[0].imagem} style={{position: 'absolute', top: 0, left: 0, width:'100%', height:'100%'}} />)
	}

	render() {
		if(this.state.dataSave === null) {
			return (
				<View>
					<Text>Carregando...</Text>
				</View>
			)
		}
		return (
			<View style={{flex:1, flexDirection: 'row'}}>
					{this.renderImage()}
					<View style={styles.areaPerguntas}>
						{this.renderPergunta()}
						{this.renderAlternativas()}
					</View>
					{this.renderModal()}
			</View>
		)
	}

}

const letras = ["A", "B", "C", "D"];