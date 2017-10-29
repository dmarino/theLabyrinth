import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Laberintos = new Mongo.Collection('laberintos');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('laberintos', function laberintosPublication() {
    return Laberintos.find();
  });
}


Meteor.methods({



});