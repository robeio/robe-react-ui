import { Application } from "robe-react-commons";
import validationMessages from "./validationMessages.json";


class InputValidations {
    constructor() {
        Application.loadI18n(validationMessages);
    }
    required = (value: any) => {
        let message = Application.i18n("validation").required;
        let evalMessage = `\`${message}\``;

        /* eslint-disable no-eval */
        return (value === undefined || value === null || value === "") ?
            eval(evalMessage) : undefined;
    }
    minValue = (minValue: number, value: number) => {
        let message = Application.i18n("validation").minValue;
        let evalMessage = `\`${message}\``;

        /* eslint-disable no-eval */
        return (value === undefined || value === null || value < minValue) ?
            eval(evalMessage) : undefined;
    }
    maxValue = (maxValue: number, value: number) => {
        let message = Application.i18n("validation").maxValue;
        let evalMessage = `\`${message}\``;

        /* eslint-disable no-eval */
        return (value === undefined || value === null || value > maxValue) ?
            eval(evalMessage) : undefined;
    }

}

export default new InputValidations();

