import chai from "chai";
import React from "react";
import TestUtils from "../TestUtils";
import CheckTree from "checktree/CheckTree";
import CheckInput from "inputs/CheckInput";
import { mount } from "enzyme";


describe("checktree/CheckTree", () => {
    const data = [
        {
            text: "Item 1",
            code: 1,
            children: [
                {
                    text: "Item 1.1",
                    code: 11
                },
                {
                    text: "Item 1.2",
                    code: 12
                }
            ]
        },
        {
            text: "Item 2",
            code: 2,
            children: [
                {
                    text: "Item 2.1",
                    code: 21,
                    children: [
                        {
                            text: "Item 2.1.1",
                            code: 211
                        },
                        {
                            text: "Item 2.1.2",
                            code: 212
                        }
                    ]
                }
            ]
        }
    ];
    const getComponent = (props: Object): Object => {
        return (
            <CheckTree {...props} />
        );
    };


    it("onChange", () => {
        let wrapper = mount(getComponent({ items: data }));
        chai.assert.equal(wrapper.find(CheckInput).length, 7);
        let array = wrapper.find(".fa-square-o");
        array.first().simulate("click");
        wrapper = mount(getComponent({ items: data }));
        chai.assert.equal(wrapper.find(".fa-check-square-o").length, 1);
    });
});
