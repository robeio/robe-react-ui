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
            json: require("../docs/inputs/TextInput"),
            sample: require("../samples/inputs/TextInputSample"),
            code: require("../samples/inputs/TextInputSample.txt")
        });
        components.push({
            header: "TextArea",
            desc: "is the large input field to collect multi line text data from form.",
            json: require("../docs/inputs/TextArea"),
            sample: require("../samples/inputs/TextAreaSample"),
            code: require("../samples/inputs/TextAreaSample.txt")
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
            desc: "is the input field to provide selection items from given array items",
            json: require("../docs/inputs/SelectInput"),
            sample: require("../samples/inputs/SelectInputSample"),
            code: require("../samples/inputs/SelectInputSample.txt")
        });

        components.push({
            header: "CheckInput",
            desc: "is the input field to provide check given item",
            json: require("../docs/inputs/CheckInput"),
            sample: require("../samples/inputs/CheckInputSample"),
            code: require("../samples/inputs/CheckInputSample.txt")
        });

        components.push({
            header: "RadioInput",
            desc: "is the input field to provide check given item",
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
            header: "Notification",
            desc: " is a notification component with total count and popup list.",
            json: require("../docs/notification/Notification.json"),
            sample: require("../samples/notification/NotificationSample"),
            code: require("../samples/notification/NotificationSample.txt")
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
            sample: require("../samples/toast/ToastSample"),
            code: require("../samples/toast/ToastSample.txt")
        });

        components.push({
            header: "FileUploadInput",
            desc: " is a File Upload Component",
            json: require("../docs/inputs/upload/FileUploadInput.json"),
            sample: require("../samples/inputs/FileUploadInputSample"),
            code: require("../samples/inputs/FileUploadInputSample.txt")
        });

        components.push({
            header: "Wizard",
            desc: " is a multipage wizard component. You can use this component to navigate user through long forms/processes step by step. It collects all data from the steps and gives you at finish stage.",
            json: require("../docs/wizard/Wizard.json"),
            sample: require("../samples/wizard/WizardSample"),
            code: require("../samples/wizard/WizardSample.txt")
        });

        components.push({
            header: "CheckTree",
            desc: " is a recursive component which generates a tree of CheckInput's from the given item.",
            json: require("../docs/checktree/CheckTree.json"),
            sample: require("../samples/checktree/CheckTreeSample"),
            code: require("../samples/checktree/CheckTreeSample.txt")
        });

        components.push({
            header: "SideMenu",
            desc: " is a menu component which will be placed at the righten side of viewport",
            json: require("../docs/sidemenu/SideMenu.json"),
            sample: require("../samples/sidemenu/SideMenuSample"),
            code: require("../samples/sidemenu/SideMenuSample.txt")
        });

        components.push({
            header: "DataGrid",
            desc: " is a smart grid with filter, sort, search capabilities.",
            json: require("../docs/datagrid/DataGrid.json"),
            sample: require("../samples/datagrid/DataGridSample"),
            code: require("../samples/datagrid/DataGridSample.txt")
        });

        components.push({
            header: "DataForm",
            desc: "is a form component which is generated from model to create or edit data.",
            json: require("../docs/form/DataForm"),
            sample: require("../samples/form/DataFormSample"),
            code: require("../samples/form/DataFormSample.txt")
        });
        components.push({
            header: "ModalDataForm",
            desc: " is an modal component which opens a DataForm inside.",
            json: require("../docs/form/ModalDataForm.json"),
            sample: require("../samples/form/ModalDataFormSample"),
            code: require("../samples/form/ModalDataFormSample.txt")
        });

        components.push({
            header: "StackLayout",
            desc: " is a layout component which supports list and thumbnail view.",
            json: require("../docs/layouts/StackLayout.json"),
            sample: require("../samples/layouts/StackLayoutSample"),
            code: require("../samples/layouts/StackLayoutSample.txt")
        });

        components.push({
            header: "Validation",
            desc: " is a built-in utility which can be used directly or via DataForm model.",
            sample: require("../samples/validation/ValidationSample")
        });

        components.push({
            header: "Model (for DataForm & DataGrid)",
            desc: " is a built-in mechanism which is used by DataGrid and Dataform.",
            sample: require("../samples/model/ModelSample")
        });
        return components;
    }


}

export default new ComponentList();
