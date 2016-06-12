import React from "react";
import is from "is-js";
import { ShallowComponent } from "robe-react-commons";
import DatePicker from "react-datepicker";
import moment from "moment";
import Col from "react-bootstrap/lib/Col";
import "react-datepicker/dist/react-datepicker.css";

// Please look at https://github.com/Hacker0x01/react-datepicker
class DateInput extends ShallowComponent {
    static propTypes = {
        label: React.PropTypes.string,
        onChange: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        format: React.PropTypes.string,
    };


    static defaultProps = {
        format: "DD/MM/YYYY"
    };

    constructor(props) {
        super(props);
    };

    render() {

        let selected = (is.number(this.props.value)) ? moment(this.props.value) : null;
        var label = this.props.label == undefined ? <span></span> :
            <label className="control-label">{this.props.label}</label>;
        return (
            <Col className="form-group">
                {label}
                <DatePicker
                    ref="input"
                    className="form-control"
                    selected={selected}
                    disabled={this.props.disabled}
                    onChange={this.__onChange}
                    showYearDropdown
                    isClearable={!this.props.disabled}
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    showTodayButton={"Bugün"}
                    placeholderText="Tarih seçmek için tıklayınız"
                    dateFormat={this.props.format}/>
            </Col>);
    };

    __onChange = (selection)=> {

        var e = {};
        e.target = {};

        if (selection) {
            e.target.parsedValue = selection.toDate().getTime();
        } else {
            e.target.parsedValue = null;
        }

        if (this.props.onChange)
            this.props.onChange(e);

    };
}
module.exports = DateInput;