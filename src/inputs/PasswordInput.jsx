import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

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
         * Value of the component
         */
        value: React.PropTypes.any.isRequired,
        /**
         * handleChange event for the component
         */
        handleChange: React.PropTypes.func,
    };

    static defaultProps = {
        value: ""
    };

    /**
     * render
     * @returns
     */
    render(): Object {
        return (
            <Input
                {...this.props}
                onChange={this.__onChange.bind(this)}
                type="password"
                ref="innerInput"
            />);
    }

    /**
     * Returns validity of the component.
     * @return true if it is valid.
     */
    isValid(): boolean {
        return this.refs.innerInput.isValid();
    }
    /**
     * Internal onchange handler.
     */
    __onChange(e: Object) {
        let result = true;
        if (this.props.handleChange) {
            result = this.props.handleChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }
}
