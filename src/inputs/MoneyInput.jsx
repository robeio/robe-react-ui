import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "./BaseInput";
import Numeral from "numeral";
import Turkish from "../../node_modules/numeral/languages/tr";
import InputGroup from "react-bootstrap/lib/InputGroup";



// Please look at http://numeraljs.com/

// TODO:take decimal seperator from props
// TODO:take format from props
// TODO:take fraction size from props

export default class MoneyInput extends ShallowComponent {
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
         * Unit for the currency. Will be displayed right side of the input.
         */
        unit: React.PropTypes.oneOf(["TL", "EUR", "USD"]),

        /**
         * Decimal Separator for integer and fraction.
         */
        decimalSeparator: React.PropTypes.oneOf([".", ","]),

        /**
         * Thousand Separator for integer and fraction.
         */
        thousandSeparator: React.PropTypes.oneOf([".", ","])
        ,
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,
        /**
         * it specifies that an input field is read-only
         */
        readOnly: React.PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        decimalSeparator: ".",
        thousandSeparator: ",",
        unit: "TL",
        value: "",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    /**
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        this.__numericFilter = this.__numericFilter.bind(this);
        if (this.props.decimalSeparator === ",") {
            Numeral.language("tr", Turkish);
            Numeral.language("tr");
        }
    }

    render(): Object {
        return (
            <Input
                {...this.props}
                type="text"
                label={this.props.label}
                onChange={this.__numericFilter}
                onKeyPress={this.__focus2Fraction}
                value={this.props.value}
                ref="innerInput"
                inputGroupRight={<InputGroup.Addon>{this.props.unit}</InputGroup.Addon>}
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
    __numericFilter(e: Object) {
        let value = e.target.value;
        let parsedValue = this.__addThousandSeparator(value);
        let result = this.__isFloat(parsedValue) || parsedValue === "";
        if (result && this.props.onChange) {
            e.target.parsedValue = isNaN(value) ? undefined : parsedValue;
            result = this.props.onChange(e);
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
        /* eslint-disable prefer-template */
        let found = input.match("(?=.)^(([1-9][0-9]{0,2}(" + this.props.thousandSeparator + "[0-9]{3})*)|0)?(\\" + this.props.decimalSeparator + "[0-9]{0,2})?$");
        return found !== undefined && found !== null;
    }
    __addThousandSeparator(input: string): string {
        let indexDS = input.indexOf(this.props.decimalSeparator);
        if (indexDS === -1) {
            indexDS = input.length;
        }
        indexDS--;
        let output = [];
        let indexTH = 1;
        for (let i = indexDS; i > -1; i--) {
            let char = input.charAt(i);
            if (char === this.props.thousandSeparator) {
                continue;
            }
            output.push(char);
            if (indexTH % 3 === 0 && i !== 0) {
                output.push(this.props.thousandSeparator);
            }
            indexTH++;
        }
        output = output.reverse().join("");
        indexDS = input.indexOf(this.props.decimalSeparator);
        let thCount = Math.floor((indexTH - 1) / 3);
        if (indexDS !== -1) {
            output = output + input.substring((indexDS - 1) + thCount);
        }
        return output;
    }
}