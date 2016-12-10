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
            defaultValues: {
                age: 2
            },
            propsOfFields: {
                files: {
                    remote: remote
                },
                il: {
                    onChange: this.onCityChange
                },
                ilce: {
                    items: [],
                    value: undefined
                }
            }
        };
    }

    render(): Object {
        return (
            <div>
                <DataForm
                    ref="dataform"
                    header="Example Data Form Label"
                    fields={fields}
                    columnsSize={2}
                    propsOfFields={this.state.propsOfFields}
                    defaultValues={this.state.defaultValues}
                />
            </div>
        );
    }

    onCityChange(e) {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        return {
            ilce: {
                items: ilce[value],
                value: null
            }
        };
    }
}
