import React from "react";
import MoneyInput from "inputs/MoneyInput";
import CheckInput from "inputs/CheckInput";
import RadioInput from "inputs/RadioInput";
import PasswordInput from "inputs/PasswordInput";
import NumericInput from "inputs/NumericInput";
import DecimalInput from "inputs/DecimalInput";
import DateInput from "inputs/DateInput";
import { CheckboxList } from "inputs/checklist";
import SelectInput from "inputs/SelectInput";
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
            json: require("../docs/inputs/TextInput"),
            sample: require("../samples/inputs/TextInputSample"),
            code: require("../samples/inputs/TextInputSample.txt")
        });

        components.push({
            header: "DecimalInput",
            desc: "is the input field for collecting decimal data.",
            json: require("../docs/inputs/DecimalInput"),
            sample: require("../samples/inputs/DecimalInputSample"),
            code: require("../samples/inputs/DecimalInputSample.txt")
        });

        components.push({
            header: "SelectInput",
            desc: "is the default input field to collect one line text data from form.",
            json: require("../docs/inputs/SelectInput"),
            sample: require("../samples/inputs/SelectInputSample"),
            code: require("../samples/inputs/SelectInputSample.txt")
        });

        //     alternatives: [{
        //         header: "DecimalInput",
        //         component: <DecimalInput
        //             label="Decimal Input"
        //             value={state[components.length]}
        //             onChange={onChange.bind(undefined, components.length) }
        //             validations={{
        //                 required: InputValidations.required,
        //                 minValue: this.minValue,
        //                 maxValue: this.maxValue

        //             }}/>
        //     }]
        // });

        // // /* ******************
        // //  * Decimal Input    *
        // //  * ******************/
        // components.push({
        //     header: "Numeric Input",
        //     json: require("../docs/inputs/NumericInput"),
        //     alternatives: [{
        //         header: "NumericInput",
        //         component: <NumericInput label="Numeric Input" />
        //     }]
        // });


        return components;
    }


}

export default new ComponentList();

