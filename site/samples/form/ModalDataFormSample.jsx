import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import ModalDataForm from "form/ModalDataForm";
import { Button, Modal  } from "react-bootstrap";
import fields from "./DataFormSample.json";

export default class ModalDataFormSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    constructor(props:Object) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        return (
            <div>
                <ModalDataForm
                    ref="detailModal"
                    header="Modal Data Form"
                    show={this.state.show}
                    onSubmit={this.__onSubmit}
                    onCancel={this.toggle}
                    fields={fields}
                />
                <Button onClick={this.toggle}>Show Modal</Button>
            </div>
        );
    }

    __onSubmit = (item, handlerComplete) => {
        console.log(item)
        handlerComplete(true);
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }
}
