import React from "react";
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
            items: langs,
            value: "en",
            textField: "value",
            valueField: "key"
        };

        let expectedProps = {
            label: "CheckInput Single",
            items: langs,
            value: "en",
            textField: "value",
            valueField: "key",
            disabled: false,
            readOnly: false,
            hidden: false,
            multi: false
        };

        let newComponent = Generator.getComponent(defaultProps, CheckInput);
        let instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.deepEqual(instance.props, expectedProps);


        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: ["en", "tr"],
            textField: "value",
            valueField: "key",
            multi: true
        };

        expectedProps = {
            label: "CheckInput Group",
            items: langs,
            value: ["en", "tr"],
            textField: "value",
            valueField: "key",
            disabled: false,
            readOnly: false,
            hidden: false,
            multi: true
        };

        newComponent = Generator.getComponent(defaultProps, CheckInput);

        instance = TestUtils.renderIntoDocument(newComponent);

        chai.assert.deepEqual(instance.props, expectedProps);
    });

    it("render", () => {

    });

    it("isChecked", () => {

    });

    it("getValue", () => {

    });
});
