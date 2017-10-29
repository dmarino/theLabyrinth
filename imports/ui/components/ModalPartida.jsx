import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

class ModalPartida extends Component{

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
			        <Link  aria-label="Entrar al laberinto" to={{
					  pathname: '/inicio'
					}}> <img src="./images/seleccion.png" alt=""></img> <span> Entrar al laberinto </span> </Link>
			    </div>
			</div>
		);
	}
}

ModalPartida.PropTypes={

};

export default ModalPartida;