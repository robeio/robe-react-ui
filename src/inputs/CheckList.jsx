import React from "react";
import { FormGroup, ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";
import ValidationComponent from "../validation/ValidationComponent";
import FaIcon from "../faicon/FaIcon";
import "./CheckList.css";

/**
 * CheckList is an input element to provide checked given item or items.
 * @export
 * @class CheckList
 * @extends {ValidationComponent}
 */
export default class CheckList extends ValidationComponent {
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
         * code use as input field name
         */
        code: React.PropTypes.string,
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
         * Describes type of given item or each `item` which are extract from given `items`
         */
        valueType: React.PropTypes.string,
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
        hidden: React.PropTypes.bool,
        /**
         * horizantal or vertical list
         */
        horizontal: React.PropTypes.bool
    };


    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        textField: "text",
        valueField: "value",
        horizontal: false,
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
        this._hasMultiItem = !(!this.props.items) || !this.item;
        this._hasMultiItem = this._hasMultiItem & !(typeof this._value === "boolean");
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
        let givenStyle = this.props.style ? this.props.style : {};
        givenStyle.padding = "0";
        let flex = this.props.horizontal ? "flex" : "";
        return (
            <FormGroup hidden={this.props.hidden}>
                <ControlLabel> {this.props.label} </ControlLabel>
                <ListGroup className={`checkbox-scroll ${flex}`} style={givenStyle}>
                    {
                        this._hasMultiItem ?
                            this.__createCheckList(this.props.items) :
                            this.__createCheckListItem(this.props.item)
                    }
                </ListGroup>
                {super.validationResult() }
            </FormGroup>
        );
    }

    /**
     * create Check List items from given items.
     * @param items
     * @returns {Array}
     * @private
     */
    __createCheckList(items: Array<Map>): Array {
        let components = [];
        if (items) {
            for (let i = 0; i < items.length; i++) {
                components.push(this.__createCheckListItem(items[i]));
            }
        }
        return components;
    }

    /**
     * create a CheckList from given item.
     * @param {Map} item
     * @returns {Object}
     * @private
     */
    __createCheckListItem(item: Map): Object {
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this.isChecked(value);
        let icon = isChecked ? " fa-check-square-o" : " fa-square-o";
        let opacity = isChecked ? " checked" : "";
        let disabledStyle = this.props.disabled ? "disabled-check-input" : "";
        let onClick = null;
        if (!this.props.disabled) {
            onClick = (this._hasMultiItem ? this.__onClickMulti : this.__onClickSingle).bind(this, value);
        }

        let name = this.props.code ? `${this.props.code}[]` : null;
        return (
            <ListGroupItem style={{ outline: "none" }} className={`checkbox ${disabledStyle} ${opacity}`} onClick={onClick}>
                <label
                    htmlFor={name}
                    style={{ paddingLeft: "2px" }}
                >
                    <FaIcon code={`${icon} state-icon`} size={"fa-sm"} />
                </label> {text}
                <input
                    type="hidden"
                    value={value}
                    name={name}
                    disabled={this.props.disabled}
                />
            </ListGroupItem>
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
     * Internal onClick event for Single CheckList. It is triggered every time.
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
     * Internal onClick event for Single CheckList. It is triggered every time.
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
