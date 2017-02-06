import React from "react";
import InputGroup from "react-bootstrap/lib/InputGroup";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Input from "./BaseInput";

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
         * name use as input field name
         */
        name: React.PropTypes.string,
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
        thousandSeparator: React.PropTypes.oneOf([".", ","]),
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
        hidden: React.PropTypes.bool,
        /**
        *Defines the display style of the Validation message.
        */
        validationDisplay: React.PropTypes.oneOf(["overlay", "block"]),
        /**
       * Left Input Addon
       */
        inputGroupLeft: React.PropTypes.object

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
        hidden: false,
        validationDisplay: "block"
    };

    innerComponent;
    caretPosition = 0;


    render(): Object {
        /* eslint-disable no-unused-vars */
        let { thousandSeparator, decimalSeparator, unit, ...newProps } = this.props;
        return (
            <Input
                {...newProps}
                type="text"
                label={this.props.label}
                onChange={this.__onChange}
                onKeyPress={this.__focus2Fraction}
                value={this.props.value}
                ref={(component: Object) => { this.innerComponent = component } }
                inputGroupRight={<InputGroup.Addon>{this.props.unit}</InputGroup.Addon>}
                />
        );
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid(): boolean {
        return this.innerComponent.isValid();
    }

    /**
     * checks validation by current value
     * isValid then return empty Array else return Array<String>
     * isValid = Array.length != 0
     * @param value
     */
    validate(value: any): Array<string> {
        return this.innerComponent.validate(value);
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    __onChange(e: Object): boolean {
        this.caretPosition = this.innerComponent.getCaretPosition();
        let value = e.target.value;

        if (value === undefined || value === null) {
            value = "";
        }

        let preThCount = value.substring(0, this.caretPosition).split(this.props.thousandSeparator).length;
        value = this.__addThousandSeparator(value);
        let postThCount = value.substring(0, this.caretPosition).split(this.props.thousandSeparator).length;
        this.caretPosition -= (preThCount - postThCount);

        let result = this.__isFloat(value) || value === "";
        if (result) {
            e.target.parsedValue = value;
            if (this.props.onChange) {
                result = this.props.onChange(e);
            }
        }
        if (result === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (this.props.value === value) {
            this.forceUpdate();
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
        if (!input) {
            return "";
        }
        if (input.charAt(0) === this.props.thousandSeparator) {
            input = input.substring(1);
        }
        let indexDS = input.indexOf(this.props.decimalSeparator);
        if (indexDS === -1) {
            indexDS = input.length;
        }
        indexDS--;
        let output = [];
        let indexTH = 1;
        /* eslint-disable no-continue */
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
        let fraction = input.split(".")[1];
        if (fraction !== undefined) {
            output = output + this.props.decimalSeparator + fraction;
        }
        return output;
    }

    componentDidUpdate() {
        if (this.innerComponent.isFocused()) {
            this.innerComponent.setCaretPosition(this.caretPosition);
        }
    }
}
