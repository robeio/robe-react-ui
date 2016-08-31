import chai from "chai";
import React from "react";
import Loading from "loading/Loading";
import { mount } from "enzyme";


describe("loading/Loading", () => {
    const getComponent = (props: Object): Object => {
        return (<Loading className={props.className} />);
    };
    it("render", () => {
        let wrapper = mount(getComponent({}));
        chai.assert.equal(wrapper.find(Loading).length, 1);
        wrapper = mount(getComponent({ className: "fa-spinner" }));
        chai.assert.equal(wrapper.find(".fa-spinner").length, 1);
    });
});
