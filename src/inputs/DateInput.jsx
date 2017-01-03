import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import momentjs from "moment";
import is from "is-js";
import { Popover, Overlay, InputGroup } from "react-bootstrap";
import Input from "./BaseInput";
import DatePicker from "./datepicker/DatePicker";
import FaIcon from "../faicon/FaIcon";


/**
 * DateInput is a component for default one lined text inputs.
 *
 * @export
 * @class DateInput
 * @extends {ShallowComponent}
 */
export default class DateInput extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
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
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number]),
        /**
         * onChangeEvent event for the component
         */
        onChange: React.PropTypes.func,
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
        hidden: React.PropTypes.bool,

        /**
         * Date formatting of the component.
         */
        format: React.PropTypes.oneOf([
            "DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD",
            "DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD",
            "DD.MM.YYYY", "MM.DD.YYYY", "YYYY.MM.DD",
            "DD MM YYYY", "MM DD YYYY", "YYYY MM DD"
        ]),
        /**
         *Minimum date to show at the picker.
         */
        minDate: React.PropTypes.number,
        /**
         *Maximum date to show at the picker.
         */
        maxDate: React.PropTypes.number,
        /**
         *Defines the display style of the Validation message.
         */
        validationDisplay: React.PropTypes.oneOf(["overlay", "block"]),
        /**
        * Left Input Addon
        */
        inputGroupLeft: React.PropTypes.object
    
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        format: "DD/MM/YYYY",
        locale: "en",
        value: undefined,
        minDate: momentjs("01/01/1900", "DD/MM/YYYY").toDate().getTime(),
        maxDate: momentjs("31/12/2100", "DD/MM/YYYY").toDate().getTime(),
        validationDisplay: "block"
    };

    static refName = "innerInput";
    static idCounter = 1;
    isPartial = true;
    id;
    validChars;
    separator;

    constructor(props: Object) {
        super(props);
        this.id = `DatePicker-${DateInput.idCounter}`;
        DateInput.idCounter++;
        this.state = {
            open: false,
            value: this.props.value
        };
        if (momentjs(this.props.value).isValid() && this.props.value !== "" && this.props.value !== undefined) {
            this.isPartial = false;
        }
        this.separator = this.__findSeparator();
        this.validChars = new RegExp(`^([${this.separator}]|[0-9])*$`);
    }

    /**
     * Renders the component.
     *
     * @returns
     */
    render(): Object {
        let parsedValue = "";
        let value = this.state.value;

        if (this.isPartial) {
            parsedValue = "Invalid date";
        } else if (is.number(value)) {
            parsedValue = momentjs(value).format(this.props.format);
        } else if (this.__checkPartialRegex(value.toString())) {
            parsedValue = momentjs(value, this.props.format).format(this.props.format);
            if (value)
                value = momentjs(value, this.props.format);
        }

        let overlayValue;

        if (parsedValue === "Invalid date" || this.isPartial) {
            parsedValue = value;
        } else {
            overlayValue = value === "" ? undefined : parsedValue;
        }

        if (!overlayValue) {
            overlayValue = momentjs(new Date(), this.props.format).toDate().getTime();
        }

        if (!is.number(overlayValue)) {
            overlayValue = momentjs(overlayValue, this.props.format, true).toDate().getTime();
        }

        let {format, locale, minDate, maxDate, ...newProps} = this.props;
        return (
            <div>
                <Overlay show={this.state.open} placement="bottom" target={document.getElementById(this.id)}>
                    <Popover id="popover">
                        <DatePicker
                            onChange={this.__onChangeDatePicker}
                            onSelect={this.__onClick}
                            locale={locale}
                            value={overlayValue}
                            minDate={this.props.minDate}
                            maxDate={this.props.maxDate}
                            />
                    </Popover>
                </Overlay>
                <Input
                    id={this.id}
                    {...newProps}
                    onChange={this.__onChange}
                    type="text"
                    ref={DateInput.refName}
                    placeholder={this.props.format}
                    value={parsedValue}
                    onKeyDown={this.__onKeyDown}
                    onClick={this.__onClick}
                    style={{ color: this.state.color }}
                    inputGroupRight={<InputGroup.Addon onClick={this.__onClick} ><FaIcon code="fa-calendar" /></InputGroup.Addon>}
                    />
            </div>
        );
    }

    __onKeyDown(e) {
        if (!(e.key === "ArrowUp" || e.key === "ArrowDown")) {
            return;
        }
        e.preventDefault();

        let value = this.state.value;
        if (!value)
            return;
        if (is.number(value)) {
            value = momentjs(value).format(this.props.format);
        } else {
            value = momentjs(value, this.props.format).format(this.props.format);
        }
        if (!isNaN(value) || !this.__checkPartialRegex(value.toString())) {
            return;
        }

        let selectionStart = e.target.selectionStart;
        let selectionEnd;

        let formatParts = this.props.format.split(this.separator);
        let valueParts = value.split(this.separator);

        let temp = "";
        let oldTemp = "";
        let partIndex = 0;
        for (let i = 0; i < formatParts.length; i++) {
            let item = formatParts[i];
            oldTemp = temp;
            temp += "/" + item;
            if (selectionStart < temp.length) {
                partIndex = i;
                selectionStart = oldTemp.length;
                selectionEnd = temp.length - 1;
                break;
            }
        }

        let tempValue;
        if (e.key === "ArrowUp") {
            tempValue = parseInt(valueParts[partIndex]) + 1;
        }
        else if (e.key === "ArrowDown") {
            tempValue = parseInt(valueParts[partIndex]) - 1;
        }
        valueParts[partIndex] = tempValue < 10 ? '0' + tempValue : tempValue.toString();

        value = valueParts.join(this.separator);
        let valid = momentjs(value, this.props.format).format(this.props.format);

        if (!this.__checkPartialRegex(value.toString()) || valid === "Invalid date") {
            return;
        }
        this.setState({
            value: value,
            open: false
        });
        e.target.parsedValue = momentjs(value, this.props.format).toDate().getTime();
        e.target.value = value;
        if (this.props.onChange)
            this.props.onChange(e);

        e.target.selectionStart = selectionStart;
        e.target.selectionEnd = selectionEnd;
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid(): boolean {
        return this.refs[DateInput.refName].isValid();
    }

    /**
     * checks validation by current value
     * isValid then return empty Array else return Array<String>
     * isValid = Array.length != 0
     * @param value
     */
    validate(value: any): Array<string> {
        return this.refs[DateInput.refName].validate(value);
    }

    /**
     * Internal onchange handler for filtering numerics.
     */
    __onChange(e: Object): boolean {
        let result = true;
        let value = this.__formatString(e.target.value);
        e.target.value = value;
        e.target.name = this.props.name;

        if (!this.validChars.test(value) || !this.__checkPartialRegex(value.toString())) {
            // Do not take input if maxlength exeeded or invalid char entered.
            this.setState({
                color: "#a94442"
            });
        } else if (this.props.onChange && value.length <= this.props.format.length) {
            this.setState({
                color: undefined
            });
            this.isPartial = value.length < this.props.format.length;
            e.target.parsedValue = this.isPartial ? undefined : momentjs(value, this.props.format, true).toDate().getTime();
            if (isNaN(e.target.parsedValue)) {
                e.target.parsedValue = undefined;
                this.setState({
                    open: false,
                    value: e.target.value
                });
                if (e.target.value === "")
                    this.props.onChange(e);
                return;
            }
            result = this.props.onChange(e);
        }
        this.setState({
            open: false
        });

        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        }
        return result;
    }

    __formatString(value: string): string {
        let format = this.props.format;
        let dayAtLeft = format.indexOf("DD") === 0;
        value = value.split(this.separator).join("");
        let newValue = [];
        let sPosition = dayAtLeft ? 2 : 4;
        let sCount = 0;
        for (let i = 0; i < value.length; i++) {
            let ch = value.charAt(i);
            if (i % sPosition === 0 && i !== 0) {
                newValue.push(this.separator);
                sCount++;
                if (sCount === (dayAtLeft ? 2 : 1)) {
                    sPosition = dayAtLeft ? 4 : 2;
                }
            }
            newValue.push(ch);
        }
        return newValue.join("");
    }

    __checkPartialRegex(value: string): boolean {
        let formatParts = this.props.format.split(this.separator);
        let valueParts = value.split(this.separator);
        let minDate = momentjs(this.props.minDate).format(this.props.format);
        let maxDate = momentjs(this.props.maxDate).format(this.props.format);
        let minParts = minDate.split(this.separator);
        let maxParts = maxDate.split(this.separator);

        for (let i = 0; i < 3; i++) {
            switch (formatParts[i]) {
                case "DD":
                    {
                        let day = valueParts[i];
                        if (parseInt(day, 10) > 31 || parseInt(day, 10) < 1) {
                            if (day.length >= 2)
                                return false;
                        }
                        break;
                    }
                case "MM":
                    {
                        let month = valueParts[i];
                        if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
                            if (month.length >= 2)
                                return false;
                        }
                        break;
                    }
                case "YYYY":
                    {
                        let year = valueParts[i];
                        let minYear = minParts[i];
                        let maxYear = maxParts[i];
                        if (parseInt(year, 10) > parseInt(maxYear, 10) || parseInt(year, 10) < parseInt(minYear, 10)) {
                            if (year.length >= minYear.length)
                                return false;
                        }
                        break;
                    }
                default:
            }
        }
        return true;
    }

    __onClick(e: Object) {
        this.setState({
            open: !this.state.open
        });
    }

    __onChangeDatePicker(newMoment: Object) {
        this.refs[DateInput.refName].focus();
        this.setState({
            color: undefined
        });
        if (this.props.onChange) {
            this.isPartial = false;
            let e = {
                target: {
                    value: momentjs(this.state.value).format(this.props.format),
                    parsedValue: newMoment.toDate().getTime(),
                    name: this.props.name
                }
            };
            this.props.onChange(e);
        }
    }

    __hidePicker(e: Object) {
        let target = e.target;
        if (this.state.open) {
            try {
                if (target.id === (this.id) ||
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.id === "popover" ||
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id === "popover" ||
                    target.className === "fa fa-fw fa-calendar fa-sm " ||
                    target.children[0].className === "fa fa-fw fa-calendar fa-sm ") {
                    return;
                }
            } catch (exeption) {
                // no problem
            }
            this.setState({
                open: false
            });
        }
    }

    __findSeparator(): String {
        let format = this.props.format;
        for (let i = 0; i < format.length; i++) {
            let ch = format.charAt(i);
            if (ch !== "D" && ch !== "M" && ch !== "Y") {
                return ch;
            }
        }
        throw String("Format is invalid.");
    }

    componentWillReceiveProps(nextProps: Object) {
        this.setState({
            value: nextProps.value
        });
    }


    componentDidMount() {
        document.addEventListener("click", this.__hidePicker, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__hidePicker, false);
    }
}
