import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";

import "./styles/App.css";

import Lista from "./Lista.jsx";
import Inicio from "./components/Inicio.jsx";

import {Laberintos} from "../api/laberintos.js";
import {Estado} from "../api/estado.js";

class App extends Component{

	constructor(props){
		super(props);
		this.state={
			inicio:true,
		    jugar:false
		};
	}

	inicio(){
		this.setState({
			inicio:false
		});
	}

	render(){
		return (
			<div id="App">
		        <div>
		            { this.state.jugar?
			            <h1>Juega</h1>
			        :
			            <Lista
			                estado={this.props.estado}
			            > 
			            </Lista>
			        }
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
	    estado: Estado.find({}).fetch(),
	};
},App);