import React from "react";
import { FormGroup, InputGroup, ControlLabel, FormControl } from "react-bootstrap";
import ReactDOM from "react-dom";
import ValidationComponent from "../validation/ValidationComponent";
import InputValidations from "../validation/InputValidations";

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
         * Component class of the BaseInput. (select, textarea)
         */
        inputGroupLeft: React.PropTypes.object,
        /**
         * Component class of the BaseInput. (select, textarea)
         */
        inputGroupRight: React.PropTypes.object,
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
        hidden: React.PropTypes.bool
    };

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        disabled: false,
        readOnly: false,
        hidden: false
    };


    static isFocusedToInput = false;

    static refName = "innerInput";

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
            bsStyle: this.props.bsStyle ? this.props.bsStyle : undefined
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
        let validationResult = super.validationResult();
        let validationState = validationResult !== undefined ? "error" : undefined;
        validationResult = this.isFocusedToInput ? validationResult : undefined;
        if (this.props.inputGroupLeft !== undefined || this.props.inputGroupRight !== undefined) {
            let { tooltip, inputGroupLeft, inputGroupRight, validations, ...newProps } = this.props; // eslint-disable-line no-unused-vars
            return (
                <FormGroup hidden={this.props.hidden} validationState={validationState}>
                    {label}
                    <InputGroup>
                        {this.props.inputGroupLeft}
                        <FormControl
                            {...newProps}
                            ref={BaseInput.refName}
                            value={this.props.value}
                        />
                        {this.props.inputGroupRight}
                    </InputGroup>
                    {validationResult}
                </FormGroup>
            );
        }
        let { tooltip, validations, ...newProps } = this.props; // eslint-disable-line no-unused-vars

        return (
            <FormGroup hidden={this.props.hidden} validationState={validationState}>
                {label}
                <FormControl
                    {...newProps}
                    ref={BaseInput.refName}
                    value={this.props.value}
                />
                {validationResult}
            </FormGroup>
        );
    }

    /**
     * Focuses to the input field.
     */
    focus() {
        let node = ReactDOM.findDOMNode(this.refs.innerInput); // eslint-disable-line
        node.focus();
    }

    /**
     * Returns true if the field is the focused field at the document
     * @returns {boolean}
     * @memberOf BaseInput
     */
    isFocused(): boolean {
        let node = ReactDOM.findDOMNode(this.refs.innerInput); // eslint-disable-line
        return document.activeElement === node;
    }

    setCaretPosition(index: number) {
        let node = ReactDOM.findDOMNode(this.refs.innerInput); // eslint-disable-line
        node.selectionStart = node.selectionEnd = index;
    }
    getCaretPosition(): number {
        let node = ReactDOM.findDOMNode(this.refs.innerInput); // eslint-disable-line
        return node.selectionStart;
    }

    /**
        * Fired after component mounts. Takes validations from props.
        */
    componentDidMount() {
        if (this.props.focus) {
            this.focus();
            this.isFocusedToInput = true;
        }
    }

    componentDidUpdate() {
        this.isFocusedToInput = this.isFocused();
    }
}
