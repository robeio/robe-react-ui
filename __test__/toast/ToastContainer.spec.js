import chai from "chai";
import React from "react";
import ToastContainer from "toast/ToastContainer";
import { mount } from "enzyme";

describe("toast/ToastContainer", () => {
    const getComponent = (): Object => {
        return (<ToastContainer />);
    };
    it("render", () => {
        let wrapper = mount(getComponent());
        chai.assert.equal(wrapper.find(ToastContainer).length, 1);
    });
});