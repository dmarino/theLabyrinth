import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";
import { Switch, Route } from 'react-router-dom'

import "../styles/App.css";

import Lista from "../components/Lista.jsx";
import Juego from "../components/Juego.jsx";

import {Laberintos} from "../../api/laberintos.js";
import {Partidas} from "../../api/partidas.js";

class Principal extends Component{

	constructor(props){
		super(props);
		this.state={
		    estado:"inicio",
		    juegoActual:{},
		    jugador:0
		};
	}

	juego(){
		window.location.pathname = "/juego";
	}
	dejarDeJugar(){
		window.location.pathname = "/inicio";
	}

	crearPartida(tipoL, nombre){
        if(this.props.laberintos.length!=0){

	        laberinto = this.props.laberintos[Math.floor(Math.random()*(this.props.laberintos.length-1))]

	        Partidas.insert({
		        autor: nombre, 
		        laberinto: laberinto._id,
		        tipo: tipoL,
		        posJugador1 : {
		            "x":0,
		            "y":0
		        }
		    });

		    partida = Partidas.find({"autor":nombre}).fetch()[0];
		    partida.laberinto = laberinto;

		    if(tipoL != "vs"){

		        this.setState({
		            estado:"jugar",
		            juegoActual: partida,
		            jugador:1
		        });
		        this.juego();
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

	    laberinto = Laberintos.find({"_id": partida.laberinto}).fetch()[0],

	    partida.laberinto = laberinto;

        if(partida.tipo == "vs"){
            Partidas.update(partida._id, {
                $set: { 
                    jugador2: nombre,
                    posJugador2:  {
		                "x":6,
		                "y":6
		            }
                },
            });
        }

        else if(partida.tipo == "coop"){
            Partidas.update(partida._id, {
                $set: { 
                    jugador2: nombre,
                    posJugador2: partida.posJugador1
                },
            });
        }

		this.setState({
		    estado:"jugar",
		    juegoActual: partida,
		    jugador:2
		});
    }

    terminar(partida){
        Partidas.remove(partida._id);   
		this.setState({
		    estado:"inicio",
		    juegoActual: {},
		    jugador:0
		});         
    }       	

    mover(partida, jugador, pos){
        if(jugador==1){
            Partidas.update(partida._id, {
                $set: { 
                    posJugador1:  {
		                "x":pos.x,
		                "y":pos.y
		            }
                },
            });
        }
        else{
            Partidas.update(partida._id, {
                $set: { 
                    posJugador2:  {
		                "x":pos.x,
		                "y":pos.y
		            }
                },
            });      
        }  
    }       	


	render(){
		return (
			<div id="Principal">
		        <div>
		            { this.state.estado == "jugar" ?
				        <Juego
			                partida={this.state.juegoActual}
			                terminar={(partida) => { this.terminar(partida) }}				                
			            > 
			            </Juego>
			        :
			            <Lista
			                partidas={this.props.partidas}
			                crearPartida={(tipoL,nombre) => { this.crearPartida(tipoL,nombre) }}
			                entrarPartida={(partida,nombre) => { this.entrarPartida(partida,nombre) }}			                
			            > 
			            </Lista>
			        }
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