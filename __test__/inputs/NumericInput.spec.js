import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "../TestUtils";// eslint-disable-line import/no-extraneous-dependencies
import NumericInput from "inputs/NumericInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("inputs/NumericInput", () => {
    const getComponent = (props: Object): Object => {
        return (
            <NumericInput // eslint-disable-line react/jsx-filename-extension
                label="Label"
                value={props.value !== undefined ? props.value : "42"}
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
        chai.assert.equal(componentNode.props.value, "42");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({}));
        chai.assert.equal(componentNode.isValid(), true);
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0);// eslint-disable-line react/no-find-dom-node
        // Must be invalid

        componentNode = TestUtils.renderIntoDocument(getComponent({ value: "" }));
        chai.assert.isNotOk(componentNode.isValid(), "Empty string must be invalid");
    });

    it("'__onChange", (done: Function) => {
        let componentNode = TestUtils.renderIntoDocument(getComponent({ onChange: (): Object => { return true; } }));
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
        componentNode.__onChange(e);
        e.target.value = "12.2";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12.2' failed");
            done("Input value '12.2' failed");
        };
        componentNode.__onChange(e);

        componentNode = TestUtils.renderIntoDocument(getComponent({
            onChange: () => {
                chai.assert.isOk(false);
                done("Input value '12q2' failed");
            }
        }));
        e.target.value = "12q2";
        e.preventDefault = () => {
            chai.assert.isOk(true, "Input value '12q2' failed");
        };
        componentNode.__onChange(e);

        componentNode = TestUtils.renderIntoDocument(getComponent({}));
        e.target.value = undefined;
        componentNode.__onChange(e);


        componentNode = TestUtils.renderIntoDocument(getComponent({
            onChange: () => {
            }
        }));
        e.target.value = undefined;
        componentNode.__onChange(e);

        done();
    });
});
