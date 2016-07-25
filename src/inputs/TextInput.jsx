import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

/**
 * TextInput is a component for default one lined text inputs.
 *
 * @export
 * @class TextInput
 * @extends {ShallowComponent}
 */
export default class TextInput extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.string.isRequired,
        /**
         * handleChangeEvent event for the component
         */
        handleChange: React.PropTypes.func
    };

    /* eslint no-useless-constructor: 0*/
    /**
     * Creates an instance of TextInput.
     *
     * @param {any} props
     */
    constructor(props: Object) {
        super(props);
    }

    /**
     * Renders the component.
     *
     * @returns
     */
    render(): Object {
        return (
            <Input
                {...this.props}
                onChange={this.__onChange.bind(this)}
                type="text"
                ref="innerInput"
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
