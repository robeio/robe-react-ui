import React from "react";
import TextInput from "inputs/TextInput";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Renderer from "./Renderer";
import CheckInput from "inputs/CheckInput";
import RadioInput from "inputs/RadioInput";
import SelectInput from "inputs/SelectInput";
import PasswordInput from "inputs/PasswordInput";
import NumericInput from "inputs/NumericInput";
import DecimalInput from "inputs/DecimalInput";
import DateInput from "inputs/DateInput";

const components = [];

/* ******************
 * Text Input    *
 * ******************/

components.push({
    header: "Text Input",
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
});

/* ******************
 * Check Input    *
 * ******************/
components.push({
    header: "Check Input",
    component: <CheckInput label="Check Input" />
});

/* ******************
 * Decimal Input    *
 * ******************/
components.push({
    header: "Decimal Input ",
    component: <DecimalInput label="Decimal Input" />
});

/* ******************
 * Decimal Input    *
 * ******************/
components.push({
    header: "Numeric Input ",
    component: <NumericInput label="Numeric Input" />
});


/* ******************
 * Decimal Input    *
 * ******************/
components.push({
    header: "Password Input ",
    component: <PasswordInput label="Password Input" />
});

/* ******************
 * Radio Input    *
 * ******************/

components.push({
    header: "Radio Input ",
    component: <RadioInput label="Radio Input" data={["1", "2", "3"]} />
});


/* ******************
 * Select Input    *
 * ******************/
const selectInputArray = [
    {
        key: "MALE",
        value: "Bay"
    }
];

components.push({
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
});

/* *************
 * Date Input
 * *************/

components.push({
    header: "Select Input",
    component: [
        {
            header: "Date Input ",
            component:
                <DateInput
                    label="Date"
                    ref=""
                />
        },
        {
            header: "Date Input ",
            component:
                <DateInput
                    label="Date"
                    ref=""
                    value={new Date().getTime()}
                />
        }
    ]
});


export default class Showcase extends ShallowComponent {

    render() {
        let componentArray = [];
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            componentArray.push(
                <Renderer
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
