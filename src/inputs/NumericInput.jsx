import React from "react";
import is from "is-js";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

/**
 * A wrapper element for BaseInput.
 * Filters non-numeric characters.
 * @export
 * @class NumericInput
 * @extends {ShallowComponent}
 */
export default class NumericInput extends ShallowComponent {

    /**
     * propTypes
     * 
     * @static
     */
    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.any.isRequired,
        onChange: React.PropTypes.func
    };

    /**
     * Creates an instance of NumericInput.
     * 
     * @param props (description)
     */
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || ""
        }
    }

    /**
     * render
     * 
     * @returns (description)
     */
    render() {
        return (<Input
            {...this.props}
            value = {this.state.value}
            type="text"
            ref="innerInput"
            onChange={this.__numericFilter}
            />);
    }

    /**
     * Returns validity of the component.
     * @return true if it is valid.
     */
    isValid = () => {
        return this.refs.innerInput.isValid();
    };

    /**
     * Updates validations incase of initial props changed.
     */
    updateValidations = (validationItem) => {
        this.refs.innerInput.updateValidations(validationItem);
    };

    /**
     * Internal onchange handler for filtering numerics.
     */
    __numericFilter = (e) => {
        let value = e.target.value;
        if (value && !is.numeric(value)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        } else {
            e.target.parsedValue = value ? parseInt(value, 10) : value;
            this.setState({
                value: e.target.parsedValue
            });
            if (this.props.onChange)
                this.props.onChange(e);
        }
    };
}
