import chai from "chai";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import BaseInput from "inputs/BaseInput";

describe("inputs/BaseInput.js", () => {
    const component = (
        <BaseInput
            label="TextInput Label Text Example"
            value="This is some example text must be equals with TextInput value"
            onChange={() => {
            }}
            type="text"
            validations={{
                required: (value: any) => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                }
            }}
        />
    );

    it("'props' Controls", () => {
        let componentNode = TestUtils.renderIntoDocument(component);
        chai.assert.equal(componentNode.props.label, "TextInput Label Text Example");
        chai.assert.equal(componentNode.props.value, "This is some example text must be equals with TextInput value");
        chai.assert.equal(componentNode.props.onChange.name, "onChange");
        chai.assert.isDefined(componentNode.props.validations.required, "Validation prop error");
    });

    it("'valitations' Control", () => {
        let componentNode = TestUtils.renderIntoDocument(component);
        chai.assert.isOk(componentNode.isValid(), "Non-Empty string value must be valid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 0, "Non-Empty string value must render ZERO alert");
        // Must be invalid
        let component2 = (<BaseInput
            type="text"
            value=""
            validations={{
                required: (value: any) => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                }
            }}
        />);

        componentNode = TestUtils.renderIntoDocument(component2);
        chai.assert.isNotOk(componentNode.isValid(), "Empty string value must be invalid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1, "Empty string value must render one alert");
    });

     it("'max limit' Control", () => {
        // Must be invalid
        let component2 = (<BaseInput
            type="text"
            value="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na"
            validations={{
                required: (value: any) => {
                    return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
                }
            }}
        />);

        let componentNode = TestUtils.renderIntoDocument(component2);
        chai.assert.isNotOk(componentNode.isValid(), "1000 char string value must be invalid");
        chai.assert.equal(ReactDOM.findDOMNode(componentNode).getElementsByClassName("input-alert").length, 1, "1000 char string value must render one alert");
    });
});
