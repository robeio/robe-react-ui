import React from "react";
import Assertions from "robe-react-commons/lib/utils/Assertions";
import moment from "moment";
import * as Input from "../inputs";
import FaIcon from "../faicon/FaIcon";

class ComponentManager {
    COMPONENTS =
        {
            string: {
                component: Input.TextInput,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            },
            text: {
                component: Input.TextArea,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            },
            number: {
                component: Input.NumericInput,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            },
            decimal: {
                component: Input.DecimalInput,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            },
            date: {
                component: Input.DateInput,
                displayAsText: (field: Object, value: string): Object => {

                    if(!value)
                        return "";
                    let format = field.format ? field.format : "DD/MM/YYYY";
                    /**
                     * TODO check locale this again
                     */
                    let locale = field.locale ? field.locale : "tr";
                    moment.locale(locale);
                     /**
                     * TODO check locale this again
                     */
                    let date = moment(value);
                    return date.isValid() ? date.format(format) : "";
                }
            },
            password: {
                component: Input.PasswordInput,
                displayAsText: (/* field: Object , value: string */): Object => {
                    return "*****";
                }
            },
            money: {
                component: Input.MoneyInput,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            },
            radio: {
                component: Input.RadioInput,
                displayAsText: (field: Object, value: string): Object => {
                    return this.__getTextValue(field, value);
                }
            },
            select: {
                component: Input.SelectInput,
                displayAsText: (field: Object, value: string): Object => {
                    return this.__getTextValue(field, value);
                }
            },
            check: {
                component: Input.CheckInput,
                displayAsText: (field: Object, value: string): Object => {
                    let result = this.__getTextValue(field, value);
                    if (result === true) {
                        return (<FaIcon size={"fa-lg"} code="fa-check-square-o" />); // eslint-disable-line
                    }
                    return (<FaIcon size={"fa-lg"} code="fa-square-o" />);// eslint-disable-line
                }
            },
            html: {
                component: Input.HtmlEditor,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            },
            file: {
                component: Input.FileUploadInput,
                displayAsText: (field: Object, value: string): Object => {
                    return value;
                }
            }
        };

    addComponent(componentType: string, component: Object, displayAsText: Function) {
        Assertions.isString(componentType, true);
        Assertions.isFunction(displayAsText, true);
        this.COMPONENTS[componentType] = {
            component: component,
            displayAsText: displayAsText
        };
    }

    /**
     *
     * @param type
     * @returns {*}
     */
    getComponent(type: string): Object {
        return this.COMPONENTS[type].component;
    }

    /**
     *
     * @param type
     * @param field
     * @param value
     * @returns {*|Object}
     */
    getDisplayAsText(type: string, field: Object, value: string): Object {
        let component = this.COMPONENTS[type];
        Assertions.isNotUndefined(component, true);
        Assertions.isNotUndefined(component.displayAsText, true);
        Assertions.isFunction(component.displayAsText, true);
        return component.displayAsText(field, value);
    }


    /**
     *
     * @param field
     * @param selectedValues
     * @returns {*}
     * @private
     */
     /* eslint-disable class-methods-use-this */
    __getTextValue(field: Object, selectedValues: any): any {
        let isMultipleSelection = !!field.items;
        if (!isMultipleSelection) {
            return selectedValues;
        }
        selectedValues = [].concat(selectedValues);
        let textOfValues = [];
        let textField = field.textField || "text";
        let valueField = field.valueField || "value";
        for (let i = 0; i < field.items.length; i++) {
            let item = field.items[i];
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
