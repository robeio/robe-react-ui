import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import is from "is-js";
import momentjs from "moment";
import { Popover, Overlay } from "react-bootstrap";
import Input from "./BaseInput";
import DatePicker from "./datepicker/DatePicker";


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
        hidden: React.PropTypes.bool
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
        separator: "/",
        value: undefined
    };

    static refName = "innerInput";
    static idCounter = 1;
    isPartial = true;
    caretPosition = -1;
    id

    constructor(props: Object) {
        super(props);
        this.id = `DatePicker-${DateInput.idCounter}`;
        DateInput.idCounter++;
        this.state = {
            open: false
        };
        if (momentjs(this.props.value).isValid() && this.props.value !== "" && this.props.value !== undefined) {
            this.isPartial = false;
        }
    }

    /**
     * Renders the component.
     *
     * @returns
     */
    render(): Object {
        let parsedValue = this.isPartial ? "Invalid date" : momentjs(this.props.value).format(this.props.format);
        let overlayValue;
        if (parsedValue === "Invalid date" || this.isPartial) {
            parsedValue = this.props.value;
        } else {
            overlayValue = this.props.value === "" ? undefined : this.props.value;
        }
        /* eslint-disable no-unused-vars */
        let { separator, locale, ...newProps } = this.props;
        return (
            <div>
                <Overlay show={this.state.open} placement="bottom" target={document.getElementById(this.id)} >
                    <Popover id="popover" >
                        <DatePicker
                            onChange={this.__onChangeDatePicker}
                            onSelect={this.__onClick}
                            locale={locale}
                            value={overlayValue}
                            >Today</DatePicker>
                    </Popover>
                </Overlay>
                <Input
                    id={this.id}
                    {...this.newProps}
                    onChange={this.__onChange}
                    type="text"
                    ref={DateInput.refName}
                    placeholder={this.props.format}
                    value={parsedValue}
                    onClick={this.__onClick}
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
        let value = e.target.value;
        this.caretPosition = this.refs[DateInput.refName].getCaretPosition();
        this.isPartial = value.length !== this.props.format.length;
        if (!new RegExp("^([/]|[0-9])*$").test(value) || value.length > this.props.format.length) {
            result = false;
        } else if (this.props.onChange) {
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

    __onClick(e: Object) {
        this.setState({
            open: !this.state.open
        });
    }
    __onChangeDatePicker(newMoment: Object) {
        this.refs[DateInput.refName].focus();
        if (this.props.onChange) {
            this.isPartial = false;
            let e = {
                target: {
                    value: momentjs(this.props.value).format(this.props.format),
                    parsedValue: newMoment.toDate().getTime()
                }
            };
            this.props.onChange(e);
        }
    }

    componentDidUpdate() {
        if (this.refs[DateInput.refName].isFocused() && this.caretPosition !== -1) {
            this.refs[DateInput.refName].setCaretPosition(this.caretPosition);
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


    componentDidMount() {
        document.addEventListener("click", this.__hidePicker, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.__hidePicker, false);
    }
}
