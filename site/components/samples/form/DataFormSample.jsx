import React from "react";
import { Panel } from "react-bootstrap";
import { ShallowComponent, Objects } from "robe-react-commons";
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
            propsOfFields1: {
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
            },
            propsOfFields2: {
                files: {
                    remote: remote
                },
                il: {
                    onChange: this.onCityChange2
                },
                ilce: {
                    items: [],
                    value: undefined
                }
            },
            propsOfFields3: {
                files: {
                    remote: remote
                },
                il: {
                    onChange: this.onCityChange3
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
                <Panel header="Sample 1 ">
                    <DataForm
                        ref="dataform"
                        header="Example Data Form Label"
                        fields={fields}
                        columnsSize={2}
                        propsOfFields={this.state.propsOfFields1}
                        defaultValues={this.state.defaultValues}
                        validationDisplay={"overlay"}
                    />
                </Panel>
                <Panel header="Sample 2 ">
                    <DataForm
                        ref="dataform"
                        header="Example Data Form Label"
                        fields={fields}
                        columnsSize={2}
                        propsOfFields={this.state.propsOfFields2}
                        defaultValues={this.state.defaultValues}
                    />
                </Panel>
                <Panel header="Sample 3 ">
                    <DataForm
                        ref="dataform"
                        header="Example Data Form Label"
                        fields={fields}
                        columnsSize={2}
                        propsOfFields={this.state.propsOfFields3}
                        defaultValues={this.state.defaultValues}
                    />
                </Panel>
            </div>
        );
    }

    /**
     * Returning Object of this method modifies the props of fields property of the DataForm.
     * @param e
     * @return {{ilce: {items: *, value: null}}}
     */
    onCityChange(e) {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        return {
            ilce: {
                items: ilce[value],
                value: null
            }
        };
    }


    /**
     * Given second parameter that's callback function of this method modifies the props of fields property of the DataForm.
     *
     * @param e
     * @param change
     */
    onCityChange2(e, change): boolean {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        change({
            ilce: {
                items: ilce[value],
                value: null
            }
        });
        return false;
    }

    /**
     * Changes state of this object and regenerates DataForm.
     * @param e
     */
    onCityChange3(e) {
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        let nextState = this.cloneState();
        Objects.mergeClone({
            items: ilce[value],
            value: null
        }, nextState.propsOfFields3.ilce);
        this.setState(nextState);
    }
}
