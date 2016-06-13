import React from "react";
import { ShallowComponent } from "robe-react-commons";

/**
 * (description)
 * 
 * @export
 * @class RadioInput
 * @extends {ShallowComponent}
 */
export default class RadioInput extends ShallowComponent {

    /**
     * (description)
     * 
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
     * (description)
     * 
     * @static
     */
    static defaultProps = {
        disabled: false
    };

    /**
     * (description)
     */
    valid = false;
    /**
     * (description)
     */
    selectedItem = undefined;

    /**
     * Creates an instance of RadioInput.
     * 
     * @param props (description)
     */
    constructor(props) {
        super(props);
    }

    /**
     * (description)
     * 
     * @returns (description)
     */
    render() {
        if (this.props.label) {
            return (<div className="form-group">
                <label className="control-label">{this.props.label}</label>
                {this.__createRadios(this.props.data) }
            </div>);
        }
        return (<div>{this.__createRadios(this.props.data) }</div>);
    }

    /**
     * (description)
     */
    isValid = () => {
        return this.valid;
    };

    /**
     * (description)
     */
    getSelected = () => {
        return this.selectedItem;
    }

    /**
     * (description)
     */
    __parse = (e) => {
        if (this.props.onChange) {
            e.target.parsedValue = e.target.getAttribute("data");
            this.props.onChange(e);
            this.valid = true;
            this.selectedItem = e.target.getAttribute("data");
        }
    }

    /**
     * (description)
     */
    __createRadios = (list) => {
        let options = [];

        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let value = this.__getDataValueField(item);
            let icon = this.props.value === value ? " state-icon fa fa-dot-circle-o" : " state-icon fa fa-circle-o";
            if (this.props.value === value) {
                this.valid = true;
                this.selectedItem = value;
            }
            options.push(
                <div
                    className="checkbox"
                    onClick={this.__parse.bind(this) }
                    data={value}
                    key={value}
                    >
                    <label style={{ paddingLeft: "2px" }} data={value}>
                        <span className={icon} style={{ marginRight: "10px" }} data={value} />
                        <span data={value}>{this.__getDataTextField(item) }</span></label>
                </div>
            );
        }
        return options;
    }

    /**
     * (description)
     * 
     * @param item (description)
     * @returns (description)
     */
    __getDataTextField = (item) => {
        if (this.props.dataTextField) {
            return item[this.props.dataTextField] || item;
        }
        return item;
    }

    /**
     * (description)
     * 
     * @param item (description)
     * @returns (description)
     */
    __getDataValueField = (item) => {
        if (this.props.dataValueField) {
            return item[this.props.dataValueField] || item;
        }
        return item;
    }

    // isValid = ()=> {
    //     return this.refs.innerInput.isValid();
    // };
}
