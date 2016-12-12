import InputValidations from "validation/InputValidations";

class ComponentList {

    minValue = InputValidations.minValue.bind(undefined, 2);
    maxValue = InputValidations.maxValue.bind(undefined, 3);

    getComponentList(): Array {
        let components = [];
        /* eslint-disable global-require */
        components.push({
            header: "TextInput",
            desc: "is the default input field to collect one line text data from form.",
            json: require("../components/jsons/inputs/TextInput"),
            sample: require("../components/samples/inputs/TextInputSample"),
            code: require("../components/samples/inputs/TextInputSample.txt")
        });
        components.push({
            header: "TextArea",
            desc: "is the large input field to collect multi line text data from form.",
            json: require("../components/jsons/inputs/TextArea"),
            sample: require("../components/samples/inputs/TextAreaSample"),
            code: require("../components/samples/inputs/TextAreaSample.txt")
        });
        components.push({
            header: "PasswordInput",
            desc: "is the default input field to collect password data from form.",
            json: require("../components/jsons/inputs/PasswordInput"),
            sample: require("../components/samples/inputs/PasswordInputSample"),
            code: require("../components/samples/inputs/PasswordInputSample.txt")
        });

        components.push({
            header: "DecimalInput",
            desc: "is the input field for collecting decimal data.",
            json: require("../components/jsons/inputs/DecimalInput"),
            sample: require("../components/samples/inputs/DecimalInputSample"),
            code: require("../components/samples/inputs/DecimalInputSample.txt")
        });
        components.push({
            header: "NumericInput",
            desc: "is the input field for collecting numeric data.",
            json: require("../components/jsons/inputs/NumericInput"),
            sample: require("../components/samples/inputs/NumericInputSample"),
            code: require("../components/samples/inputs/NumericInputSample.txt")
        });
        components.push({
            header: "MoneyInput",
            desc: "is the input field for collecting money data.",
            json: require("../components/jsons/inputs/MoneyInput"),
            sample: require("../components/samples/inputs/MoneyInputSample"),
            code: require("../components/samples/inputs/MoneyInputSample.txt")
        });

        components.push({
            header: "SelectInput",
            desc: "is the input field to provide selection items from given array items",
            json: require("../components/jsons/inputs/SelectInput"),
            sample: require("../components/samples/inputs/SelectInputSample"),
            code: require("../components/samples/inputs/SelectInputSample.txt")
        });

        components.push({
            header: "CheckInput",
            desc: "is the input field to provide check given item",
            json: require("../components/jsons/inputs/CheckInput"),
            sample: require("../components/samples/inputs/CheckInputSample"),
            code: require("../components/samples/inputs/CheckInputSample.txt")
        });

        components.push({
            header: "RadioInput",
            desc: "is the input field to provide check given item",
            json: require("../components/jsons/inputs/RadioInput"),
            sample: require("../components/samples/inputs/RadioInputSample"),
            code: require("../components/samples/inputs/RadioInputSample.txt")
        });

        components.push({
            header: "DateInput",
            desc: "is the input field for collecting date data.",
            json: require("../components/jsons/inputs/DateInput"),
            sample: require("../components/samples/inputs/DateInputSample"),
            code: require("../components/samples/inputs/DateInputSample.txt")
        });

        components.push({
            header: "HtmlEditor",
            desc: "is the input field for collecting html (rich text) data.",
            json: require("../components/jsons/inputs/htmleditor/HtmlEditor"),
            sample: require("../components/samples/inputs/HtmlEditorSample"),
            code: require("../components/samples/inputs/HtmlEditorSample.txt")
        });

        components.push({
            header: "FaIcon",
            desc: "is a wrapper component for font-awesome icons",
            json: require("../components/jsons/faicon/FaIcon"),
            sample: require("../components/samples/faicon/FaIconSample"),
            code: require("../components/samples/faicon/FaIconSample.txt")
        });

        components.push({
            header: "Progress",
            desc: " is an indicator component for the heavy ajax loaded sites.",
            sample: require("../components/samples/progress/ProgressSample"),
            code: require("../components/samples/progress/ProgressSample.txt"),
            json: {
                methods: [
                    { name: "start", description: "Starts the progress indicator on top of the page" },
                    { name: "done", description: "Completes the progress indicator on top of the page" },
                    { name: "configure", description: "Configure the indicator" }]
            }
        });

        components.push({
            header: "Notification",
            desc: " is a notification component with total count and popup list.",
            json: require("../components/jsons/notification/Notification.json"),
            sample: require("../components/samples/notification/NotificationSample"),
            code: require("../components/samples/notification/NotificationSample.txt")
        });

        /**
         Toast.info(message, title, timeOut, callback);
         Toast.success(message, title, timeOut, callback);
         Toast.warning(message, title, timeOut, callback);
         Toast.error(message, title, timeOut, callback);
         */
        components.push({
            header: "Toast",
            desc: " is a toast message showing utility. Helps developer to show toast messages easly and in a standardized way",
            json: {
                methods: [
                    { name: "info", description: "Toast.info(message, title, timeOut, callback)" },
                    { name: "success", description: "Toast.success(message, title, timeOut, callback)" },
                    { name: "warning", description: "Toast.warning(message, title, timeOut, callback)" },
                    { name: "error", description: "Toast.error(message, title, timeOut, callback)" }
                ]
            },
            sample: require("../components/samples/toast/ToastSample"),
            code: require("../components/samples/toast/ToastSample.txt")
        });

        components.push({
            header: "FileUploadInput",
            desc: " is a File Upload Component",
            json: require("../components/jsons/inputs/upload/FileUploadInput.json"),
            sample: require("../components/samples/inputs/FileUploadInputSample"),
            code: require("../components/samples/inputs/FileUploadInputSample.txt")
        });

        components.push({
            header: "Wizard",
            desc: " is a multipage wizard component. You can use this component to navigate user through long forms/processes step by step. It collects all data from the steps and gives you at finish stage.",
            json: require("../components/jsons/wizard/Wizard.json"),
            sample: require("../components/samples/wizard/WizardSample"),
            code: require("../components/samples/wizard/WizardSample.txt")
        });

        components.push({
            header: "CheckTree",
            desc: " is a recursive component which generates a tree of CheckInput's from the given item.",
            json: require("../components/jsons/checktree/CheckTree.json"),
            sample: require("../components/samples/checktree/CheckTreeSample"),
            code: require("../components/samples/checktree/CheckTreeSample.txt")
        });

        components.push({
            header: "SideMenu",
            desc: " is a menu component which will be placed at the righten side of viewport",
            json: require("../components/jsons/sidemenu/SideMenu.json"),
            sample: require("../components/samples/sidemenu/SideMenuSample"),
            code: require("../components/samples/sidemenu/SideMenuSample.txt")
        });

        components.push({
            header: "DataGrid",
            desc: " is a smart grid with filter, sort, search capabilities.",
            json: require("../components/jsons/datagrid/DataGrid.json"),
            sample: require("../components/samples/datagrid/DataGridSample"),
            code: require("../components/samples/datagrid/DataGridSample.txt")
        });

        components.push({
            header: "DataForm",
            desc: "is a form component which is generated from model to create or edit data.",
            json: require("../components/jsons/form/DataForm"),
            sample: require("../components/samples/form/DataFormSample"),
            code: require("../components/samples/form/DataFormSample.txt")
        });
        components.push({
            header: "ModalDataForm",
            desc: " is an modal component which opens a DataForm inside.",
            json: require("../components/jsons/form/ModalDataForm.json"),
            sample: require("../components/samples/form/ModalDataFormSample"),
            code: require("../components/samples/form/ModalDataFormSample.txt")
        });

        components.push({
            header: "StackLayout",
            desc: " is a layout component which supports list and thumbnail view.",
            json: require("../components/jsons/layouts/StackLayout.json"),
            sample: require("../components/samples/layouts/StackLayoutSample"),
            code: require("../components/samples/layouts/StackLayoutSample.txt")
        });

        components.push({
            header: "Validation",
            desc: " is a built-in utility which can be used directly or via DataForm model.",
            sample: require("../components/samples/validation/ValidationSample")
        });

        components.push({
            header: "Model (for DataForm & DataGrid)",
            desc: " is a built-in mechanism which is used by DataGrid and Dataform.",
            sample: require("../components/samples/model/ModelSample")
        });
        return components;
    }


}

export default new ComponentList();
