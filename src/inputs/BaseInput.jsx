import React from "react";
import { ShallowComponent, Maps, Assertions } from "robe-react-commons";
import FormGroup from "react-bootstrap/lib/FormGroup";
import InputGroup from "react-bootstrap/lib/InputGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Alert from "react-bootstrap/lib/Alert";

/**
 * BaseInput is a base component which wraps React-Bootstraps input component.
 * Does necessary validations, rendering of validation messages.
 * @export
 * @class BaseInput
 * @extends {ShallowComponent}
 */
export default class BaseInput extends ShallowComponent {
    /**
     * PropTypes of the component
     * @static
     */
    static propTypes: Map = {
        /**
         * Style map for the component.
         */
        style: React.PropTypes.object,
        /**
         * Label for the form control.
         */
        label: React.PropTypes.string,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,

        /**
         * Type of the BaseInput. (text, email, password, file)
         */
        type: React.PropTypes.string,

        /**
        * Component class of the BaseInput. (select, textarea)
        */
        componentClass: React.PropTypes.string,

        /**
         * Component class of the BaseInput. (select, textarea)
         */
        inputGroupLeft: React.PropTypes.object,
        /**
         * Component class of the BaseInput. (select, textarea)
         */
        inputGroupRight: React.PropTypes.object
    };

    /**
     * Max length allowed message.
     * @static
     */
    static maxTextLengthMessage: string = "Input cannot be more than 1000 characters.";

    /**
     * Holds the valid property of input component.
     */
    __valid: boolean = false;
    /**
     * Validation map for all functions and custom messages .
     */
    __validations: Map = {};

    /**
     * Creates an instance of BaseInput.
     * @param {any} props
     */
    constructor(props: Object) {
        super(props);
        this.state = {
            bsStyle: this.props.bsStyle ? this.props.bsStyle : undefined,
        };
    }

    /**
     * Renders the component
     * @returns {Object}
     */
    render(): Object {
        let errors = this.__validate();
        let value = this.props.value;
        if (value && value.length > 999) {
            errors.push(BaseInput.maxTextLengthMessage);
            value = "";
        }
        this.__valid = (errors.length === 0);
        let alerts = undefined;
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }

        if (!this.isValid) {
            alerts = <Alert className="input-alert" bsStyle="danger">{messages}</Alert>;
        }
        if (this.props.inputGroupLeft !== undefined || this.props.inputGroupRight !== undefined) {
            return (
                <FormGroup>
                    <ControlLabel> {this.props.label} </ControlLabel>
                    <InputGroup>
                        {this.props.inputGroupLeft}
                        <FormControl
                            {...this.props}
                            bsStyle="error"
                            ref="innerInput"
                            value={value}
                            />
                        {this.props.inputGroupRight}
                    </InputGroup>
                    {alerts}
                </FormGroup>
            );
        }
        return (
                <FormGroup>
                    <ControlLabel> {this.props.label} </ControlLabel>
                        <FormControl
                            {...this.props}
                            bsStyle="error"
                            ref="innerInput"
                            value={value}
                            />
                    {alerts}
                </FormGroup>
            );
    }

    /**
     * Focuses to the input field.
     */
    focus() {
        this.refs.innerInput.getInputDOMNode().focus();
    }

    /**
     * Returns validity of the component.
     * @return {boolean}
     */
    isValid(): boolean {
        return this.__valid;
    }

    /**
     * Validates the input components and returns error messages.
     * @return { Array<string>} array of messages.
     */
    __validate(): Array<string> {
        let messages = [];

        Maps.forEach(this.__validations, (validation: Function, key: string) => {
            if (!Assertions.isFunction(validation)) {
                return;
            }
            let message = validation(this.props.value);
            let messageKey = `${key}Message`;
            if (message !== undefined) {
                if (this.__validations[messageKey] !== undefined) {
                    message = this.__validations[messageKey];
                }
                messages = messages.concat(message);
            }
        });
        return messages;
    }

    /**
     * Fired after component mounts. Takes validations from props.
     */
    componentDidMount() {
        if (this.props.focus) {
            this.focus();
        }
    }

    /**
     * Fired after component mounts. Sets focus from props.
     */
    componentWillMount() {
        if (this.props.validations !== undefined) {
            this.__validations = this.props.validations;
        }
    }
}
