import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import DataForm from "./DataForm";
import Alert from "react-bootstrap/lib/Alert";

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
        item: React.PropTypes.object,
        /**
         * Holds field properties like `code`, `label`, `type`, `visible`, `editable`, `readable`, `label`
         */
        fields: React.PropTypes.array.isRequired,
        /**
         * Holds Component props and component if need.
         */
        show: React.PropTypes.boolean,
        props: React.PropTypes.object,
        onSubmit: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func,
        cancelButtonText: React.PropTypes.string,
        submitButtonText: React.PropTypes.string,
        showCancelButton: React.PropTypes.bool,
        showSaveButton: React.PropTypes.bool
    }

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        show: false,
        header: "Detay",
        invalidText: ["Lütfen zorunlu alanların eksiksiz doldurulduğundan emin olunuz."],
        cancelButtonText: "İptal",
        submitButtonText: "Kaydet",
        showCancelButton: true,
        showSaveButton: true,

    };

    doNotSubmit = false;

    constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);
    }
    render() {
        return (
            <Modal show={this.state.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataForm
                        ref="dataform"
                        fields={this.props.fields}
                        props={this.props.props}
                        item={this.props.item}
                        onSubmit={this.__submitForm}
                    />
                    {this.__renderWarning()}
                </Modal.Body>
                {this.__renderFooterButtons()}
            </Modal>
        );
    }


    __renderFooterButtons = () => {
        let showCancelButton = ((this.props.showCancelButton) ?
            <Button onClick={this.props.onCancel}>{this.props.cancelButtonText}</Button> : null);
        let showSaveButton = ((this.props.showSaveButton) ?
            <Button bsStyle="primary" onClick={this.__submitForm}>{this.props.submitButtonText}</Button> : null);

        return (
            <Modal.Footer>
                {showCancelButton}
                {showSaveButton}
            </Modal.Footer>
        );
    };

    __renderWarning = () => {
        if (this.state.valid) {
            return null;
        }

        let errors = [];

        for (let i = 0; i < this.state.invalidText.length; i++) {
            let error = this.state.invalidText[i];
            errors.push(<p key={i}>{error}</p>);
        }
        return (<Alert bsStyle="danger" className="input-alert">{errors}</Alert>);
    };

    // __submitForm = (e) => {
    __submitForm = () => {
        if (this.doNotSubmit === true) {
            console.warn("Bypassing second submit", this.doNotSubmit);
            return;
        }
        this.doNotSubmit = true;

        let item = this.refs.dataform.submit();
        if (item && this.props.onSubmit) {
            this.props.onSubmit(item, this.__onComplete);
        } else {
            this.setState({
                valid: false,
                invalidText: this.props.invalidText
            });
            this.doNotSubmit = false;
        }
    };

    __onComplete = (message) => {
        if (this.doNotSubmit === true) {
            this.doNotSubmit = false;
        }

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
                invalidText: message
            });
        }
    }

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        this.state = {
            valid: true,
            show: nextProps.show,
            invalidText: nextProps.invalidText
        };
    }

}
