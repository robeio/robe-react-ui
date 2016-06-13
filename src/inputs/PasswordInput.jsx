import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

/**
 * An input element for passwords.
 * Password wrapper for BaseInput. 
 * @export
 * @class PasswordInput
 * @extends {ShallowComponent}
 */
export default class PasswordInput extends ShallowComponent {
    /**
     * propTypes
     * @static
     */
    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    };

    /**
     * Creates an instance of PasswordInput.
     * 
     * @param props (description)
     */
    constructor(props) {
        super(props);
    }

    /**
     * render
     * 
     * @returns
     */
    render() {
        return (
            <Input
                {...this.props}
                type="password"
                ref="innerInput"
                />);
    }

    /**
     * Returns validity of the component.
     * @return true if it is valid.
     */
    isValid = () => {
        return this.refs.innerInput.isValid();
    };
}
