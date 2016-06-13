import React from "react";
import TextInput from "inputs/TextInput";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import CheckInput from "inputs/CheckInput";
import RadioInput from "inputs/RadioInput";
import SelectInput from "inputs/SelectInput";

const selectInputArray = [
    {
        key: "MALE",
        value: "Bay"
    },
    {
        key: "FEMALE",
        value: "Bayan"
    }
];

const components = [
    {
        header: "Text Input ",
        component: [
            {
                header: "Text Input ",
                component: <TextInput type="text" />
            },
            {
                header: "Default Value",
                component: <TextInput type="text" value="Default Value" />
            }
        ]
    },
    {
        header: "Check Input ",
        component: <CheckInput label="Check Input"/>
    },{
        header: "Radio Input ",
        component: <RadioInput label="Radio Input" data={["1","2","3"]}/>
    },
    {
        header: "Select Input",
        component: [
            {
                header: "default props",
                component: (
                    <SelectInput
                        data={selectInputArray}
                        dataTextField="key"
                        dataValueField="value"
                    />
                )
            },
            {
                header: "optionalLabel",
                component: (
                    <SelectInput
                        data={selectInputArray}
                        dataTextField="key"
                        dataValueField="value"
                        optionLabel="Lütfen seçim yapınız..."
                    />
                )
            }
        ]
    }
];

export default class Showcase extends ShallowComponent {

    render() {
        let componentArray = [];
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            componentArray.push(<Renderer
                header={component.header}
                component={component.component}
                />);
        }
        return (
            <div>
                {componentArray}
            </div>
        );
    }
}
