import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

//import "../styles/Navigation.css";

class Navigation extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="Navigation">
				<div className="NavigationContent">
			        <h1>¡Bienvenido a the labyrinth!</h1>
			    </div>
			</div>
		);
	}
}

Navigation.PropTypes={

};

export default Navigation;