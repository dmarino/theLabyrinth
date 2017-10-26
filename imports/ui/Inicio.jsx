import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import "./styles/Inicio.css";

class Inicio extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="modal">
				<div className="modalContent">
			        <h1>¡Bienvenido a the labyrinth!</h1>
			        <p>Este es un juego de laberinto que funciona con la extension chromevox.</p>
			        <p>Para iniciar haz click en el boton siguiente</p>
			        <button onClick={this.props.inicio}>Siguiente</button>
			    </div>
			</div>
		);
	}
}

Inicio.PropTypes={
	estado: PropTypes.func.isRequired,
};

export default Inicio;