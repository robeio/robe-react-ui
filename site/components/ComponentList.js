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

    getComponentList(state: Object) {
        let components = [];
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
            header: "NumericInput",
            desc: "is the input field for collecting numeric data.",
            json: require("../docs/inputs/NumericInput"),
            sample: require("../samples/inputs/NumericInputSample"),
            code: require("../samples/inputs/NumericInputSample.txt")
        });
         components.push({
            header: "MoneyInput",
            desc: "is the input field for collecting money data.",
            json: require("../docs/inputs/MoneyInput"),
            sample: require("../samples/inputs/MoneyInputSample"),
            code: require("../samples/inputs/MoneyInputSample.txt")
        });

        components.push({
            header: "SelectInput",
            desc: "is the default input field to collect one line text data from form.",
            json: require("../docs/inputs/SelectInput"),
            sample: require("../samples/inputs/SelectInputSample"),
            code: require("../samples/inputs/SelectInputSample.txt")
        });

        return components;
    }


}

export default new ComponentList();

