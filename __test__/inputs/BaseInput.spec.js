import chai from "chai";
import TestUtils from "../TestUtils";
import BaseInput from "inputs/BaseInput";

describe("inputs/BaseInput", () => {
    const props = {
        label: "TextInput Label Text Example",
        value: "This is some example text must be equals with TextInput value",
        onChange: () => { },
        type: "text",
        validations: {
            required: {
                func: (value: any): Array => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                },
                message: "Error Test"
            }
        }
    };

    it("'props' Controls", () => {
        let componentNode = TestUtils.mount(props, BaseInput, props);
        chai.assert.equal(componentNode.find("label").text(), "TextInput Label Text Example");
        chai.assert.equal(componentNode.find("input").prop("value"), "This is some example text must be equals with TextInput value");
        chai.assert.equal(componentNode.prop("onChange").name, "onChange");
        chai.assert.isDefined(componentNode.prop("validations").required, "Validation prop error");
        componentNode.unmount();
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.mount(props, BaseInput, props);
        chai.assert.isOk(componentNode.instance().isValid(), "Non-Empty string value must be valid");
        chai.assert.equal(componentNode.find(".input-alert").length, 0, "Non-Empty string value must render ZERO alert");
        componentNode.unmount();

        // Must be invalid
        componentNode = TestUtils.mount({ value: "" }, BaseInput, props);
        chai.assert.isNotOk(componentNode.instance().isValid(), "Empty string value must be invalid");
        chai.assert.equal(componentNode.instance().validationResult().length, 1, "Empty string value must render one alert");
        chai.assert.equal(componentNode.instance().validationResult()[0].props.children, "Error Test", "Custom messages shoud be rendered inside alert");
        componentNode.unmount();

        // Must be invalid
        componentNode = TestUtils.mount({
            value: "Goodbye ",
            validations: {
                custom: {
                    func: (hello: string, world: string, value: string): Array => {
                        return value + world;
                    },
                    args: ["hello", "world"]
                }
            }
        }, BaseInput, props);
        chai.assert.isNotOk(componentNode.instance().isValid(), "Empty string value must be invalid");
        chai.assert.equal(componentNode.instance().validationResult()[0].props.children, "Goodbye world", "Arguments must pass successfully");
        componentNode.unmount();

        // Must be exception
        componentNode = TestUtils.mount({ value: "a", validations: { required: "string", custom: "" } }, BaseInput, props);
        chai.assert.equal(componentNode.find(".input-alert").length, 0, "Empty string value must render ZERO alert");
        chai.assert.isOk(componentNode.instance().isValid(), "Non-function validations must return true.");
        componentNode.unmount();
    });
});
