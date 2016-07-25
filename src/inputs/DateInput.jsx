import React from "react";
import is from "is-js";
import ValidationComponent from "validation/ValidationComponent";
import DatePicker from "react-datepicker";
import moment from "moment";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";

// Please look at https://github.com/Hacker0x01/react-datepicker
export default class DateInput extends ValidationComponent {

    static propTypes = {
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
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

    render() {
        let selected = (is.number(this.props.value)) ? moment(this.props.value) : null;
        let label = this.props.label === undefined ? <span></span> :
            <ControlLabel className="control-label">{this.props.label}</ControlLabel>;
        return (
            <FormGroup hidden={this.props.hidden} >
                {label}
                <DatePicker
                    ref="input"
                    className="form-control form-control-error"
                    selected={selected}
                    disabled={this.props.disabled}
                    onChange={this.__onChange.bind(this)}
                    showYearDropdown
                    isClearable={!this.props.disabled}
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    showTodayButton={"Bugün"}
                    dateFormat={this.props.format}
                />
                { super.validationResult() }
            </FormGroup>);
    }

    /**
     * Internal onchange handler.
     */
    __onChange(selection: Object) {
        let e = {};
        e.target = {};

        if (selection) {
            e.target.parsedValue = selection.toDate().getTime();
        } else {
            e.target.parsedValue = null;
        }
        let result = true;
        if (this.props.onChange) {
            result = this.props.onChange(e);
        }
        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }
}