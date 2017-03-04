import chai from "chai";
import React from "react";
import {mount} from "enzyme"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import TestUtils from "../TestUtils";
import Toast from "toast/Toast"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("toast/Toast", () => {
    const getComponent = (props:Object):Object => {
        return (<Toast {...props}/>);
    };

    it("Toast", () => {
        Toast.configuration({maxVisible: 2, position: "top-right"});
        Toast.success("message", "Tittle", 300);

    });

    it("render", () => {
        let wrapper = mount(getComponent({maxVisible: 2, position: "top-right"}));

        chai.assert.equal(wrapper.find(Toast).length, 1);
        chai.assert.equal(wrapper.find(".toast-item").length, 0);

        Toast.success("message", "Tittle", 300);
        chai.assert.equal(wrapper.find(".toast-item").length, 1);

        wrapper = mount(getComponent({maxVisible: 2, position: "top-left"}));

        Toast.error(undefined, "Tittle", 300);
        Toast.warning("message", undefined, 300);
        Toast.info("message", "Tittle",);
        Toast.success("message", "Tittle", 300);
        chai.assert.isBelow(wrapper.find(".toast-item").length, 3);

    });
});