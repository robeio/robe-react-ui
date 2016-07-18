import React from "react";
import TextInput from "inputs/TextInput";
import MoneyInput from "inputs/MoneyInput";
import CheckInput from "inputs/CheckInput";
import RadioInput from "inputs/RadioInput";
import SelectInput from "inputs/SelectInput";
import PasswordInput from "inputs/PasswordInput";
import NumericInput from "inputs/NumericInput";
import DecimalInput from "inputs/DecimalInput";
import DateInput from "inputs/DateInput";
import { CheckboxList } from "inputs/checklist";
import SelectInputSingle from "inputs/SelectInputSingle";
import SelectInputMulti from "inputs/SelectInputMulti";
import HtmlEditor from "inputs/htmleditor/HtmlEditor";
import DataForm from "form/DataForm";
import ModalDataForm from "form/ModalDataForm";
import InputValidations from "validation/InputValidations";

class ComponentList {

    minValue = InputValidations.minValue.bind(undefined, 2);
    maxValue = InputValidations.maxValue.bind(undefined, 3);

    getComponentList(state: Object, onChange: Function) {
        let components = [];
        /* ******************
         * Text Input    *
         * ******************/

        components.push({
            header: "TextInput",
            desc: "is the default input field to collect one line text data from form.",
            alternatives: [
                {
                    header: "TextInput",
                    component: <TextInput
                        label="TextInput"
                        value={state["TextInputNormal"]}
                        onChange={onChange.bind(undefined, "TextInputNormal") }
                        />
                }, {
                    header: "With Default Value",
                    component: <TextInput
                        label="With Default Value"
                        value="Default Value"
                        />
                },
                {
                    header: "With Validations",
                    component: <TextInput
                        label="With Validations"
                        value={state.TextFieldValidations}
                        onChange={onChange.bind(undefined, "TextFieldValidations")}
                        validations={{
                            required: InputValidations.required,
                        }}
                    />
                }]
        });

        // /* ******************
        //  * Decimal Input    *
        //  * ******************/
        components.push({
            header: "Decimal Input",
            alternatives: [{
                header: "DecimalInput",
                component: <DecimalInput
                    label="Decimal Input"
                    value={state[components.length]}
                    onChange={onChange.bind(undefined, components.length) }
                    validations={{
                        required: InputValidations.required,
                        minValue: this.minValue,
                        maxValue: this.maxValue

                    }}/>
            }]
        });

        // /* ******************
        //  * Decimal Input    *
        //  * ******************/
        components.push({
            header: "Numeric Input",
            alternatives: [{
                header: "NumericInput",
                component: <NumericInput label="Numeric Input" />
            }]
        });


        return components;
    }


}

export default new ComponentList();

