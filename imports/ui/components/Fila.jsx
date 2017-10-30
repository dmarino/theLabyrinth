import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Redirect } from 'react-router-dom';

import Cuadro from "./Cuadro.jsx";

class Fila extends Component{

    constructor(props){
        super(props);
        this.state = {
            filas:[0,1,2,3,4,5,6]
        }
    }    

    mover(x1,y1){
        this.props.mover(x1, y1);
    }

    renderFila(){
        return this.props.cuadros.map((t,i)=>{
            if(this.props.partida.posJugador1.x == t.x && this.props.partida.posJugador1.y == t.y){              
                return (             
                    <td key={i}>
                        <h1>1</h1>
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
                        <h1>2</h1>
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
	render(){
        console.log("a")
		return (
			<tr className="fila">
			    {this.renderFila()}
			</tr>
		);
	}
}

Fila.PropTypes={
    partida: PropTypes.object.isRequired,
    jugador: PropTypes.object.isRequired,    
    terminar: PropTypes.func.isRequired,   
    mover: PropTypes.func.isRequired,          
};

export default Fila;