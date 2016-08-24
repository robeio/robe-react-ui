import React from "react";
import chai from "chai";
import CheckList from "inputs/CheckList";
import TestUtils from "../TestUtils";

describe("inputs/CheckList", () => {
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
            key: "kr",
            value: "Kurdish"
        }
    ];

    it("props", () => {
        let defaultProps = {
            label: "CheckList Single",
            item: langs[0],
            value: true,
            textField: "value",
            valueField: "key"
        };

        let expectedProps = {
            label: "CheckList Single",
            item: langs[0],
            value: true,
            textField: "value",
            valueField: "key",
            horizontal: false,
            disabled: false,
            readOnly: false,
            hidden: false
        };

        let newComponent = TestUtils.getComponent(defaultProps, CheckList);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.deepEqual(instance.props, expectedProps);

        
        defaultProps = {
            label: "CheckList Group",
            items: langs,
            value: ["en", "tr"],
            textField: "value",
            valueField: "key"
        };

        expectedProps = {
            label: "CheckList Group",
            items: langs,
            value: ["en", "tr"],
            textField: "value",
            valueField: "key",
            horizontal: false,
            disabled: false,
            readOnly: false,
            hidden: false
        };

        newComponent = TestUtils.getComponent(defaultProps, CheckList);

        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.deepEqual(instance.props, expectedProps);
    });

    it("render", () => {
        let expectedValue = "en";

        let defaultProps = {
            label: "CheckList Single",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        let newComponent = TestUtils.getComponent(defaultProps, CheckList);
        let instance = TestUtils.renderIntoDocument(newComponent);

        let instanceDom = TestUtils.findDOMNode(instance);
        let inputs = instanceDom.getElementsByTagName("input");
        let input = inputs[0];
        chai.assert.equal(input.value, expectedValue, "Given value to CheckList Single must be equal input value which created in DOM.");

        expectedValue = "en,tr";

        defaultProps = {
            label: "CheckList Group",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key"
        };

        newComponent = TestUtils.getComponent(defaultProps, CheckList);

        instance = TestUtils.renderIntoDocument(newComponent);

        instanceDom = TestUtils.findDOMNode(instance);
        inputs = instanceDom.getElementsByTagName("input");
        chai.assert.equal(inputs[0].value, expectedValue.split(",")[0], "Given value[0] to CheckList Multi must be equal input value which created in DOM.");
        chai.assert.equal(inputs[1].value, expectedValue.split(",")[1], "Given value[1] to CheckList Multi must be equal input value which created in DOM.");
    });

    it("isChecked", () => {
        let defaultProps = {
            label: "CheckList Single",
            items: langs,
            value: "en",
            textField: "value",
            valueField: "key"
        };

        let newComponent = TestUtils.getComponent(defaultProps, CheckList);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.isTrue(instance.isChecked(), "Given value of CheckList Single Component checked. Thats why isChecked must be true.");

        delete defaultProps.value;
        newComponent = TestUtils.getComponent(defaultProps, CheckList);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isFalse(instance.isChecked(), "Given value of CheckList Single Component unchecked. Thats why isChecked must be false.");

        let expectedValue = ["en", "tr"];

        defaultProps = {
            label: "CheckList Group",
            items: langs,
            value: expectedValue,
            textField: "value",
            valueField: "key",
            multi: true
        };

        newComponent = TestUtils.getComponent(defaultProps, CheckList);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isTrue(instance.isChecked(), "Given value of CheckList Multi Component checked more than zero. Thats why isChecked must be true.");
        chai.assert.isTrue(instance.isChecked(langs[0].key), "Given value[0] of CheckList Multi Component checked. Thats why isChecked must be true.");
        chai.assert.isTrue(instance.isChecked(langs[1].key), "Given value[1] of CheckList Multi Component checked. Thats why isChecked must be true.");
        chai.assert.isFalse(instance.isChecked(langs[2].key), "Given value[2] of CheckList Multi Component unchecked. Thats why isChecked must be false.");

        delete defaultProps.value;

        newComponent = TestUtils.getComponent(defaultProps, CheckList);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.isFalse(instance.isChecked(), "Given value of CheckList Single Component must be selected.");
    });

    it("getValue", () => {
        let expected = "en";
        let defaultProps = {
            label: "CheckList Single",
            item: langs[0],
            value: expected,
            textField: "value",
            valueField: "key"
        };

        let newComponent = TestUtils.getComponent(defaultProps, CheckList);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.equal(instance.getValue(), expected, "Given value of CheckList Single Component must equal return of getValue()");

        expected = "en,tr";
        defaultProps = {
            label: "CheckList Group",
            items: langs,
            value: "en,tr",
            textField: "value",
            valueField: "key"
        };

        newComponent = TestUtils.getComponent(defaultProps, CheckList);
        instance = TestUtils.renderIntoDocument(newComponent);
        chai.assert.equal(instance.getValue(), expected, "Given value of CheckList Multi Component must equal return of getValue()");
    });
});
