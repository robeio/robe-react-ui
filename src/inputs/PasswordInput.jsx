import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
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
        validationDisplay: React.PropTypes.oneOf(['overlay', 'block'])
    };

    static refName = "innerInput";
    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        value: "",
        validationDisplay: "block"
    };

    /**
     * render
     * @returns
     */
    render(): Object {
        return (
            <Input
                {...this.props}
                onChange={this.__onChange}
                type="password"
                ref={PasswordInput.refName}
                />);
    }

    /**
     * Returns validity of the component.
     * @return true if it is valid.
     */
    isValid(): boolean {
        return this.refs[PasswordInput.refName].isValid();
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
