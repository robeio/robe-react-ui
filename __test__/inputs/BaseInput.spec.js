import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import BaseInput from "inputs/BaseInput";

describe("BaseInput.js", () => {
    const component = (
        <BaseInput
            label="TextInput Label Text Example"
            value="This is some example text must be equals with TextInput value"
            onChange={onchange = () => {
            }}
            type="text"
            validations={{
                required: (value: any) => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                }
            }}
        />
    );

    it("'props' Controls", () => {
        let componentNode = TestUtils.renderIntoDocument(component);
        chai.assert.equal(componentNode.props.label, "TextInput Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with TextInput value");
        chai.assert.equal(componentNode.props.onChange.name, "onchange");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'valitations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(component);
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);
        // Must be invalid
        let component2 = (<BaseInput
            type="text"
            value=""
            validations={{
                required: (value: any) => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                }
            }}
        />);

        componentNode = TestUtils.renderIntoDocument(component2);
        chai.assert.equal(componentNode.isValid(), false);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1);
    });
});
