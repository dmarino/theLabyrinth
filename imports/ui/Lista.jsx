import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

class Lista extends Component{

	constructor(props){
		super(props);
		this.state = {
		    busqueda:""
		}
	}

	render(){
		return (
			<div id="lista">
			    {this.props.estado[0] ?
		            <h2>Partidas Actuales</h2>
			    :
			        null
			    }
			</div>
		);
	}
}

Lista.PropTypes={
    estado: PropTypes.array.isRequired,
};

export default Lista;