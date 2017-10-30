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
      it("Insertar al jugador2.", () => {
        secondUser = faker.name.firstName();
        let partidaUpdate = Partidas.findOne({autor:currentUser});
        data = {x:5,y:5};
        Meteor.call("partidas.updateInsertar", partidaUpdate._id, {jugador2:secondUser, posJugador2:data});

        partidaUpdate = Partidas.findOne({autor:currentUser});

        assert.equal(5, partidaUpdate.posJugador2.x);
        assert.equal(5, partidaUpdate.posJugador2.y);
      });
      it("hacer update de las posiciones del jugador2.", () => {

        secondUser = faker.name.firstName();
        let partidaUpdate = Partidas.findOne({autor:currentUser});
        data = {x:5,y:5};
        Meteor.call("partidas.updateInsertar", partidaUpdate._id, {jugador2:secondUser, posJugador2:data});
        Meteor.call("partidas.update", partidaUpdate._id, 2, {x:13,y:18});

        partidaUpdate = Partidas.findOne({autor:currentUser});

        assert.equal(13, partidaUpdate.posJugador2.x);
        assert.equal(18, partidaUpdate.posJugador2.y);
      });
    });

    describe("partidas.remove", ()=>{
      const currentUser = faker.name.firstName();
      beforeEach(() => {
        Partidas.remove({});
        resetDatabase();
        setupEscenario1(currentUser);
      });

      it("Hacer remove", ()=>{
        let partidaUpdate = Partidas.findOne({autor:currentUser});

        Meteor.call("partidas.remove", partidaUpdate._id);

        partidaUpdate = Partidas.findOne({autor:currentUser});

        assert.equal(undefined, partidaUpdate);
      });
      it("remover inexistente", ()=>{
        let partidaUpdate = Partidas.findOne({autor:currentUser});
        id = partidaUpdate._id;
        Meteor.call("partidas.remove", id);

        partidaUpdate = Partidas.findOne({autor:currentUser});

        assert.equal(undefined, partidaUpdate);

        tes="";
        Meteor.call("partidas.remove", id);
        assert.equal("", tes);

        partidaUpdate = Partidas.findOne({autor:currentUser});
        assert.equal(undefined, partidaUpdate);

      });
    });
  });
}