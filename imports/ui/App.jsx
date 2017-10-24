import React, {Component} from "react";
import PropTypes from "prop-types";

import {createContainer} from "meteor/react-meteor-data";

import "./styles/App.css";

class App extends Component{
	constructor(props){
		super(props);

		this.state={
		    jugar:true
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

};

export default createContainer(()=>{
	return{
	};
},App);