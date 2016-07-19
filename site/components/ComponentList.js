import React from "react";
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
            desc: "is the  input field for collecting one line text data.",
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

