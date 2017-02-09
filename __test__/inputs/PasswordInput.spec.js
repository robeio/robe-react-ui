import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "../TestUtils";// eslint-disable-line import/no-extraneous-dependencies
import PasswordInput from "inputs/PasswordInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved
import { mount } from "enzyme";// eslint-disable-line import/no-extraneous-dependencies

describe("inputs/PasswordInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <PasswordInput // eslint-disable-line react/jsx-filename-extension
                label="PasswordInput Label Text Example"
                value={props.value !== undefined ? props.value : "This is some example text must be equals with PasswordInput value"}
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
        chai.assert.equal(componentNode.props.label, "PasswordInput Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with PasswordInput value");
        chai.assert.equal(componentNode.props.onChange.name, "");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);// eslint-disable-line react/no-find-dom-node
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
        chai.assert.equal(wrapper.find(PasswordInput).length, 1);
        let passwordInput = wrapper.find("input").first();

        passwordInput.simulate("change", { target: { value: "robe" } });

        chai.assert.equal("robe", value);

        wrapper = mount(getComponent({}));

        wrapper.setProps({ onChange: undefined });

        passwordInput = wrapper.find("input").first();

        value = "";
        passwordInput.simulate("change", { target: { value: "" } });

        chai.assert.equal("", value);
    });
});
