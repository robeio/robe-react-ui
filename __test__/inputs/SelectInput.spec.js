import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import SelectInput from "inputs/SelectInput";



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
        value: "Kurd"
    }
];
describe("inputs/SelectInput", () => {
    it("constructors", () => {
        const data = [
            {
                key: "MALE",
                value: "Male"
            },
            {
                key: "FEMALE",
                value: "Female"
            }
        ];

        let instance = TestUtils.renderIntoDocument(
            <SelectInput
                label="Select Input Single"
                items={data}
                textField="value"
                valueField="key"
            />
        );
    });

    it("render", () => {
        // TODO test must be implemented
        console.log("test");
    });
    it("isValid", () => {
        // TODO test must be implemented
        console.log("test");
    });
});
