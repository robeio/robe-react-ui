import React from "react";
import is from "is-js";
import { ShallowComponent } from "robe-react-commons";
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
         * Value of the component
         */
        value: React.PropTypes.any.isRequired,
        /**
         * onChange event for the component
         */
        handleChange: React.PropTypes.func
    };

    static defaultProps = {
        value: ""
    };

    render(): Object {
        return (<Input
            {...this.props}
            value={this.props.value}
            type="text"
            ref="innerInput"
            onChange={this.__numericFilter.bind(this)}
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
     * Internal onchange handler for filtering numerics.
     */
    __numericFilter(e: Object) {
        let result = true;
        let value = e.target.value;
        if (value && !is.numeric(value)) {
            result = false;
        } else if (this.props.handleChange) {
            let parsedVal = parseInt(value, 10);
            e.target.parsedValue = isNaN(parsedVal) ? undefined : parsedVal;
            result = this.props.handleChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }
}
