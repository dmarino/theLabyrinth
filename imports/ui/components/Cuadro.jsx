import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import "../styles/Cuadro.css";

class Cuadro extends Component{

    renderImagen(){
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

        img = "./images/labyrinth/" + this.props.cuadro.arriba + "" + this.props.cuadro.abajo + "" + this.props.cuadro.derecha + "" + this.props.cuadro.izquierda + ".png"
        return (<img className="pixel" src={img} alt={alternative}></img>);
    }


	render(){
		return (
			<div className="Cuadro">
			    {this.renderImagen()}
			</div>
		);
	}
}

Cuadro.PropTypes={
    cuadro: PropTypes.object.isRequired,   
};

export default Cuadro;