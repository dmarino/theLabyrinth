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
	    laberinto = Laberintos.find({"_id": partida.laberinto}).fetch()[0];

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
		    juegoActual: {}
		});         
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
 			                terminar={(partida) => { this.terminar(partida) }}						    		
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
	return{
	    laberintos: Laberintos.find({},{ sort: { autor: -1 } }).fetch(),
	    partidas: Partidas.find({}).fetch(),
	};
},App);