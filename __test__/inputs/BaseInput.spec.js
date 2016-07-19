import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import BaseInput from "inputs/BaseInput";

describe("BaseInput.js", () => {
    const component = TestUtils.renderIntoDocument(
        <BaseInput
            label="TextInput Label Text Example"
            value="This is some example text must be equals with TextInput value"
            onChange={onchange = () => {
            } }
            type="text"
            validations={{
                required: (value: any) => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : "Valid";
                }
            }}
            />
    );

    it("'props' Controls", () => {
        chai.assert.equal(component.props.label, "TextInput Label Text Example");
        chai.assert.equal(component.props.value, "This is some example text must be equals with TextInput value");
        chai.assert.equal(component.props.onChange.name, "onchange");
        chai.assert.isDefined(component.props.validations.required, "Validation prop error");
    });

    it("'valitations' Control", () => {
        let component2 = TestUtils.renderIntoDocument(
            <BaseInput
                label="TextInput Label Text Example"
                type="text"
                validations={{
                    required: (value: any) => {
                        return (value === undefined || value === null || value === "") ? "Not Valid" : "Valid";
                    }
                }}
                />
        );
        console.log(component2);


    });
});
