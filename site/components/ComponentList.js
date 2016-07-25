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
            header: "PasswordInput",
            desc: "is the default input field to collect password data from form.",
            json: require("../docs/inputs/PasswordInput"),
            sample: require("../samples/inputs/PasswordInputSample"),
            code: require("../samples/inputs/PasswordInputSample.txt")
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
            desc: "is the input fields to provide selection items from given array items",
            json: require("../docs/inputs/SelectInput"),
            sample: require("../samples/inputs/SelectInputSample"),
            code: require("../samples/inputs/SelectInputSample.txt")
        });

        components.push({
            header: "CheckInput",
            desc: "is the input fields to provide check given item",
            json: require("../docs/inputs/CheckInput"),
            sample: require("../samples/inputs/CheckInputSample"),
            code: require("../samples/inputs/CheckInputSample.txt")
        });

        components.push({
            header: "RadioInput",
            desc: "is the input fields to provide check given item",
            json: require("../docs/inputs/RadioInput"),
            sample: require("../samples/inputs/RadioInputSample"),
            code: require("../samples/inputs/RadioInputSample.txt")
        });

        components.push({
            header: "DateInput",
            desc: "is the input field for collecting date data.",
            json: require("../docs/inputs/DateInput"),
            sample: require("../samples/inputs/DateInputSample"),
            code: require("../samples/inputs/DateInputSample.txt")
        });

        components.push({
            header: "HtmlEditor",
            desc: "is the input field for collecting html (rich text) data.",
            json: require("../docs/inputs/htmleditor/HtmlEditor"),
            sample: require("../samples/inputs/HtmlEditorSample"),
            code: require("../samples/inputs/HtmlEditorSample.txt")
        });



        components.push({
            header: "CheckList",
            desc: "",
            json: require("../docs/inputs/CheckList"),
            sample: require("../samples/inputs/CheckListSample"),
            code: require("../samples/inputs/CheckListSample.txt")
        });

        components.push({
            header: "FaIcon",
            desc: "is a wrapper component for font-awesome icons",
            json: require("../docs/faicon/FaIcon"),
            sample: require("../samples/faicon/FaIconSample"),
            code: require("../samples/faicon/FaIconSample.txt")
        });

        components.push({
            header: "Progress",
            desc: " is an indicator component for the heavy ajax loaded sites.",
            sample: require("../samples/progress/ProgressSample"),
            code: require("../samples/progress/ProgressSample.txt"),
            json: {
                methods: [
                    { name: "start", description: "Starts the progress indicator on top of the page" },
                    { name: "done", description: "Completes the progress indicator on top of the page" },
                    { name: "configure", description: "Configure the indicator" }]
            }
        });

        components.push({
            header: "DataForm",
            desc: "",
            json: require("../docs/form/DataForm"),
            sample: require("../samples/form/DataFormSample"),
            code: require("../samples/form/DataFormSample.txt")
        });


        return components;
    }


}

export default new ComponentList();

