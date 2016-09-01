import chai from "chai"; // eslint-disable-line
import React from "react";
import Loading from "loading/Loading"; // eslint-disable-line
import { mount } from "enzyme"; // eslint-disable-line


describe("loading/Loading", () => {
    const getComponent = (props: Object): Object => {
        return (<Loading className={props.className} />);// eslint-disable-line
    };
    it("render", () => {
        let wrapper = mount(getComponent({}));
        chai.assert.equal(wrapper.find(Loading).length, 1);
        wrapper = mount(getComponent({ className: "fa-spinner" }));
        chai.assert.equal(wrapper.find(".fa-spinner").length, 1);
    });
});
