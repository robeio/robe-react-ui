import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

export default class DecimalInput extends ShallowComponent {

    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.any.isRequired,
        onChange: React.PropTypes.func,
        decimalSeperator: React.PropTypes.string,
        fractionalSeperator: React.PropTypes.string,
        regex: React.PropTypes.array
    };

    static defaultProps = {
        regex: [/(^[0-9]{0,13}$)|((^[0-9]{0,13})+\.[0-9]{0,2}$)/igm, "Hatalı girdiniz."],
        decimalSeperator: ".",
        fractionalSeperator: ",",
        step: "0.01"
    };

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || ""
        };
    }

    render() {
        let value = this.props.onChange ? this.props.value : this.state.value;
        return (<Input
            {...this.props}
            type="number"
            ref="innerInput"
            step={this.props.step}
            value = {value}
            onChange={this.__numericFilter}
            />);
    }

    isValid = () => {
        return this.refs.innerInput.isValid();
    };
    __numericFilter = (e) => {
        let value = e.target.value;
        value = value ? parseFloat(parseFloat(value).toFixed(2)) : value;
        console.log(value);

        e.target.parsedValue = value;
        if (this.props.onChange) {
            this.props.onChange(e);
        } else {
            this.setState({
                value: value
            })
        }

    };
}
