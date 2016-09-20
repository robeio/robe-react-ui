import React from "react";
import is from "is-js";
import { FormGroup, ControlLabel } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"; // eslint-disable-line import/no-extraneous-dependencies
import ValidationComponent from "../validation/ValidationComponent";
import "./DateInput.css";

// Please look at https://github.com/Hacker0x01/react-datepicker
export default class DateInput extends ValidationComponent {

    static propTypes = {
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * name use as input field name
         */
        name: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.string.isRequired,
        /**
         * onChangeEvent event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * Date Format
         */
        format: React.PropTypes.string,
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,
        /**
         * it specifies that an input field is read-only
         */
        readOnly: React.PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        format: "DD/MM/YYYY",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    static refName="innerInput";

    render(): Object {
        let selected = moment(this.props.value);
        let isValidDate = selected.isValid() && this.props.value !== undefined;
        let label = this.props.label === undefined ? <span /> :
            <ControlLabel className="control-label">{this.props.label}</ControlLabel>;
        return (
            <FormGroup hidden={this.props.hidden} >
                {label}
                <DatePicker
                    ref={DateInput.refName}
                    className="form-control form-control-error"
                    selected={isValidDate ? selected : ""}
                    disabled={this.props.disabled}
                    onChange={this.__onChange}
                    name={this.props.name}
                    showYearDropdown
                    isClearable={!this.props.disabled}
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    showTodayButton={"Bugün"}
                    dateFormat={this.props.format}
                />
                {super.validationResult()}
            </FormGroup>);
    }

    /**
     * Internal onchange handler.
     */
    __onChange(selection: Object): boolean {
        let e = {};
        e.target = {};

        if (selection) {
            e.target.parsedValue = selection.toDate().getTime();
        } else {
            e.target.parsedValue = null;
        }
        let result = true;
        if (this.props.onChange) {
            result = !(this.props.onChange(e) === false);
        }
        return result;
    }
}
