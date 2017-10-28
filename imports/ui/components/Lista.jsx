import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import Search from "./Search.jsx";
import Partida from "./Partida.jsx";

class Lista extends Component{

	constructor(props){
		super(props);
		this.state = {
		    busqueda:""
		}
	}

	handleChange = (event) => {
		console.log(event.target.value);
    }

    renderPartidas(){
        return this.props.partidas.map((t,i)=>{
            return (
                <Partida key={i} partida={t}/>
            );        
        });
    }

    crearPartida(){
    	this.props.crearPartida(1,"yo");
    }	

	render(){
		return (
			<div id="lista">
			    <h2>Partidas Actuales</h2>
			    <input className="input" type="text" placeholder="Usuario" onChange={this.handleChange}></input>
			    <a onClick={() => { this.crearPartida()}}>Crear Nueva Partida</a>
		        <div id="contenidoLista">
		            {this.renderPartidas()}
		        </div>
			</div>
		);
	}
}

Lista.PropTypes={
    partidas: PropTypes.array.isRequired,
    crearPartida: PropTypes.func.isRequired,    
};

export default Lista;