import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';

import "../styles/Cuadro.css";

class Cuadro extends Component{

	renderAlt(){
    	if(this.props.mostrar){
    		alternative = "Posición " + this.props.cuadro.x + " en X y " + this.props.cuadro.y + " en Y. Puedes ver ";
            primero = false;
            if(this.props.cuadro.arriba==0){
                alternative += ", un camino hacia arriba";
                primero = true;
            }
            if(this.props.cuadro.derecha==0){
                alternative += ", un camino a la derecha"
                primero = true;
            }
            if(this.props.cuadro.abajo==0){
                alternative += ", un camino hacia abajo";
                primero = true;
            }
            if(this.props.cuadro.izquierda==0){
                alternative += ", un camino a la izquierda"
            }
            alternative +="."
            return alternative;
    	}
    	else{
    		return "No sabes que hay en este cuadro";
    	}		
	}

    renderImagen(){
    	if(this.props.mostrar){
            img = "./images/labyrinth/" + this.props.cuadro.arriba + "" + this.props.cuadro.abajo + "" + this.props.cuadro.derecha + "" + this.props.cuadro.izquierda + ".png"
    	}
    	else{
    		img = "./images/labyrinth/black.png";
    	}
        return (<img className="pixel" src={img} alt={this.renderAlt()}></img>);
    }

	render(){
		return (
			<div className="Cuadro"
                onClick = {() => { this.props.mover(this.props.cuadro.x, this.props.cuadro.y)}}

            >
                {this.renderImagen()}
            </div>		
		);
	}
}

Cuadro.PropTypes={
    cuadro: PropTypes.object.isRequired,   
    mover: PropTypes.func.isRequired,       
};

export default Cuadro;