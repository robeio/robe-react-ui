import React from "react";
import is from "is-js";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Input from "./BaseInput";

/**
 * NumericInput is a wrapper element for BaseInput.
 * Filters non-numeric characters, accepts only numeric characters.
 * @export
 * @class NumericInput
 * @extends {ShallowComponent}
 */
export default class NumericInput extends ShallowComponent {

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
        value: React.PropTypes.any,
        /**
         * onChange event for the component
         */
        onChange: React.PropTypes.func,
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
        inputGroupLeft: React.PropTypes.object,
        /**
        * Right Input Addon
        */
        inputGroupRight: React.PropTypes.object
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        value: "",
        disabled: false,
        readOnly: false,
        hidden: false,
        validationDisplay: "block"
    };

    innerComponent;

    render(): Object {
        let { thousandSeparator, decimalSeparator, ...newProps } = this.props;  //eslint-disable-line
        return (
            <Input
                {...newProps}
                value={this.props.value}
                type="text"
                ref={(component: Object) => { this.innerComponent = component } }
                onChange={this.__onChange}
            />
        );
    }

    /**
     * Returns validity of the component.
     * @return true if it is valid.
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
        let result = true;
        let value = e.target.value;
        if (value && !is.numeric(value)) {
            result = false;
        } else if (this.props.onChange) {
            let parsedVal = parseInt(value, 10);
            e.target.parsedValue = isNaN(parsedVal) ? undefined : parsedVal;
            result = this.props.onChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }
}
