import React from "react";
import { ShallowComponent } from "robe-react-commons";
import FaIcon from "faicon/FaIcon";

const Style = {
    "icon": {
        "marginLeft": "-5px",
        "marginRight": "10px"
    },
    "disabled": {
        "pointerEvents": "none",
        "opacity": "0.4"
    },
    "label": {
        paddingLeft: "2px"
    }
};

/**
 * An Input Component which acts as a radiobox group. 
 * @export
 * @class RadioInput
 * @extends {ShallowComponent}
 */
export default class RadioInput extends ShallowComponent {

    /**
     * propTypes
     * @static
     */
    static propTypes = {
        data: React.PropTypes.array,
        dataTextField: React.PropTypes.string,
        dataValueField: React.PropTypes.string,
        label: React.PropTypes.string,
        value: React.PropTypes.any,
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false
    };

    valid = false;

    /**
     * Creates an instance of RadioInput.
     * 
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    /**
     * render
     * @returns 
     */
    render() {
        if (this.props.label) {
            return (
                <div className="form-group">
                    <label className="control-label">{this.props.label}</label>
                    {this.__createRadios(this.props.data) }
                </div>);
        }
        return (<div>{ this.__createRadios(this.props.data) }</div>);
    }

    /**
     * Returns validity of the input. 
     * @return true if it is valid.
     */
    isValid = () => {
        return this.valid;
    };

    /**
     * Returns the current selection
     */
    getSelected = () => {
        return this.state.value;
    }

    /**
     * Internal onClick event handler.
     */
    __onClick = (e) => {
        this.valid = true;
        let data = e.target.getAttribute("data");
        if (this.props.onChange) {
            e.target.parsedValue = data
            this.props.onChange(e);
        } else {
            this.setState({
                value: data
            });
        }
    }

    /**
     * Creates and element array from the option list
     */
    __createRadios = (list) => {
        let options = [];

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let value = this.__getDataValueField(item);
            let icon = "fa-circle-o";
            let isSelected = this.state.value === value;
            if (isSelected) {
                icon = "fa-dot-circle-o";
                this.valid = true;
                this.setState({
                    value: value
                });
            }

            options.push(
                <div
                    className="checkbox"
                    onClick={this.__onClick}
                    data={value}
                    key={value} >
                    <label style={Style.label} data={value}>
                        <FaIcon code={icon} data={value} style={Style.icon} />
                        <span data={value}>{this.__getDataTextField(item) }</span>
                    </label>
                </div>
            );
        }
        return options;
    }

    /**
     * Gets text of the item according to the dataTextField prop.
     * If no dataTextField given from the parent than it will return the item itself.
     * @param item item to get text from.
     * @returns (description)
     */
    __getDataTextField = (item) => {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || item;
        }
        return item;
    }

    /**
     * Gets value of the item according to the dataValueField prop.
     * If no dataValueField given from the parent than it will return the item itself.
     * @param item item to get value from.
     * @returns (description)
     */
    __getDataValueField = (item) => {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || item;
        }
        return item;
    }
}
