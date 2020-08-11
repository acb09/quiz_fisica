import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Modal, Image, ScrollView } from 'react-native';
import { styles } from '../styles.js';
import Perguntas from '../Perguntas';
import { GetAsyncStorage, SaveAsyncStorage } from '../Storage';

export default class Jogo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisivel: false,
            referenciaSeErrouOuAcertouOModal: false,
            dataSave: this.props.navigation.state.params,
        }
        this.abrirModal = this.abrirModal.bind(this)
        this.fechaModal = this.fechaModal.bind(this)
        this.SaveAsyncStorage = SaveAsyncStorage.bind(this)
        this.GetAsyncStorage = GetAsyncStorage.bind(this)
    }

    static navigationOptions = {
        header: null,
    };

    async processarResposta(letra) {
        if (this.compararResposta(letra)) {
            await this.acertou()
        } else {
            await this.errou()
        }
    }

    adicionaPerguntaErradaAEstatistica() {
        let s = this.state;
        s.dataSave.estatisticas.nerros++;
        s.dataSave.estatisticas.questoesqueerrou.push(this.state.dataSave.perguntas[0].id);
        this.setState(s);
    }

    async acertou() {
        let voltarParaExplicacao = this.state.dataSave.perguntas[0].voltarParaExplicacao
        this.atualizaReferenciaDoModal(true)
        this.abrirModal()
        await setTimeout(() => this.fechaModal(), 3000)
        this.seAcabouPerguntasRedirecionaParaCreditos()
        this.aumentaPontuacao()
        this.removerPerguntaDaLista()
        if (!voltarParaExplicacao) {
            await this.SaveAsyncStorage(this.state.dataSave);
            return true
        }
        if (this.acabouPerguntas()) return true;
        this.proximaFase();
        await this.SaveAsyncStorage(this.state.dataSave);
        setTimeout(() => this.props.navigation.navigate('Explicacao', this.state.dataSave), 3000);
        return true;
    }

    async errou() {
        this.atualizaReferenciaDoModal(false)
        let voltarParaExplicacao = this.state.dataSave.perguntas[0].voltarParaExplicacao
        this.adicionaPerguntaErradaAEstatistica()
        this.abrirModal()
        await setTimeout(() => this.fechaModal(), 3000)
        if (!voltarParaExplicacao) {
            this.moverPerguntaParaFinalDaLista()
            return true
        }
        if (this.acabouPerguntas()) return true;
        this.moverPerguntaParaFinalDaLista()
        this.proximaFase()
        await this.SaveAsyncStorage(this.state.dataSave);
        setTimeout(() => this.props.navigation.navigate('Explicacao', this.state.dataSave), 3000);
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

    removerPerguntaDaLista() {
        if (this.acabouPerguntas())
            return false

        let s = this.state
        s.dataSave.perguntas.shift()
        this.setState(s)
        return true
    }

    acabouPerguntas() {
        return (this.state.dataSave.perguntas.length - 1 === 0)
    }

    seAcabouPerguntasRedirecionaParaCreditos = () => {
        if (this.acabouPerguntas())
            this.props.navigation.navigate('Fim', this.state.dataSave)
    }


    renderModal = () => {
        const imagemErrou = '../../images/errou.png'
        const imagemAcertou = '../../images/acertou.png'
        const imagemResposta = (this.state.referenciaSeErrouOuAcertouOModal) ? require(imagemAcertou) : require(imagemErrou)

        return (
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisivel}>
                <View style={styles.modal} >
                    <Image source={imagemResposta} style={{ width: '100%', height: '100%' }} />
                </View>
            </Modal>
        );
    }


    render() {

        if (this.state.dataSave === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.texto}>Carregando...</Text>
                </View>
            )
        }

        return (
            <View style={styles.window}>
                <Image source={this.state.dataSave.perguntas[0].imagem} style={styles.windowBackgroundImage} />
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,.0)' }}>

                    <View style={styles.areaPerguntas}>

                        <View style={{ flex: 1, justifyContent: 'flex-start', alignSelf: 'center', flexWrap: 'wrap' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', backgroundColor: 'white', opacity: .7, borderRadius: 50, paddingHorizontal: 5 }}>
                                {parseInt(Perguntas.length) - parseInt(this.state.dataSave.perguntas.length)}/{Perguntas.length}
                            </Text>
                        </View>

                        <View style={{ flex: 5, alignItems: 'flex-start', justifyContent: 'flex-start' }}>

                            <ScrollView>
                                <Text style={styles.textoPergunta}>
                                    {this.state.dataSave.perguntas[0].id}) {this.state.dataSave.perguntas[0].pergunta}
                                </Text>
                            </ScrollView>

                            <View style={{ flex: 11 }}>
                                <ScrollView style={{ flex: 3 }}>
                                    {this.state.dataSave.perguntas[0].alternativas.map((alternativa, index) => (

                                        <TouchableHighlight key={index} onPress={() => this.processarResposta(letras[index])} style={styles.alternatives}>
                                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                <View style={styles.circle}>
                                                    <Text style={styles.fontComic, { fontSize: 20, textAlign: 'center', lineHeight: 40 }}>
                                                        {letras[index]}
                                                    </Text>
                                                </View>
                                                <Text style={styles.fontComic}>
                                                    {alternativa}
                                                </Text>
                                            </View>
                                        </TouchableHighlight>

                                    ))}
                                </ScrollView>
                            </View>

                        </View>
                    </View>

                </View>
                {this.renderModal()}
            </View>
        )
    }

}

const letras = ["A", "B", "C", "D"];