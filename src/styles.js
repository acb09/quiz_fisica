import React, { Component } from 'react';
import { StyleSheet, PixelRatio } from 'react-native';

var pixelRatio = PixelRatio.getFontScale()

if (pixelRatio < 2)
	var TEXTFONT = 20

export const styles = StyleSheet.create({
	backgroundImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: -10,
	},
	imagesInBackground: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
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
		alignSelf: 'center',
		alignItems: 'center',
		alignContent: 'center',
		height: 'auto',
		padding: 20,
		backgroundColor: 'rgba(255,255,255,0.8)',
		width: '90%',
	},
	fim: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		width: '90%',
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
		fontSize: TEXTFONT,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	flechas: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: -150,
		marginBottom: 50,
	},
	flecha: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: '#10ac84',
		borderRadius: 100,
		width: 50,
		padding: 30,
		marginRight: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	robo: {
		flex: 6,
		marginTop: 40,
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
	},
	boxTalk: {
		flex: 4,
		padding: 20,
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: '90%',
		borderRadius: 5
	},
	window: {
		flex: 1,
		flexDirection: 'column',
		overflow: 'scroll',
	},
	windowBackgroundImage: {
		position: 'absolute', 
		top: 0, 
		left: 0, 
		width: '100%', 
		height: '100%'
	},
	areaPerguntas: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'flex-start',
		paddingBottom: 20,
	},
	textoPergunta: {
		flex: 1,
		width: '90%',
		fontSize: TEXTFONT,
		color: 'white',
		textAlign: 'center',
		marginLeft: 10,
		marginBottom: 50,
		textShadowColor: 'rgb(0, 0, 0)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	alternatives: {
		flex: 1,
		flexDirection: 'column',
		width: '90%',
		marginRight: 20,
		marginBottom: 20,
	},
	modal: {
		flex: 1,
		flexDirection: 'column',
	},
	modalHeader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	modalFooter: {
		flex: 1,
		justifyContent: 'flex-end',
		alignSelf: 'center',
	},
	texto: {
		fontSize: TEXTFONT,
		color: 'black',
		textAlign: 'center',
	},
	circle: {
		borderWidth: 2,
		borderColor: '#000000',
		borderRadius: 50,
		width: 50,
		height: 50,
		backgroundColor: 'white',
	},
	fontComic: {
		marginLeft: 20,
		marginRight: 20,
		color: '#ddd',
		fontSize: TEXTFONT,
		textShadowColor: 'rgb(0, 0, 0)',
		textShadowOffset: { width: 2, height: 3 },
		textShadowRadius: 3,
	},


	formData: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		fontSize: TEXTFONT,
		height: 80,
		width: '90%',
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#ccc',
		textAlign: 'center',
		marginBottom: 20,
	},
});
