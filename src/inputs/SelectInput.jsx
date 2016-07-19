import React from "react";
import { ShallowComponent, Maps, Assertions } from "robe-react-commons";
import UIApplication from "../app/UIApplication";
import Select from "react-select";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import "react-select/dist/react-select.css";

const info = UIApplication.i18n("info");
// read more https://github.com/JedWatson/react-select

/**
 * Provide selection in map array data with single or multi choices
 * You can enable multi-value selection by setting multi={true}
 */
export default class SelectInput extends ShallowComponent {

    static propTypes = {
        /**
         * Style map for the component.
         */
        style: React.PropTypes.object,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * map array of options to render.
         */
        items: React.PropTypes.array,
        /**
         * multi select value
         */
        multi: React.PropTypes.bool,
        /**
         * selected value or values
         */
        value: React.PropTypes.any,
        /**
         * key of given map array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * presented text of give map array `items`
         */
        textField: React.PropTypes.string,
        /**
         * displayed when there's no value
         */
        placeHolder: React.PropTypes.string,
        /**
         * callback function when selected values changed
         */
        onChange: React.PropTypes.func,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,
        /**
         * presented message if any result not shown.
         */
        noResultsText: React.PropTypes.string,
        /**
         * disabled
         */
        disabled: React.PropTypes.bool,
        /**
         *  whether to enable searching feature or not
         */
        searchable: React.PropTypes.bool
    };

    /**
     * {string} displayed when there's no value
     * default in messages
     */
    placeHolder;
    /**
     * {string} presented message if any result not shown.
     * default in messages
     */
    noResultsText;
    /**
     * key of given map array `items`
     */
    valueField;
    /**
     * presented text of give map array `items`
     */
    textField;
    /**
     * Holds the valid property of input component.
     */
    __valid: boolean = false;
    /**
     * Validation map for all functions and custom messages .
     */
    __validations: Map = {};

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        this.placeHolder = !this.props.placeHolder ? info.placeHolder : this.props.placeHolder;
        this.noResultsText = !this.props.noResultsText ? info.noResultsText : this.props.noResultsText;
        this.textField = !this.props.textField ? "text" : this.props.textField;
        this.valueField = !this.props.valueField ? "value" : this.props.valueField;
        // TODO validations must bi implemeneted
        this.validations = this.props.validations;
        this.state = {
            value: this.props.value,
            items: this.props.items
        };
    }

    render() {
        let errors = this.__validate();
        this.valid = (errors.length === 0);
        let alerts = undefined;
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }

        if (!this.valid) {
            alerts = <Alert className="input-alert" bsStyle="danger">{messages}</Alert>;
        }
        return (
        <FormGroup>
            <ControlLabel> {this.props.label} </ControlLabel>
            <Select
                options={this.state.items}
                valueKey={this.valueField}
                labelKey={this.textField}
                multi={this.props.multi}
                noResultsText={this.noResultsText}
                disabled={this.props.disabled}
                placeholder={this.placeHolder}
                searchable={this.searchable}
                value={this.state.value}
                onChange={this.__onChange.bind(this)}
            />
            {alerts}
        </FormGroup>
        );
    }
    /**
     * Returns validity of the component.
     * @return {boolean}
     */
    isValid(): boolean {
        return this.valid;
    }

    /**
     * Validates the input components and returns error messages.
     * @return { Array<string>} array of messages.
     */
    __validate(): Array<string> {
        let messages = [];

        Maps.forEach(this.__validations, (validation: Function, key: string) => {
            if (!Assertions.isFunction(validation)) {
                return;
            }
            let message = validation(this.state.value);
            let messageKey = `${key}Message`;
            if (message !== undefined) {
                if (this.validations[messageKey] !== undefined) {
                    message = this.validations[messageKey];
                }
                messages = messages.concat(message);
            }
        });
        return messages;
    }

    /**
     * callback when changed message
     * @param value
     * @private
     */
    __onChange(value: any) {
        if (this.props.onChange) {
            let e = { target: { value: value } };
            this.props.onChange(e);
        }
        this.setState({
            value: value
        });
    }
}
