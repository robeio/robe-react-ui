import React from "react";
import ValidationComponent from "../validation/ValidationComponent";
import FormGroup from "react-bootstrap/lib/FormGroup";
import InputGroup from "react-bootstrap/lib/InputGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
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
         * Value of the component
         */
        value: React.PropTypes.string,
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
        if (this.props.inputGroupLeft !== undefined || this.props.inputGroupRight !== undefined) {
            return (
                <FormGroup hidden={this.props.hidden}>
                    <ControlLabel> {this.props.label} </ControlLabel>
                    <InputGroup>
                        {this.props.inputGroupLeft}
                        <FormControl
                            {...this.props}
                            bsStyle="error"
                            ref="innerInput"
                            value={this.props.value}
                        />
                        {this.props.inputGroupRight}
                    </InputGroup>
                    {super.validationResult()}
                </FormGroup>
            );
        }
        return (
            <FormGroup hidden={this.props.hidden}>
                <ControlLabel> {this.props.label} </ControlLabel>
                <FormControl
                    {...this.props}
                    bsStyle="error"
                    ref="innerInput"
                    value={this.props.value}
                />
                {super.validationResult()}
            </FormGroup>
        );
    }

    /**
     * Fired after component mounts. Sets focus from props.
     */
    componentWillMount() {
        super.componentWillMount();
        /* eslint-disable no-underscore-dangle */
        if (this._validations && typeof this.props.value === "string" && !this._validations.maxLength) {
            this._validations.maxLength = InputValidations.maxLength.bind(this, BaseInput.maxTextLength);
        }
    }
}
