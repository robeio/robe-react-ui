import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "../TestUtils";
import TextInput from "inputs/TextInput"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { mount } from "enzyme"; // eslint-disable-line import/no-extraneous-dependencies

describe("inputs/TextInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <TextInput // eslint-disable-line react/jsx-filename-extension
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
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0); // eslint-disable-line react/no-find-dom-node
        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.equal(componentNode.isValid(), false);
    });


    let value = "";

    const handleChange = (e: Object) => {
        value = e.target.value;
    };

    it("'OnChange' Control", () => {
        let wrapper = mount(getComponent({ onChange: handleChange }));
        chai.assert.equal(wrapper.find(TextInput).length, 1);
        let textInput = wrapper.find("input").first();

        textInput.simulate("change", { target: { value: "robe" } });

        chai.assert.equal("robe", value);

        wrapper = mount(getComponent({}));

        wrapper.setProps({ onChange: undefined });

        textInput = wrapper.find("input").first();

        value = "";
        textInput.simulate("change", { target: { value: "" } });

        chai.assert.equal("", value);
    });

    it("'validate'", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.validate(componentNode.props.value).length, 0);
        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.equal(componentNode.validate(componentNode.props.value).length, 1);
    });

});
