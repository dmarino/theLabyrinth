import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

class Juego extends Component{

	render(){
		return (
			<div className="Juego">
			    <h1>Juega</h1>
			    {this.props.partida?
			        <button onClick = {() => { this.props.terminar(this.props.partida)}}> Salir </button>
			    :
                    null
			    }
			</div>
		);
	}
}

Juego.PropTypes={
    partida: PropTypes.object.isRequired,
    terminar: PropTypes.func.isRequired,      
};

export default Juego;