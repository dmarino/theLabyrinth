import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';

import Cuadro from "./Cuadro.jsx";

class Juego extends Component{

    constructor(props){
        super(props);
        this.state = {
            filas:[0,1,2,3,4,5,6],
            posActual:{}
        }
    }    

    mover(cuadro){
        console.log(cuadro);
        cambiar=false;
        if(!this.state.posActual.x){
            console.log("primero");            
            if((cuadro.x==1 && cuadro.y==0)&& this.props.partida.laberinto.layout[0].derecha==0){
                cambiar=true;
            }
            else if((cuadro.y==1 && cuadro.x==0) && this.props.partida.laberinto.layout[0].abajo==0){
                cambiar=true;
            }            
        }
        else{
            console.log("dos");
            if((cuadro.x-this.state.posActual.x==1)&&(cuadro.y-this.state.posActual.y==0)&&(this.state.posActual.derecha==0)){
                cambiar=true;               
            }
            else if((cuadro.x-this.state.posActual.x==-1)&&(cuadro.y-this.state.posActual.y==0)&&(this.state.posActual.izquierda==0)){
                cambiar=true;               
            }
            else if((cuadro.x-this.state.posActual.x==0)&&(cuadro.y-this.state.posActual.y==1)&&(this.state.posActual.abajo==0)){
                cambiar=true;               
            }            
            else if((cuadro.x-this.state.posActual.x==0)&&(cuadro.y-this.state.posActual.y==-1)&&(this.state.posActual.arriba==0)){
                cambiar=true;               
            }            
        }
        if(cambiar){
            console.log("cambiar");
            pos={
                x:cuadro.x,
                y:cuadro.y
            };
            this.props.mover(this.props.partida, this.props.jugador, pos);

            this.setState({
                posActual:cuadro
            });
            console.log(this.state.posActual);
        }      
    }

    renderFila(num){
        return this.props.partida.laberinto.layout.filter(t => (t.y==num)).map((t,i)=>{
            if(this.props.partida.posJugador1.x == t.x && this.props.partida.posJugador1.y == t.y){              
                return (
                    <td key={i}>
                         <Cuadro 
                             cuadro ={t}
                             mostrar = {true}
                             mover={(cuadro) => { this.mover(cuadro) }}                              
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
                            mover={(cuadro) => { this.mover(cuadro) }}                              
                        ></Cuadro>
                    </td>                                               
                );              
            }                   
        });
    }
    renderJuego(){
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
                    null
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