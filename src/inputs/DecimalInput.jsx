import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

/**
 * DecimalInput is a component decimal inputs.
 * Has support for different decimal seperators (,/.)
 * Supports 2 digits after seperator.
 * @export
 * @class Decimal
 * @extends {ShallowComponent}
 */
export default class DecimalInput extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes = {
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.any.isRequired,
        /**
         * onChange event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * handleChange event for the component
         */
        handleChange: React.PropTypes.func,
        /**
         * Decimal Seperator for integer and fraction.
         */
        decimalSeparator: React.PropTypes.oneOf([".", ","])
    };

    static defaultProps = {
        decimalSeperator: ".",
        value: ""
    };

    render(): Object {
        let onChange = this.props.onChange ? this.props.onChange.bind(this) : this.numericFilter.bind(this);
        return (<Input
            {...this.props}
            type="text"
            ref="innerInput"
            step={this.props.step}
            value={this.props.value}
            onChange={onChange}
        />);
    }

    /**
      * Returns the validity of the value.
      * @return true - value is valid, false - invalid
      */
    isValid(): boolean {
        return this.refs.innerInput.isValid();
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    numericFilter(e: Object) {
        let value = e.target.value;
        let result = this.__isFloat(value) || value === "";
        if (result && this.props.handleChange) {
            e.target.parsedValue = value;
            result = this.props.handleChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }

    __isFloat = (input: string): boolean => {
        if (input === null || input === undefined) {
            return false;
        }
        let found = input.match("^[0-9]{1,6}((\\" + this.props.decimalSeperator + ")|(\\" + this.props.decimalSeperator + "\\d{1,2}))?$");
        return found !== undefined && found !== null;
    }
}
