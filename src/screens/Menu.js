import React,  { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, BackHandler, Image } from 'react-native';
import { criarDataSaveSeNaoExistir, obterDataSave, gravarDataSave, atualizarDataSave } from '../myAsyncStorage'
import { AsyncStorage } from 'react-native'
import { Perguntas } from '../Perguntas'

export default class Menu extends Component {

	constructor(props) {
		super(props)		
		this.state = {dataSave: null}
		this.obterDataSave = obterDataSave.bind(this)
		this.atualizarDataSave = atualizarDataSave.bind(this)
		this.gravarDataSave = gravarDataSave.bind(this)
	}

	static navigationOptions = {
		header: null,
	};

	componentDidMount() {
		this.obterDataSave()
		this.atualizarDataSave()
	}

	reset() {
		alert("As configurações padrões foram definidas.")
		if(this.state.dataSave === null) return false
		let s = this.state
		s.dataSave.fase = 0
		s.dataSave.score = 0
		s.dataSave.perguntas = Perguntas
		this.gravarDataSave()
		return true
	}

	render() {
		if(this.state.dataSave === null) 
			return (<View><Text>Carregando...</Text></View>)
		return (
			<View style={{flex:1}}>
				<Image source={require('../../images/galaxia.png')} style={styles.backgroundImage} />
				<View style={styles.imagesInBackground}>
					<View>
						<Image source={require('../../images/lua.png')} style={styles.lua} />
					</View>
					<View>
						<Image source={require('../../images/world.png')} style={styles.world} />
					</View>
				</View>
				<View style={styles.menu}>
					<TouchableHighlight onPress={()=>this.props.navigation.navigate('Explicacao')}>
				      <Image style={styles.button} source={require('../../images/button_play.png')}/>
				    </TouchableHighlight>
					<TouchableHighlight onPress={()=>BackHandler.exitApp()}>
				      <Image style={styles.button} source={require('../../images/button_exit.png')}/>
				    </TouchableHighlight>
					<TouchableHighlight onPress={()=>this.reset()}>
				      <Image style={styles.button} source={require('../../images/button_reset.png')}/>
				    </TouchableHighlight>
				</View>
				<Text style={{
					color: 'white',
					fontSize: 23,
					textAlign: 'center',
					marginBottom: 50,
				}}>
					Sua pontuação: {(this.state.dataSave !== null) ? this.state.dataSave.score : 0}
				</Text>
			</View>
		);
	}

}



const styles = StyleSheet.create({
	backgroundImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: -10,
	},
	imagesInBackground: {
		flex:1,
		flexDirection: 'row',
		justifyContent:
		'space-between'
	},
	lua: {
		width: 50,
		height: 100,
		marginLeft: 50,
		marginTop: 10,
	},
	world: {
		width: 100,
		height: 100,
		marginRight: 50,
		marginTop: 50,
	},
	menu: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 200,
		height: 50,
		marginBottom: 10,
	},
	scores: {
		flex: 1,
		zIndex: 10,
		color: 'white',
		fontSize: 25,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},

});
