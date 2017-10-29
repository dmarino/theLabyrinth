import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';

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
			    {(this.props.partida!== undefined && this.props.partida.tipo !== undefined)?
			        <Link to={{
                      pathname: '/inicio'
                    }}><button onClick = {() => { this.props.terminar(this.props.partida)}}> Salir </button>
                    </Link>
			    :
                    <Redirect to="/Unexistent Game"></Redirect>
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