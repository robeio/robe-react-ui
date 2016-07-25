import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DecimalInput from "inputs/DecimalInput";

describe("inputs/DecimalInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <DecimalInput
                label="Label"
                value={props.value !== undefined ? props.value : "42"}
                handleChange={props.handleChange !== undefined ? props.handleChange : () => { }}
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
        chai.assert.equal(componentNode.props.label, "Label");
        chai.assert.equal(componentNode.props.value, "42");
        chai.assert.equal(componentNode.props.handleChange.name, "");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.isOk(componentNode.isValid(), "Non-empty string mus be valid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0, "Non-Empty string value must render ZERO alert");
        // Must be invalid

        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.isNotOk(componentNode.isValid(), "Empty string must be invalid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1, "Empty string value must render one alert");
    });

    it("'__numericFilter", (done: Function) => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({ handleChange: () => { return true; } }));
        let e = {
            target: {
                value: "12"
            },
            preventDefault: () => {
                chai.assert.isOk(false, "Input value '12' failed");
                done("Input value '12' failed");
            },
            stopPropagation: () => {
            }
        };
        /* eslint-disable no-underscore-dangle */
        componentNode.__numericFilter(e);
        e.target.value = "12.2";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12.2' failed");
            done("Input value '12.2' failed");
        };
        componentNode.__numericFilter(e);

        componentNode = TestUtils.renderIntoDocument(getComponent({
            handleChange: () => {
                chai.assert.isOk(false);
                done("Input value '12q2' failed");
            }
        }));
        e.target.value = "12q2";
        e.preventDefault = () => {
            chai.assert.isOk(true, "Input value '12q2' failed");
        };
        componentNode.__numericFilter(e);
        done();
    });
});
