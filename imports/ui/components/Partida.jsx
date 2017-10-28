import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

class Partida extends Component{

    renderImagen(){

        if(this.props.partida){
            if(this.props.partida.tipo=="solo"){
                return (<img src="./images/partidas/solo.png"></img>);
            }
            else if(this.props.partida.tipo=="vs"){
                return (<img src="./images/partidas/vs.png"></img>);
            }            
            else if(this.props.partida.tipo=="coop"){
                return (<img src="./images/partidas/coop.png"></img>);
            }
        }
    }


	render(){
		return (
			<div className="partida">
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
};

export default Partida;