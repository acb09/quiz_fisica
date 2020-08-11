import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import { styles } from '../styles';

export default class Explicacao extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dialogos: '...',
            indiceDialogos: 0,
            dataSave: this.props.navigation.state.params,
            mount: false,
        }
        this.irParaPerguntas = this.irParaPerguntas.bind(this)
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        setInterval(() => this.obterTodosDialogos(), 500);
    }

    obterTodosDialogos() {
        if (this.state.dataSave === null) {
            return false
        }
        let s = this.state
        let concatenacaoDeDialogos = ""
        for (let i = 0; i < this.state.dataSave.dialogos[0].length; i++) {
            concatenacaoDeDialogos += this.state.dataSave.dialogos[0][i] + "\n"
            this.setState(s)
        }
        s.dialogos = concatenacaoDeDialogos
        this.setState(s)
        this.reiniciarDialogoAtual()
        return true
    }

    reiniciarDialogoAtual() {
        let s = this.state;
        s.indiceDialogos = 0;
        this.setState(s);
    }

    dialogoAcabou() {
        return (!this.state.dataSave.dialogos[0][0].length);
    }

    irParaPerguntas() {
        this.scrollListReftop.scrollTo({ x: 0, y: 0, animated: false });
        this.props.navigation.navigate('Jogo', this.state.dataSave);
    }

    render() {
        if (this.state.dataSave === null) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.texto} > Carregando... </Text>
                </View>
            )
        }

        if (!this.state.dataSave.nome) {
            return (
                <View style={styles.formData} >
                    <Text style={{ fontSize: 20, width: '70%', textAlign: 'center', lineHeight: 30 }} >Olá!</Text>
                    <Text style={{ fontSize: 20, width: '70%', textAlign: 'center', lineHeight: 30, marginBottom: 50 }}>
                        Primeiro precisamos registrar você.Está informação é importante visto que ela é sua identificação na hora de aplicar a nota.
                    </Text>
                    <TextInput style={styles.textInput}
                        placeholder="Digite seu nome completo"
                        autoCapitalize="words"
                        onChangeText={
                            (nomeForm) => this.setState({ nomeForm })
                        }
                        value={this.state.nomeForm}>
                    </TextInput>
                    <Button title="Registrar" onPress={this.buttonRegister}> </Button>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image source={ImagemFundo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                <View style={styles.boxTalk} >
                    <ScrollView ref={(ref) => { this.scrollListReftop = ref; }}>
                        <Text style={styles.texto}>{this.state.dialogos}</Text>
                    </ScrollView>
                </View>
                <View style={styles.robo} >
                    <Image source={ImagemRobo} />
                </View>
                <View style={styles.flechas} >
                    <TouchableHighlight style={styles.flecha} onPress={this.irParaPerguntas}>
                        <Image source={require('../../images/seta_direita.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const ImagemRobo = require('../../images/robo.png')
const ImagemFundo = require('../../images/galaxia.png')