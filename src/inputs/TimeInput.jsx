import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import momentjs from "moment";
import {Popover, Overlay, InputGroup} from "react-bootstrap";
import Input from "./BaseInput";
import "./TimeInput.css";


/**
 * TimeInput is a component for select time.
 *
 * @export
 * @class TimeInput
 * @extends {ShallowComponent}
 */
export default class TimeInput extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes:Map = {
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
        value: React.PropTypes.string,
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
         * it specifies that a hours is disabled with given array
         */
        disabledHours: React.PropTypes.array,
        /**
         * it specifies that a minutes is disabled with given array
         */
        disabledMinutes: React.PropTypes.array,
        /**
         * it specifies that a seconds is disabled with given array
         */
        disabledSeconds: React.PropTypes.array,
        /**
         * custom time configuration with user wishes
         */
        createOwnOptions: React.PropTypes.shape({
            hours: React.PropTypes.array,
            minutes: React.PropTypes.array,
            seconds: React.PropTypes.array
        }),
        /**
         * time format of the component
         */
        format: React.PropTypes.oneOf(["HH:mm:ss", "HH", "mm", "ss", "HH:mm"]),
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool,
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
        value: undefined,
        validationDisplay: "block",
        format: "HH:mm"
    };

    static refName = "innerInput";
    static idCounter = 1;
    innerComponent;
    hour = this.props.value && this.__checkPartialRegex(this.props.value) ? momentjs(this.props.value, this.props.format).format("HH") : "";
    minute = this.props.value && this.__checkPartialRegex(this.props.value) ? momentjs(this.props.value, this.props.format).format("mm") : "";
    second = this.props.value && this.__checkPartialRegex(this.props.value) ? momentjs(this.props.value, this.props.format).format("ss") : "";
    id;

    constructor(props:Object) {
        super(props);
        this.id = `TimeInput-${TimeInput.idCounter}`;
        TimeInput.idCounter++;
        this.state = {
            open: false,
            value: this.props.value && this.__checkPartialRegex(this.props.value) ? momentjs(this.props.value, this.props.format).format(this.props.format) : ""
        };
    }

    /**
     * Renders the component.
     *
     * @returns
     */
    render():Object {
        let {format, disabledHours, disabledMinutes, disabledSeconds, createOwnOptions, ...newProps} = this.props;

        return (
            <div>
                <Overlay
                    show={this.state.open}
                    placement="bottom"
                    target={document.getElementById(this.id)}>
                    <Popover id="time-popover">
                        <div id="showFullTime"
                             className="showFullTime">{this.state.value ? this.state.value : this.props.format.length === 2 ? "--" : this.props.format.length === 8 ? "-- : -- : --" : "-- : --"}</div>
                        {this.__decideTimeFormat()}
                    </Popover>
                </Overlay>
                <Input
                    id={this.id}
                    {...newProps}
                    onChange={this.__onChange}
                    type="text"
                    ref={(component: Object) => { this.innerComponent = component } }
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onClick={this.__onClick}
                    style={{ color: this.state.color }}
                />
            </div>
        );
    }

    __decideTimeFormat():Object {
        let hoursArea = (<div className="timeZone">{this.__renderTimeZone("hour")}</div>);
        let minutesArea = (<div className="timeZone">{this.__renderTimeZone("minute")}</div>);
        let secondsArea = (<div className="timeZone">{this.__renderTimeZone("second")}</div>);

        switch (this.props.format) {
            case "HH:mm:ss":
                return (<div className="timeArea">
                    {hoursArea}
                    {minutesArea}
                    {secondsArea}
                </div>);
            case "HH":
                return (<div className="timeArea">
                    {hoursArea}
                </div>);
            case "mm":
                return (<div className="timeArea">
                    {minutesArea}
                </div>);
            case "ss":
                return (<div className="timeArea">
                    {secondsArea}
                </div>);
            default:
                return (<div className="timeArea">
                    {hoursArea}
                    {minutesArea}
                </div>);
        }
    }

    __renderTimeZone(type) {
        let timeArr = [];
        let className = type !== "hour" ? "timeListBorder" : null;
        let renamedType = type + "s";
        let takeThisTime = this[type];
        if (this.props.createOwnOptions && this.props.createOwnOptions[renamedType]) {
            let times = this.props.createOwnOptions[renamedType];
            for (let i = 0; i < times.length; i++) {
                let time = TimeInput.__checkDigits(times[i]);
                timeArr.push(<li key={type + i}
                                 className={takeThisTime && takeThisTime.toString() === time.toString() ? "timeListLi-selected" : "timeListLi"}
                                 onClick={this.__onClickTimes.bind(undefined, time, type)}>{time}</li>);
            }
        }
        else {
            let disabledTimes = type === "hour" ? this.props.disabledHours : type === "minute" ? this.props.disabledMinutes : this.props.disabledSeconds;

            for (let i = 0; i < (type === "hour" ? 24 : 60); i++) {
                let time = TimeInput.__checkDigits(i);
                let check = disabledTimes ? this.__checkDisabledLines(i, disabledTimes) : false;
                timeArr.push(<li key={type + i}
                                 className={check ? "timeListLi-disabled" : takeThisTime && takeThisTime.toString() === time.toString() ? "timeListLi-selected" : "timeListLi"}
                                 onClick={disabledTimes && check ? undefined : this.__onClickTimes.bind(undefined, time, type)}>{time}</li>);
            }
        }
        return (<ul id="timeZone" className={"timeList " + className}>{timeArr}</ul>);
    }

    static __checkDigits(i):string {
        return (/^\d$/.test(i) ? "0" + i : i);
    };

    __checkDisabledLines(time:string, disabled:array) {
        if (disabled.length > 0) {
            for (let i = 0; i < disabled.length; i++)
                if (time === disabled[i])
                    return true;
        }
        else
            return false;
    }

    __onClickTimes(time:string, type:string) {
        this[type] = time;
        let newTime = momentjs().set({'hour': this.hour, 'minute': this.minute, 'second': this.second});
        this.__onChange(undefined, newTime);
    }

    /**
     * Returns the validity of the value.
     * @return true - value is valid, false - invalid
     */
    isValid():boolean {
        return this.innerComponent.isValid();
    }

    /**
     * checks validation by current value
     * isValid then return empty Array else return Array<String>
     * isValid = Array.length != 0
     * @param value
     */
    validate(value:any):Array<string> {
        return this.innerComponent.validate(value);
    }

    /**
     * Internal onchange handler for filtering times.
     */
    __onChange(e:Object, time:Object) {
        if (time) {
            let e = {
                target: {
                    value: momentjs(time, this.props.format).format(this.props.format),
                    parsedValue: momentjs(time, this.props.format).format(this.props.format),
                    name: this.props.name
                }
            };

            this.setState({value: e.target.value});

            if (this.props.onChange) {
                this.props.onChange(e);
            }
        }
        else if (this.props.onChange) {
            e.target.value = this.__checkPartialRegex(this.__formatString(e.target.value)) ? this.__formatString(e.target.value) : this.state.value;
            e.target.parsedValue = this.__checkPartialRegex(this.__formatString(e.target.value)) ? this.__formatString(e.target.value) : this.state.value;
            this.hour = e.target.value ? momentjs(e.target.value, this.props.format).format("HH") : undefined;
            this.minute = e.target.value ? momentjs(e.target.value, this.props.format).format("mm") : undefined;
            this.second = e.target.value ? momentjs(e.target.value, this.props.format).format("ss") : undefined;

            if (e.target.value != undefined || e.target.parsedValue != undefined)
                this.props.onChange(e);
        }

    }

    __formatString(value:string):string {
        let format = this.props.format;
        value = value.split(":").join("");
        let newValue = [];
        let sPosition = 2;
        let sCount = 0;
        for (let i = 0; i < value.length && i < (format.length === 8 ? format.length - 2 : format.length === 2 ? format.length : format.length - 1); i++) {
            let ch = value.charAt(i);
            if (i % sPosition === 0 && i !== 0) {
                newValue.push(":");
                sCount++;
            }
            newValue.push(ch);
        }
        return newValue.join("");
    }

    __checkPartialRegex(value:string):boolean {
        let formatParts = this.props.format.split(":");
        let valueParts = value.split(":");

        for (let i = 0; i < 3; i++) {
            switch (formatParts[i]) {
                case "HH":
                {
                    let hour = valueParts[i];
                    if (parseInt(hour, 10) > 23) {
                        if (hour.length >= 2)
                            return false;
                    }
                    else if (parseInt(hour.substring(0, 1)) > 2)
                        return false;
                    else if (this.props.disabledHours) {
                        if (this.__checkDisabledLines(parseInt(hour), this.props.disabledHours) && hour.length === 2)
                            return false;
                    }
                    else if (this.props.createOwnOptions) {
                        if (!this.__checkDisabledLines(parseInt(hour), this.props.createOwnOptions.hours) && hour.length === 2)
                            return false;
                    }
                    break;
                }
                case "mm":
                {
                    let minute = valueParts[i];
                    if (parseInt(minute, 10) > 59) {
                        if (minute.length >= 2)
                            return false;
                    }
                    else if (minute !== undefined && parseInt(minute.substring(0, 1)) > 5)
                        return false;
                    else if (this.props.disabledMinutes) {
                        if (this.__checkDisabledLines(parseInt(minute), this.props.disabledMinutes) && minute.length === 2)
                            return false;
                    }
                    else if (this.props.createOwnOptions) {
                        if (minute !== undefined && !this.__checkDisabledLines(parseInt(minute), this.props.createOwnOptions.minutes) && minute.length === 2)
                            return false;
                    }
                    break;
                }
                case "ss":
                {
                    let second = valueParts[i];
                    if (parseInt(second, 10) > 59) {
                        if (second.length >= 2)
                            return false;
                    }
                    else if (second !== undefined && parseInt(second.substring(0, 1)) > 5)
                        return false;
                    else if (this.props.disabledSeconds) {
                        if (this.__checkDisabledLines(parseInt(second), this.props.disabledSeconds) && second.length === 2)
                            return false;
                    }
                    else if (this.props.createOwnOptions) {
                        if (second !== undefined && !this.__checkDisabledLines(parseInt(second), this.props.createOwnOptions.seconds) && second.length === 2)
                            return false;
                    }
                    break;
                }
                default:
            }
        }
        return true;
    }

    __onClick(e:Object) {
        this.setState({
            open: !this.state.open
        });
    }

    __hideModal(e:Object) {
        let target = e.target;
        if (this.state.open) {
            try {
                if (target.id === (this.id) ||
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.id === "time-popover" ||
                    target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id === "time-popover") {
                    return;
                } else if (target.id === "showFullTime" || target.id === "timeZone")
                    return;
            } catch (exeption) {
                // no problem
            }
            this.setState({
                open: false
            });
        }
    }

    componentWillReceiveProps(nextProps:Object) {
        this.setState({
            value: nextProps.value
        });
    }

    componentDidMount() {
        document.addEventListener("click", this.__hideModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__hideModal, false);
    }
}
