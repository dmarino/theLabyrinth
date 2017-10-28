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
		this.setState({
			busqueda: event.target.value,
		});
    }

    renderPartidas(){
        return this.props.partidas.filter(
        	t => t.autor.startsWith(this.state.busqueda)
        ).map((t,i)=>{
            return (
                <Partida key={i} partida={t}/>
            );        
        });
    }

    crearPartida(){
    	this.props.crearPartida("solo","no yo");
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