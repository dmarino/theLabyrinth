import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import Search from "./Search.jsx";
import Partida from "./Partida.jsx";

import "../styles/Lista.css";

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
    	if(this.props.partidas === undefined)
    		return (<div>No hay partidas</div>);
        return this.props.partidas.filter(
        	t => (t.autor.startsWith(this.state.busqueda) && t.tipo != "solo")
        ).map((t,i)=>{
            return (
                <Partida 
                    key={i} 
                    partida={t}
                    entrarPartida={(partida) => { this.entrarPartida(partida) }}	
                />
            );        
        });
    }

    crearPartida(){
    	this.props.crearPartida("coop","yo");
    }	

    entrarPartida(partida){
    	this.props.entrarPartida(partida,"no yo");
    }    

	render(){
		return (
			<div id="lista">
			    <h2>Partidas Actuales</h2>
			    <input className="input" type="text" placeholder="Usuario" onChange={this.handleChange}></input>
			    
				<Link to={{
				  pathname: '/juego'
				}}
				onClick={() => { this.crearPartida()}}> Crear Nueva Partida </Link>
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