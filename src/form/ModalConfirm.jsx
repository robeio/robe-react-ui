import React from "react";
import {
    ShallowComponent,
    Application
} from "robe-react-commons";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

export default class ModalConfirm extends ShallowComponent {

    static propTypes = {
        onOkClick: React.PropTypes.func,
        onCancelClick: React.PropTypes.func,
        header: React.PropTypes.string,
        message: React.PropTypes.string,
        show: React.PropTypes.bool,
        ok: React.PropTypes.string,
        cancel: React.PropTypes.string,
    };


    static defaultProps = {
        ok: Application.i18n(ModalConfirm, "form.ModalConfirm", "ok"),
        cancel: Application.i18n(ModalConfirm, "form.ModalConfirm", "cancel"),
    };

    render(): Object {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancelClick}>{this.props.cancel}</Button>
                    <Button bsStyle="danger" onClick={this.props.onOkClick}>{this.props.ok}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
