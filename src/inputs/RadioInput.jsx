import React from "react";
import { Assertions } from "robe-react-commons";
import ValidationComponent from "../validation/ValidationComponent";
import FaIcon from "../faicon/FaIcon";
import { FormGroup, ControlLabel } from "react-bootstrap";


/**
 * RadioInput is an input element to provide selected given item.
 * @export
 * @class RadioInput
 * @extends {ValidationComponent}
 */
export default class RadioInput extends ValidationComponent {
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
         * Item will be rendered as checkbox input.
         */
        item: React.PropTypes.object,
        /**
         * Checked value or values
         */
        value: React.PropTypes.string,
        /**
         * Key of map item which is defined in given array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * label of map item which is defined in given array `items`
         */
        textField: React.PropTypes.string,
        /**
         * Is a callback function when selection `item` or `items` changed.
         */
        onChange: React.PropTypes.func,
        /**
         * Validations functions to validate value
         */
        validations: React.PropTypes.object,
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        textField: "text",
        valueField: "value",
        disabled: false
    };

    _value;
    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        if (this.props.value) {
            this._value = this.props.value;
        }
    }

    /**
     *
     * render
     * @returns {string}
     **/
    render(): Object {
        return (
            <FormGroup>
                <ControlLabel> {this.props.label} </ControlLabel>
                {
                    this.props.items ?
                        this.__createRadioBoxes(this.props.items) :
                        this.__createRadioBox(this.props.item)
                }
                {super.validationResult()}
            </FormGroup>
        );
    }

    /**
     * returns radio inputs from given items.
     * @param items
     * @returns {Array}
     * @private
     */
    __createRadioBoxes(items: Array<Map>): Array {
        let components = null;
        if (Assertions.isArray(items)) {
            components = [];
            for (let i = 0; i < items.length; i++) {
                components.push(this.__createRadioBox(items[i]));
            }
        } else {
            components = this.__createRadioBox(items);
        }
        return components;
    }

    /**
     * return a radio input from given item.
     * @param item
     * @returns {Object}
     * @private
     */
    __createRadioBox(item: Map): Object {
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this._value === value;
        let icon = isChecked ? " fa-dot-circle-o" : " fa-circle-o";
        let disabledStyle = this.props.disabled ? "disabled-check-input" : "";
        return (
            <div value={value} className={`radio ${disabledStyle}`} onClick={this.props.disabled ? null : this.__onClick.bind(this, value)}>
                <label
                    style={{ paddingLeft: "2px" }}
                >
                    <FaIcon code={`${icon} state-icon`} size={"10px"} />
                </label> {text}
                <input
                    type="hidden"
                    value={value}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }

    /**
     * This method has two difference calls.
     * 1 - call without parameter returns true if at least one of the values is checked or not.
     * 2 - call with key parameter returns true if the given key is checked or not.
     * @param {string} key
     * @returns {boolean}
     */
    isChecked = (key: string) => {
        let isExist = (Assertions.isNotUndefined(this._value) && this._value !== null) ? this._value.length > 0 : false;
        if (Assertions.isNotUndefined(key)) {
            return isExist && key === this._value;
        }
        return isExist;
    };

    /**
     * returns checked values as string
     * @returns {string}
     */
    getValue(): string {
        return this._value;
    }

    /**
     * Internal onClick event. It is triggered if any Radio Input item is clicked.
     * @param value
     * @private
     */
    __onClick(value) {
        this._value = value;
        if (this.props.onChange) {
            let e = { target: { value: this._value } };
            this.props.onChange(e);
        }
    }
}
