import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

class ModalPartida extends Component{

	constructor(props){
		super(props);
		this.state = {
			alias:"",
			tipo:"coop",
			text:""
		};
	}

	handleChange = (event) => {
		if(event.target.value ===""){
    		this.setState({
				alias: event.target.value,
    			text:"Por favor ingrese un usuario valido."
    		});
    	}
    	else{
    		this.setState({
				alias: event.target.value,
    			text:""
    		});	
    	}
    }

    crearPartida(tipoL){
		this.props.crearPartida(tipoL,this.state.alias);
    }	

    entrarPartida(){
    	this.props.entrarPartida(this.props.partida, this.state.alias);
    }	


	render(){
		return (
			<div className="modalPartida">
				{this.props.estado == "crear" ?
					<div className="modalContent">
					    <a id="cerrar" aria-label="Cerrar ventana" onClick={() => { this.props.cerrarModal()}}>x</a>
					    <h1>Crear Partida</h1>
			            <p className="itemModal">Antes de crear la partida debes seleccionar el tipo de partida y el nombre con el que vas a entrar a ella.</p>
			            <p>{this.state.text}</p>
			            <input  className="itemModal" id="alias" aria-label="Nombre en la partida" type="text" placeholder="Nombre" onChange={this.handleChange}></input> 
				        {this.state.alias!==""? 
				            <div className="itemModal" id="links">
				                <Link 
				                    className="link" 
                                    aria-label="Crear nueva Partida cooperativa"
					                to={{
				                        pathname: '/juego'
				                    }}
				                    onClick={() => { this.crearPartida("coop")}}
				                >
                                Coop
			                    </Link>
				                <Link 
				                    className="link" 
                                    aria-label="Crear nueva Partida versus"
					                to={{
				                        pathname: '/juego'
				                    }}
				                    onClick={() => { this.crearPartida("vs")}}
				                >
                                Vs
			                    </Link>	
				                <Link 
				                    className="link"
                                    aria-label="Crear nueva Partida solo"
					                to={{
				                        pathname: '/juego'
				                    }}
				                    onClick={() => { this.crearPartida("solo")}}
				                >
                                Solo
			                    </Link>
				            </div>
				            : null}                         		
                    </div>            
				:
					<div className="modalContent">
					    <a id="cerrar" aria-label="Cerrar ventana" onClick={() => { this.props.cerrarModal()}}>x</a>
					    <h1>Ingresar Partida</h1>					    					
			            <p  className="itemModal" >Para entrar a la partida de {this.props.partida.autor} primero escoge un alias</p>
			            <p>{this.state.text}</p>
			            <input  className="itemModal" id="alias" aria-label="Nombre en la partida" type="text" placeholder="Nombre" onChange={this.handleChange}></input> 
			            {this.state.alias!==""?<Link  className="itemModal" aria-label="Entrar a partida" to={{
				            pathname: '/juego'}}
				            onClick = {() => { this.entrarPartida()}}
				        >
	                    Entrar			        
			            </Link>: null}
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