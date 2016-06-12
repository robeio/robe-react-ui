import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import DataForm from "form/DataForm";
import Alert from "react-bootstrap/lib/Alert";

export default class ModalDataForm extends ShallowComponent {

    static propTypes = {
        title: React.PropTypes.string,
        model: React.PropTypes.array,
        resources: React.PropTypes.object,
        onCancel: React.PropTypes.func,
        cancelButtonText: React.PropTypes.string,
        submitButtonText: React.PropTypes.string,
        titleText: React.PropTypes.string,
        showCancelButton: React.PropTypes.bool,
        showSaveButton: React.PropTypes.bool
    };

    static defaultProps = {
        titleText: "Detay",
        invalidText: ["Lütfen zorunlu alanların eksiksiz doldurulduğundan emin olunuz."],
        cancelButtonText: "İptal",
        submitButtonText: "Kaydet",
        showCancelButton: true,
        showSaveButton: true
    };

    doNotSubmit = false;


    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            show: this.props.show,
            invalidText: this.props.invalidText
        };
    }
    render() {
        return (
            <Modal show={this.state.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.titleText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataForm
                        ref="dataform"
                        model={this.props.model}
                        resources={this.props.resources}
                        data={this.state.formData}
                        onSubmit={this.__onSubmit}
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

        let valid = this.refs.dataform.isValid();
        if (!valid) {
            this.setState({
                valid: false,
                invalidText: this.props.invalidText
            });
            return;
        }

        if (this.props.onSave && valid === true) {
            this.props.onSave(this.state.formData, this.refs.dataform.state, this.__onComplete);
        }
    };

    __onComplete = (message) => {
        if (this.doNotSubmit === true) {
            this.doNotSubmit = false;
        }

        if (message === true) { // that me no error that is ok
            this.setState({
                showModal: false
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

}
