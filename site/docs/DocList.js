import InputValidations from "validation/InputValidations";
import {Application} from "robe-react-commons";

class DocList {

    getList(): Array {
        let components = [];
        /* eslint-disable global-require */

        components.push({
            header: "Validation",
            desc: Application.i18n(DocList,"docs.DocList","validationDesc"),
            sample: require("./samples/validation/ValidationSample")
        });

        components.push({
            header: "Model (for DataForm & DataGrid)",
            desc: Application.i18n(DocList,"docs.DocList","modelDesc"),
            sample: require("./samples/model/ModelSample")
        });

        components.push({
            header: "Ajax Request",
            desc: Application.i18n(DocList,"docs.DocList","ajaxDesc"),
            sample: require("./samples/ajaxrequest/AjaxRequestSample")
        });

        components.push({
            header: "Remote Endpoint",
            desc: Application.i18n(DocList,"docs.DocList","remoteEndPointDesc"),
            sample: require("./samples/endpoint/RemoteEndpointSample")
        });
        
        components.push({
            header: "Store",
            desc: Application.i18n(DocList,"docs.DocList","storeDesc"),
            sample: require("./samples/store/StoreSample")
        });
        components.push({
            header: "Input Addons",
            desc: Application.i18n(DocList,"docs.DocList","inputAddOnDesc"),
            sample: require("./samples/addon/InputAddon")
        });
        components.push({
            header: "i18n",
            desc: Application.i18n(DocList,"docs.DocList","i18nDesc"),
            sample: require("./samples/i18n/I18n")
        });
        components.push({
            header: "Toast",
            desc: Application.i18n(DocList,"docs.DocList","toastDesc"),
            sample: require("./samples/toast/ToastSample")
        });

        components.push({
            header: "'onChange' Method Usage",
            desc: Application.i18n(DocList,"docs.DocList","onChangeDesc"),
            sample: require("./samples/inputs/InputsSample")
        });

        return components;
    }

}
export default new DocList();
