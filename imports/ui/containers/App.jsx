import React, {Component} from "react";
import PropTypes from "prop-types";
import { Switch, Route } from 'react-router-dom'

import {createContainer} from "meteor/react-meteor-data";

import "../styles/App.css";

import Juego from "../components/Juego.jsx";
import Principal from "../components/Principal.jsx";
import Navigation from "../components/Navigation.jsx";
import Inicio from "../components/Inicio.jsx";
import NotFound from "../components/NotFound.jsx";


import {Laberintos} from "../../api/laberintos.js";
import {Partidas} from "../../api/partidas.js";

class App extends Component{

	constructor(props){
		super(props);
		this.state={
		    estado:"inicio",
		    juegoActual:{},
		    jugador:0
		};
	}


	componentWillUpdate(newProps){
		juegos = newProps.partidas;
		if(this.state.juegoActual._id!== undefined){
			juegos.map((t)=>{
				if(t._id === this.state.juegoActual._id){
					actual = this.state.juegoActual;
					if(actual.posJugador2=== undefined && t.posJugador2!==undefined){
						this.setState({juegoActual:t});
					}
					else if(actual.posJugador2 !== undefined && (actual.posJugador2.x !== t.posJugador2.x || actual.posJugador2.y !== t.posJugador2.y)){
						this.setState({juegoActual:t});
					}
					else if(actual.posJugador1.x !== t.posJugador1.x || actual.posJugador1.y !== t.posJugador1.y){
						this.setState({juegoActual:t});
					}
				}
			});
		}
	}

	crearPartida(tipoL, nombre){
        if(this.props.laberintos.length!=0){

	        laberinto = this.props.laberintos[Math.floor(Math.random()*(this.props.laberintos.length-1))]
		    datosForServer={
		    	autor: nombre, 
		        laberinto: laberinto,
		        tipo: tipoL,
		        posJugador1 : {
		            "x":0,
		            "y":0
		        }
		    };
		    Meteor.call("partidas.insertar",datosForServer);

		    partida = Partidas.find({"autor":nombre}).fetch()[0];
		    partida.laberinto = laberinto;

		    if(tipoL != "vs"){

		        this.setState({
		            estado:"jugar",
		            juegoActual: partida,
		            jugador:1
		        });
		    }
		    else(
		        this.setState({
		            estado:"esperar",
		            juegoActual: partida,
		            jugador:1		            
		        })		        
		    )
        }
    }

    entrarPartida(partida, nombre){

	    partida = Partidas.find({"_id": partida._id}).fetch()[0];

        partida.jugador2 = nombre;

        ubicacion={
	        "x":0,
            "y":0
	    }   
		
		partida.posJugador2 = ubicacion;   

        datosForServer={
        	jugador2: nombre,
        	posJugador2:ubicacion

        };

        Meteor.call("partidas.updateInsertar", partida._id,datosForServer);
	    partida = Partidas.find({"_id": partida._id}).fetch()[0];
		this.setState({
		    estado:"jugar",
		    juegoActual: partida,
		    jugador:2
		});
    }

    mover(partida,jugador,pos){
    	if(jugador==1){
            partida.posJugador1 = pos;
    	}
    	else{
            partida.posJugador2 = pos;               		
    	}
        Meteor.call("partidas.update", partida._id,jugador,pos);
        partida= Partidas.find({"_id":partida._id}).fetch()[0];
		this.setState({
		    juegoActual: partida,
		});
    }

    terminar(partida, ganadorT){
    	if(ganadorT===0){
    		if(this.state.jugador===1 && partida.posJugador2!==undefined){
//    			alert("No puede abandonar teniendo un invitado");
    		}
    		else if(this.state.jugador===2){
    			datosForServer={
		        	jugador2: undefined,
		        	posJugador2:undefined

		        };

		        Meteor.call("partidas.updateInsertar", partida._id,datosForServer);
			    partida = Partidas.find({"_id": partida._id}).fetch()[0];
				this.setState({
				    estado:"jugar",
				    juegoActual: {},
				    jugador:0
				});
    		}
    		else{
    			Meteor.call("partidas.remove", partida._id);
				this.setState({
				    juegoActual: {}
				});
    		}
    	}
    	else{
    		if(partida.tipo === "coop"){
    			datosForServer={
		        	ganador: 3
		        };	        
    		}
    		else{
    			datosForServer={
		        	ganador: ganadorT
		        };
    		}
		    Meteor.call("partidas.updateGanador", partida._id,datosForServer);		    		
    	}         
    }  
	
	render(){
		return(
			<div className="App">
				<Navigation></Navigation>
				<Switch>
				    <Route exact path='/' component={Inicio}/>
				    <Route path='/inicio' render={routeProps => 
				    	<Principal {...routeProps} 
				    		laberintos={this.props.laberintos} 
				    		partidas={this.props.partidas}
				    		partidaActual={this.state.partidaActual}
                            crearPartida={(tipoL,nombre) => { this.crearPartida(tipoL,nombre) }}
			                entrarPartida={(partida,nombre) => { this.entrarPartida(partida,nombre) }}						    		
				    	/>} 
				    />
					<Route path='/juego' render={routeProps => 
 				    	<Juego {...routeProps} 
 				    		partida={this.state.juegoActual} 
 				    		jugador={this.state.jugador}
			                mover={(partida, jugador, pos) => { this.mover(partida, jugador, pos) }}	 				    		
 			                terminar={(partida, ganador) => { this.terminar(partida, ganador) }}						    		
 				    	/>} 
 				    />
				    <Route path='*' component={NotFound}/>
    			</Switch>
			</div>
		);
	}
}


App.PropTypes={
    laberintos: PropTypes.array.isRequired,
    partidas: PropTypes.array.isRequired,
};

export default createContainer(()=>{
	Meteor.subscribe('laberintos');
	Meteor.subscribe('partidas');
	return{
	    laberintos: Laberintos.find({},{ sort: { autor: -1 } }).fetch(),
	    partidas: Partidas.find({}).fetch(),
	};
},App);