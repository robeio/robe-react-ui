import { Application } from "robe-react-commons";
import validationMessages from "./validationMessages.json";
import template from "es6-template-strings";

class InputValidations {
    constructor() {
        Application.loadI18n(validationMessages);
    }
    required = (value: any) => {
        let message = Application.i18n("validation").required;
        /* eslint-disable no-eval */
        return (value === undefined || value === null || value === "") ?
            template(message, {
                value: value
            }) : undefined;
    }

    htmlRequired = (value: any) => {
        let message = Application.i18n("validation").required;
        /* eslint-disable no-eval */
        return (value === undefined || value === null || value === "" || String(value) === "<div><br></div>") ?
            template(message, {
                value: value
            }) : undefined;
    }
    minValue = (minValue: number, value: number) => {
        let message = Application.i18n("validation").minValue;
        /* eslint-disable no-eval */
        return (value === undefined || value === null || value < minValue) ?
            template(message, {
                minValue: minValue,
                value: value
            }) : undefined;
    }
    maxValue = (maxValue: number, value: number) => {
        let message = Application.i18n("validation").maxValue;

        /* eslint-disable no-eval */
        return (value === undefined || value === null || value > maxValue) ?
            template(message, {
                minValue: maxValue,
                value: value
            }) : undefined;
    }
    minLength = (min: number, value: string) => {
        let message = Application.i18n("validation").minLength;
        let valueLength = (value === undefined || value === null) ? 0 : value.length;
        /* eslint-disable no-eval */
        return (valueLength < min) ?
            template(message, {
                min: min
            }) : undefined;
    }
    maxLength = (max: number, value: string) => {
        let message = Application.i18n("validation").maxLength;
        let valueLength = (value === undefined || value === null) ? 0 : value.length;
        /* eslint-disable no-eval */
        let result = (valueLength > max) ?
            template(message, {
                max: max
            }) : undefined;
        return result;
    }

}

export default new InputValidations();

