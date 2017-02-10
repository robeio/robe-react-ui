import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies
import TestUtils from "../TestUtils";
import DecimalInput from "inputs/DecimalInput";// eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("inputs/DecimalInput", () => {
    const props = {
        label: "Label",
        value: "42",
        onChange: () => { },
        validations: {
            required: (value: any): Array => {
                return (value === undefined || value === null || value === "") ? "Not Valid" : undefined;
            },
            requiredMessage: "Error Test"
        }
    };
   
    it("'props' Controls", () => {
        let componentNode = TestUtils.mount({}, DecimalInput, props);
        chai.assert.equal(componentNode.prop("label"), "Label");
        chai.assert.equal(componentNode.prop("value"), "42");
        chai.assert.equal(componentNode.prop("onChange").name, "onChange");
        chai.assert.isDefined(componentNode.prop("validations"), "Validation prop error");
    });

    it("'validations' Control", () => {
        let componentNode = TestUtils.mount({}, DecimalInput, props);
        chai.assert.isOk(componentNode.instance().isValid(), "Non-empty string mus be valid");
        chai.assert.equal(componentNode.find(".input-alert").length, 0, "Non-Empty string value must render ZERO alert");// eslint-disable-line react/no-find-dom-node
        // Must be invalid

        componentNode = TestUtils.mount({ value: "" }, DecimalInput, props);
        chai.assert.isNotOk(componentNode.instance().isValid(), "Empty string must be invalid");
    });

    it("'__onChange", (done: Function) => {
        let componentNode = TestUtils.mount({ onChange: (): boolean => { return true; } }, DecimalInput, props);
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
        componentNode.instance().__onChange(e);
        e.target.value = "12.2";
        e.preventDefault = () => {
            chai.assert.isOk(false, "Input value '12.2' failed");
            done("Input value '12.2' failed");
        };
        componentNode.instance().__onChange(e);

        componentNode = TestUtils.mount({
            onChange: () => {
                chai.assert.isOk(false);
                done("Input value '12q2' failed");
            }
        }, DecimalInput, props);
        e.target.value = "12q2";
        e.preventDefault = () => {
            chai.assert.isOk(true, "Input value '12q2' failed");
        };
        componentNode.instance().__onChange(e);

        e.target.value = null;
        componentNode.instance().__onChange(e);
        done();
    });
});
