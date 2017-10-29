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
                <p> Para iniciar una partida puedes hacer click en el link crear nueva partida. También puedes buscar una partida existente por el jugador 1 o seleccionar una partida de la lista de partidas actuales.</p>   
                <h1>Partidas Actuales</h1>
                <div id="contenedorLista">
                    <div id="headerLista">
                        <input id="nombre" aria-label="Buscar partida por jugador 1" className="input" type="text" placeholder="Nombre Jugador 1" onChange={this.handleChange}></input>               
                    </div> 
				    <Link 
                        id ="crearNueva"
                        aria-label="Crear nueva Partida"
					    to={{
				            pathname: '/juego'
				        }}
				        onClick={() => { this.crearPartida()}}
                    > 
                        <span aria-hidden="true">+</span>
					</Link>                                                                 
                    <div id="contenidoLista">           
                        {this.renderPartidas()}
                    </div>
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