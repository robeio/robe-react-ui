import React from "react";
import Assertions from "robe-react-commons/lib/utils/Assertions";
import moment from "moment";
import * as Input from "../inputs";
import FaIcon from "../faicon/FaIcon";

class ComponentManager {
    COMPONENTS =
        {
            string: {
                type: Input.TextInput,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            },
            text: {
                type: Input.TextArea,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            },
            number: {
                type: Input.NumericInput,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            },
            decimal: {
                type: Input.DecimalInput,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            },
            date: {
                type: Input.DateInput,
                display: (column: Object, value: string): Object => {
                    let format = column.format ? column.format : "DD/MM/YYYY";
                    /**
                     * TODO check locale this again
                     */
                    let locale = column.locale ? column.locale : "tr";
                    moment.locale(locale);
                     /**
                     * TODO check locale this again
                     */
                    let date = moment(value);
                    return date.isValid() ? date.format(format) : "";
                }
            },
            password: {
                type: Input.PasswordInput,
                display: (column: Object, value: string): Object => {
                    return "*****";
                }
            },
            money: {
                type: Input.MoneyInput,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            },
            radio: {
                type: Input.RadioInput,
                display: (column: Object, value: string): Object => {
                    return this.__getTextValue(column, value);
                }
            },
            select: {
                type: Input.SelectInput,
                display: (column: Object, value: string): Object => {
                    return this.__getTextValue(column, value);
                }
            },
            check: {
                type: Input.CheckInput,
                display: (column: Object, value: string): Object => {
                    let result = this.__getTextValue(column, value);
                    if (result === true) {
                        return (<FaIcon size={"fa-lg"} code="fa-check-square-o" />); // eslint-disable-line
                    }
                    return (<FaIcon size={"fa-lg"} code="fa-square-o" />);// eslint-disable-line
                }
            },
            html: {
                type: Input.HtmlEditor,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            },
            file: {
                type: Input.FileUploadInput,
                display: (column: Object, value: string): Object => {
                    return value;
                }
            }
        };

    addComponent(componentType: string, component: Object, display: Function) {
        Assertions.isString(componentType, true);
        Assertions.isFunction(display, true);
        this.COMPONENTS[componentType] = {
            type: component,
            display: display
        };
    }
    getComponentType(type: string): Object {
        return this.COMPONENTS[type].type;
    }
    getComponentDisplayValue(type: string, column: Object, value: string): Object {
        let component = this.COMPONENTS[type];
        Assertions.isNotUndefined(component, true);
        Assertions.isNotUndefined(component.display, true);
        Assertions.isFunction(component.display, true);
        return component.display(column, value);
    }
    __getTextValue(column: Object, selectedValues: any): any {
        let isMultipleSelection = !!column.items;
        if (!isMultipleSelection) {
            return selectedValues;
        }
        selectedValues = [].concat(selectedValues);
        let textOfValues = [];
        let textField = column.textField || "text";
        let valueField = column.valueField || "value";
        for (let i = 0; i < column.items.length; i++) {
            let item = column.items[i];
            for (let k = 0; k < selectedValues.length; k++) {
                let selectedValue = selectedValues[k];
                if (String(item[valueField]) === selectedValue) {
                    textOfValues.push(item[textField]);
                }
            }
        }
        return textOfValues.join(", ");
    }
}
export default new ComponentManager();
