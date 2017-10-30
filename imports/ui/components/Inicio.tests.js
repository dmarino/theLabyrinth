import React from "react";
import { shallow } from "enzyme";
import { chai } from "meteor/practicalmeteor:chai";
import Inicio from "./Inicio.jsx";


describe("Inicio", () => {
  it("should render", () => {
    const inicio = shallow(<Inicio></Inicio>);
    chai.assert(controls.hasClass("modal"));
    chai.assert(controls.hasClass("modalContent"));    
    chai.assert(controls.find("Link").length, 1);
  });
});