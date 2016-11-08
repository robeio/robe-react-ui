import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DataForm from "robe-react-ui/lib/form/DataForm";
import InputValidations from "robe-react-ui/lib/validation/InputValidations";
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

export default class DataFormSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    constructor(props: Object) {
        super(props);
    }

    render() {
        return (
            <div>
                <DataForm
                    header="Example Data Form Label"
                    fields={fields}
                    propsOfFields={{
                        files: {
                            remote: remote,
                            onCellRender: this.onCellRender
                        }
                    }}
                    />
            </div>
        );
    }

}
