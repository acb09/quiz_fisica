import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Modal, Image, ScrollView } from 'react-native';
import { styles } from '../styles.js';
import { Perguntas } from '../Perguntas';
import {
    obterDataSave,
    gravarDataSave,
    atualizarDataSave,
} from '../Storage';

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
        // if(!this.acertou(letra)) this.errou()
        this.acertou(letra) || this.errou()
    }

    // adicionaPerguntaAcertadaAEstatistica() {
    // 	let s = this.state
    // 	s.dataSave.estatisticas.nacertos++;
    // 	s.dataSave.estatisticas.questoesqueacertou.push(this.state.dataSave.perguntas[0])
    // 	this.setState(s)
    // }

    adicionaPerguntaErradaAEstatistica() {
        let s = this.state
        s.dataSave.estatisticas.nerros++;
        s.dataSave.estatisticas.questoesqueerrou.push(this.state.dataSave.perguntas[0])
        this.setState(s)
    }

    acertou(letra) {
        let voltarParaExplicacao = this.state.dataSave.perguntas[0].voltarParaExplicacao
        let acertou = this.compararResposta(letra)

        // this.adicionaPerguntaAcertadaAEstatistica()

        this.atualizaReferenciaDoModal(acertou)
        if (!acertou) {
            return false
        }
        this.abrirModal()
        setTimeout(() => this.fechaModal(), 3000)
        this.seAcabouPerguntasRedirecionaParaCreditos(this.acabouPerguntas())
        if (!voltarParaExplicacao) {
            this.aumentaPontuacao()
            this.removerPerguntaDaLista()
            this.gravarDataSave()
            return acertou
        }
        this.aumentaPontuacao()
        this.proximaFase()
        this.removerPerguntaDaLista()
        this.gravarDataSave()
        setTimeout(() => this.props.navigation.goBack(null), 3000)
        return acertou
    }

    errou() {
        let voltarParaExplicacao = this.state.dataSave.perguntas[0].voltarParaExplicacao

        this.adicionaPerguntaErradaAEstatistica()

        this.abrirModal()
        setTimeout(() => this.fechaModal(), 3000)
        if (!voltarParaExplicacao) {
            this.moverPerguntaParaFinalDaLista()
            return true
        }
        this.moverPerguntaParaFinalDaLista()
        this.proximaFase()
        this.gravarDataSave()
        setTimeout(() => this.props.navigation.goBack(null), 3000)
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
        if (s.dataSave.dialogos.length - 1 == 0)
            return false
        s.dataSave.dialogos.shift();
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
        if (this.acabouPerguntas())
            return false

        let s = this.state
        s.dataSave.perguntas.shift()
        this.setState(s)
        return true
    }


    seAcabouPerguntasRedirecionaParaCreditos = () => {
        if (this.state.dataSave.perguntas.length - 1 == 0) 
            this.props.navigation.navigate('Fim')
    }


    renderModal = () => {
        const imagemErrou = '../../images/errou.png'
        const imagemAcertou = '../../images/acertou.png'
        const imagemResposta = (this.state.referenciaSeErrouOuAcertouOModal) ? require(imagemAcertou) : require(imagemErrou)
        
        return (
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisivel}>
                <View style = { styles.modal } >
                    <Image source = { imagemResposta } style = {{ width: '100%', height: '100%' }}/> 
                </View> 
            </Modal>
        );
    }

    render() {
        if (this.state.dataSave === null) {
            return ( 
                <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.texto}>Carregando...</Text> 
                </View>
            )
        }
        return ( 
            <View style={styles.window}> 
                <Image source={this.state.dataSave.perguntas[0].imagem} style={styles.windowBackgroundImage}/>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,.4)' }}>
                    <ScrollView>
                        <View style={styles.areaPerguntas}> 
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 21, fontWeight: 'bold', textAlign: 'center', lineHeight: 50, backgroundColor: 'white', borderRadius: 50, height: 50, width: '100%', paddingHorizontal: 15, marginVertical: 10 }}> 
                                    { Perguntas.length - this.state.dataSave.perguntas.length } de { Perguntas.length } perguntas 
                                </Text> 
                            </View>
                            <Text style={styles.textoPergunta}> 
                                { this.state.dataSave.perguntas[0].id }) 
                                { this.state.dataSave.perguntas[0].pergunta } 
                            </Text>
                            {this.state.dataSave.perguntas[0].alternativas.map((alternativa, index) => (
                                <TouchableHighlight key={index} onPress={() => this.processarResposta(letras[index])} style={styles.alternatives}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.circle}>
                                            <Text style={ styles.fontComic, { fontSize: 20, textAlign: 'center', lineHeight: 46 }}>
                                                {letras[index]}
                                            </Text> 
                                        </View> 
                                        <Text style={styles.fontComic}> 
                                            { alternativa } 
                                        </Text> 
                                    </View> 
                                </TouchableHighlight>
                            ))}
                        </View> 
                    </ScrollView> 
                </View>
        {this.renderModal()} 
            </View>
        )
    }

}

const letras = ["A", "B", "C", "D"];