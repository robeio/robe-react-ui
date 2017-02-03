import React from "react";
import { FormGroup, InputGroup, ControlLabel, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactDOM from "react-dom";
import ValidationComponent from "../validation/ValidationComponent";
/**
 * BaseInput is a base component which wraps React-Bootstraps input component.
 * Does necessary validations, rendering of validation messages.
 * @export
 * @class BaseInput
 * @extends {ValidationComponent}
 */
export default class BaseInput extends ValidationComponent {
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
         * name use as input field name
         */
        name: React.PropTypes.string,
        /**
         * Value of the component
         */
        value: React.PropTypes.any,
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
        * Left Input Addon
        */
        inputGroupLeft: React.PropTypes.any,
        /**
        * Right Input Addon
        */
        inputGroupRight: React.PropTypes.any,
        /**
         * Disable input
         */
        disabled: React.PropTypes.bool,
        /**
         * it specifies that an input field is read-only
         */
        readOnly: React.PropTypes.bool,
        /**
         * it specifies that an input field is hidden or visible
         */
        hidden: React.PropTypes.bool,
        /**
         *Defines the display style of the Validation message.
         */
        validationDisplay: React.PropTypes.oneOf(["overlay", "block"])
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false,
        validationDisplay: "block"
    }

    innerComponent;

    /**
     * Max length.
     * @static
     */
    static maxTextLength = 999;
    /**
     * Creates an instance of BaseInput.
     * @param {any} props
     */
    constructor(props: Object) {
        super(props);
        this.state = {
            bsStyle: props.bsStyle ? props.bsStyle : undefined
        };
    }
    /**
     * Renders the component
     * @returns {Object}
     */
    render(): Object {
        let label = (this.props.label === undefined) ? undefined : (
            <ControlLabel>{this.props.label}</ControlLabel>
        );

        let { tooltip, inputGroupLeft, inputGroupRight, validations, validationDisplay, sort, range, ...newProps } = this.props; // eslint-disable-line no-unused-vars

        let component = (
            <FormControl
                {...newProps}
                ref={(component: Object) => { this.innerComponent = component }}
                value={this.props.value}
            />
        );

        if (inputGroupLeft !== undefined || inputGroupRight !== undefined) {
            component = (
                <InputGroup onClick={this.props.onClick}>
                    {inputGroupLeft}
                    {component}
                    {inputGroupRight}
                </InputGroup>
            );
        }
        component = (
            <FormGroup hidden={this.props.hidden} bsSize={this.props.bsSize}>
                {label}
                {component}
            </FormGroup>
        );
        return super.wrapComponent(component);
    }

    /**
     * Focuses to the input field.
     */
    focus() {
        let node = ReactDOM.findDOMNode(this.innerComponent); // eslint-disable-line
        node.focus();
    }

    /**
     * Returns true if the field is the focused field at the document
     * @returns {boolean}
            * @memberOf BaseInput
     */
    isFocused(): boolean {
        let node = ReactDOM.findDOMNode(this.innerComponent); // eslint-disable-line
        return document.activeElement === node;
    }

    setCaretPosition(index: number) {
        let node = ReactDOM.findDOMNode(this.innerComponent); // eslint-disable-line
        node.selectionStart = node.selectionEnd = index;
    }
    getCaretPosition(): number {
        let node = ReactDOM.findDOMNode(this.innerComponent); // eslint-disable-line
        return node.selectionStart;
    }

    /**
        * Fired after component mounts. Takes validations from props.
        */
    componentDidMount() {
        if (this.props.focus) {
            this.focus();
        }
    }

}
