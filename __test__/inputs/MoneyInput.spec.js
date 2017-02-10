import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "../TestUtils";// eslint-disable-line import/no-extraneous-dependencies
import MoneyInput from "inputs/MoneyInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("inputs/MoneyInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <MoneyInput // eslint-disable-line react/jsx-filename-extension
                label="Label"
                value={props.value !== undefined ? props.value : "12,345.6"}
                onChange={props.onChange}
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
        chai.assert.equal(componentNode.props.value, "12,345.6");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.isOk(componentNode.isValid(), "Non-Empty string must be valid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0, "Non-Empty string value must render ZERO alert");// eslint-disable-line react/no-find-dom-node

        // Must be invalid
        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.isNotOk(componentNode.isValid(), "Empty string must be invalid");
    });

    it("'__onChange", (done: Function) => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({ onChange: (): Object => { return true; } }));
        let e = {
            target: {
                value: "12,123.1"
            },
            preventDefault: () => {
                chai.assert.isOk(false, "Input value '12,123.1' failed");
                done("Input value '12,123.1' failed");
            },
            stopPropagation: () => {
            }
        };
        /* eslint-disable no-underscore-dangle */
        componentNode.__onChange(e);
        e.target.value = "12.2";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12.2' failed");
            done("Input value '12.2' failed");
        };
        componentNode.__onChange(e);

        e.target.value = "12,12.1";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12,12.1' failed");
            done("Input value '12,12.1' failed");
        };
        componentNode.__onChange(e);

        e.target.value = "12,12.";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12,12.' failed");
            done("Input value '12,12.' failed");
        };
        componentNode.__onChange(e);

        e.target.value = "12q2";
        e.preventDefault = () => {
            chai.assert.isOk(true, "Input value '12q2' failed");
        };
        componentNode.__onChange(e);

        e.target.value = null;
        componentNode.__onChange(e);
        componentNode = TestUtils.renderIntoDocument(getComponent({
        }));

        e.target.value = "12345";
        componentNode.__onChange(e);
        componentNode = TestUtils.renderIntoDocument(getComponent({
            decimalSeparator: "."
        }));

        done();
    });
});
