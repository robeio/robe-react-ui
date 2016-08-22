import React from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import ValidationComponent from "../validation/ValidationComponent";
import FaIcon from "../faicon/FaIcon";


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
         * Item will be rendered checkbox input single.
         */
        item: React.PropTypes.object,
        /**
         * Checked value or values
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.array
        ]),
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
        hidden: false
    };

    _value;
    _hasMultiItem;
    /**
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        this._hasMultiItem = !(!this.props.items);
        this._value = this.props.value;
        if (!this._value) {
            this._value = this._hasMultiItem ? [] : false;
        }
    }

    /**
     *
     * render
     * @returns {string}
     **/
    render(): Object {
        let label = (this.props.label === undefined) ? undefined : (
            <ControlLabel> {this.props.label} </ControlLabel>
        );
        return (
            <FormGroup hidden={this.props.hidden}>
                {label}
                {
                    this._hasMultiItem ?
                        this.__createCheckInputs(this.props.items) :
                        this.__createCheckInput(this.props.item)
                }
                {super.validationResult()}
            </FormGroup>
        );
    }

    /**
     * create Check Input items from given items.
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
     * @param {Map} item
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
            onClick = (this._hasMultiItem ? this.__onClickMulti : this.__onClickSingle).bind(this, value);
        }

        return (
            <div value={value} className={`checkbox ${disabled}`} onClick={onClick} key={value}>
                <label
                    htmlFor
                    style={{ paddingLeft: "2px" }}
                >
                    <FaIcon code={`${icon} state-icon`} size={"fa-sm"} />
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
            return this._hasMultiItem ?
                this._value.indexOf(value) !== -1 : this._value;
        }
        return this._hasMultiItem ? this._value.length > 0 : this._value;
    };

    /**
     * returns checked values as string
     * @returns {string}
     */
    getValue(): string {
        return this._value;
    }
    /**
     * Internal onClick event for Single CheckInput. It is triggered every time.
     * @return {boolean}
     */
    __onClickSingle(): boolean {
        let value = !this._value;
        let result = this.__callOnChange(value, this._value);
        if (result) {
            this._value = value;
        }
        return result;
    }
    /**
     * Internal onClick event for Single CheckInput. It is triggered every time.
     * @param {string} value
     * @return {boolean}
     */
    __onClickMulti(value: string): boolean {
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

    /**
     *
     * @param {any} value
     * @param {any} value
     * @returns {boolean}
     * @private
     */
    __callOnChange(value: any, oldValue: any): boolean {
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
