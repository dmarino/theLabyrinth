import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import "../styles/Cuadro.css";

class Cuadro extends Component{

    renderImagen(){
        img = "./images/labyrinth/" + this.props.cuadro.arriba + "" + this.props.cuadro.abajo + "" + this.props.cuadro.derecha + "" + this.props.cuadro.izquierda + ".png"
        return (<img className="pixel" src={img}></img>);
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