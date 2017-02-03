import React from "react";
import { ShallowComponent, Application } from "robe-react-commons";
import { InputGroup } from "react-bootstrap";
import zxcvbn from 'zxcvbn';
import Input from "./BaseInput";

/**
 * An input element for passwords.
 * Password wrapper for BaseInput
 * @export
 * @class PasswordInput
 * @extends {ShallowComponent}
 */
export default class PasswordInput extends ShallowComponent {
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
        inputGroupLeft: React.PropTypes.any,
        /**
        * Right Input Addon
        */
        inputGroupRight: React.PropTypes.any,
        /**
        * it specifies that a password strength is hidden or visible
        */
        strength: React.PropTypes.bool
    };

    innerComponent;
    strengthMessages;

    constructor(props: Object) {
        super(props);
        this.strengthMessages = Application.i18n(PasswordInput, "inputs.PasswordInput", "strength");
    }
    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        strength: false,
        autoFocus: false,
        value: "",
        validationDisplay: "block"
    };

    /**
     * render
     * @returns
     */
    render(): Object {

        let {strength, inputGroupRight, autoFocus, ...newProps} = this.props;

        if (strength) {
            let value = this.props.value;
            let result = zxcvbn(value);
            let resultScore = this.strengthMessages[result.score];
            let inputGroupRightStrength = <InputGroup.Addon key="password-strength-addon">{resultScore}</InputGroup.Addon>;

            if (inputGroupRight) {
                inputGroupRight = [inputGroupRightStrength,inputGroupRight];
            } else {
                inputGroupRight = inputGroupRightStrength;
            }

            autoFocus = true;
        }

        return (
            <Input
                {...newProps}
                autoFocus={autoFocus}
                onChange={this.__onChange}
                type="password"
                ref={(component: Object) => { this.innerComponent = component }}
                inputGroupRight={inputGroupRight}
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
     * Internal onchange handler.
     */
    __onChange(e: Object): boolean {
        let result = true;
        if (this.props.onChange) {
            result = this.props.onChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }
}
