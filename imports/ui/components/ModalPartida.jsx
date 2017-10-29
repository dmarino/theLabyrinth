import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import "../styles/ModalPartida.css";

class ModalPartida extends Component{

	constructor(props){
		super(props);
		this.state = {
			alias:"",
			tipo:"solo"
		};
	}

	handleChange = (event) => {
		this.setState({
			alias: event.target.value,
		});
    }

	handleChangeDos = (event) => {
		this.setState({
			tipo: event.target.value,
		});
    }


    crearPartida(){
    	this.props.crearPartida(this.state.tipo,this.state.alias);
    }	

    entrarPartida(){
    	this.props.entrarPartida(this.props.partida, this.state.alias);
    }	


	render(){
		return (
			<div className="modalPartida">
				{this.props.estado == "crear" ?
					<div className="modalContent">
			            <p>Antes de crear la partida debes seleccionar el tipo de partida y el nombre con el que vas a entrar a ella.</p>
			            <input id="alias" aria-label="Nombre en la partida" type="text" placeholder="Nombre" onChange={this.handleChange}></input> 
			            <select id="tipo" onChange={this.handleChangeDos}>		
                            <option value="coop">Cooperativo</option>
                            <option value="vs">Versus</option>
                            <option value="solo" selected >Solo</option>
				        </select>
				        <Link 
				            className="boton"
                            aria-label="Crear nueva Partida"
					        to={{
				                pathname: '/juego'
				            }}
				            onClick={() => { this.crearPartida()}}
                        >
                        Crear Partida
			            </Link>                         		
                    </div>            
				:
					<div className="modalContent">
			            <p>Para entrar a la partida de {this.props.partida.autor} primero escoge un alias</p>
			            <input id="alias" aria-label="Nombre en la partida" type="text" placeholder="Nombre" onChange={this.handleChange}></input> 
			            <Link aria-label="Entrar a partida" to={{
				            pathname: '/juego'}}
				            onClick = {() => { this.entrarPartida()}}
				        >
	                    Entrar			        
			            </Link>
			        </div>    
				}
			</div>
		);
	}
}

ModalPartida.PropTypes={
	estado: PropTypes.object.isRequired,  
    crearPartida: PropTypes.func.isRequired,
    partida: PropTypes.object.isRequired,
    entrarPartida: PropTypes.func.isRequired,      
};

export default ModalPartida;