import InputValidations from "validation/InputValidations";

class DocList {

    getList(): Array {
        let components = [];
        /* eslint-disable global-require */

        components.push({
            header: "Validation",
            desc: " is a built-in utility which can be used directly or via DataForm model.",
            sample: require("./samples/validation/ValidationSample")
        });

        components.push({
            header: "Model (for DataForm & DataGrid)",
            desc: " is a built-in mechanism which is used by DataGrid and Dataform.",
            sample: require("./samples/model/ModelSample")
        });

        components.push({
            header: "Ajax Request",
            desc: " Perform an asynchronous HTTP (Ajax) request.",
            sample: require("./samples/ajaxrequest/AjaxRequestSample")
        });

        components.push({
            header: "Remote Endpoint",
            desc: " Perform asynchronous HTTP (Ajax) requests under one roof.",
            sample: require("./samples/endpoint/RemoteEndpointSample")
        });
        
        components.push({
            header: "Store",
            desc: " Base of Store to keep data and to trigger dependencies component.",
            sample: require("./samples/store/StoreSample")
        });
        components.push({
            header: "Input Addons",
            desc: " Adding additional components to your inputs",
            sample: require("./samples/addon/InputAddon")
        });
        components.push({
            header: "i18n",
            desc: " Supporting multiple languages",
            sample: require("./samples/i18n/I18n")
        });
        components.push({
            header: "Toast",
            desc: " is a toast message showing utility. Helps developer to show toast messages easly and in a standardized way",
            sample: require("./samples/toast/ToastSample")
        });

        return components;
    }

}
export default new DocList();
