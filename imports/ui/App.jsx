import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";

import "./styles/App.css";

import {Laberintos} from "../api/laberintos.js";
import {Estado} from "../api/estado.js";

class App extends Component{
	constructor(props){
		super(props);

		this.state={
		    jugar:false
		};
	}


	render(){
		return (
			<div className="App">		
			    <div id="banner">
				    <img src="./images/banner.png"/>
			    </div>	
			</div>
		);
	}
}

App.PropTypes={
    laberintos: PropTypes.array.isRequired,
    estado: PropTypes.object.isRequired,
};

export default createContainer(()=>{
	return{
	    laberintos: Laberintos.find({}).fetch(),
	    estado: Estado.find({}).fetch()
	};
},App);