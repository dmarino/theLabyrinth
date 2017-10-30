import { Meteor } from "meteor/meteor";
import { assert } from "meteor/practicalmeteor:chai";
import { shallow } from "enzyme";
import React from "react";

import Lista from "./Lista.jsx";

describe("Lista", () => {
  it("should render", () => {
    const lista = shallow(<Lista/>); 
    assert.equal(lista.find("Link").length, 1);
  });
});