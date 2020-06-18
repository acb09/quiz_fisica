import React, { Component } from 'react';
import { View, ActivityIndicator, TouchableHighlight, Image, BackHandler, Text } from 'react-native';
import { GetAsyncStorage, SaveAsyncStorage, ResetOrInitAsyncStorage } from '../Storage';
import { styles } from '../styles';
import Perguntas from '../Perguntas';

export default class Fim extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = { dataSave: this.props.navigation.state.params, lock: true };
        this.SaveAsyncStorage = SaveAsyncStorage.bind(this);
        this.GetAsyncStorage = GetAsyncStorage.bind(this);
        this.ResetOrInitAsyncStorage = ResetOrInitAsyncStorage.bind(this);
    }

    componentDidMount() {
        this.SaveAsyncStorage(this.state.dataSave);
        let enviaDadosAteObterSucesso = setInterval(() => {
            if (this.enviarEstatisticas())
                clearInterval(enviaDadosAteObterSucesso)
        }, 5000)
    }

    enviarEstatisticas() {

        if (this.state.dataSave == false) return false
        if (this.state.dataSave.relatorioEnviado == true) return false

        // let url = "http://192.168.0.150/process.php"
        const url = "https://dashjogofisica.000webhostapp.com/process.php"
        const { nome, estatisticas: { questoesqueerrou }, system: { info: { IMEI } }, perguntas } = this.state.dataSave;
        const relatorio = {
            nome: nome,
            questoesqueerrou: questoesqueerrou,
            IMEI: IMEI,
            maxPerguntas: Perguntas.length,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(relatorio),
        })
            .then((response) => {
                response.text().then(async (text) => {
                    console.warn(text);
                    let s = this.state
                    s.lock = false
                    s.dataSave.score = Perguntas.length;
                    this.setState(s)
                    let status = await this.SaveAsyncStorage(s.dataSave) ? true : false
                    return status;
                })
            })
            .catch(error => {
                console.warn("Falha ao enviar!");
                BackHandler.exitApp();
            })
    }

    async finalizar() {
        await this.ResetOrInitAsyncStorage(); // Em produção, enviar TRUE como verdadeiro
        BackHandler.exitApp();
    }

    render() {
        console.warn(this.state.dataSave.relatorioEnviado);
        if (this.state.lock)
            return (
                <View style={{ flex: 1 }} >
                    <View style={styles.fim} >
                        <Text style={{ fontSize: 20 }}>Coletando os dados!</Text>
                        <Text style={{ fontSize: 20 }}>Aguarde um momento!</Text>
                        <ActivityIndicator size="large" color="#0000ff" style={{ width: 20 }} />
                    </View>
                </View>
            );
        return (
            <View style={{ flex: 1 }} >
                <Image source={require('../../images/fases/fim.png')} style={styles.backgroundImage} />
                <View style={styles.fim} >
                    <TouchableHighlight onPress={() => this.finalizar()} style={{ position: 'absolute', top: '58%' }} >
                        <Image style={styles.button} source={require('../../images/button_end.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}