import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import TestUtils from "../TestUtils";
import FaIcon from "faicon/FaIcon";

describe("faicon/FaIcon", () => {

    it("props", () => {

        let props = {};
        let node = TestUtils.mount(props, FaIcon, props);
        chai.assert.equal(node.find(".fa-sm").length, 1, "Default icon size should be fa-sm");
        chai.assert.equal(node.find(".fa-fw").length, 1, "Default icon fixed should be fa-fw");

        node.setProps({
            fixed: false
        });
        chai.assert.equal(node.find(".fa-fw").length, 0, "Fixed should be false");

        chai.assert.equal(node.find(".fa-address-book").length, 0, "Default icon does not have");
        node.setProps({
            code: "fa-address-book"
        });
        chai.assert.equal(node.find(".fa-address-book").length, 1, "Should be have fa-address-book icon");

        node.setProps({
            size: "fa-2x"
        });
        chai.assert.equal(node.find(".fa-2x").length, 1, "Icon size should be fa-2x");

    });

});