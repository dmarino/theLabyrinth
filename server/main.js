import { Meteor } from 'meteor/meteor';

import '../imports/api/laberintos.js';
import '../imports/api/estado.js';

import {Laberintos} from "../imports/api/laberintos.js";

Meteor.startup(() => {
	console.log(Laberintos.find({}).fetch());
});
