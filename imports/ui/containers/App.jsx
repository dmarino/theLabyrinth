import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";

import "../styles/App.css";

import Lista from "../components/Lista.jsx";

import {Laberintos} from "../../api/laberintos.js";
import {Partidas} from "../../api/partidas.js";

class App extends Component{

	constructor(props){
		super(props);
		this.state={
		    jugar:false,
		    juegoActual:{}
		};
	}

	crearPartida(tipoL, nombre){
        if(this.props.laberintos.length!=0){

	        laberinto = this.props.laberintos[Math.floor(Math.random()*(this.props.laberintos.length-1))]

	        Partidas.insert({
		        autor: nombre, 
		        laberinto: laberinto._id,
		        tipo: tipoL
		    });

		    partida = Partidas.find({"autor":this.state.nombre}).fetch()[0];

		    this.setState({
		        jugar:true,
		        juegoActual:partida
		    });
        }
    }	

	render(){
		return (
			<div id="App">
		        <div>
		            { this.state.jugar?
			            <h1>Juega</h1>
			        :
			            <Lista
			                partidas={this.props.partidas}
			                crearPartida={() => { this.crearPartida() }}
			            > 
			            </Lista>
			        }
		        </div>
		        		
			</div>
		);
	}
}

App.PropTypes={
    laberintos: PropTypes.array.isRequired,
    partidas: PropTypes.array.isRequired,
};

export default createContainer(()=>{
	return{
	    laberintos: Laberintos.find({}).fetch(),
	    partidas: Partidas.find({}).fetch(),
	};
},App);