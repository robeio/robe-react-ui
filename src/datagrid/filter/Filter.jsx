import React from "react";
import { ShallowComponent } from "robe-react-commons";
import * as Input from "../../inputs";
import ComponentManager from "../../form/ComponentManager";
export default class Filter extends ShallowComponent {

    static propTypes: Map = {
        /**
         * Field properties to filter
         */
        field: React.PropTypes.array.isRequired,
        /**
         *Value of the filter
         */
        value: React.PropTypes.any
    }

    render(): Object {
        let field = this.props.field;
        let name = field.name;
        let Component = ComponentManager.findComponentByType(field.type);
        let style = {};
        if (field.type === "select") {
            style = { width: "176px" };
        }
        return (
            <Component
                {...field}
                style={style}
                key={`${name}_key`}
                ref={`${name}Ref`}
                value={this.props.value}
                onChange={this.__handleChange}
            />);
    }

    __handleChange(e: Object): boolean {
        let field = this.props.field;
        let name = field.name;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let filter = "";
        if (value !== "" && value !== undefined && value !== null) {
            switch (field.type) {
                case "string":
                    filter = `${name}~=${value}`;
                    break;
                case "number":
                    filter = `${name}=${value}`;
                    break;
                case "decimal":
                    filter = `${name}=${value}`;
                    break;
                case "date":
                    filter = `${name}>=${value}`;
                    break;
                case "password":
                    filter = `${name}=${value}`;
                    break;
                case "money":
                    filter = `${name}=${value}`;
                    break;
                case "radio":
                    filter = `${name}=${value}`;
                    break;
                case "select":
                    filter = `${name}=${value}`;
                    break;
                case "check":
                    filter = `${name}=${value}`;
                    break;
                default:
                    return true;
            }
        }
        this.props.onChange(name, value, filter);
        return true;
    }
}
