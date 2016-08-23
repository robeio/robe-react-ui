import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import TextInput from "inputs/TextInput";
import { mount, simulate,shallow,expect } from 'enzyme';

describe("inputs/TextInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <TextInput
                label="TextInput Label Text Example"
                value={props.value !== undefined ? props.value : "This is some example text must be equals with TextInput value"}
                onChange={props.onChange !== undefined ? props.onChange : () => { }}
                validations={{
                    required: (value: any): Array => {
                        return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                    }
                }}
            />
        );
    };

    it("'props' Controls", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.props.label, "TextInput Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with TextInput value");
        chai.assert.equal(componentNode.props.onChange.name, "");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);
        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.equal(componentNode.isValid(), false);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1);
    });

    

    let values = "";

    const handleChange = (e) => {
    values = e.target.value;};

     it("'OnChange' Control", () => {
     
        let wrapper = mount(getComponent({ onChange: handleChange }));
        chai.assert.equal(wrapper.find(TextInput).length, 1);
        let textInput = wrapper.find("input").first();

        textInput.simulate('change', {target: {value: 'robe'}});

        chai.assert.equal("robe", values);

        wrapper = mount(getComponent({}));

        wrapper.setProps({onChange:undefined});

        textInput = wrapper.find("input").first();

        values="";
        textInput.simulate('change', {target: {value: ''}});

        chai.assert.equal("", values);

    });



});
