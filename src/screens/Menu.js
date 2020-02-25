import React, { Component } from 'react';
import { View, Text, TouchableHighlight, BackHandler, Image, TextInput, Button, ScrollView } from 'react-native';
import { GetAsyncStorage, SaveAsyncStorage , ResetOrInitAsyncStorage } from '../Storage';
import { styles } from '../styles';

export default class Menu extends Component {

	constructor(props) {
		super(props)
		this.state = { dataSave: null, nomeForm: '' }
		this.GetAsyncStorage = GetAsyncStorage.bind(this)
		this.SaveAsyncStorage = SaveAsyncStorage.bind(this)
		this.buttonRegister = this.buttonRegister.bind(this)
	}

	static navigationOptions = {
		header: null,
	};

	async componentDidMount() {
		let s = this.state;
		s.dataSave = await this.GetAsyncStorage();
		this.setState(s);
	}

	modeDevStepStage(n) {
		let s = this.state
		s.dataSave.score = n
		s.dataSave.fase = n
		for (let i = 0; i < n; i++)
			s.dataSave.perguntas.shift()
		for (let i = 0; i < (n / 2) - 1; i++)
			s.dataSave.dialogos.shift()
		this.setState(s);
		this.asSave();
	}

	async buttonRegister() {
		let s = this.state
		if (this.state.nomeForm == "") return alert("Você precisa digitar um nome!");
		if (this.state.nomeForm.split(" ").length < 2 || this.state.nomeForm[this.state.nomeForm.length - 1] == " ") 
			return alert("Você digitou apenas o primeiro nome.")
		s.dataSave.nome = this.state.nomeForm;
		this.setState(s);
		await this.gravarDataSave();
	}

	reset() {
		alert("Todas as configurações foram reiniciadas")
		// if (this.state.dataSave === null) return false
		// let s = this.state
		// s.nomeForm = ""
		// s.dataSave = dataSaveDefault
		// this.setState(s);
		// this.gravarDataSave()
		// // this.modeDevStepStage(15)
		ResetOrInitAsyncStorage();
	}

	render() {

		if (this.state.dataSave === null) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.texto}>Carregando...</Text>
				</View>
			)
		}

		// setTimeout(()=>console.warn(this.state.dataSave.dialogos), 5000)
		if (this.state.dataSave.nome === "Convidado") {
			return (
				<View style={styles.formData}>

					<Text style={{ fontSize: 20, width: '70%', textAlign: 'center', lineHeight: 30 }}>
						Olá!
					</Text>
					<Text style={{ fontSize: 20, width: '70%', textAlign: 'center', lineHeight: 30, marginBottom: 50 }}>
						Primeiro precisamos registrar você.
						Está informação é importante visto que ela é sua identificação na hora de aplicar a nota.
					</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Digite seu nome completo"
						autoCapitalize="words"
						onChangeText={(nomeForm) => this.setState({ nomeForm })}
						value={this.state.nomeForm}
					></TextInput>
					<Button title="Registrar" onPress={this.buttonRegister}></Button>
				</View>
			)
		}

		return (
			<View style={[styles.window]}>
				<Image source={require('../../images/galaxia.png')} style={styles.backgroundImage} />
				<View style={styles.imagesInBackground}>
					<View>
						<Image source={require('../../images/lua.png')} style={styles.lua} />
					</View>
					<View>
						<Image source={require('../../images/world.png')} style={styles.world} />
					</View>
				</View>
				<ScrollView>
					<View style={styles.menu}>
						<Text style={{ color: 'white', fontSize: 25, color: 'black', marginBottom: 20 }}>Bem-vindo {this.state.dataSave.nome.substr(0, this.state.dataSave.nome.indexOf(' '))}</Text>
						<TouchableHighlight onPress={() => this.props.navigation.navigate('Explicacao')}>
							<Image style={styles.button} source={require('../../images/button_play.png')} />
						</TouchableHighlight>
						<TouchableHighlight onPress={() => BackHandler.exitApp()}>
							<Image style={styles.button} source={require('../../images/button_exit.png')} />
						</TouchableHighlight>
						<TouchableHighlight onPress={() => this.reset()}>
							<Image style={styles.button} source={require('../../images/button_reset.png')} />
						</TouchableHighlight>
						<Text style={{
							color: 'black',
							fontSize: 23,
							textAlign: 'center',
						}}>
							Sua pontuação: {(this.state.dataSave !== null) ? this.state.dataSave.score : 0}
						</Text>
					</View>
				</ScrollView>
			</View>
		);
	}

}