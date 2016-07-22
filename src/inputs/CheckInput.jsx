import React from "react";
import { Assertions } from "robe-react-commons";
import ValidationComponent from "../base/ValidationComponent";
import FaIcon from "../faicon/FaIcon";
import { FormGroup, ControlLabel } from "react-bootstrap";


/**
 * An Input Component which acts as a checkbox.
 * @export
 * @class CheckInput
 * @extends {ShallowComponent}
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
         * map array of options to render.
         */
        items: React.PropTypes.array,
        /**
         * map  of options to render.
         */
        item: React.PropTypes.object,
        /**
         * selected value or values
         */
        value: React.PropTypes.any,
        /**
         * selected value or values
         */
        delimiter: React.PropTypes.string,
        /**
         * key of given map array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * presented text of give map array `items`
         */
        textField: React.PropTypes.string,
        /**
         * callback function when selected values changed
         */
        onChange: React.PropTypes.func,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,
        /**
         * disabled
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
                        this.__createCheckBoxes(this.props.items) :
                        this.__createCheckBox(this.props.item)
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
    __createCheckBoxes(items: Array<Map>): Array {
        let components = null;
        if (Assertions.isArray(items)) {
            components = [];
            for (let i = 0; i < items.length; i++) {
                components.push(this.__createCheckBox(items[i]));
            }
        } else {
            components = this.__createCheckBox(items);
        }
        return components;
    }

    /**
     *
     * @param item
     * @returns {Object}
     * @private
     */
    __createCheckBox(item: Map): Object {
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this._values.indexOf(value) !== -1;
        let icon = isChecked ? " state-icon fa fa-check-square-o" : " state-icon fa fa-square-o";
        let disabled = isChecked ? "checkbox disabled-check-input" : "checkbox ";
        let input = isChecked ? (
            <input
                type="hidden"
                value={value}
                disabled={!isChecked}
            />
        ) : null;
        return (
            <div value={value} className={disabled} onClick={this.__onClick.bind(this, value)}>
                <label
                    style={{ paddingLeft: "2px" }}
                >
                    <span className={icon} style={{ marginRight: "10px" }} />
                {text}</label>
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

    __join(values: Array) {
        if (values && values.length > 0) {
            return this._value.join(this.props.delimiter);
        }
        return "";
    }
    /**
     * Internal onClick event. It is triggered every time.
     * @param e event
     */
    __onClick(value) {
        let ind = this._values.indexOf(value);
        if (ind !== -1) {
            delete this._values[ind];
        } else {
            this._values.push(value);
        }
        this._value = this._values.length > 1 ? this._values.join(this.props.delimiter) : value;
        if (this.props.onChange) {
            let e = { target: { value: this._value } };
            this.props.onChange(e);
        }
    }
}
