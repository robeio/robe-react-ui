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
         * Item will be rendered as checkbox input.
         */
        item: React.PropTypes.object,
        /**
         * Checked value or values
         */
        value: React.PropTypes.string,
        /**
         * Delimiter is a separator to separate checked values as string in `value` props
         */
        delimiter: React.PropTypes.string,
        /**
         * Key of map item which is defined in given array `items`
         */
        valueField: React.PropTypes.any,
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
        disabled: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        delimiter: ",",
        placeHolder: "Please Select",
        noResultsText: "No Result",
        textField: "text",
        valueField: "value",
        disabled: false
    };

    /**
     * @type {Array}
     * @private
     */
    _values = [];

    _value;
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
        return (
            <FormGroup>
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
        let components = null;
        if (Assertions.isArray(items)) {
            components = [];
            for (let i = 0; i < items.length; i++) {
                components.push(this.__createCheckInput(items[i]));
            }
        } else {
            components = this.__createCheckInput(items);
        }
        return components;
    }

    /**
     *
     * @param item
     * @returns {Object}
     * @private
     */
    __createCheckInput(item: Map): Object {
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this._values.indexOf(value) !== -1;
        let icon = isChecked ? " fa-check-square-o" : " fa-square-o";
        let disabled = isChecked ? "disabled-check-input" : "";
        let input = isChecked ? (
            <input
                type="hidden"
                value={value}
                disabled={!isChecked}
            />
        ) : null;
        return (
            <div value={value} className={`checkbox ${disabled}`} onClick={this.onClick.bind(this, value)}>
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
     * Returns whether it is selected or not.
     * @returns true if selected.
     */
    isChecked = (key: string) => {
        return typeof key === "undefined" ?
        this._values.indexOf(key) !== -1 :
        this._values.length > 0;
    };

    getValue() {
        return this._value;
    }

    __split(value: string) {
        if (value && value.length > 0) {
            return this._value.split(this.props.delimiter);
        }
        return [];
    }

    __join(values: Array, delimiter: string) {
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
