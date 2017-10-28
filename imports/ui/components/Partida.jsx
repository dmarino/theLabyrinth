import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

class Partida extends Component{

	render(){
		return (
			<div className="partida">
			    <h3>Bla</h3>
			</div>
		);
	}
}

Partida.PropTypes={
    partida: PropTypes.object.isRequired,
};

export default Partida;