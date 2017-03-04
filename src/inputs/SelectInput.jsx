import React from "react";
import ReactDOM from "react-dom";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import { Application, Arrays } from "robe-react-commons";
import ValidationComponent from "../validation/ValidationComponent";
import "./SelectInput.css";
import FaIcon from "../faicon/FaIcon"


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
         * name for the input name
         */
        code: React.PropTypes.string,
        /**
         * map array of options to render.
         */
        items: React.PropTypes.array,
        /**
         * Selected value or values
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ]),
        /**
         * key of given map array `items`
         */
        valueField: React.PropTypes.any,
        /**
         * presented text of give map array `items`
         */
        textField: React.PropTypes.string,
        /**
         * displayed when there"s no value
         */
        placeholder: React.PropTypes.string,
        /**
         * callback function when selected values changed
         */
        onChange: React.PropTypes.func,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,
        /**
         * Check List is single or multi
         */
        multi: React.PropTypes.bool,
        /**
         * presented message if any result not shown.
         */
        noResult: React.PropTypes.string,
        /**
         *  whether to enable searching feature or not
         */
        searchable: React.PropTypes.bool,
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool,
        /**
         *Defines the display style of the Validation message.
         */
        validationDisplay: React.PropTypes.oneOf(["overlay", "block"])
    };

    static defaultProps = {
        items: [],
        placeholder: Application.i18n(SelectInput, "inputs.SelectInput", "placeholder"),
        noResult: Application.i18n(SelectInput, "inputs.SelectInput", "noResult"),
        textField: "text",
        valueField: "value",
        multi: false,
        searchable: true,
        disabled: false,
        readOnly: false,
        hidden: false,
        validationDisplay: "block"
    };

    __inputRef;

    /**
     *
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        this.state = {
            searchValue: "",
            searchItems: this.__extractValues(props.items, props.value, props.valueField),
            dropdown: false,
            value: props.value || []
        };

        this.__handleOutSideClick = this.__handleOutSideClick.bind(this);

    }

    componentWillReceiveProps(props: Object) {
        this.setState({
            searchValue: "",
            searchItems: this.__extractValues(props.items, props.value, props.valueField),
            dropdown: false,
            value: props.value || []
        })
    }

    render(): Object {
        let select;
        if (this.props.multi) {
            select = this.__renderMultiSelect();
        }
        else {
            select = this.__renderSingleSelect();
        }

        return super.wrapComponent(
            <FormGroup
                hidden={this.props.hidden}
                style={this.props.style}>
                <ControlLabel> {this.props.label} </ControlLabel>
                {select}
            </FormGroup>
        );
    }

    __renderSingleSelect() {
        let items = this.props.items;
        let options = [];
        options.push(
            <option
                style={{ color: "#999" }}
                key="placeholder"
                value="placeholder">
                {this.props.placeholder}
            </option>);
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            options.push(
                <option
                    key={item[this.props.valueField]}
                    value={item[this.props.valueField]}>
                    {item[this.props.textField]}
                </option>);
        }
        return (
            <FormControl
                componentClass="select"
                disabled={this.props.disabled}
                value={this.props.value}
                onChange={this.__onSelectSingleItem}>
                {options}
            </FormControl>);
    }

    __renderMultiSelect() {
        let className = "multiple-select";
        if (this.props.disabled) {
            className += " multiple-select-disabled";
        }
        return (
            <div>
                <div className={className}
                    onClick={this.__onClickMultiSelectLayout}>
                    <div className="multiple-select-tool">
                        <FaIcon code="fa-caret-down" fixed={false} />
                    </div>
                    {this.__renderMultiValues(this.state.value)}
                    <input className="multiple-select-input"
                        type={this.props.searchable ? "textarea" : "hidden"}
                        value={this.state.searchValue}
                        ref={(component: Object) => { this.__inputRef = component }}
                        onChange={this.__onSearchChange}
                        onKeyDown={this.__onKeyDown} />
                </div>
                <div className="multiple-select-dropdown" style={{ display: this.state.dropdown ? "inherit" : "none" }}>
                    <div id={this.props.noResult} className="multiple-select-dropdown-layout">
                        {this.__renderMultiItems(this.state.searchItems)}
                    </div>
                </div>
            </div>);
    }

    __renderMultiValues(values) {
        let valueList = [];
        for (let i in values) {
            let value = values[i];
            let item = Arrays.getValueByKey(this.props.items, this.props.valueField, value);
            if (item !== undefined) {
                valueList.push(
                    <div key={item[this.props.valueField]} className="multiple-select-item">
                        <span className="multiple-select-icon" id={item[this.props.valueField]}
                            onClick={this.__onRemoveMultiValue}>x</span>
                        <span className="multiple-select-label"> {item[this.props.textField]}</span>
                    </div>
                );
            }
        }
        if (valueList.length == 0 && !this.state.searchValue) {
            valueList.push(
                <div key="multiple-select-placeholder" className="multiple-select-placeholder">
                    {this.props.placeholder}
                </div>
            )
        }
        return valueList;
    }

    __renderMultiItems(items) {
        let itemsList = [];
        for (let i in items) {
            let item = items[i];
            itemsList.push(
                <div key={item[this.props.valueField]}
                    id={item[this.props.valueField]}
                    onClick={this.__onSelectMultiItem}>
                    {item[this.props.textField]}
                </div>);
        }
        return itemsList;
    }

    /**
     *
     * @param e
     * @private
     */
    __onRemoveMultiValue(e) {
        let key = e.target.id;
        let value = this.state.value.slice(0);
        let removed = Arrays.remove(value, key);
        if (removed) {
            this.__callOnChange(value, this.state.value);
        }
    }

    /**
     *
     * @param e
     * @private
     */
    __onSelectMultiItem(e) {
        let key = e.target.id;
        let value = this.state.value.slice(0);
        if (Arrays.indexOf(value, key) === -1) {
            value.push(key);
        }
        this.__callOnChange(value, this.state.value);
    }

    /**
     *
     * @param e
     * @private
     */
    __onKeyDown(e) {
        e.target.style.width = ((e.target.value.length + 1) * 7) + '%';
        if (e.key === "Backspace" && e.target.value.length <= 0 && this.state.value.length > 0) {
            let value = this.state.value.slice(0);
            let removed = Arrays.remove(value, value[value.length - 1]);
            if (removed) {
                this.__callOnChange(value, this.state.value);
            }
        }
    }

    /**
     *
     * @param e
     * @private
     */
    __onSelectSingleItem(e) {
        let value = e.target.selectedOptions[0].value;
        if (value === "placeholder") {
            value = "";
        }
        this.__callOnChange(value, this.state.value);
    }

    /**
     *
     * @param e
     * @private
     */
    __onClickMultiSelectLayout(e) {
        if (!e.target.id) {
            this.setState({ dropdown: true });
            let node = ReactDOM.findDOMNode(this.__inputRef);
            node.focus();
        }
    }

    /**
     *
     * @param e
     * @private
     */
    __onSearchChange(e) {
        let searchValue = e.target.value;
        let items = this.state.searchItems.slice(0);
        let searchItems = [];
        if (!searchValue) {
            searchItems = this.__extractValues(this.props.items, this.state.value, this.props.valueField);
        }
        else {
            for (let i in items) {
                let item = items[i];
                let value = item[this.props.textField];
                value = value.toLowerCase();
                if (value.includes(searchValue.toLowerCase())) {
                    searchItems.push(item)
                }
            }
        }
        this.setState({ searchValue: searchValue, searchItems: searchItems, dropdown: true });
    }

    /**
     *
     * @param items
     * @param values
     * @param valueField
     * @returns {*}
     * @private
     */
    __extractValues(items, values, valueField) {
        let arr = [];

        if (!values || values.length <= 0) {
            return items;
        }

        for (let i in items) {
            let item = items[i];
            if (Arrays.indexOf(values, item[valueField]) === -1) {
                arr.push(item);
            }
        }
        return arr;
    }

    /**
     * @param {any} value
     * @param {any} oldValue
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
                    parsedValue: value,
                    name: this.props.name
                }
            };
            result = this.props.onChange(e);
        }
        return result;
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
                this.state.value.indexOf(value) !== -1 : this.state.value === value;
        }
        return !(!this.state.value) && (this.props.multi ? this.state.value.length > 0 : (this.state.value !== null && this.state.value !== ""));
    };

    /**
     * returns checked values as string
     * @returns {string}
     */
    getValue(): string {
        return this.state.value;
    }

    componentWillMount() {
        document.body.addEventListener('click', this.__handleOutSideClick, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.__handleOutSideClick, false);
    }
    __handleOutSideClick(e) {
        if (ReactDOM.findDOMNode(this).contains(e.target))
            return;

        this.setState({ dropdown: false });
    }
}
