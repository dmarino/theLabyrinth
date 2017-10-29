import React, {Component} from "react";
import PropTypes from "prop-types";
import { Switch, Route } from 'react-router-dom'

import {createContainer} from "meteor/react-meteor-data";

import "../styles/App.css";

import Lista from "../components/Lista.jsx";
import Principal from "../components/Principal.jsx";
import Navigation from "../components/Navigation.jsx";
import Inicio from "../components/Inicio.jsx";
import NotFound from "../components/NotFound.jsx";
import {Laberintos} from "../../api/laberintos.js";
import {Partidas} from "../../api/partidas.js";

class App extends Component{

	constructor(props){
		super(props);
		this.state={
		    jugar:false,
		    juegoActual:{}
		};
	}

	render(){
		return(
				<div className="App">
					<Navigation></Navigation>
					<Switch>
					    <Route exact path='/' component={Inicio}/>
					    <Route path='/inicio' render={routeProps => 
					    	<Principal {...routeProps} 
					    		laberintos={this.props.laberintos} 
					    		partidas={this.props.partidas}
					    	/>} 
					    />
					    <Route path='*' component={NotFound}/>
    				</Switch>
				</div>
			);
	}
}


App.PropTypes={
    laberintos: PropTypes.array.isRequired,
    partidas: PropTypes.array.isRequired,
};

export default createContainer(()=>{
	return{
	    laberintos: Laberintos.find({},{ sort: { autor: -1 } }).fetch(),
	    partidas: Partidas.find({}).fetch(),
	};
},App);