import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';

import Cuadro from "./Cuadro.jsx";

class Juego extends Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }    

    mover(x1,y1){
        pos={
           x:x1,
           y:y1
        }
        this.props.mover(this.props.partida, this.props.jugador, pos);
    }

    renderJuego(){
        if(this.props.partida.laberinto){

            return this.props.partida.laberinto.layout.map((t,i)=>{
                html = "";
                if(i%7==0){
                    html += "<tr>";
                }
                if((this.props.partida.posJugador1.x == t.x && this.props.partida.posJugador1.y == t.y)){
                    html += "<th>"
                    html += <Cuadro 
                            key={i}
                            cuadro ={t}
                            mostrar = {true}
                            mover={(x,y) => { this.mover(x,y) }}                              
                        />
                    html += "</th>";    
                }  
                else{
                    html += "<th>"
                    html += <Cuadro 
                            key={i}
                            cuadro ={t}
                            mostrar = {false}
                            mover={(x,y) => { this.mover(x,y) }}                              
                        />
                    html += "</th>";               
                } 
                if(i%7==6){
                    html += "</tr>";
                }
                return html;                  
            });
        }
    }

	render(){
		return (
			<div className="Juego">
			    <h1>Juega</h1>
			    {(this.props.partida!== undefined && this.props.partida.tipo !== undefined)?
			        <Link to={{
                      pathname: '/inicio'
                    }}><button onClick = {() => { this.props.terminar(this.props.partida)}}> Salir </button>
                    </Link>
			    :
                    <Redirect to="/Unexistent Game"></Redirect>
			    }
			    <table id="tablero">
			        {this.renderJuego()}
			    </table>
			</div>
		);
	}
}

Juego.PropTypes={
    partida: PropTypes.object.isRequired,
    jugador: PropTypes.object.isRequired,    
    terminar: PropTypes.func.isRequired,   
    mover: PropTypes.func.isRequired,          
};

export default Juego;