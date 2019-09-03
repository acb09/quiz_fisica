import React,  { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { gravarDataSave, obterDataSave, atualizarDataSave } from '../myAsyncStorage'
import { styles } from '../styles'
import { Perguntas } from '../Perguntas'
import AsyncStorage from '@react-native-community/async-storage';

export default class Fim extends Component {

	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props)
		this.state = {dataSave: null}

		this.obterDataSave = obterDataSave.bind(this)
		this.atualizarDataSave = atualizarDataSave.bind(this)
		this.gravarDataSave = gravarDataSave.bind(this)

	}

	componentDidMount() {
		this.obterDataSave()
		this.atualizarDataSave()
		this.gravarDataSave()
		let time = setInterval(()=>{

			if (this.reset()) 
				clearInterval(time)

		}, 100);
	}

	reset() {
		if(this.state.dataSave === null) return false
		let s = this.state
		s.dataSave.fase = 0
		s.dataSave.perguntas = Perguntas
		this.gravarDataSave()
		return true
	}

	finalizar() {
		setTimeout(()=>this.props.navigation.navigate('Menu'), 2000)
	}

	render() {
		return (
			<View style={{flex:1}}>
				<Image source={require('../../images/fases/fim.png')} style={styles.backgroundImage} />
				<View style={styles.menu}>
					<TouchableHighlight onPress={()=>this.finalizar()} style={{position: 'absolute', top: '58%'}}>
				    	<Image style={styles.button} source={require('../../images/button_end.png')}/>
				    </TouchableHighlight>
				</View>
			</View>
		);
	}
}
