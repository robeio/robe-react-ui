import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import DecimalInput from "inputs/DecimalInput";

describe("DecimalInput.js", () => {
    const getComponent = (props) => {
        return (
            <DecimalInput
                label="Label"
                value={props.value !== undefined ? props.value : "42"}
                onChange={props.onChange !== undefined ? props.onChange : () => { } }
                validations={{
                    required: (value: any) => {
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
        chai.assert.equal(componentNode.props.onChange.name, "");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);
        // Must be invalid

        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.isNotOk(componentNode.isValid(), "Empty string must be invalid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1);
    });

    it("'__numericFilter", (done) => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({ onChange: () => { chai.assert.isOk(true); } }));
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
        componentNode.__numericFilter(e);
        e.target.value = "12.2";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12.2' failed");
            done("Input value '12.2' failed");
        };
        componentNode.__numericFilter(e);

        let component3 = (
            <DecimalInput
                label="DecimalInput Label Text Example"
                value="This is some example text must be equals with DecimalInput value"
                onChange={() => {
                    chai.assert.isOk(false);
                    done("Input value '12q2' failed");
                } }
                validations={{
                    required: (value: any) => {
                        return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                    }
                }}
                />
        );
        componentNode = TestUtils.renderIntoDocument(component3);
        e.target.value = "12q2";
        e.preventDefault = () => {
            chai.assert.isOk(true, "Input value '12q2' failed");
        };
        componentNode.__numericFilter(e);
        done();
    });
});
