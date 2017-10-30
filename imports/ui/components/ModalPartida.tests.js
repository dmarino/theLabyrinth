import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import React from "react";

import ModalPartida from "./ModalPartida.jsx";

describe("ModalPartida", () => {
  it("should render", () => {
    const modalPartida = shallow(<ModalPartida/>); 
    assert.equal(ModalPartida.find("Link").length, 1);
  });
});