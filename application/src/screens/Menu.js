import React, { Component } from 'react';
import { View, Text, TouchableHighlight, BackHandler, Image, TextInput, Button, ScrollView } from 'react-native';
import { GetAsyncStorage, SaveAsyncStorage, ResetOrInitAsyncStorage } from '../Storage';
import validarNome from '../functions/validadorNomes';
import requestReadPhoneStatePermission from '../functions/requestReadPhoneStatePermission';
import getIMEI from '../functions/getIMEI';

import { styles } from '../styles';

export default class Menu extends Component {

	constructor(props) {
		super(props);
		this.state = { dataSave: null, nomeForm: null };
		this.GetAsyncStorage = GetAsyncStorage.bind(this);
		this.SaveAsyncStorage = SaveAsyncStorage.bind(this);
		this.buttonRegister = this.buttonRegister.bind(this);
		this.fechaOAplicativoSeNaoPermitirAcessoAoTelefone = this.fechaOAplicativoSeNaoPermitirAcessoAoTelefone.bind(this);
	}

	static navigationOptions = {
		header: null,
	};

	async componentWillMount() {
		let s = this.state;
		s.dataSave = this.props.navigation.state.params || await this.GetAsyncStorage();
		this.setState(s);
	}

	async componentDidMount() {
		const granted = await requestReadPhoneStatePermission();

		if (granted) {
			let s = this.state;
			s.dataSave.system.info.IMEI = await getIMEI();
			this.setState(s);
		} else {
			await this.fechaOAplicativoSeNaoPermitirAcessoAoTelefone(granted);
		}
	}

	async buttonRegister() {
		const s = this.state;
		const nomeValido = validarNome(this.state.nomeForm);

		if (nomeValido == 1)
			return alert("Você precisa preencher o nome!");
		if (nomeValido == 2)
			return alert("É necessário o nome completo!");

		s.dataSave.nome = this.state.nomeForm;
		this.setState(s);
		await SaveAsyncStorage(s.dataSave);
	}

	async reset() {
		alert("Redefinindo app!")
		ResetOrInitAsyncStorage();
		let s = this.state;
		s.nomeForm = null;
		s.dataSave = await this.GetAsyncStorage();
		this.setState(s);
	}

	fechaOAplicativoSeNaoPermitirAcessoAoTelefone = (granted) => (!granted) ? BackHandler.exitApp() : false;

	render() {
		if (this.state.dataSave == null) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.texto}>Carregando...</Text>
				</View>
			)
		}
		if (this.state.dataSave.nome == null) {
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
					<Button title="Pronto" onPress={this.buttonRegister}></Button>
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
						<Text style={{ color: 'white', fontSize: 25, color: 'black', marginBottom: 20 }}>
							Bem-vindo {this.state.dataSave.nome.substr(0, this.state.dataSave.nome.indexOf(' '))}
						</Text>
						<TouchableHighlight onPress={() => this.props.navigation.navigate('Explicacao', this.state.dataSave)}>
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