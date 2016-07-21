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
         * Decimal Seperator for integer and fraction.
         */
        decimalSeparator: React.PropTypes.oneOf([".", ","])
    };

    static defaultProps = {
        decimalSeperator: ".",
        value: ""
    };

    render(): Object {
        return (<Input
            {...this.props}
            type="text"
            ref="innerInput"
            step={this.props.step}
            value={this.props.value}
            onChange={this.props.onChange !== undefined ? this.__numericFilter : undefined}
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
    __numericFilter = (e: Object) => {
        let value = e.target.value;
        if (this.__isFloat(value) || value === "") {
            e.target.parsedValue = value;
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    __isFloat = (input: string): boolean => {
        if (input === null || input === undefined) {
            return false;
        }
        let found = input.match("^[0-9]{1,6}((\\" + this.props.decimalSeperator + ")|(\\" + this.props.decimalSeperator + "\\d{1,2}))?$");
        return found !== undefined && found !== null;
    }
}
