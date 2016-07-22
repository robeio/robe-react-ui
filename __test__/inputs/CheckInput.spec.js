import React from "react";
import ReactDOM from "react-dom";
import chai from "chai";
import CheckInput from "inputs/CheckInput";
import Generator from "../test-utils/Generator";
import TestUtils from "react-addons-test-utils";

describe("inputs/CheckInput", () => {

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
            label: "CheckInput Single",
            item: langs[0],
            value: "en",
            textField: "value",
            valueField: "key"
        };

        let expectedProps = {
            label: "CheckInput Single",
            item: langs[0],
            value: "en",
            textField: "value",
            valueField: "key",
            delimiter: ",",
            placeHolder: "Please Select",
            noResultsText: "No Result",
            disabled: false
        };

        let newComponent = Generator.getComponent(defaultProps, CheckInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.deepEqual(instance.props, expectedProps);


        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: "en,tr",
            textField: "value",
            valueField: "key"
        };

        expectedProps = {
            label: "CheckInput Group",
            value: "en,tr",
            textField: "value",
            valueField: "key",
            items: langs,
            delimiter: ",",
            placeHolder: "Please Select",
            noResultsText: "No Result",
            disabled: false
        };

        newComponent = Generator.getComponent(defaultProps, CheckInput);

        instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.deepEqual(instance.props, expectedProps);
    });

    it("render", () => {
        let expectedValue = "en";

        let defaultProps = {
            label: "CheckInput Single",
            item: langs[0],
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        let newComponent = Generator.getComponent(defaultProps, CheckInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        let instanceDom = ReactDOM.findDOMNode(instance);
        let inputs = instanceDom.getElementsByTagName("input");
        let input = inputs[0];
        chai.assert.equal(input.value, expectedValue, "Given value to CheckInput Single must be equal input value which created in DOM.");

        expectedValue = "en,tr";

        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        newComponent = Generator.getComponent(defaultProps, CheckInput);

        instance = TestUtils.renderIntoDocument(newComponent);

        instanceDom = ReactDOM.findDOMNode(instance);
        inputs = instanceDom.getElementsByTagName("input");
        chai.assert.equal(inputs[0].value, expectedValue.split(",")[0], "Given value[0] to CheckInput Multi must be equal input value which created in DOM.");
        chai.assert.equal(inputs[1].value, expectedValue.split(",")[1], "Given value[1] to CheckInput Multi must be equal input value which created in DOM.");
    });

    it("isChecked", () => {
        let defaultProps = {
            label: "CheckInput Single",
            item: langs[0],
            value: "en",
            textField: "value",
            valueField: "key"
        };

        let newComponent = Generator.getComponent(defaultProps, CheckInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.isTrue(instance.isChecked(), "Given value of CheckInput Single Component checked. That's why isChecked must be true.");

        delete defaultProps.value;
        newComponent = Generator.getComponent(defaultProps, CheckInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isFalse(instance.isChecked(), "Given value of CheckInput Single Component unchecked. That's why isChecked must be false.");

        let expectedValue = "en,tr";

        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        newComponent = Generator.getComponent(defaultProps, CheckInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isTrue(instance.isChecked(), "Given value of CheckInput Multi Component checked more than zero. That's why isChecked must be true.");
        chai.assert.isTrue(instance.isChecked(langs[0].key), "Given value[0] of CheckInput Multi Component checked. That's why isChecked must be true.");
        chai.assert.isTrue(instance.isChecked(langs[1].key), "Given value[1] of CheckInput Multi Component checked. That's why isChecked must be true.");
        chai.assert.isFalse(instance.isChecked(langs[2].key), "Given value[2] of CheckInput Multi Component unchecked. That's why isChecked must be false.");

        delete defaultProps.value;

        newComponent = Generator.getComponent(defaultProps, CheckInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isFalse(instance.isChecked(), "Given value of CheckInput Single Component must be selected.");
    });

    it("getValue", () => {
        let expected = "en";
        let defaultProps = {
            label: "CheckInput Single",
            item: langs[0],
            value: expected,
            textField: "value",
            valueField: "key"
        };

        let newComponent = Generator.getComponent(defaultProps, CheckInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.equal(instance.getValue(), expected, "Given value of CheckInput Single Component must equal return of getValue()");

        expected = "en,tr";
        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: "en,tr",
            textField: "value",
            valueField: "key"
        };

        newComponent = Generator.getComponent(defaultProps, CheckInput);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.equal(instance.getValue(), expected, "Given value of CheckInput Multi Component must equal return of getValue()");
    });
});
