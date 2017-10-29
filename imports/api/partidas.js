import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Partidas = new Mongo.Collection('partidas');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('partidas', function partidasPublication() {
    return Partidas.find();
  });
}


Meteor.methods({

	"partidas.insertar"(datos){
		check(datos,{
			"autor":String,
			"laberinto":Meteor.Collection.ObjectID,
			"tipo":String,
		    "posJugador1":Object
		});

		Partidas.insert(datos);
	},

	"partidas.update"(id, datos){
		check(id, String);
		check(datos,{
			"jugador2":String,
			"posJugador2":Object
		});
		Partidas.update(id, {
            $set: datos
        });
	},

	"partidas.remove"(id){
		check(id, String);
        Partidas.remove(id);   
	}
});