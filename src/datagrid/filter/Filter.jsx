import React from "react";
import { ShallowComponent, Objects } from "robe-react-commons";
import * as Input from "../../inputs";
import ComponentManager from "../../form/ComponentManager";

export default class Filter extends ShallowComponent {

    static propTypes: Map = {
        /**
         * Field properties to filter
         */
        field: React.PropTypes.object.isRequired,
        /**
         *Value of the filter
         */
        value: React.PropTypes.any,
        /**
        *Delay between last keystroke and filter request.
        */
        delay: React.PropTypes.number
    }

    __refMap = {};

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    render(): Object {
        let field = Objects.deepCopy(this.props.field);
        delete field.validations;
        delete field.sort;
        let name = field.name;
        let Component = ComponentManager.getComponent(field.type);
        let style = {};
        if (field.type === "select") {
            style = { width: "176px" };
        }
        if (field.range !== true || (
            field.type !== "number" &&
            field.type !== "decimal" &&
            field.type !== "money" &&
            field.type !== "date")) {
            delete field.range;

            return (
                <Component
                    {...field}
                    style={style}
                    value={this.state.value}
                    onChange={this.__handleChange}
                    />);
        }
        let fieldMin = Objects.deepCopy(field);
        delete fieldMin.range;
        fieldMin.name += "-min";
        let fieldMax = Objects.deepCopy(field);
        delete fieldMax.range;
        fieldMax.name += "-max";
        let minOnChange = this.__handleRangeChange.bind(undefined, fieldMin.name);
        let maxOnChange = this.__handleRangeChange.bind(undefined, fieldMax.name);
        let value = this.state.value === undefined ? [] : this.state.value;
        return (
            <div>
                <Component
                    {...fieldMin}
                    style={style}
                    key={`${name}_key-min`}
                    value={value[0]}
                    onChange={minOnChange}
                    />
                <Component
                    {...fieldMax}
                    style={style}
                    key={`${name}_key-max`}
                    value={value[1]}
                    onChange={maxOnChange}
                    />
            </div>
        );
    }

    __handleChange(e: Object): boolean {
        let field = this.props.field;
        let name = field.name;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let filter = [];
        if (value !== "" && value !== undefined && value !== null) {
            switch (field.type) {
                case "string":
                    filter = [name, "~=", value];
                    break;
                case "text":
                    filter = [name, "~=", value];
                    break;
                case "number":
                    filter = [name, "=", value];
                    break;
                case "decimal":
                    filter = [name, "=", value];
                    break;
                case "date":
                    filter = [name, ">=", value];
                    break;
                case "password":
                    filter = [name, "=", value];
                    break;
                case "money":
                    filter = [name, "=", value];
                    break;
                case "radio":
                    filter = [name, "=", value];
                    break;
                case "select":
                    filter = [name, "=", value];
                    break;
                case "check":
                    filter = [name, "=", value];
                    break;
                default:
                    return true;
            }
        }
        this.__propsOnChange(name, value, filter);
        return true;
    }

    __handleRangeChange(name: string, e: Object): boolean {

        let field = this.props.field;
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let valueArr = Objects.deepCopy(this.props.value === undefined ? [] : this.props.value);
        let isMin = name.substr(name.length - 4) === "-min";
        let oldValues = [];
        if (this.props.value !== undefined) {
            oldValues = this.props.value;
        }
        if (isMin) {
            valueArr[0] = value;
            valueArr[1] = oldValues[1];
        } else {
            valueArr[0] = oldValues[0];
            valueArr[1] = value;
        }
        let filter = [];
        switch (field.type) {
            case "number":
            case "decimal":
            case "date":
            case "money":
                if (valueArr[0] !== undefined && valueArr[0] !== "") {
                    filter.push([field.name, ">=", valueArr[0]]);
                }
                if (valueArr[1] !== undefined && valueArr[1] !== "") {
                    filter.push([field.name, "<=", valueArr[1]]);
                }
                break;
            default:
                return true;
        }
        this.__propsOnChange(field.name, valueArr, filter);
        return true;
    }

    __propsOnChange(name, value, filter) {
        clearTimeout(this.searchOnChange);
        this.setState({
            value
        });
        this.searchOnChange = setTimeout(function () {
            this.props.onChange(name, value, filter);
        }.bind(this), this.props.delay);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }
}
