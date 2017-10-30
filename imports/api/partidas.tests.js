import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from "meteor/xolvio:cleaner";
import { Factory } from "meteor/dburles:factory";
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Partidas } from "./partidas.js";
import faker  from "faker";

const setupEscenario1 = (nombre)=>{
	datos = {
		autor:nombre,
		laberinto:"some kind of Mongo ID",
		tipo:"Coop",
	    posJugador1:{x:10,y:10}
	};

	Meteor.call("partidas.insertar", datos);
};


if (Meteor.isServer) {
  describe("Partidas", () => {
  	describe("partidas.insert", ()=>{
  		const currentUser = faker.name.firstName();
  		beforeEach(()=>{
  			Partidas.remove({});
        	resetDatabase();
  		});

  		it("Hacer insert", ()=>{
  			nombre = faker.name.firstName();
  			datos = {
  				autor:nombre,
				laberinto:"some kind of Mongo ID",
				tipo:"Coop",
			    posJugador1:{x:10,y:10}
  			};

  			Meteor.call("partidas.insertar", datos);

  			let partidaActual = Partidas.findOne({autor:nombre});
  			assert.equal(10, partidaActual.posJugador1.x);
  			assert.equal(10, partidaActual.posJugador1.y);
  			assert.equal(nombre, partidaActual.autor);
  			assert.equal("Coop", partidaActual.tipo);
  		});
  	});



    describe("partidas.update", () => {
      // Generate a random name
      const currentUser = faker.name.firstName();
      beforeEach(() => {
        Partidas.remove({});
        resetDatabase();
        setupEscenario1(currentUser);
      });


      it("hacer update de las posiciones del jugador1.", () => {

        let partidaUpdate = Partidas.findOne({autor:currentUser});

      	Meteor.call("partidas.update", partidaUpdate._id, 1, {x:15,y:15});

      	partidaUpdate = Partidas.findOne({autor:currentUser});

        assert.equal(15, partidaUpdate.posJugador1.x);
        assert.equal(15, partidaUpdate.posJugador1.y);
      });
      it("hacer update de las posiciones de un jugador.", () => {

        const updatePlayer = Meteor.server.method_handlers["Partidas.update"];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { currentUser };

        // Run the method with `this` set to the fake invocation
        updatePlayer.apply(invocation, [15,15]);

        let partidaUpdate = Partidas.findOne({autor:currentUser});

        assert.equal(partidaUpdate.x, 15);
        assert.equal(partidaUpdate.y, 15);
      });
    });
  });
}