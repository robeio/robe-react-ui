import React from "react";
import ValidationComponent from "../validation/ValidationComponent";
import Select from "react-select";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import "react-select/dist/react-select.css";

/**
 * Provide selection in map array data with single or multi choices
 * You can enable multi-value selection by setting multi={true}
 */
export default class SelectInput extends ValidationComponent {

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
         * multi select value
         */
        multi: React.PropTypes.bool,
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
         * displayed when there's no value
         */
        placeHolder: React.PropTypes.string,
        /**
         * callback function when selected values changed
         */
        onChange: React.PropTypes.func,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,
        /**
         * presented message if any result not shown.
         */
        noResultsText: React.PropTypes.string,
        /**
         * disabled
         */
        disabled: React.PropTypes.bool,
        /**
         *  whether to enable searching feature or not
         */
        searchable: React.PropTypes.bool
    };

    static defaultProps = {
        delimiter: ",",
        placeHolder: "Please Select",
        noResultsText: "No Result",
        textField: "text",
        valueField: "value",
        multi: false,
        disabled: false,
        searchable: true
    };

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel> {this.props.label} </ControlLabel>
                <Select
                    options={this.props.items}
                    valueKey={this.props.valueField}
                    labelKey={this.props.textField}
                    multi={this.props.multi}
                    noResultsText={this.props.noResultsText}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeHolder}
                    searchable={this.props.searchable}
                    value={this.props.value}
                    onChange={this.__onChange.bind(this)}
                />
                {super.validationResult()}
            </FormGroup>
        );
    }

    /**
     * callback when changed message
     * @param value
     * @private
     */
    __onChange(value: any) {
        let result = true;
        if (this.props.handleChange) {
            let e = { target: { value: value } };
            result = this.props.handleChange(e);
        }
        return result;
    }

}
