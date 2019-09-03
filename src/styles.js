import React,  { Component } from 'react';
import { StyleSheet, PixelRatio } from 'react-native';

var pixelRatio = PixelRatio.get()

if (pixelRatio === 1)
	var TEXTFONT = 15
else if (pixelRatio === 1.5) 
	var TEXTFONT = 17
else if (pixelRatio === 2)
	var TEXTFONT = 19
else if (pixelRatio === 3)
	var TEXTFONT = 20
else 
	var TEXTFONT = 21

export const styles = StyleSheet.create({
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
		fontSize: TEXTFONT,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	flechas: {
		flex:1,
		flexDirection: 'column',
		alignItems: 'flex-end',
		marginTop: 20,
	},
	flecha: {
		flex:1,
		flexGrow:1,
	},
	robo: {
		flex:6,
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	boxTalk: {
		flex: 4,
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: '90%'
	},
	areaPerguntas: {
		flex:1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: 'rgba(10,10,10,.5)',
		paddingTop: 30,
	},
	alternatives: {
		flex: 1,
		flexDirection: 'column',
		width: '90%',
		marginRight: 20,
	},
	modal: {
		flex: 1,
		flexDirection: 'column',
	},
	modalHeader: {
		flex:1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	modalFooter: {
		flex:1,
		justifyContent: 'flex-end',
		alignSelf: 'center',
	},
	texto: {
		fontSize: TEXTFONT,
		color: 'black',
		textAlign: 'center',
	},
	textoPergunta: {
		flex:1,
		width: '90%',
		fontSize: TEXTFONT,
		color: 'white',
		textAlign: 'center',
		marginLeft: 10,
		textShadowColor: 'rgb(0, 0, 0)',
		textShadowOffset: {width: -1, height: 1},
		textShadowRadius: 10,
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
		color: 'white',
		fontSize: TEXTFONT,
		textShadowColor: 'rgb(0, 0, 0)',
		textShadowOffset: {width: 1, height: 3},
		textShadowRadius: 1,
	},
});
