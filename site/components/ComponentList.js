import InputValidations from "validation/InputValidations";

class ComponentList {

    minValue = InputValidations.minValue.bind(undefined, 2);
    maxValue = InputValidations.maxValue.bind(undefined, 3);

    getList(): Array {
        let components = [];
        /* eslint-disable global-require */
        components.push({
            header: "TextInput",
            desc: "is the default input field to collect one line text data from form.",
            json: require("./jsons/inputs/TextInput"),
            sample: require("./samples/inputs/TextInputSample"),
            code: require("./samples/inputs/TextInputSample.txt")
        });
        components.push({
            header: "TextArea",
            desc: "is the large input field to collect multi line text data from form.",
            json: require("./jsons/inputs/TextArea"),
            sample: require("./samples/inputs/TextAreaSample"),
            code: require("./samples/inputs/TextAreaSample.txt")
        });
        components.push({
            header: "PasswordInput",
            desc: "is the default input field to collect password data from form.",
            json: require("./jsons/inputs/PasswordInput"),
            sample: require("./samples/inputs/PasswordInputSample"),
            code: require("./samples/inputs/PasswordInputSample.txt")
        });

        components.push({
            header: "DecimalInput",
            desc: "is the input field for collecting decimal data.",
            json: require("./jsons/inputs/DecimalInput"),
            sample: require("./samples/inputs/DecimalInputSample"),
            code: require("./samples/inputs/DecimalInputSample.txt")
        });
        components.push({
            header: "NumericInput",
            desc: "is the input field for collecting numeric data.",
            json: require("./jsons/inputs/NumericInput"),
            sample: require("./samples/inputs/NumericInputSample"),
            code: require("./samples/inputs/NumericInputSample.txt")
        });
        components.push({
            header: "MoneyInput",
            desc: "is the input field for collecting money data.",
            json: require("./jsons/inputs/MoneyInput"),
            sample: require("./samples/inputs/MoneyInputSample"),
            code: require("./samples/inputs/MoneyInputSample.txt")
        });

        components.push({
            header: "SelectInput",
            desc: "is the input field to provide selection items from given array items",
            json: require("./jsons/inputs/SelectInput"),
            sample: require("./samples/inputs/SelectInputSample"),
            code: require("./samples/inputs/SelectInputSample.txt")
        });

        components.push({
            header: "CheckInput",
            desc: "is the input field to provide check given item",
            json: require("./jsons/inputs/CheckInput"),
            sample: require("./samples/inputs/CheckInputSample"),
            code: require("./samples/inputs/CheckInputSample.txt")
        });

        components.push({
            header: "RadioInput",
            desc: "is the input field to provide check given item",
            json: require("./jsons/inputs/RadioInput"),
            sample: require("./samples/inputs/RadioInputSample"),
            code: require("./samples/inputs/RadioInputSample.txt")
        });

        components.push({
            header: "DateInput",
            desc: "is the input field for collecting date data.",
            json: require("./jsons/inputs/DateInput"),
            sample: require("./samples/inputs/DateInputSample"),
            code: require("./samples/inputs/DateInputSample.txt")
        });

        components.push({
            header: "HtmlEditor",
            desc: "is the input field for collecting html (rich text) data.",
            json: require("./jsons/inputs/htmleditor/HtmlEditor"),
            sample: require("./samples/inputs/HtmlEditorSample"),
            code: require("./samples/inputs/HtmlEditorSample.txt")
        });

        components.push({
            header: "FaIcon",
            desc: "is a wrapper component for font-awesome icons.",
            json: require("./jsons/faicon/FaIcon"),
            sample: require("./samples/faicon/FaIconSample"),
            code: require("./samples/faicon/FaIconSample.txt")
        });

        components.push({
            header: "Progress",
            desc: " is an indicator component for the heavy ajax loaded sites.",
            sample: require("./samples/progress/ProgressSample"),
            code: require("./samples/progress/ProgressSample.txt"),
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
            json: require("./jsons/notification/Notification.json"),
            sample: require("./samples/notification/NotificationSample"),
            code: require("./samples/notification/NotificationSample.txt")
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
            sample: require("./samples/toast/ToastSample"),
            code: require("./samples/toast/ToastSample.txt")
        });

        components.push({
            header: "FileUploadInput",
            desc: " is a File Upload Component",
            json: require("./jsons/inputs/upload/FileUploadInput.json"),
            sample: require("./samples/inputs/FileUploadInputSample"),
            code: require("./samples/inputs/FileUploadInputSample.txt")
        });

        components.push({
            header: "Wizard",
            desc: " is a multipage wizard component. You can use this component to navigate user through long forms/processes step by step. It collects all data from the steps and gives you at finish stage.",
            json: require("./jsons/wizard/Wizard.json"),
            sample: require("./samples/wizard/WizardSample"),
            code: require("./samples/wizard/WizardSample.txt")
        });

        components.push({
            header: "CheckTree",
            desc: " is a recursive component which generates a tree of CheckInput's from the given item.",
            json: require("./jsons/checktree/CheckTree.json"),
            sample: require("./samples/checktree/CheckTreeSample"),
            code: require("./samples/checktree/CheckTreeSample.txt")
        });

        components.push({
            header: "SideMenu",
            desc: " is a menu component which will be placed at the righten side of viewport",
            json: require("./jsons/sidemenu/SideMenu.json"),
            sample: require("./samples/sidemenu/SideMenuSample"),
            code: require("./samples/sidemenu/SideMenuSample.txt")
        });

        components.push({
            header: "DataGrid",
            desc: " is a smart grid with filter, sort, search capabilities.",
            json: require("./jsons/datagrid/DataGrid.json"),
            sample: require("./samples/datagrid/DataGridSample"),
            code: require("./samples/datagrid/DataGridSample.txt")
        });

        components.push({
            header: "DataForm",
            desc: "is a form component which is generated from model to create or edit data.",
            json: require("./jsons/form/DataForm"),
            sample: require("./samples/form/DataFormSample"),
            code: require("./samples/form/DataFormSample.txt")
        });
        components.push({
            header: "ModalDataForm",
            desc: " is an modal component which opens a DataForm inside.",
            json: require("./jsons/form/ModalDataForm.json"),
            sample: require("./samples/form/ModalDataFormSample"),
            code: require("./samples/form/ModalDataFormSample.txt")
        });

        components.push({
            header: "StackLayout",
            desc: " is a layout component which supports list and thumbnail view.",
            json: require("./jsons/layouts/StackLayout.json"),
            sample: require("./samples/layouts/StackLayoutSample"),
            code: require("./samples/layouts/StackLayoutSample.txt")
        });

        components.push({
            header: "AreaChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/AreaChart.json"),
            sample: require("./samples/charts/AreaChartSample"),
            code: require("./samples/charts/AreaChartSample.txt")
        });

        components.push({
            header: "BarChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/BarChart.json"),
            sample: require("./samples/charts/BarChartSample"),
            code: require("./samples/charts/BarChartSample.txt")
        });

        components.push({
            header: "ComposedChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/ComposedChart.json"),
            sample: require("./samples/charts/ComposedChartSample"),
            code: require("./samples/charts/ComposedChartSample.txt")
        });

        components.push({
            header: "LineChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/LineChart.json"),
            sample: require("./samples/charts/LineChartSample"),
            code: require("./samples/charts/LineChartSample.txt")
        });

        components.push({
            header: "PieChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/PieChart.json"),
            sample: require("./samples/charts/PieChartSample"),
            code: require("./samples/charts/PieChartSample.txt")
        });

        components.push({
            header: "RadarChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/RadarChart.json"),
            sample: require("./samples/charts/RadarChartSample"),
            code: require("./samples/charts/RadarChartSample.txt")
        });

        components.push({
            header: "RadialBarChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/RadialBarChart.json"),
            sample: require("./samples/charts/RadialBarChartSample"),
            code: require("./samples/charts/RadialBarChartSample.txt")
        });

        components.push({
            header: "ScatterChart",
            desc: " is a layout chart",
            // json: require("./jsons/charts/RobeScatterChart.json"),
            sample: require("./samples/charts/ScatterChartSample"),
            code: require("./samples/charts/ScatterChartSample.txt")
        });
        
        return components;
    }

}

export default new ComponentList();
