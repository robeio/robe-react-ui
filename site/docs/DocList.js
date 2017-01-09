import InputValidations from "validation/InputValidations";

class DocList {

    getList(): Array {
        let components = [];
        /* eslint-disable global-require */

        components.push({
            header: "Validation",
            desc: "Validation is a built-in utility which can be used directly or via DataForm model.",
            sample: require("./samples/validation/ValidationSample")
        });

        components.push({
            header: "Model (for DataForm & DataGrid)",
            desc: "Models are a data definition mechanism  which is used by DataGrid and Dataform.",
            sample: require("./samples/model/ModelSample")
        });

        components.push({
            header: "Ajax Request",
            desc: "Perform an AJAX request. (Yeah, that's all)",
            sample: require("./samples/ajaxrequest/AjaxRequestSample")
        });

        components.push({
            header: "Remote Endpoint",
            desc: "Call APIs easly via AJAX requests under one roof. Simple configuration and usage.",
            sample: require("./samples/endpoint/RemoteEndpointSample")
        });
        
        components.push({
            header: "Store",
            desc: "Store is the easiest way to handle resources(JSON Data). Supports required operations for data manipulation. You can always extend for more.",
            sample: require("./samples/store/StoreSample")
        });
        components.push({
            header: "Input Addons",
            desc: "Adding additional components (icons,texts etc.) to your inputs.",
            sample: require("./samples/addon/InputAddon")
        });
        components.push({
            header: "i18n",
            desc: "Supporting multiple languages.",
            sample: require("./samples/i18n/I18n")
        });
        components.push({
            header: "Toast",
            desc: "Toast is a message showing utility. Helps developer to show toast messages easly and in a standardized way. ",
            sample: require("./samples/toast/ToastSample")
        });

        components.push({
            header: "'onChange' Method Usage",
            desc: "This page will explain the details of the onChange method of input components",
            sample: require("./samples/inputs/InputsSample")
        });

        return components;
    }

}
export default new DocList();
