import chai from "chai"; // eslint-disable-line import/no-extraneous-dependencies
import React from "react"; // eslint-disable-line no-unused-vars
import Application from "robe-react-commons/lib/application/Application";
import InputValidations from "validation/InputValidations"; // eslint-disable-line import/no-extraneous-dependencies,import/no-unresolved

describe("validation/InputValidations", () => {
    function resetValidationMessage() {
        Application.loadI18n({"validation.InputValidations": {
            required: "This field is required.",
            minValue: "Value must be greater or equal to ${minValue}",
            maxValue: "Value must be less or equal to ${maxValue}",
            minLength: "Input cannot be less than ${min} characters.",
            maxLength: "Input cannot be more than ${max} characters."
        } });
    }

    it("required", () => {
        resetValidationMessage();

        let required = InputValidations.required(undefined);
        chai.assert.equal(required, "This field is required.");

        required = InputValidations.required(null);
        chai.assert.equal(required, "This field is required.");

        required = InputValidations.required("");
        chai.assert.equal(required, "This field is required.");

        required = InputValidations.required({});
        chai.assert.equal(required, undefined);

        Application.loadI18n({ "validation.InputValidations": { required: "${code} field is required." } });

        required = InputValidations.required(undefined, "robe");
        chai.assert.equal(required, "robe field is required.");
    });

    it("htmlRequired", () => {
        resetValidationMessage();

        let htmlRequired = InputValidations.htmlRequired(undefined);
        chai.assert.equal(htmlRequired, "This field is required.");

        htmlRequired = InputValidations.htmlRequired(null);
        chai.assert.equal(htmlRequired, "This field is required.");

        htmlRequired = InputValidations.htmlRequired("");
        chai.assert.equal(htmlRequired, "This field is required.");

        htmlRequired = InputValidations.htmlRequired({});
        chai.assert.equal(htmlRequired, undefined);

        Application.loadI18n({ "validation.InputValidations": { required: "${code} field is required." } });

        htmlRequired = InputValidations.htmlRequired(htmlRequired, "robe");
        chai.assert.equal(htmlRequired, "robe field is required.");
    });

    it("minValue", () => {
        resetValidationMessage();

        let minValue = InputValidations.minValue(5, undefined);
        chai.assert.equal(minValue, "Value must be greater or equal to 5");

        minValue = InputValidations.minValue(5, 6);
        chai.assert.equal(minValue, undefined);

        minValue = InputValidations.minValue(5, null);
        chai.assert.equal(minValue, "Value must be greater or equal to 5");

        Application.loadI18n({ "validation.InputValidations": { minValue: "${code} field must be greater or equal to ${minValue}" } });

        minValue = InputValidations.minValue(5, 2, "robe");
        chai.assert.equal(minValue, "robe field must be greater or equal to 5");
    });

    it("maxValue", () => {
        resetValidationMessage();

        let maxValue = InputValidations.maxValue(5, undefined);
        chai.assert.equal(maxValue, "Value must be less or equal to 5");

        maxValue = InputValidations.maxValue(5, 2);
        chai.assert.equal(maxValue, undefined);

        maxValue = InputValidations.maxValue(5, null);
        chai.assert.equal(maxValue, "Value must be less or equal to 5");

        Application.loadI18n({ "validation.InputValidations": { maxValue: "${code} field must be less or equal to ${maxValue}" } });

        maxValue = InputValidations.maxValue(5, 7, "robe");
        chai.assert.equal(maxValue, "robe field must be less or equal to 5");
    });

    it("minLength", () => {
        resetValidationMessage();

        let minLength = InputValidations.minLength(5, undefined);
        chai.assert.equal(minLength, "Input cannot be less than 5 characters.");

        minLength = InputValidations.minLength(5, null);
        chai.assert.equal(minLength, "Input cannot be less than 5 characters.");

        minLength = InputValidations.minLength(5, 6);
        chai.assert.equal(minLength, undefined);

        Application.loadI18n({ "validation.InputValidations": { minLength: "${code} input cannot be less than ${min} characters." } });

        minLength = InputValidations.minLength(5, "test", "robe");
        chai.assert.equal(minLength, "robe input cannot be less than 5 characters.");
    });

    it("maxLength", () => {
        resetValidationMessage();

        let maxLength = InputValidations.maxLength(5, undefined);
        chai.assert.equal(maxLength, undefined);

        maxLength = InputValidations.maxLength(5, null);
        chai.assert.equal(maxLength, undefined);

        Application.loadI18n({ "validation.InputValidations": { maxLength: "${code} input cannot be more than ${max} characters." } });

        maxLength = InputValidations.maxLength(5, "test value", "robe");
        chai.assert.equal(maxLength, "robe input cannot be more than 5 characters.");
    });
});
