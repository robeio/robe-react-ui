import React from "react";
import { Assertions } from "robe-react-commons";
import { FormGroup, ControlLabel } from "react-bootstrap";
import ValidationComponent from "../validation/ValidationComponent";
import FaIcon from "../faicon/FaIcon";
/**
 * An Input Component which acts as a radio input.
 * @export
 * @class CheckInput
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
         * code use as input field name
         */
        code: React.PropTypes.string,
        /**
         * Items will be rendered as radio input.
         */
        items: React.PropTypes.array,
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
        placeHolder: "Please Select",
        noResultsText: "No Result",
        textField: "text",
        valueField: "value",
        disabled: false,
        readOnly: false,
        hidden: false
    };

    /**
     *
     * render
     * @returns {string}
     **/
    render(): Object {
        this._value = this.props.value;
        return (
            <FormGroup>
                <ControlLabel> {this.props.label} </ControlLabel>
                {
                    this.__createRadioBoxes(this.props.items)
                }
                {super.validationResult() }
            </FormGroup>
        );
    }

    /**
     *
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
     *
     * @param item
     * @returns {Object}
     * @private
     */
    __createRadioBox(item: Map): Object {
        if (!item) {
            return "item cannot be undefined, please check your code";
        }
        let value = item[this.props.valueField];
        let text = item[this.props.textField];
        let isChecked = this._value === value;
        let icon = isChecked ? " fa-dot-circle-o" : " fa-circle-o";
        let disabled = isChecked ? "disabled-check-input" : "";
        let input = isChecked ? (
            <input
                type="hidden"
                name={this.props.code}
                value={value}
                disabled={!isChecked}
            />
        ) : undefined;

        let onClick = this.__onClick.bind(this, value);
        return (
            <div className={`radio ${disabled}`} onClick={onClick} key={value}>
                <label
                    htmlFor={this.props.code}
                    style={{ paddingLeft: "2px" }}
                >
                    <FaIcon code={`${icon} state-icon`} size={"fa-lg"} />
                </label> {text}
                {input}
            </div>
        );
    }

    /**
     * Returns whether it is selected or not.
     * @returns true if selected.
     */
    isChecked = (key: string): boolean => {
        let isValueNotEmpty = this._value && this._value.length > 0;
        return isValueNotEmpty && (typeof key === "undefined" ?
            key !== this._value : true);
    };

    getValue(): Object {
        return this._value;
    }

    /**
     * Internal onClick event. It is triggered every time.
     * @param e event
     */
    __onClick(value: Object): Object {
        let result = true;
        if (this.props.onChange) {
            let e = { target: { value: value } };
            result = this.props.onChange(e);
        }
        return result;
    }
}
