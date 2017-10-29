import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";
import { Switch, Route } from 'react-router-dom'

import "../styles/App.css";

import Lista from "../components/Lista.jsx";
import Juego from "../components/Juego.jsx";

class Principal extends Component{

	constructor(props){
		super(props);
		this.state={
		    estado:"inicio",
		    juegoActual:{},
		    jugador:0
		};
	}

	crearPartida(tipoL, nombre){
	    this.props.crearPartida(tipoL, nombre);
    }

    entrarPartida(partida, nombre){
        this.props.entrarPartida(partida,nombre);
    }

	render(){
		return (
			<div id="Principal">
		        <div>
			        <Lista
			            partidas={this.props.partidas}
			            partidaActual={this.props.partidaActual}
		                crearPartida={(tipoL,nombre) => { this.crearPartida(tipoL,nombre) }}
			            entrarPartida={(partida,nombre) => { this.entrarPartida(partida,nombre) }}			                
	                > 
		            </Lista>
		        </div>
		        		
			</div>
		);
	}
}

Principal.PropTypes={
    laberintos: PropTypes.array.isRequired,
    partidas: PropTypes.array.isRequired,
};

export default Principal