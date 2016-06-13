import React from "react";
import ShallowComponent  from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "faicon/FaIcon";

const Style = {
    "icon": {
        "marginLeft": "-5px",
        "marginRight": "10px"
    },
    "selected": {},
    "disabled": {}
};

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

    constructor(props) {
        super(props);
    };

    checked = this.props.value;


    render() {
        let icon = this.props.value === true ? "fa-check-circle-o" : "fa-circle-o";
        let disabled = this.props.disabled ? "checkbox disabled-check-input" : "checkbox ";

        return (
            <div className={disabled} onClick={this.__parse.bind(this) }>
                <label style={{ paddingLeft: "2px" }}>
                    <FaIcon code={icon} style={Style.icon} />
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