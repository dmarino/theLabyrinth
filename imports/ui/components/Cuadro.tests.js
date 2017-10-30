import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import React from "react";

import Cuadro from "./Cuadro.jsx";

describe("Cuadro", () => {
  it("should render", () => {
    const cuadro = shallow(<Cuadro/>); 
    assert.equal(cuadro.find("img").length, 1);
  });
});
