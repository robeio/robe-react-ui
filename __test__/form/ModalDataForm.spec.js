import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import TestUtils from "../TestUtils";
import ModalDataForm from "form/ModalDataForm"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { mount } from "enzyme";// eslint-disable-line import/no-extraneous-dependencies

describe("form/ModalDataForm", () => {
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
            tooltip: "Name",
            required: true
        },
        {
            label: "Surname",
            type: "string",
            name: "surname",
            tooltip: "Surname",
            required: true
        }
    ];

    const getComponent = (props: Object): Object => {
        return (<ModalDataForm {...props} />);// eslint-disable-line react/jsx-filename-extension
    };

    it("render", () => {
        let wrapper = mount(getComponent({ fields: fields, onSubmit: () => {} }));

        let modalDataForm = wrapper.find(ModalDataForm);
        chai.assert.equal(modalDataForm.length, 1);
        chai.assert.equal(wrapper.state().valid, true);
        wrapper.setState({ valid: false });
        chai.assert.equal(wrapper.state().valid, false);
        wrapper.setProps({ show: false });
        chai.assert.equal(wrapper.state().show, false);
        
        chai.assert.equal(wrapper.props().showCancelButton, true);
        chai.assert.equal(wrapper.props().showCancelButton, true);
        wrapper.setProps({ showCancelButton: false, showSaveButton: false });
        chai.assert.equal(wrapper.props().showCancelButton, false);
        chai.assert.equal(wrapper.props().showCancelButton, false);
        // wrapper.instance().__submitForm();// eslint-disable-line no-underscore-dangle
    });
});
