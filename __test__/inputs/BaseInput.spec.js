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
            required: (value: any): Array => {
                return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
            },
            requiredMessage: "Error Test"
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
        chai.assert.equal(componentNode.find(".input-alert").length, 1, "Empty string value must render one alert");
        chai.assert.equal(componentNode.find(".input-alert").text(), "Error Test", "Custom messages shoud be rendered inside alert");
        componentNode.unmount();

        // Must be invalid
        componentNode = TestUtils.mount({
            value: "Goodbye ",
            validations: {
                custom: (hello: string, world: string, value: string): Array => {
                    return value + world;
                },
                custom_args: ["hello", "world"]
            }
        }, BaseInput, props);
        chai.assert.isNotOk(componentNode.instance().isValid(), "Empty string value must be invalid");
        chai.assert.equal(componentNode.find(".input-alert").text(), "Goodbye world", "Arguments must pass successfully");
        componentNode.unmount();

        // Must be exception
        componentNode = TestUtils.mount({ value: "a", validations: { required: "string", custom: "" } }, BaseInput, props);
        chai.assert.equal(componentNode.find(".input-alert").length, 0, "Empty string value must render ZERO alert");
        chai.assert.isOk(componentNode.instance().isValid(), "Non-function validations must return true.");
        componentNode.unmount();
    });

    it("'max limit' Control", () => {
        // Must be invalid
        /* eslint-disable max-len */
        let componentNode = TestUtils.mount({ value: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na" },
            BaseInput,
            props);

        chai.assert.isNotOk(componentNode.instance().isValid(), "1000 char string value must be invalid");
        chai.assert.equal(componentNode.find(".input-alert").length, 1, "1000 char string value must render one alert");
    });
});
