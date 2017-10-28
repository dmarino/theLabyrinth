import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

import "../styles/Partida.css";

class Partida extends Component{

    renderImagen(){
        if(this.props.partida){
            if(this.props.partida.tipo=="vs"){
                return (<img src="./images/partidas/vs.png"></img>);
            }            
            else if(this.props.partida.tipo=="coop"){
                return (<img src="./images/partidas/coop.png"></img>);
            }
        }
    }


	render(){
		return (
			<div className="Partida" onClick = {() => { this.props.entrarPartida(this.props.partida)}}>
			    {this.renderImagen()}
			    <div className="infoPartida">
			        {this.props.partida ?
			            <p>Autor: {this.props.partida.autor}</p>
			        :
			            null
			        }
			    </div>
			</div>
		);
	}
}

Partida.PropTypes={
    partida: PropTypes.object.isRequired,
    entrarPartida: PropTypes.func.isRequired,      
};

export default Partida;