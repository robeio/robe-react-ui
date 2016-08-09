import React from "react";
import chai from "chai";
import TestUtils from "react-addons-test-utils";
import CheckInput from "inputs/CheckInput";
import Generator from "../test-utils/Generator";

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
            key: "kr",
            value: "Kurdish"
        }
    ];

    it("props", () => {
        let defaultProps = {
            label: "CheckInput Single",
            item: langs[0],
            value: true,
            textField: "value",
            valueField: "key"
        };

        let expectedProps = {
            label: "CheckInput Single",
            item: langs[0],
            value: true,
            textField: "value",
            valueField: "key",
            disabled: false,
            readOnly: false,
            hidden: false
        };
        let newComponent = Generator.getComponent(defaultProps, CheckInput);
        let instance = TestUtils.renderIntoDocument(newComponent);


        chai.assert.deepEqual(instance.props, expectedProps);


        defaultProps = {
            label: "CheckInput Group",
            items: langs,
            value: ["en", "tr"],
            textField: "value",
            valueField: "key"
        };

        expectedProps = {
            label: "CheckInput Group",
            items: langs,
            value: ["en", "tr"],
            textField: "value",
            valueField: "key",
            disabled: false,
            readOnly: false,
            hidden: false
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
