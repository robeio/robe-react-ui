import React from "react";
import {
    ShallowComponent,
    Application
} from "robe-react-commons";
import {
    Modal,
    Alert
} from "react-bootstrap";
import Button from "../buttons/Button";
import DataForm from "./DataForm";


export default class ModalDataForm extends ShallowComponent {

    /**
     * propTypes
     * @static
     */
    static propTypes = {
        /**
         * Style map for the component.
         */
        style: React.PropTypes.object,
        /**
         * Header for the form control.
         */
        header: React.PropTypes.string,
        /**
         * Hold data in a map
         */
        defaulValues: React.PropTypes.object,
        /**
         * Holds field properties like `name`, `label`, `type`, `visible`, `editable`, `readable`, `label`
         */
        fields: React.PropTypes.array.isRequired,
        /**
         * Holds extra props of components if need.
         */
        propsOfFields: React.PropTypes.object,
        /**
         * Holds Component props and component if need.
         */
        show: React.PropTypes.bool,
        onSubmit: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func,
        cancel: React.PropTypes.string,
        ok: React.PropTypes.string,
        showCancelButton: React.PropTypes.bool,
        showSaveButton: React.PropTypes.bool,
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
        show: false,
        header: Application.i18n(ModalDataForm, "form.ModalDataForm", "header"),
        invalidField: Application.i18n(ModalDataForm, "form.ModalDataForm", "invalidField"),
        cancel: Application.i18n(ModalDataForm, "form.ModalDataForm", "cancel"),
        ok: Application.i18n(ModalDataForm, "form.ModalDataForm", "ok"),
        showCancelButton: true,
        showSaveButton: true,
        validationDisplay: "block"
    };

    __dataFormComponent;
    __submitButtonComponent;

    constructor(props: Object) {
        super(props);
        this.componentWillReceiveProps(props);
    }
    render(): Object {
        return (
            <Modal show={this.state.show} onHide={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataForm
                        ref={(component: Object) => { this.__dataFormComponent = component; } }
                        fields={this.props.fields}
                        propsOfFields={this.props.propsOfFields}
                        defaultValues={this.props.defaultValues}
                        onSubmit={this.__submitForm}
                        validationDisplay={this.props.validationDisplay}
                        />
                    {this.__renderWarning()}
                </Modal.Body>
                {this.__renderFooterButtons()}
            </Modal>
        );
    }


    __renderFooterButtons = (): Modal.Footer => {
        let showCancelButton = ((this.props.showCancelButton) ?
            <Button onClick={this.props.onCancel}>{this.props.cancel}</Button> : null);
        let showSaveButton = ((this.props.showSaveButton) ?
            <Button bsStyle="primary" ref={(component: Object) => { this.__submitButtonComponent = component; } } onClickAsync={this.__submitForm}>{this.props.ok}</Button> : null);

        return (
            <Modal.Footer>
                {showCancelButton}
                {showSaveButton}
            </Modal.Footer>
        );
    };

    __renderWarning = (): Alert => {
        if (this.state.valid) {
            return null;
        }

        let errors = [];

        if (Array.isArray(this.state.invalidField)) {
            for (let i = 0; i < this.state.invalidField.length; i++) {
                let error = this.state.invalidField[i];
                errors.push(<p key={i}>{error}</p>);
            }
        }
        else errors.push(<p key="invalidField">{this.state.invalidField}</p>);

        return (<Alert bsStyle="danger" className="input-alert">{errors}</Alert>);
    };

    __submitForm() {
        let item = this.__dataFormComponent.submit();
        if (item && this.props.onSubmit) {
            this.props.onSubmit(item, this.__onComplete);
        } else {
            this.setState({
                valid: false,
                invalidField: this.props.invalidField
            });
            this.__done();
        }
    }
    __onComplete(message: Object) {
        if (message === true) { // that me no error that is ok
            this.setState({
                show: false
            });
        } else {
            if (!Array.isArray(message)) {
                message = [message];
            }
            this.setState({
                valid: false,
                invalidField: message
            });
        }
        this.__done();
    }

    __done() {
        if (this.__submitButtonComponent) {
            this.__submitButtonComponent.done();
        }
    }

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps: Object) {
        this.state = {
            valid: true,
            show: nextProps.show,
            invalidField: nextProps.invalidField
        };
    }

}
