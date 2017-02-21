import {Application} from "robe-react-commons";
import InputValidations from "validation/InputValidations";

class ComponentList {

    minValue = InputValidations.minValue.bind(undefined, 2);
    maxValue = InputValidations.maxValue.bind(undefined, 3);

    getList(): Array {
        let components = {functional: [], layout: [], inputs: [], charts: [], extras: []};

        /* eslint-disable global-require */

        components.functional.push({
            header: "Button",
            desc: Application.i18n(ComponentList, "components.ComponentList", "button"),
            json: require("./jsons/buttons/Button.json"),
            sample: require("./samples/buttons/ButtonSample"),
            code: require("./samples/buttons/ButtonSample.txt")
        });

        components.functional.push({
            header: "CheckTree",
            desc: Application.i18n(ComponentList, "components.ComponentList", "checkTreeDesc"),
            json: require("./jsons/checktree/CheckTree.json"),
            sample: require("./samples/checktree/CheckTreeSample"),
            code: require("./samples/checktree/CheckTreeSample.txt")
        });

        components.functional.push({
            header: "DataGrid",
            desc: Application.i18n(ComponentList, "components.ComponentList", "dataGridDesc"),
            json: require("./jsons/datagrid/DataGrid.json"),
            sample: require("./samples/datagrid/DataGridSample"),
            code: require("./samples/datagrid/DataGridSample.txt")
        });

        components.functional.push({
            header: "DataForm",
            desc: Application.i18n(ComponentList, "components.ComponentList", "dataFormDesc"),
            json: require("./jsons/form/DataForm"),
            sample: require("./samples/form/DataFormSample"),
            code: require("./samples/form/DataFormSample.txt")
        });

        components.functional.push({
            header: "DataFilter",
            desc: Application.i18n(ComponentList, "components.ComponentList", "dataFilterDesc"),
            json: require("./jsons/datafilter/DataFilter.json"),
            sample: require("./samples/datafilter/DataFilterSample"),
            code: require("./samples/datafilter/DataFilterSample.txt")
        });

        components.functional.push({
            header: "ModalDataForm",
            desc: Application.i18n(ComponentList, "components.ComponentList", "modalDataFormDesc"),
            json: require("./jsons/form/ModalDataForm.json"),
            sample: require("./samples/form/ModalDataFormSample"),
            code: require("./samples/form/ModalDataFormSample.txt")
        });

        components.functional.push({
            header: "Notification",
            desc: Application.i18n(ComponentList, "components.ComponentList", "notificationDesc"),
            json: require("./jsons/notification/Notification.json"),
            sample: require("./samples/notification/NotificationSample"),
            code: require("./samples/notification/NotificationSample.txt")
        });

        components.functional.push({
            header: "Rating",
            desc: Application.i18n(ComponentList, "components.ComponentList", "ratingDesc"),
            json: require("./jsons/rating/Rating"),
            sample: require("./samples/rating/RatingSample"),
            code: require("./samples/rating/RatingSample.txt")
        });

        components.functional.push({
            header: "Slider",
            desc: Application.i18n(ComponentList, "components.ComponentList", "sliderDesc"),
            json: require("./jsons/slider/Slider"),
            sample: require("./samples/slider/SliderSample"),
            code: require("./samples/slider/SliderSample.txt")
        });

        components.functional.push({
            header: "Toast",
            desc: Application.i18n(ComponentList, "components.ComponentList", "toastDesc"),
            sample: require("./samples/toast/ToastSample"),
            json: require("./jsons/toast/Toast.json"),
            code: require("./samples/toast/ToastSample.txt")
        });

        components.layout.push({
            header: "DragDropLayout",
            desc: Application.i18n(ComponentList, "components.ComponentList", "dragDropLayoutDesc"),
            json: require("./jsons/layouts/DragDropLayout.json"),
            sample: require("./samples/layouts/DragDropLayoutSample"),
            code: require("./samples/layouts/DragDropLayoutSample.txt")
        });

        components.layout.push({
            header: "LazyImage",
            desc: Application.i18n(ComponentList, "components.ComponentList", "lazyImageDesc"),
            json: require("./jsons/image/LazyImage"),
            sample: require("./samples/image/LazyImageSample"),
            code: require("./samples/image/LazyImageSample.txt")
        });

        components.layout.push({
            header: "Progress",
            desc: Application.i18n(ComponentList, "components.ComponentList", "progressDesc"),
            sample: require("./samples/progress/ProgressSample"),
            code: require("./samples/progress/ProgressSample.txt"),
            json: {
                methods: [
                    { name: "start", description: Application.i18n(ComponentList, "components.ComponentList", "progressSubStartDesc") },
                    { name: "done", description: Application.i18n(ComponentList, "components.ComponentList", "progressSubCompleteDesc") },
                    { name: "configure", description: Application.i18n(ComponentList, "components.ComponentList", "progressSubConfigureDesc") }]
            }
        });

        components.layout.push({
            header: "ProgressBar",
            desc: Application.i18n(ComponentList, "components.ComponentList", "progressBarDesc"),
            json: require("./jsons/progress/ProgressBar.json"),
            sample: require("./samples/progress/ProgressBarSample"),
            code: require("./samples/progress/ProgressBarSample.txt")
        });

        components.layout.push({
            header: "SideMenu",
            desc: Application.i18n(ComponentList, "components.ComponentList", "sideMenuDesc"),
            json: require("./jsons/sidemenu/SideMenu.json"),
            sample: require("./samples/sidemenu/SideMenuSample"),
            code: require("./samples/sidemenu/SideMenuSample.txt")
        });

        components.layout.push({
            header: "SidePanel",
            desc: Application.i18n(ComponentList, "components.ComponentList", "sidePanelDesc"),
            json: require("./jsons/sidepanel/SidePanel.json"),
            sample: require("./samples/sidepanel/SidePanelSample"),
            code: require("./samples/sidepanel/SidePanelSample.txt")
        });

        components.layout.push({
            header: "StackLayout",
            desc: Application.i18n(ComponentList, "components.ComponentList", "stackLayoutDesc"),
            json: require("./jsons/layouts/StackLayout.json"),
            sample: require("./samples/layouts/StackLayoutSample"),
            code: require("./samples/layouts/StackLayoutSample.txt")
        });

        components.layout.push({
            header: "Wizard",
            desc: Application.i18n(ComponentList, "components.ComponentList", "wizardDesc"),
            json: require("./jsons/wizard/Wizard.json"),
            sample: require("./samples/wizard/WizardSample"),
            code: require("./samples/wizard/WizardSample.txt")
        });

        components.inputs.push({
            header: "CheckInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "checkInputDesc"),
            json: require("./jsons/inputs/CheckInput"),
            sample: require("./samples/inputs/CheckInputSample"),
            code: require("./samples/inputs/CheckInputSample.txt")
        });

        components.inputs.push({
            header: "DateInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "dateInputDesc"),
            json: require("./jsons/inputs/DateInput"),
            sample: require("./samples/inputs/DateInputSample"),
            code: require("./samples/inputs/DateInputSample.txt")
        });

        components.inputs.push({
            header: "DecimalInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "decimalInputDesc"),
            json: require("./jsons/inputs/DecimalInput"),
            sample: require("./samples/inputs/DecimalInputSample"),
            code: require("./samples/inputs/DecimalInputSample.txt")
        });

        components.inputs.push({
            header: "FileUploadInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "fileUploadInputDesc"),
            json: require("./jsons/inputs/upload/FileUploadInput.json"),
            sample: require("./samples/inputs/FileUploadInputSample"),
            code: require("./samples/inputs/FileUploadInputSample.txt")
        });

        components.inputs.push({
            header: "HtmlEditor",
            desc: Application.i18n(ComponentList, "components.ComponentList", "htmlEditorDesc"),
            json: require("./jsons/inputs/htmleditor/HtmlEditor"),
            sample: require("./samples/inputs/HtmlEditorSample"),
            code: require("./samples/inputs/HtmlEditorSample.txt")
        });

        components.inputs.push({
            header: "MoneyInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "moneyInputDesc"),
            json: require("./jsons/inputs/MoneyInput"),
            sample: require("./samples/inputs/MoneyInputSample"),
            code: require("./samples/inputs/MoneyInputSample.txt")
        });

        components.inputs.push({
            header: "NumericInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "numericInputDesc"),
            json: require("./jsons/inputs/NumericInput"),
            sample: require("./samples/inputs/NumericInputSample"),
            code: require("./samples/inputs/NumericInputSample.txt")
        });

        components.inputs.push({
            header: "PasswordInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "passwordInputDesc"),
            json: require("./jsons/inputs/PasswordInput"),
            sample: require("./samples/inputs/PasswordInputSample"),
            code: require("./samples/inputs/PasswordInputSample.txt")
        });

        components.inputs.push({
            header: "RadioInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "radioInputDesc"),
            json: require("./jsons/inputs/RadioInput"),
            sample: require("./samples/inputs/RadioInputSample"),
            code: require("./samples/inputs/RadioInputSample.txt")
        });

        components.inputs.push({
            header: "SelectInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "selectInputDesc"),
            json: require("./jsons/inputs/SelectInput"),
            sample: require("./samples/inputs/SelectInputSample"),
            code: require("./samples/inputs/SelectInputSample.txt")
        });

        components.inputs.push({
            header: "TextArea",
            desc: Application.i18n(ComponentList, "components.ComponentList", "textAreaDesc"),
            json: require("./jsons/inputs/TextArea"),
            sample: require("./samples/inputs/TextAreaSample"),
            code: require("./samples/inputs/TextAreaSample.txt")
        });

        components.inputs.push({
            header: "TextInput",
            desc: Application.i18n(ComponentList, "components.ComponentList", "textInputDesc"),
            json: require("./jsons/inputs/TextInput"),
            sample: require("./samples/inputs/TextInputSample"),
            code: require("./samples/inputs/TextInputSample.txt")
        });

        components.charts.push({
            header: "AreaChart",
            desc: Application.i18n(ComponentList, "components.ComponentList", "areaChartDesc"),
            json: require("./jsons/charts/AreaChart.json"),
            sample: require("./samples/charts/AreaChartSample"),
            code: require("./samples/charts/AreaChartSample.txt")
        });

        components.charts.push({
            header: "BarChart",
            desc: Application.i18n(ComponentList, "components.ComponentList", "barChartDesc"),
            json: require("./jsons/charts/BarChart.json"),
            sample: require("./samples/charts/BarChartSample"),
            code: require("./samples/charts/BarChartSample.txt")
        });

        components.charts.push({
            header: "LineChart",
            desc: Application.i18n(ComponentList, "components.ComponentList", "lineChartDesc"),
            json: require("./jsons/charts/LineChart.json"),
            sample: require("./samples/charts/LineChartSample"),
            code: require("./samples/charts/LineChartSample.txt")
        });

        components.charts.push({
            header: "PieChart",
            desc: Application.i18n(ComponentList, "components.ComponentList", "pieChartDesc"),
            json: require("./jsons/charts/PieChart.json"),
            sample: require("./samples/charts/PieChartSample"),
            code: require("./samples/charts/PieChartSample.txt")
        });

        components.charts.push({
            header: "ScatterChart",
            desc: Application.i18n(ComponentList, "components.ComponentList", "scatterChartDesc"),
            json: require("./jsons/charts/ScatterChart.json"),
            sample: require("./samples/charts/ScatterChartSample"),
            code: require("./samples/charts/ScatterChartSample.txt")
        });

        components.extras.push({
            header: "Countdown",
            desc: Application.i18n(ComponentList, "components.ComponentList", "countDownDesc"),
            sample: require("./samples/countdown/CountdownSample"),
            code: require("./samples/countdown/CountdownSample.txt"),
            json: require("./jsons/countdown/Countdown"),

        });

        components.extras.push({
            header: "DatePicker",
            desc: Application.i18n(ComponentList, "components.ComponentList", "dateInputDesc"),
            json: require("./jsons/inputs/datepicker/DatePicker"),
            sample: require("./samples/inputs/DatePickerSample"),
            code: require("./samples/inputs/DatePickerSample.txt")
        });

        components.extras.push({
            header: "FaIcon",
            desc: Application.i18n(ComponentList, "components.ComponentList", "faIconDesc"),
            json: require("./jsons/faicon/FaIcon"),
            sample: require("./samples/faicon/FaIconSample"),
            code: require("./samples/faicon/FaIconSample.txt")
        });

        components.extras.push({
            header: "GoogleMap",
            desc: Application.i18n(ComponentList, "components.ComponentList", "googleMapDesc"),
            sample: require("./samples/googlemap/GoogleMapSample"),
            code: require("./samples/googlemap/GoogleMapSample.txt")
        });

        components.extras.push({
            header: "Iconizer",
            desc: Application.i18n(ComponentList, "components.ComponentList", "iconizerDesc"),
            json: require("./jsons/extras/Iconizer"),
            sample: require("./samples/extras/IconizerSample"),
            code: require("./samples/extras/IconizerSample.txt")
        });

        components.extras.push({
            header: "ReCaptcha",
            desc: Application.i18n(ComponentList, "components.ComponentList", "reCaptchaDesc"),
            sample: require("./samples/recaptcha/ReCaptchaSample"),
            code: require("./samples/recaptcha/ReCaptchaSample.txt")
        });

        components.extras.push({
            header: "ScreenKeyboard",
            desc: Application.i18n(ComponentList, "components.ComponentList", "screenKeyboardDesc"),
            json: require("./jsons/inputs/screenkeyboard/ScreenKeyboard"),
            sample: require("./samples/inputs/ScreenKeyboardSample"),
            code: require("./samples/inputs/ScreenKeyboardSample.txt")
        });

        return components;
    }

}

export default new ComponentList();
