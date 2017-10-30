import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

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

    renderText(){
        if(this.props.partida){
            if(this.props.partida.tipo=="vs"){
            	return "partida de tipo versus creada por " + this.props.partida.autor + ". Para entrar a esta partida presiona enter";
            }            
            else if(this.props.partida.tipo=="coop"){
            	return "partida de tipo cooperativo creada por " + this.props.partida.autor + ". Para entrar a esta partida presiona enter";            	
            }
        }    
    }

	render(){
	    label = this.renderText();
		return (
			<Link aria-label={label} to={{
				  pathname: '/inicio'
				}}>
				<div className="Partida" onClick = {() => { this.props.abrirModalEntrarPartida(this.props.partida)}}>
				    {this.renderImagen()}
				    <div className="infoPartida">
				        {this.props.partida ?
				            <p>Jugador 1: {this.props.partida.autor}</p>
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
    abrirModalEntrarPartida: PropTypes.func.isRequired,      
};

export default Partida;