import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import "../styles/Partida.css";

class Partida extends Component{

    renderImagen(){
        if(this.props.partida){
            if(this.props.partida.tipo=="vs"){
            	alternative = "partida de tipo versus creada por " + this.props.partida.autor + ". Para entrar a esta partida presiona enter";
                return (<img src="./images/partidas/vs.png" alt={alternative}></img>);
            }            
            else if(this.props.partida.tipo=="coop"){
            	alternative = "partida de tipo cooperativo creada por " + this.props.partida.autor + ". Para entrar a esta partida presiona enter";            	
                return (<img src="./images/partidas/coop.png" alt={alternative}></img>);
            }
        }
    }

	handleKey = (event) => {
		console.log("yo");
		if(event.key == 'Enter'){
			this.props.entrarPartida(this.props.partida);
        }
    }

	render(){
		return (
			<Link to={{
				  pathname: '/juego'
				}}>
				<div className="Partida" aria-label="Partida" onClick = {() => { this.props.entrarPartida(this.props.partida)}}>
				    {this.renderImagen()}
				    <div className="infoPartida">
				        {this.props.partida ?
				            <p>Autor: {this.props.partida.autor}</p>
				        :
				            null
				        }
				    </div>
				</div>
			</Link>
		);
	}
}

Partida.PropTypes={
    partida: PropTypes.object.isRequired,
    entrarPartida: PropTypes.func.isRequired,      
};

export default Partida;