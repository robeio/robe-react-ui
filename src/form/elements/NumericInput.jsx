import React from "react";
import is from "is-js";
import { ShallowComponent } from "robe-react-commons";
import Input from "form/elements/Input";

class NumericInput extends ShallowComponent {

    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.any.isRequired,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
    };

    render() {
        return (<Input
            {...this.props}
            type="text"
            ref="innerInput"
            onChange={this.__numericFilter}
        />);
    };

    isValid = ()=> {
        return this.refs.innerInput.isValid();
    };

    updateValidations = (validationItem)=> {
        this.refs.innerInput.updateValidations(validationItem)
    };

    __numericFilter = (e)=> {
        var value = e.target.value;
        if (value && !is.numeric(value)) {
            e.preventDefault();
            e.stopPropagation()
        } else {
            e.target.parsedValue = value ? parseInt(value) : value;
            this.props.onChange(e);
        }
    };
}

module.exports = NumericInput;