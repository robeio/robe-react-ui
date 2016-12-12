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
        validationDisplay: React.PropTypes.oneOf(["overlay", "block"])
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
    id
    validChars
    separator

    constructor(props: Object) {
        super(props);
        this.id = `DatePicker-${DateInput.idCounter}`;
        DateInput.idCounter++;
        this.state = {
            open: false,

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
        let parsedValue;
        if (this.isPartial) {
            parsedValue = "Invalid date";
        } else if (is.number(this.props.value)) {
            parsedValue = momentjs(this.props.value).format(this.props.format);
        } else {
            parsedValue = momentjs(this.props.value, this.props.format).format(this.props.format);
        }
        let overlayValue;
        if (parsedValue === "Invalid date" || this.isPartial) {
            parsedValue = this.props.value;
        } else {
            overlayValue = this.props.value === "" ? undefined : this.props.value;
        }
        /* eslint-disable no-unused-vars */
        let { format, locale, minDate, maxDate, ...newProps } = this.props;
        return (
            <div>
                <Overlay show={this.state.open} placement="bottom" target={document.getElementById(this.id)} >
                    <Popover id="popover" >
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
                    onClick={this.__onClick}
                    style={{ color: this.state.color }}
                    inputGroupRight={<InputGroup.Addon><FaIcon code="fa-calendar" /></InputGroup.Addon>}
                />
            </div>);
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid(): boolean {
        return this.refs[DateInput.refName].isValid();
    }

    /**
    * Internal onchange handler for filtering numerics.
    */
    __onChange(e: Object): boolean {
        let result = true;
        let value = this.__formatString(e.target.value);
        e.target.value = value;
        e.target.name = this.props.name;

        if (!this.validChars.test(value) || !this.__checkPartialRegex(value) || value.length > this.props.format.length) {
            // Do not take input if maxlength exeeded or invalid char entered.
            this.setState({
                color: "#a94442"
            });
        } else if (this.props.onChange) {
            this.setState({
                color: undefined
            });
            this.isPartial = value.length < this.props.format.length;
            e.target.parsedValue = this.isPartial ? undefined : momentjs(value, this.props.format, true).toDate().getTime();
            if (isNaN(e.target.parsedValue)) {
                e.target.parsedValue = undefined;
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
        let valueIndex = 0;
        for (let i = 0; i < 3; i++) {
            switch (formatParts[i]) {
                case "DD": {
                    let day = value.substring(valueIndex, valueIndex + 2);
                    if (parseInt(day, 10) > 31) {
                        return false;
                    }
                    valueIndex += 3;
                    break;
                }
                case "MM": {
                    let month = value.substring(valueIndex, valueIndex + 2);
                    if (parseInt(month, 10) > 12) {
                        return false;
                    } valueIndex += 3;
                    break;
                }
                case "YYYY": {
                    let year = value.substring(valueIndex, valueIndex + 4);
                    year = parseInt(year, 10);
                    valueIndex += 5;
                    break;
                }
                default:
            }
        }
        return true;
        // Check day and month boundaries;
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
                    value: momentjs(this.props.value).format(this.props.format),
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
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id === "popover") {
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


    componentDidMount() {
        document.addEventListener("click", this.__hidePicker, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__hidePicker, false);
    }
}
