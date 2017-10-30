import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import Partida from "./Partida.jsx";
import ModalPartida from "./ModalPartida.jsx";

import "../styles/Lista.css";

class Lista extends Component{

	constructor(props){
		super(props);
		this.state = {
		    busqueda:"",
            modal:false,
            tipoModal:"",
            partida:{}
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
                    abrirModalEntrarPartida={(partida) => { this.abrirModalEntrarPartida(partida) }}	
                />
            );        
        });
    }

    abrirModalCrearPartida(){
        this.setState({
            modal:true,
            tipoModal:"crear"
        })
    }   

    abrirModalEntrarPartida(partidaP){
        this.setState({
            modal:true,
            tipoModal:"entrar",
            partida: partidaP
        })
    }      

    crearPartida(tipoL, alias){
    	this.props.crearPartida(tipoL,alias);
        this.setState({
            modal:false,
            tipoModal:""
        })
    }	

    entrarPartida(partida, alias){
    	this.props.entrarPartida(partida,alias);
    }    

	render(){
		return (
			<div id="lista">
                {this.state.modal ?
                    <ModalPartida
                        estado={this.state.tipoModal}
                        crearPartida={(tipoL,alias) => { this.crearPartida(tipoL,alias) }}
                        entrarPartida={(partida,alias) => { this.entrarPartida(partida,alias) }}  
                        partida={this.state.partida}
                    >
                    </ModalPartida>
                :
                    null
                }
                <p ref={(p) => { this.primero = p; }} > Para iniciar una partida puedes hacer click en el link crear nueva partida. También puedes buscar una partida existente o seleccionar una partida de la lista de partidas actuales.</p>   
                <h1>Partidas Actuales</h1>
                <div id="contenedorLista">
                    <div id="headerLista">
                        <input id="nombre" aria-label="Buscar partida por jugador 1" className="input" type="text" placeholder="Jugador 1" onChange={this.handleChange}></input>               
                    </div> 
				    <Link
                        id ="crearNueva"
                        aria-label="Crear nueva Partida"                        
                        to={{
                            pathname: '/inicio'
                        }}
                        onClick={() => { this.abrirModalCrearPartida()}}> 
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