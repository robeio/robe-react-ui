import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import ModalDataForm from "robe-react-ui/lib/form/ModalDataForm";
import { Button } from "react-bootstrap";
import fields from "./DataFormSample.json";

const filesUrl = "http://localhost:3000/files";

const remote = {
    url: filesUrl,
    upload: {
        type: "PUT"
    },
    info: {
        type: "POST"
    },
    delete: {
        type: "DELETE"
    }
};

export default class ModalDataFormSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    constructor(props: Object) {
        super(props);
        this.state = {
            show: false
        };
    }

    render(): Object {
        return (
            <div>
                <ModalDataForm
                    ref="detailModal"
                    header="Modal Data Form"
                    show={this.state.show}
                    onSubmit={this.__onSubmit}
                    onCancel={this.toggle}
                    fields={fields}
                    propsOfFields={{
                        files: {
                            remote: remote
                        }
                    }}
                    validationDisplay={"overlay"}

                    />
                <Button onClick={this.toggle}>Show Modal</Button>
            </div>
        );
    }

    __onSubmit = (item, handlerComplete) => {
        handlerComplete(true);
    }

    toggle = () => {
        this.setState({
            show: !this.state.show
        });
    }
}
