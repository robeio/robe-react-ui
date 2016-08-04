import React from "react";
import { BinderShallowComponent, Maps, Assertions } from "robe-react-commons";
import { Alert } from "react-bootstrap";

/**
 * BaseComponent for React Components which will use Validations
 */
export default class ValidationComponent extends BinderShallowComponent {
    static propTypes = {
        /**
         * Value of the component
         */
        value: React.PropTypes.string,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object
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
     * protected
     */
    _validations: Map = {};

    /**
     * Creates an instance of BaseInput.
     * @param {any} props
     */
    constructor(props: Object) {
        super(props);
        if (this.props.validations !== undefined) {
            this._validations = this.props.validations;
        }
    }

    validationResult(): Object {
        let alerts = undefined;
        let errors = this.__validate();
        this.__valid = (errors.length === 0);
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }
        if (!this.isValid()) {
            alerts = <Alert className="input-alert" bsStyle="danger">{messages}</Alert>;
        }
        return alerts;
    }
    /**
     * Returns validity of the component.
     * @return {boolean}
     */
    isValid(): boolean {
        return this.__valid;
    }

    /**
     * Focuses to the input field.
     */
    focus() {
        this.refs.innerInput.getInputDOMNode().focus();
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
            this._validations = this.props.validations;
        }
    }

    /**
     * Validates the input components and returns error messages.
     * @return { Array<string>} array of messages.
     */
    __validate(): Array<string> {
        let messages = [];
        Maps.forEach(this._validations, (validation: Function, key: string) => {
            if (!Assertions.isFunction(validation)) {
                return;
            }
            let message = null;
            if (this._validations[`${key}_args`]) {
                let inputValues = this._validations[`${key}_args`];
                inputValues.push(this.props.value);
                message = validation.apply(null, inputValues);
            } else {
                message = validation(this.props.value);
            }
            let messageKey = `${key}Message`;
            if (message !== undefined) {
                if (this._validations[messageKey] !== undefined) {
                    message = this._validations[messageKey];
                }
                messages = messages.concat(message);
            }
        });
        return messages;
    }
}
