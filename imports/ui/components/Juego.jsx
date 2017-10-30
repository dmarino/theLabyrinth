import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';

import Cuadro from "./Cuadro.jsx";

class Juego extends Component{

    constructor(props){
        super(props);
        this.state = {
            filas:[0,1,2,3,4,5,6]
        }
    }    

    mover(x1,y1){
        pos={
           x:x1,
           y:y1
        }
        this.props.mover(this.props.partida, this.props.jugador, pos);
    }

    renderFila(num){
        return this.props.partida.laberinto.layout.filter(t => (t.x==num)).map((t,i)=>{
            if(this.props.partida.posJugador1.x == t.x && this.props.partida.posJugador1.y == t.y){              
                return (
                    <td key={i}>
                         <Cuadro 
                             cuadro ={t}
                             mostrar = {true}
                             mover={(x,y) => { this.mover(x,y) }}                              
                         ></Cuadro>
                    </td>                                                
                );

            }  
            else{
                return(
                    <td key={i}>
                        <Cuadro 
                            cuadro ={t}
                            mostrar = {false}
                            mover={(x,y) => { this.mover(x,y) }}                              
                        ></Cuadro>
                    </td>                                               
                );              
            }                   
        });
    }
    renderJuego(){
        console.log(this.props);
        if(this.props.partida.laberinto){
            return this.state.filas.map((t,i) =>{
                return (<tr key={i}>
                    {this.renderFila(t)}
                </tr>);
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
                    <tbody>
                        {this.renderJuego()}
                    </tbody>
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