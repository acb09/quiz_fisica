import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { GetAsyncStorage, SaveAsyncStorage, ResetOrInitAsyncStorage } from '../Storage';
import { styles } from '../styles';
import Perguntas from '../Perguntas';
import Dialogos from '../Dialogos';

export default class Fim extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { dataSave: this.props.navigation.state.params }
        this.SaveAsyncStorage = SaveAsyncStorage.bind(this)
        this.GetAsyncStorage = GetAsyncStorage.bind(this)
    }

    componentDidMount() {
        this.SaveAsyncStorage(this.state.dataSave);
        let enviaDadosAteObterSucesso = setInterval(() => {
            if (this.enviarEstatisticas()) 
                clearInterval(enviaDadosAteObterSucesso)
        },
        5000);
    }

    async reset() {
        let s = this.state
        s.dataSave.fase = 0
        s.dataSave.perguntas = Perguntas
        s.dataSave.dialogos = Dialogos
        s.relatorioEnviado = true
        this.setState(s)
        await this.SaveAsyncStorage(s.dataSave)
        return true
    }

    enviarEstatisticas() {

        if (this.state.dataSave == false) return false
        if (this.state.dataSave.relatorioEnviado == true) return false
        
        // let url = "http://192.168.0.105/process.php"
        let url = "https://dashjogofisica.000webhostapp.com/process.php"
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.dataSave),
        })
        .then( (response) => {
            response.text().then(async (res) => { 
                console.warn(res) 
                let s = this.state
                s.dataSave.relatorioEnviado = true
                this.setState(s)
                let result = await this.SaveAsyncStorage(s.dataSave)
                return result;
            })
        })
        .catch(error => {
            console.warn("Falha ao enviar!")
            return false
        })
    }

    async finalizar() {
        await this.reset()
        setTimeout(() => this.props.navigation.navigate('Menu', this.state.dataSave), 2000)
    }

    render() {
        return ( 
            <View style = {{ flex: 1 }} >
                <Image source = { require('../../images/fases/fim.png') } style = { styles.backgroundImage }/> 
                <View style = { styles.fim } >
                    <TouchableHighlight onPress = {() => this.finalizar()} style = {{ position: 'absolute', top: '58%' }} >
                        <Image style = { styles.button } source = { require('../../images/button_end.png') }/> 
                    </TouchableHighlight> 
                </View> 
            </View>
        );
    }
}