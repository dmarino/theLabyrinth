import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

//import "../styles/NotFound.css";

class NotFound extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="modal">
				<div className="modalContent">
			        <h1>¡Woops, camino equivocado!</h1>
			        <p>Parece que has desviado tu camino del laberinto.</p>
			        <p>No distingues ningún camino por el cual continuar.
			         Tampoco puedes ver por el que llegaste. Solo hay un punto brillante al fondo en el que se lee...</p>
			        <Link to={{
                      pathname: '/inicio'
                    }}>Inicio</Link>
			    </div>
			</div>
		);
	}
}

NotFound.PropTypes={

};

export default NotFound;