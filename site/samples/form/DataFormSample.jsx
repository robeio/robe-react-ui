import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import DataForm from "robe-react-ui/lib/form/DataForm";
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
const ilce = {
    34: [
        {
            value: "1",
            text: "Kadıköy"
        },
        {
            value: "2",
            text: "Bakırköy"
        },
        {
            value: "3",
            text: "Ataşehir"
        }
    ],
    21: [
        {
            value: "4",
            text: "Ergani"
        },
        {
            value: "5",
            text: "Bağlar"
        },
        {
            value: "6",
            text: "Ofis"
        }
    ],
    6: [
        {
            value: "7",
            text: "Çankaya"
        },
        {
            value: "8",
            text: "Gölbaşı"
        },
        {
            value: "9",
            text: "Keçiören"
        }
    ]
};

export default class DataFormSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            propsOfFields: {
                files: {
                    remote: remote,
                    onCellRender: this.onCellRender
                },
                ilce: {
                    items: [],
                    value: undefined
                }
            } };
    }

    render(): Object {
        return (
            <div>
                <DataForm
                    header="Example Data Form Label"
                    fields={fields}
                    columnsSize={2}
                    onChange={this.onChange}
                    propsOfFields={this.state.propsOfFields}
                />
            </div>
        );
    }

    onChange(name: string, e: Object): boolean {
        if (name === "il") {
            let value = e.target.value;
            let nextState = this.cloneState();
            if (value) {
                let items = ilce[value];
                nextState.propsOfFields.ilce.items = items;
            } else {
                nextState.propsOfFields.ilce.items = [];
                nextState.propsOfFields.ilce.value = undefined;
            }
            this.setState(nextState);
            return true;
        }
        return true;
    }

}
