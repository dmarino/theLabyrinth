import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import Cuadro from "./Cuadro.jsx";

class Juego extends Component{

    componentWillUnmount(){
        this.props.terminar(this.props.partida);
    }

    renderJuego(){
    	return this.props.partida.laberinto.layout.map((t,i)=>{
            return (
                <Cuadro 
                    key={i}
                    cuadro ={t}
                />
            );        
        });
    }

	render(){
		return (
			<div className="Juego">
			    <h1>Juega</h1>
			    {this.props.partida?
			        <button onClick = {() => { this.props.terminar(this.props.partida)}}> Salir </button>
			    :
                    null
			    }
			    <div id="tablero">
			        {this.renderJuego()}
			    </div>
			</div>
		);
	}
}

Juego.PropTypes={
    partida: PropTypes.object.isRequired,
    terminar: PropTypes.func.isRequired,      
};

export default Juego;