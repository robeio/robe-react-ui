import React from "react";
import ShallowComponent  from "robe-react-commons/lib/components/ShallowComponent";
import FaIcon from "faicon/FaIcon";

const Style = {
    "icon": {
        "marginLeft": "-5px",
        "marginRight": "10px"
    },
    "disabled": {
        "pointerEvents": "none",
        "opacity": "0.4"
    }
};

/**
 * An Input Component which acts as a checkbox.
 * 
 * @export
 * @class CheckInput
 * @extends {ShallowComponent}
 */
export default class CheckInput extends ShallowComponent {
    /**
     * propTypes
     * @static
     */
    static propTypes = {
        label: React.PropTypes.string,
        textValue: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        value: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        value: false
    };

    /**
     * Creates an instance of CheckInput.
     * 
     * @param props (description)
     */
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value | false
        }
    };


    /**
     * render
     * @returns
     */
    render() {
        let icon = "fa-circle-o";
        console.log(this.props.onChange);
        if (this.props.onChange == undefined) {
            if (this.state.value) {
                icon = "fa-check-circle-o";
            }
        } else {
            if (this.props.value === true) {
                icon = "fa-check-circle-o";
            }
        }

        let isDisabled = this.props.disabled === true;

        return (
            <div
                className="checkbox"
                style={(isDisabled ? Style.disabled : {}) }
                /**
                 * (description)
                 */
                onClick={(!isDisabled ? this.__onClick : undefined) }>
                <label style={{ paddingLeft: "2px" }}>
                    <FaIcon code={icon} style={Style.icon} />
                    {this.props.label}</label>
            </div>
        );
    }


    /**
     * Returns whether it is selected or not.
     * @returns true if selected.
     */
    isChecked = () => {
        if (this.props.onChange) {
            return this.prop.value;
        } else {
            return this.state.value;
        }
    };

    /**
     * Internal onClick event. It is triggered every time. 
     * @param e event
     */
    __onClick = (e) => {
        if (this.props.onChange) {
            e.target.parsedValue = !this.props.value;
            e.target.value = this.props.textValue;
            this.props.onChange(e);
        } else {
            this.setState({ value: !this.state.value });
        }
    };
}