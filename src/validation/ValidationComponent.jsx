import React from "react";
import { ShallowComponent, Maps, Assertions, Objects } from "robe-react-commons";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import InputValidations from "./InputValidations";
import "./Validation.css";

/**
 * BaseComponent for React Components which will use Validations
 */
export default class ValidationComponent extends ShallowComponent {
    static propTypes = {
        /**
         * Value of the component
         */
        value: React.PropTypes.any,
        /**
         * Validations for the component
         */
        validations: React.PropTypes.object,

        validationDisplay: React.PropTypes.oneOf(["overlay", "block"])
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
        let alerts;
        let errors = this.validate(this.props.value);
        this.__valid = (errors.length === 0);
        let messages = [];
        for (let i = 0; i < errors.length; i++) {
            messages.push(<p key={i}>{errors[i]}</p>);
        }
        if (!this.isValid()) {
            alerts = messages;
        }
        return alerts;
    }

    wrapComponent(component: Object, placement: string): Object {
        let result = this.validationResult();
        let showMsg = result !== undefined;
        let newProps = showMsg ? { validationState: "error" } : {};
        if (this.props.validationDisplay === "block") {
            let tooltip = <Alert className="input-alert" bsStyle="danger">{result}</Alert>;
            let newComponent = React.cloneElement(component,
                newProps,
                component.props.children,
                showMsg ? tooltip : <span></span>);
            return newComponent;
        } else {
            let newComponent = React.cloneElement(component, newProps);
            let tooltip = <Tooltip id="tooltip">{result}</Tooltip>;
            return (
                <OverlayTrigger
                    placement={placement || "bottom"}
                    overlay={showMsg ? tooltip : <span></span>}
                    >
                    {newComponent}
                </OverlayTrigger>
            );
        }
        // }
        return component;
    }

    /**
     * Returns validity of the component.
     * @return {boolean}
     */
    isValid(): boolean {
        return this.__valid;
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
    validate(value: any): Array<string> {
        let messages = [];
        Maps.forEach(this._validations, (validation: Function, key: string) => {
            // It must be a object
            if (!Assertions.isObject(validation)) {
                validation = {};
            }
            // If func is not given, take a function with the same key from InputValidations
            if (!validation.func) {
                validation.func = InputValidations[key];
                if (!validation.func) {
                    console.error(`Validation function is not found in the properties or InputValidations key: "${key}"`); // eslint-disable-line
                    return;
                }
            }
            let message = null;
            if (validation.args) {
                let inputValues = Objects.deepCopy(validation.args);
                inputValues.push(value);
                message = validation.func.apply(this.props, inputValues);
            } else {
                message = validation.func(value);
            }
            if (message !== undefined) {
                if (validation.message !== undefined) {
                    message = validation.message;
                }
                messages = messages.concat(message);
            }
        });
        return messages;
    }
}
