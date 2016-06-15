import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "./BaseInput";
import Numeral from "numeral";
import Turkish from "../../node_modules/numeral/languages/tr";
import is from "is-js";


// Please look at http://numeraljs.com/

// TODO:take decimal seperator from props
// TODO:take format from props
// TODO:take fraction size from props

export default class MoneyInput extends ShallowComponent {
    static propTypes = {
        label: React.PropTypes.string,
        value: React.PropTypes.number.isRequired,
        onChange: React.PropTypes.func,
        unit: React.PropTypes.oneOf(["TL", "EUR", "USD"]),
        decimalSeparator: React.PropTypes.oneOf([".", ","])
    };

    static defaultProps = {
        decimalSeparator: ".",
        unit: "TL"

    }
    static styleInteger = {
        textAlign: "end"
    };
    static styleFractional = {
        minWidth: "50px",
        display: "inline"
    };

    constructor(props) {
        super(props);
        if (this.props.decimalSeparator === ",") {
            Numeral.language("tr", Turkish);
            Numeral.language("tr");
        }
    }

    render() {
        let values = this.__splitValue(this.props.value);
        return (
            <Input
                type="text"
                label={this.props.label}
                onChange={this.__filter.bind(undefined, false)}
                onKeyPress={this.__focus2Fraction}
                value={values[0]}
                style={this.styleInteger}
                ref="integerInput"
                buttonAfter={
                    <Input
                        type="text"
                        addonBefore={<span className="fractionSeperator">{this.props.decimalSeparator}</span>}
                        style={this.styleFractional}
                        value={values[1]}
                        onChange={this.__filter.bind(undefined, true)}
                        addonAfter={this.props.unit}
                        ref="fractionalInput"
                        className="fractionalInput"
                    />}
            />);
    }

    __focus2Fraction = (e) => {
        if (this.props.decimalSeparator === e.key) {
            this.refs.fractionalInput.focus();
        }
    }

    __filter = (isFraction, e) => {
        console.log(isFraction, e, this.props.decimalSeparator);
        try {
            if (!isFraction) {
                e.target.parsedValue = this.__parseInteger(e.target.value);
                e.target.parsedValue += this.props.decimalSeparator + this.refs.fractionalInput.props.value;
            } else {
                e.target.parsedValue = this.__parseFraction(e.target.value);
                e.target.parsedValue = this.refs.integerInput.props.value + this.props.decimalSeparator + e.target.parsedValue;
            }
            this.props.onChange(e);
        } catch (error) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    __parseInteger = (value) => {
        value = new Numeral(new Numeral().unformat(value)).format();
        return value;
    }
    __parseFraction = (value) => {
        value = parseInt(parseInt(value, 10).toPrecision(2));
        return !is.numeric(value) ? 0 : value;
    }

    __splitValue = (value) => {
        let values = String(parseFloat(new Numeral().unformat(value))).split(this.props.decimalSeparator);
        values[0] = this.__parseInteger(values[0]);
        values[1] = this.__parseFraction(values[1]);
        return values;
    }

}
