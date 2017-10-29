import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import Cuadro from "./Cuadro.jsx";

class Juego extends Component{

    componentWillUnmount(){
        this.props.terminar(this.props.partida);
    }

    renderJuego(){
        if(this.props.partida.laberinto){
            return this.props.partida.laberinto.layout.map((t,i)=>{
                return (
                    <Cuadro 
                        key={i}
                        cuadro ={t}
                    />
                );        
            });
        }
    }

	render(){
		return (
			<div className="Juego">
			    <h1>Juega</h1>
			    {this.props.partida?
			        <Link to={{
                      pathname: '/inicio'
                    }}><button onClick = {() => { this.props.terminar(this.props.partida)}}> Salir </button>
                    </Link>
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