import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DateInput from "inputs/DateInput";

describe("inputs/DateInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <DateInput
                label="DateInput Label Text Example"
                value={props.value !== undefined ? props.value : "This is some example text must be equals with DateInput value"}
                handleChange={props.handleChange !== undefined ? props.handleChange : () => { } }
                validations={{
                    required: (value: any): Array => {
                        return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                    }
                }}
                />
        );
    };

    it("'props' Controls", () => {
        let value = new Date().getTime();
        let componentNode = TestUtils.renderIntoDocument(getComponent({ value: value }));
        chai.assert.equal(componentNode.props.label, "DateInput Label Text Example");
        chai.assert.equal(componentNode.props.value, value);
        chai.assert.equal(componentNode.props.handleChange.name, "");
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
});
