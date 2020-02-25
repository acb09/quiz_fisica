import React, { Component } from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { gravarDataSave, obterDataSave, atualizarDataSave } from '../Storage';
import { styles } from '../styles';
import { Perguntas } from '../Perguntas';
import { Dialogos } from '../Dialogos';

export default class Fim extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = { dataSave: null }
        this.obterDataSave = obterDataSave.bind(this)
        this.atualizarDataSave = atualizarDataSave.bind(this)
        this.gravarDataSave = gravarDataSave.bind(this)
    }

    componentDidMount() {
        this.obterDataSave()
        this.atualizarDataSave()
        this.gravarDataSave()
        let enviaDadosAteObterSucesso = setInterval(() => {
            if (this.state.dataSave.relatorioEnviado) 
                clearInterval(enviaDadosAteObterSucesso)
            else 
                this.enviarEstatisticas()
        },
        5000);
    }

    reset() {
        if (this.state.dataSave === null) 
            return false
        let s = this.state
        s.dataSave.fase = 0
        s.dataSave.perguntas = Perguntas
        s.dataSave.dialogos = Dialogos
        s.relatorioEnviado = true
        this.setState(s)
        this.gravarDataSave()
        return true
    }

    enviarEstatisticas() {

        if (!this.state.dataSave) return false
        if (this.state.dataSave.relatorioEnviado) return false
        
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
            response.text().then((res) => { 
                console.warn(res) 
                let s = this.state
                s.dataSave.relatorioEnviado = true
                this.setState(s)
                this.gravarDataSave()
            })
        })
        .catch(error => {
            console.warn("Falha ao enviar!")
        })

    }

    async finalizar() {
        this.reset()
        setTimeout(() => this.props.navigation.navigate('Menu'), 2000)
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