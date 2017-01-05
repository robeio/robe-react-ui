import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import {
    Table,
    FormControl
} from "react-bootstrap";
import momentjs from "moment";
import "./DatePicker.css";

export default class DatePicker extends ShallowComponent {

    static propTypes:Map = {
        /**
         * Value of the component
         */
        value: React.PropTypes.number,
        /**
         * Change event for the component
         */
        onChange: React.PropTypes.func,
        /**
         * Select event for the component. Triggered at date select.
         */
        onSelect: React.PropTypes.func,

        /**
         *Minimum date to show at the picker.
         */
        minDate: React.PropTypes.number,
        /**
         *Maximum date to show at the picker.
         */
        maxDate: React.PropTypes.number
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        locale: "en",
        value: new Date().getTime(),
        minDate: momentjs("01/01/1900", "DD/MM/YYYY").toDate().getTime(),
        maxDate: momentjs("31/12/2100", "DD/MM/YYYY").toDate().getTime()
    };
    weekDays;
    monthSelectBox;

    constructor(props:Object) {
        super(props);
        momentjs.locale(this.props.locale);
        let weekDays = momentjs.weekdaysMin(true);
        for (let i = 0; i < weekDays.length; i++) {
            weekDays[i] = <th key={i}>{weekDays[i]}</th>;
        }
        this.weekDays = weekDays;

        let value = momentjs(this.props.value).set("hour", 12);
        value = value.isBefore(this.props.minDate) ? momentjs(this.props.minDate) : value;
        value = value.isAfter(this.props.maxDate) ? momentjs(this.props.maxDate) : value;
        this.state = {moment: value};
        this.__renderMonthSelectBox();
        this.__renderYearSelectBox();
    }

    render():Object {
        let grid = [];
        let className = "DatePicker-day";
        let moment = this.state.moment;
        let enabled = false;
        let currentMonth = momentjs(moment).startOf("month").startOf("week");
        let isoWeekday = currentMonth.startOf('week').isoWeekday() % 7;
        currentMonth = currentMonth.add(isoWeekday - currentMonth.day(), "day");

        for (let i = 0; i < 6; i++) {
            let row = [];
            let weekMoment = momentjs(currentMonth);
            if ((weekMoment.get("month") == weekMoment.add(7, "day").get("month")) && (weekMoment.get("month") != moment.get("month"))) {
                continue;
            }
            for (let j = 0; j < 7; j++) {
                enabled = moment.get("month") == currentMonth.get("month");
                className = enabled ? moment.get("date") == currentMonth.get("date") ? "DatePicker-day-selected" : "DatePicker-day" : "DatePicker-day-disabled";
                row.push(
                    <td key={currentMonth.get("date")}
                        className={className}
                        onClick={enabled ? this.__onClickDay : undefined}>
                        {currentMonth.get("date")}
                    </td>);
                currentMonth.add(1, "day");
            }
            grid.push(<tr key={i}>{row}</tr>);
        }
        
        return (
            <Table bordered className="DatePicker-table">
                <thead>
                <tr>
                    <th colSpan={3}>{this.yearSelectBox}</th>
                    <th colSpan={4}>{this.monthSelectBox}</th>
                </tr>
                <tr >{this.weekDays}</tr>
                </thead>
                <tbody>{grid}</tbody>
            </Table>);
    }

    __renderMonthSelectBox() {
        let months = momentjs.months();
        for (let i = 0; i < months.length; i++) {
            months[i] = <option key={i} value={i}>{months[i]}</option>;
        }
        this.monthSelectBox = (
            <FormControl componentClass="select" placeholder="Month" onChange={this.__onChangeMonth}
                         defaultValue={this.state.moment.month()}>
                {months}
            </FormControl>
        );
    }

    __renderYearSelectBox() {
        let years = [];
        let minYear = momentjs(this.props.minDate).year();
        let maxYear = momentjs(this.props.maxDate).year() + 1;
        for (let i = minYear; i < maxYear; i++) {
            years[i] = <option key={i} value={i}>{i}</option>;
        }
        this.yearSelectBox = (
            <FormControl componentClass="select" placeholder="Year" onChange={this.__onChangeYear}
                         defaultValue={this.state.moment.year()}>
                {years}
            </FormControl>
        );
    }

    __onChangeYear(e:Object) {
        let year = parseInt(e.target.selectedOptions[0].value, 10);
        let newMoment = this.state.moment;
        newMoment.year(year);
        this.__onChange(newMoment);
    }

    __onChangeMonth(e:Object) {
        let month = parseInt(e.target.selectedOptions[0].value, 10);
        let newMoment = this.state.moment;
        newMoment.month(month);
        this.__onChange(newMoment);
    }

    __onClickDay(e:Object) {
        let day = parseInt(e.target.innerText, 10);
        let newMoment = this.state.moment;
        newMoment.date(day);
        this.__onChange(newMoment);
        if (this.props.onSelect) {
            this.props.onSelect(newMoment);
        }
    }

    __onChange(newMoment:Object) {
        this.setState({
            moment: newMoment
        });
        if (this.props.onChange) {
            this.props.onChange(newMoment);
        }
    }

    shouldComponentUpdate():boolean {
        return true;
    }
}
