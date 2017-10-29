import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import "../styles/Inicio.css";

class Inicio extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="modal">
				<div className="modalContent">
			        <h1>¡BIENVENIDO A THE LABYRINTH!</h1>
			        <p>Este es un juego de laberinto que funciona con la extension chromevox</p>
			        <p>Para iniciar haz click en el siguiente link</p>
			        <a aria-label="Entrar al Laberinto" href="/inicio"> <img src="./images/seleccion.png" alt=""></img> <span> Entrar al laberinto </span></a>
			    </div>
			</div>
		);
	}
}

Inicio.PropTypes={

};

export default Inicio;