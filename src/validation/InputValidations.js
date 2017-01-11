import { Application } from "robe-react-commons";
import template from "es6-template-strings";
import validationMessages from "./validationMessages.json";
Application.loadI18n(validationMessages);
class InputValidations {
    constructor() {
    }
    required = (value: any, code: string): string => {
        let message = Application.i18n("validation").required;
        /* eslint-disable no-eval */
        return (value === undefined || value === null || value === "" || value.length === 0) ?
            template(message, {
                value: value,
                code: code
            }) : undefined;
    }
    htmlRequired = (value: any, code: string): string => {
        let message = Application.i18n("validation").required;
        /* eslint-disable no-eval */
        return (value === undefined || value === null || value === "" || String(value) === "<div><br></div>") ?
            template(message, {
                value: value,
                code: code
            }) : undefined;
    }
    minValue = (minValue: number, value: number, code: string): string => {
        let message = Application.i18n("validation").minValue;
        /* eslint-disable no-eval */
        return (value === undefined || value === null || value < minValue) ?
            template(message, {
                minValue: minValue,
                value: value,
                code: code
            }) : undefined;
    }
    maxValue = (maxValue: number, value: number, code: string): string => {
        let message = Application.i18n("validation").maxValue;

        /* eslint-disable no-eval */
        return (value === undefined || value === null || value > maxValue) ?
            template(message, {
                maxValue: maxValue,
                value: value,
                code: code
            }) : undefined;
    }
    minLength = (min: number, value: string, code: string): string => {
        let message = Application.i18n("validation").minLength;
        let valueLength = (value === undefined || value === null) ? 0 : value.length;
        /* eslint-disable no-eval */
        return (valueLength < min) ?
            template(message, {
                min: min,
                value: value,
                code: code,
            }) : undefined;
    }
    maxLength = (max: number, value: string, code: string): string => {
        let message = Application.i18n("validation").maxLength;
        let valueLength = (value === undefined || value === null) ? 0 : value.length;
        /* eslint-disable no-eval */
        let result = (valueLength > max) ?
            template(message, {
                max: max,
                value: value,
                code: code,
            }) : undefined;
        return result;
    }
    regex = (regex: string, value: any, code: string): string => {
        let message = Application.i18n("validation").regex;
        /* eslint-disable no-eval */
        return !(new RegExp(regex).test(value)) ?
            template(message, {
                value: value,
                code: code,
                regex: regex
            }) : undefined;
    }

}

export default new InputValidations();

