import React from "react";
import { Assertions } from "robe-react-commons";
import ValidationComponent from "../validation/ValidationComponent";
import FaIcon from "../faicon/FaIcon";
import { FormGroup, ControlLabel } from "react-bootstrap";


/**
 * CheckInput is an input element to provide checked given item or items.
 * @export
 * @class CheckInput
 * @extends {ValidationComponent}
 */
export default class CheckInput extends ValidationComponent {
    /**
     * propTypes
     * @static
     */
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
         * Array of items. All items will be rendered as separate checkbox input.
         */
        items: React.PropTypes.array,
        /**
         * Checked value or values
         */
        value: React.PropTypes.array,
        /**
         * Key of map item which is defined in given array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * label of map item which is defined in given array `items`
         */
        textField: React.PropTypes.string,
        /**
         * onChange callback function when selection `item` or `items` changed.
         */
        onChange: React.PropTypes.func,
        /**
         * Validations functions to validate value
         */
        validations: React.PropTypes.object,
        /**
         * Check List is single or multi
         */
        multi: React.PropTypes.bool,
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
        textField: "text",
        valueField: "value",
        disabled: false,
        readOnly: false,
        hidden: false,
        multi: false
    };

    _value;

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        this._value = this.props.value;
        if (!this._value) {
            this._value = this.props.multi ? [] : "";
        }
    }

    /**
     *
     * render
     * @returns {string}
     **/
    render(): Object {
        return (
            <FormGroup hidden={this.props.hidden}>
                <ControlLabel> {this.props.label} </ControlLabel>
                {
                    this.props.items ?
                        this.__createCheckInputs(this.props.items) :
                        this.__createCheckInput(this.props.item)
                }
                {super.validationResult()}
            </FormGroup>
        );
    }

    /**
     *
     * @param items
     * @returns {Array}
     * @private
     */
    __createCheckInputs(items: Array<Map>): Array {
        let components = [];
        if (items) {
            for (let i = 0; i < items.length; i++) {
                components.push(this.__createCheckInput(items[i]));
            }
        }
        return components;
    }

    /**
     * create a CheckInput from given item.
     * @param item
     * @returns {Object}
     * @private
     */
    __createCheckInput(item: Map): Object {
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this.isChecked(value);
        let icon = isChecked ? " fa-check-square-o" : " fa-square-o";
        let disabled = isChecked ? "disabled-check-input" : "";
        let input = isChecked ? (
            <input
                type="hidden"
                value={value}
                disabled={!isChecked}
            />
        ) : null;
        let onClick = null;
        if (!this.props.disabled) {
            onClick = (this.props.multi ? this.__onClickMulti : this.__onClickSingle).bind(this, value);
        }

        return (
            <div value={value} className={`checkbox ${disabled}`} onClick={onClick}>
                <label
                    style={{ paddingLeft: "2px" }}
                >
                    <FaIcon code={`${icon} state-icon`} size={"10px"} />
                </label> {text}
                {input}
            </div>
        );
    }

    /**
     * This method has two difference calls.
     * 1 - call without parameter returns true if at least one of the values is checked.
     * 2 - call with key parameter returns true if the given key is in checked list.
     * @param {string} value
     * @returns {boolean}
     */
    isChecked = (value: string): boolean => {
        if (typeof value !== "undefined") {
            return this.props.multi ?
            this._value.indexOf(value) !== -1 : this._value === value;
        }
        return !(!this._value) && (this.props.multi ? this._value.length > 0 : this._value !== "");
    };

    /**
     * returns checked values as string
     * @returns {string}
     */
    getValue(): string {
        return this._value;
    }
    /**
     * Internal onClick event for Single CheckList. It is triggered every time.
     * @param e event
     */
    __onClickSingle(value: string) {
        if (this._value === value) {
            value = "";
        }
        let result = this.__callOnChange(value, this._value);
        if (result) {
            this._value = value;
        }
        return result;
    }
    /**
     * Internal onClick event for multi CheckList. It is triggered every time.
     * @param e event
     */
    __onClickMulti(value: string) {
        let willChangeValue = this._value.slice(0);
        let ind = willChangeValue.indexOf(value);
        if (ind !== -1) {
            willChangeValue.splice(ind, 1);
        } else {
            ind = willChangeValue.push(value) - 1;
        }
        let result = this.__callOnChange(willChangeValue, this._value);
        if (result) {
            this._value = willChangeValue;
        }
        return result;
    }
    __callOnChange(value, oldValue) {
        let result = true;
        if (this.props.onChange) {
            let e = {
                target: {
                    value: value,
                    oldValue: oldValue,
                    parsedValue: value
                }
            };
            result = this.props.onChange(e);
        }
        return result;
    }
}
