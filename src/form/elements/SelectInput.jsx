import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Input from "inputs/BaseInput";

export default class SelectInput extends ShallowComponent {

    static propTypes = {
        data: React.PropTypes.array,
        dataTextField: React.PropTypes.string,
        dataValueField: React.PropTypes.string,
        optionLabel: React.PropTypes.string,
        label: React.PropTypes.string,
        value: React.PropTypes.any
    };

    static titleStyle = {
        padding: 4
    }

    static itemStyle = {
        padding: 2
    }

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Input
                {...this.props}
                ref="innerInput"
                type={"select"}
                onChange={this.__onChange}
            >
                {this.__createSelectOptions(this.props.data)}
            </Input>);
    }

    __createSelectOptions = (list) => {
        let options = [];

        if (this.props.optionLabel) {
            options.push(
                <option
                    value={null}
                    key={0}
                    style={SelectInput.titleStyle}
                >
                    {this.props.optionLabel}
                </option>
            );
        }

        let hasFilter = this.state.filter !== undefined;

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if (hasFilter) {
                if (item[this.state.filter.code] !== this.state.filter.value) {
                    continue;
                }
            }
            options.push(
                <option
                    value={this.__getDataValueField(item)}
                    style={SelectInput.itemStyle}
                    key={i + 1}
                >
                    {this.__getDataTextField(item)}
                </option>);
        }
        return options;
    };

    __onChange = (event) => {
        let value = event.target.value;
        if (this.props.optionLabel) {
            if (value === this.props.optionLabel) {
                value = null;
            }
        }
        let e = {};
        e.target = {};
        e.target.parsedValue = value;

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    __getDataTextField = (item) => {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || item;
        }

        return item;
    }

    __getDataValueField = (item) => {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || item;
        }
        return item;
    };

    isValid = () => {
        return this.refs.innerInput.isValid();
    };
}
