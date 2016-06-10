import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import BInput from "react-bootstrap/lib/Input";
import Alert from "react-bootstrap/lib/Alert";
import is from "is-js";

export default class BaseInput extends ShallowComponent {
    static propTypes = {
        min: React.PropTypes.array,
        max: React.PropTypes.array,
        style: React.PropTypes.object,
        minCode: React.PropTypes.array,
        maxCode: React.PropTypes.array,
        required: React.PropTypes.array,
        multiple: React.PropTypes.array
    };

    static maxTextLengthMessage = "Input cannot be more than 1000 characters.";

    valid = false;

    constructor(props) {
        super(props);
        this.__propsChecker(this.props.required);
        this.__propsChecker(this.props.min);
        this.__propsChecker(this.props.max);
        this.__propsChecker(this.props.minCode);
        this.__propsChecker(this.props.maxCode);
        this.__propsChecker(this.props.multiple);
        this.state = {
            bsStyle: this.props.bsStyle ? this.props.bsStyle : undefined,
            validations: undefined
        };
    }

    render() {
        let validations = this.state.validations ? this.state.validations : this.props;
        let errors = this.__validate(validations);
        let value = this.props.value;
        let input = undefined;
        if (value && value.length > 999) {
            errors.push(BaseInput.maxTextLengthMessage);
            value = "";
        }
        this.valid = (errors.length === 0);
        if (this.valid) {
            input = (
                <div>
                    <BInput
                        {...this.props}
                        bsStyle={this.state.bsStyle}
                        style={this.props.style}
                        ref="innerInput"
                        value={value}
                        />
                </div>
            );
        } else {
            let messages = [];
            for (let i = 0; i < errors.length; i++) {
                messages.push(<p key={i}>{errors[i]}</p>);
            }

            input = (
                <div>
                    <BInput
                        {...this.props}
                        bsStyle="error"
                        ref="innerInput"
                        value={value}
                        />
                    <Alert className="input-alert" bsStyle="danger">{messages}</Alert>
                </div>);
        }

        return input;
    }

    focus = () => {
        this.refs.innerInput.getInputDOMNode().focus();
    };

    isValid = () => {
        return this.valid;
    };
    updateValidations = (validation) => {
        var state = {};
        var validationsData = [];
        validationsData.push(this.props);
        var validations = validationsData[0];

        if (validation.min)
            validations["subMin"] = validation.min;

        if (validation.max)
            validations["subMax"] = validation.max;


        state["validations"] = validations;
        this.setState(state);
        this.forceUpdate();
    };

    __validate = (validations) => {
        var messages = [];
        let isNumeric = (typeof this.props.value === "number");

        if (validations.required)
            if ((this.props.value == undefined || String(this.props.value).length == 0) && validations.required[0])
                messages.push(validations.required[1]);
        if (validations.multiple) {
            if (isNumeric) {
                if (!Number.isInteger(this.props.value / validations.multiple[0]))
                    messages.push(validations.multiple[1]);
            }
        }
        if (validations.min) {
            if (isNumeric) {
                if (this.props.value < validations.min[0])
                    messages.push(validations.min[1]);
            } else if (String(this.props.value).length < validations.min[0])
                messages.push(validations.min[1]);
        }
        else if (validations.subMin) {
            if (isNumeric) {
                if (this.props.value < validations.subMin[0])
                    messages.push(validations.subMin[1]);
            } else if (String(this.props.value).length < validations.subMin[0])
                messages.push(validations.subMin[1]);
        }
        if (validations.max) {
            if (isNumeric) {
                if (this.props.value > validations.max[0])
                    messages.push(validations.max[1]);
            } else if (String(this.props.value).length > validations.max[0])
                messages.push(validations.max[1]);
        }
        else if (validations.subMax) {
            if (isNumeric) {
                if (this.props.value > validations.subMax[0])
                    messages.push(validations.subMax[1]);
            } else if (String(this.props.value).length > validations.subMax[0])
                messages.push(validations.subMax[1]);
        }
        if (this.props.regex) {
            if (String(this.props.value).length > 0) {
                var regex = new RegExp(this.props.regex[0]);
                if (!regex.test(this.props.value)) {
                    messages.push(validations.regex[1]);
                }
            }
        }
        return messages;
    };

    __propsChecker = (prop) => {
        if (prop && (prop.length != 2 || !(is.string(prop[0]) || is.number(prop[0]) || is.bool(prop[0]) || is.date(prop[0])) && is.string(prop[1])))
            throw "Validation property must be an array of 2 and contain value with message.";
    };

    componentDidMount = () => {
        if (this.props.focus)
            this.focus();
    }
}
