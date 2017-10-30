import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Partidas } from "./partidas.js";
import faker  from "faker";

if (Meteor.isServer) {
  describe("Partidas", () => {
  	describe("partidas.insert", ()=>{
  		const currentUser = faker.name.firstName();
  		beforeEach(()=>{
  			Partidas.remove({});
  		});

  		it("Hacer insert", ()=>{
  			nombre = "Hector"
  			datos = {
  				autor:nombre,
				laberinto:"some kind of Mongo ID",
				tipo:"Coop",
			    posJugador1:{x:10,y:10}
  			};

  			Meteor.call("partidas.insertar", datos);

  			let player = Partidas.findOne({autor:nombre});
  			assert.equal(10, player.posJugador1.x);
  			assert.equal(10, player.posJugador1.y);
  			assert.equal(nombre, player.autor);
  			assert.equal("Coop", player.tipo);
  		});
  	});
    describe("partidas.update", () => {
      // Generate a random name
      const currentUser = faker.name.firstName();
      beforeEach(() => {
        Partidas.remove({});
        
        Partidas.insert({
          autor: currentUser,
          laberinto: "Some ID that mongo likes",
          tipo:"Coop",
		  posJugador1:{x:10,y:10}
        });
      });

      it("hacer update de las posiciones de un jugador.", () => {

        const updatePlayer = Meteor.server.method_handlers["Partidas.update"];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { currentUser };

        // Run the method with `this` set to the fake invocation
        updatePlayer.apply(invocation, [15,15]);

        let newPlayer = Partidas.findOne({name:name});

        assert.equal(newPlayer.x, 15);
        assert.equal(newPlayer.y, 15);
      });
    });
  });
}