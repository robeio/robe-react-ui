import React from "react";
import { ShallowComponent, Maps, Assertions } from "robe-react-commons";
import UIApplication from "../app/UIApplication";
import Select from "react-select";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import "react-select/dist/react-select.css";
import Alert from "react-bootstrap/lib/Alert";

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

    static defaultProps = {
        placeHolder: "Please Select",
        noResultsText: "No Result",
        textField: "text",
        valueField: "value",
        multi: false,
        disabled: false,
        searchable: true
    };

    __valid: boolean = false;
    /**
     * Validation map for all functions and custom messages .
     */
    __validations: Map = {};

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        let errors = this.__validate();

        this.__valid = (errors.length === 0);
        let alerts = undefined;
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }

        if (!this.__valid) {
            alerts = <Alert className="input-alert" bsStyle="danger">{messages}</Alert>;
        }
        return (
            <FormGroup>
                <ControlLabel> {this.props.label} </ControlLabel>
                <Select
                    options={this.props.items}
                    valueKey={this.props.valueField}
                    labelKey={this.props.textField}
                    multi={this.props.multi}
                    noResultsText={this.props.noResultsText}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeHolder}
                    searchable={this.props.searchable}
                    value={this.props.value}
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
        return this.__valid;
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
            let message = validation(this.props.value);
            let messageKey = `${key}Message`;
            if (message !== undefined) {
                if (this.__validations[messageKey] !== undefined) {
                    message = this.__validations[messageKey];
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
    }

    /**
     * Fired after component mounts. Takes validations from props.
     */
    componentDidMount() {
        if (this.props.focus) {
            this.focus();
        }
    }

    /**
     * Fired after component mounts. Sets focus from props.
     */
    componentWillMount() {
        if (this.props.validations !== undefined) {
            this.__validations = this.props.validations;
        }
    }
}
