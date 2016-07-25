import Assertions from "../../node_modules/robe-react-commons/lib/utils/Assertions";
import * as Input from "../inputs";

/**
 *
 */
class ComponentGenerator {

    _componentFinderNames = [];
    _componentFinders = [];

    constructor() {
        this._componentFinderNames.push("__standart");
        this._componentFinders.push(this.__getComponentByType);
    }
    /**
     *
     * @param componentType
     * @returns {*}
     */
    findComponentByType = (componentType: any) => {
        Assertions.isNotEmpty(componentType, true);
        let finderFunction;
        let componentClass;
        for (let i = this._componentFinders.length; i >= 0; i--) {
            finderFunction = this._componentFinders[i - 1];
            if (finderFunction) {
                componentClass = finderFunction(componentType);
                if (componentClass && Assertions.isReactComponentClass(componentClass)) {
                    break;
                }
            }
        }
        return componentClass;
    }

    /**
     *
     * @param componentType
     * @returns {*}
     * @private
     */
    __getComponentByType = (componentType: string) => {
        Assertions.isString(componentType, true);
        switch (componentType) {
            case "string":
            case "TextInput":
                return Input.TextInput;
            case "number":
            case "NumericInput":
                return Input.NumericInput;
            case "decimal":
            case "DecimalInput":
                return Input.DecimalInput;
            case "date":
            case "DateInput":
                return Input.DateInput;
            case "password":
            case "PasswordInput":
                return Input.PasswordInput;
            case "money":
            case "MoneyInput":
                return Input.MoneyInput;
            case "radio":
            case "RadioInput":
                return Input.RadioInput;
            case "select":
            case "SelectInput":
                return Input.SelectInput;
            case "check":
            case "CheckInput":
                return Input.CheckInput;
            case "checkList":
            case "CheckList":
                return Input.CheckList;
            case "editor":
            case "HtmlEditor":
                return Input.HtmlEditor;
            default :
                throw new Error(`Unknown ${componentType} type !`);
        }
    }

    /**
     *
     * @param componentFinder
     */
    addComponentFinder(componentFinderName, componentFinder: Function) {
        if (this._componentFinderNames.indexOf(componentFinderName) === -1) {
            this._componentFinderNames.push(componentFinderName);
            this._componentFinders.push(componentFinder);
        } else {
            throw new Error("Component Finder already exist ! ");
        }
    }
    deleteComponentFinderByName(componentFinderName) {
        let index = this._componentFinderNames.indexOf(componentFinderName);
        if (index !== -1) {
            this._componentFinderNames.splice(index, 1);
            this._componentFinders.splice(index, 1);
        }
    }
}

export default new ComponentGenerator();
