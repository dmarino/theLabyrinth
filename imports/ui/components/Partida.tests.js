import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import React from "react";

import Partida from "./Partida.jsx";

describe("Partida", () => {
  it("should render", () => {
    const modalPartida = shallow(<ModalPartida/>); 
    assert.equal(ModalPartida.find("img").length, 1);
  });
});