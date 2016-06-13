import React from "react";
import ShallowComponent  from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "faicon/FaIcon";

class CheckInput extends ShallowComponent {
    static propTypes = {
        label: React.PropTypes.string,
        textValue: React.PropTypes.string,
        value: React.PropTypes.bool.isRequired,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        disabled: false
    };
    checked = this.props.value;

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    };


    render() {
        let icon = this.props.value === true ? " state-icon fa fa-check-circle-o" : " state-icon fa fa-circle-o";
        let disabled = this.props.disabled ? "checkbox disabled-check-input" : "checkbox ";

        return (
            <div className={disabled} onClick={this.__parse.bind(this) }>
                <label style={{ paddingLeft: "2px" }}>
                    <FaIcon code="icon" />
                    {this.props.label}</label>
            </div>
        );

    };

    isChecked = () => {
        return this.checked;
    };


    __parse = (e) => {
        if (this.props.onChange) {
            e.target.parsedValue = !this.props.value;
            e.target.value = this.props.textValue;
            this.props.onChange(e);
            this.checked = !this.checked;
        }
    };

}

module.exports = CheckInput;