import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";

class ModalConfirm extends ShallowComponent {

    static propTypes = {
        onOkClick: React.PropTypes.func,
        onCancelClick: React.PropTypes.func,
        header: React.PropTypes.string,
        message: React.PropTypes.string,
        show: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancelClick}>İptal</Button>
                    <Button bsStyle="danger" onClick={this.props.onOkClick}>Evet</Button>
                </Modal.Footer>
            </Modal>
        );

    };

}

module.exports = ModalConfirm;