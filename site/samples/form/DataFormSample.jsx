import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DataForm from "form/DataForm";
import InputValidations from "validation/InputValidations";
import fields from "./DataFormSample.json";

export default class DataFormSample extends ShallowComponent {
    /**
     *
     * @param props
     */
    constructor(props:Object) {
        super(props);
    }

    render() {
        return (
            <div>
                <DataForm header="Example Data Form Label" fields={fields} />
            </div>
        );
    }

    onChange = () => {

    }
}
