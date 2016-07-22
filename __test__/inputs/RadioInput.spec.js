import React from "react";
import ReactDOM from "react-dom";
import chai from "chai";
import RadioInput from "inputs/RadioInput";
import Generator from "../test-utils/Generator";
import TestUtils from "react-addons-test-utils";

describe("inputs/RadioInput", () => {

    const langs = [
        {
            key: "en",
            value: "English"
        },
        {
            key: "tr",
            value: "Turkish"
        },
        {
            key: "kurdish",
            value: "Kurdish"
        }
    ];

    it("props", () => {
        let defaultProps = {
            label: "RadioInput Single",
            item: langs[0],
            value: "en",
            textField: "value",
            valueField: "key"
        };

        let expectedProps = {
            label: "RadioInput Single",
            item: langs[0],
            value: "en",
            textField: "value",
            valueField: "key",
            disabled: false
        };

        let newComponent = Generator.getComponent(defaultProps, RadioInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.deepEqual(instance.props, expectedProps);


        defaultProps = {
            label: "RadioInput Group",
            items: langs,
            value: "en",
            textField: "value",
            valueField: "key"
        };

        expectedProps = {
            label: "RadioInput Group",
            items: langs,
            value: "en",
            textField: "value",
            valueField: "key",
            disabled: false
        }

        newComponent = Generator.getComponent(defaultProps, RadioInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.deepEqual(instance.props, expectedProps);
    });

    it("render", () => {
        let expectedValue = "en";

        let defaultProps = {
            label: "RadioInput Single",
            item: langs[0],
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        let newComponent = Generator.getComponent(defaultProps, RadioInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        let instanceDom = ReactDOM.findDOMNode(instance);
        let inputs = instanceDom.getElementsByTagName("input");
        let input = inputs[0];
        chai.assert.equal(input.value, expectedValue, "Given value to RadioInput Single must be equal input value which created in DOM.");

        expectedValue = "en";

        defaultProps = {
            label: "RadioInput Group",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        newComponent = Generator.getComponent(defaultProps, RadioInput);

        instance = TestUtils.renderIntoDocument(newComponent);

        instanceDom = ReactDOM.findDOMNode(instance);
        inputs = instanceDom.getElementsByTagName("input");
        chai.assert.equal(inputs[0].value, expectedValue, "Given value to RadioInput Group must be equal input value which created in DOM.");
    });

    it("isChecked", () => {
        let defaultProps = {
            label: "RadioInput Single",
            item: langs[0],
            value: "en",
            textField: "value",
            valueField: "key"
        };

        let newComponent = Generator.getComponent(defaultProps, RadioInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.isTrue(instance.isChecked(), "Given value of RadioInput Single Component checked. That's why isChecked must be true.");

        delete defaultProps.value;
        newComponent = Generator.getComponent(defaultProps, RadioInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isFalse(instance.isChecked(), "Given value of RadioInput Single Component unchecked. That's why isChecked must be false.");

        let expectedValue = "en";

        defaultProps = {
            label: "RadioInput Group",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        newComponent = Generator.getComponent(defaultProps, RadioInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isTrue(instance.isChecked(), "Given value of CheckInput Multi Component is checked. That's why isChecked must be true.");
        chai.assert.isTrue(instance.isChecked(langs[0].key), "Given value[0] of RadioInput Group Component checked. That's why isChecked must be true.");
        chai.assert.isFalse(instance.isChecked(langs[1].key), "Given value[1] of RadioInput Group Component unchecked. That's why isChecked must be false.");
        chai.assert.isFalse(instance.isChecked(langs[2].key), "Given value[2] of RadioInput Group Component unchecked. That's why isChecked must be false.");

        delete defaultProps.value;

        newComponent = Generator.getComponent(defaultProps, RadioInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isFalse(instance.isChecked(), "Given value of RadioInput Group Component unchecked. That's why isChecked must be false.");
    });

    it("getValue", () => {
        let expected = "en";
        let defaultProps = {
            label: "RadioInput Single",
            item: langs[0],
            value: expected,
            textField: "value",
            valueField: "key"
        };

        let newComponent = Generator.getComponent(defaultProps, RadioInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.equal(instance.getValue(), expected, "Given value of RadioInput Single Component must equal return of getValue()");

        expected = "en";
        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: expected,
            textField: "value",
            valueField: "key"
        };

        newComponent = Generator.getComponent(defaultProps, RadioInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.equal(instance.getValue(), expected, "Given value of RadioInput Group Component must equal return of getValue()");
    });
});
