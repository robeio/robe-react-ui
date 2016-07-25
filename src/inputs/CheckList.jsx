import React from "react";
import { Assertions } from "robe-react-commons";
import ValidationComponent from "../validation/ValidationComponent";
import FaIcon from "../faicon/FaIcon";
import { FormGroup, ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";
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
        value: React.PropTypes.any,
        /**
         * Delimiter is a separator to separate checked values as string in `value` props
         */
        delimiter: React.PropTypes.string,
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
         * handleChange callback function when selection `item` or `items` changed.
         */
        handleChange: React.PropTypes.func,
        /**
         * Validations functions to validate value
         */
        validations: React.PropTypes.object,
        /**
         * disabled input
         */
        disabled: React.PropTypes.bool,
        /**
         * horizantal or vertical list
         */
        direction: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        delimiter: ",",
        textField: "text",
        valueField: "value",
        disabled: false,
        direction: false
    };

    _values = [];

    _value: string;

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
        if (this.props.value) {
            this._value = this.props.value;
            this._values = this.__split(this._value);
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
        let flex = this.props.direction ? "flex" : "";
        return (
            <FormGroup>
                <ControlLabel> {this.props.label} </ControlLabel>
                    <ListGroup className={`checkbox-scroll ${flex}`} style={givenStyle}>
                        {
                            this.props.items ?
                                this.__createCheckListes(this.props.items) :
                                this.__createCheckList(this.props.item)
                        }
                        {super.validationResult()}
                    </ListGroup>
            </FormGroup>
        );
    }

    /**
     * create checkbox items from given items.
     * @param items
     * @returns {Array}
     * @private
     */
    __createCheckListes(items: Array<Map>): Array {
        let components = null;
        if (Assertions.isArray(items)) {
            components = [];
            for (let i = 0; i < items.length; i++) {
                components.push(this.__createCheckList(items[i]));
            }
        } else {
            components = this.__createCheckList(items);
        }
        return components;
    }

    /**
     * create a checkbox from given item.
     * @param item
     * @returns {Object}
     * @private
     */
    __createCheckList(item: Map): Object {
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this._values.indexOf(value) !== -1;
        let icon = isChecked ? " fa-check-square-o" : " fa-square-o";
        let opacity = isChecked ? " checked" : "";
        let disabledStyle = this.props.disabled ? "disabled-check-input" : "";

        return (
            <ListGroupItem style={{outline: "none" }} className={`checkbox ${disabledStyle} ${opacity}`} onClick={this.props.disabled ? null : this.onClick.bind(this, value)}>
                <label
                    style={{ paddingLeft: "2px"}}
                >
                    <FaIcon code={`${icon} state-icon`} size={"10px"} />
                </label> {text}
                <input
                    type="hidden"
                    value={value}
                    disabled={this.props.disabled}
                />
            </ListGroupItem>
        );
    }
    /**
     * This method has two difference calls.
     * 1 - call without parameter returns true if at least one of the values is checked.
     * 2 - call with key parameter returns true if the given key is in checked list.
     * @param {string} key
     * @returns {boolean}
     */
    isChecked = (key: string): boolean => {
        return typeof key !== "undefined" ?
        this._values.indexOf(key) !== -1 :
        this._values.length > 0;
    };

    /**
     * returns checked values as string
     * @returns {string}
     */
    getValue(): string {
        return this._value;
    }

    /**
     * Splits given string by delimiter and return result as Array.
     * @param value
     * @returns {Array}
     * @private
     */
    __split(value: string): Array {
        if (value && value.length > 0) {
            return this._value.split(this.props.delimiter);
        }
        return [];
    }

    /**
     * Joins given Array by delimiter and return result as string.
     * @param values
     * @param delimiter
     * @returns {string}
     * @private
     */
    __join(values: Array, delimiter: string): string {
        if (values && values.length > 0) {
            return this._values.join(delimiter);
        }
        return "";
    }

    /**
     * Internal onClick event. It is triggered every time.
     * @param e event
     */
    onClick(value: string) {
        let ind = this._values.indexOf(value);
        if (ind !== -1) {
            delete this._values[ind];
        } else {
            this._values.push(value);
        }
        let parsedValue = this.__join(this._values, this.props.delimiter);
        let result = true;
        if (this.props.handleChange) {
            let e = { target: { parsedValue } };
            result = this.props.handleChange(e);
        }
        if (result) {
            this._value = parsedValue;
        }
        return result;
    }

}
