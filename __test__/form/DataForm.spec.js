import chai from "chai";
import React from "react";
import DataForm from "form/DataForm";
import TextInput from "inputs/TextInput";
import { mount } from "enzyme";


describe("form/DataForm", () => {

    let fields = [
        {
            label: "id",
            type: "string",
            name: "id",
            tooltip: "id",
            visible: false
        },
        {
            label: "Name",
            type: "string",
            name: "name",
            tooltip: "Name"
        },
        {
            label: "Surname",
            type: "string",
            name: "surname",
            tooltip: "Surname"
        }
    ];

    const getComponent = (props: Object): Object => {
        return (<DataForm {...props} />);
    };
    it("render", () => {
        let wrapper = mount(getComponent({ fields: fields }));
        chai.assert.equal(wrapper.find(DataForm).length, 1);
        chai.assert.equal(wrapper.find(TextInput).length, 2);
    });
});