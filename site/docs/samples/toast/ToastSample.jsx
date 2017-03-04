import React from "react";
import {Application, ShallowComponent} from "robe-react-commons";
import Toast from "robe-react-ui/lib/toast/Toast";
import {Button, ButtonToolbar, Checkbox} from "react-bootstrap";
import RadioInput from "robe-react-ui/lib/inputs/RadioInput";
import NumericInput from "robe-react-ui/lib/inputs/NumericInput";
import Highlight from "react-highlight";
import Snippet1 from "./Snippet1.txt";
import Snippet2 from "./Snippet2.txt";

export default class ToastSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            position: "top-right",
            numMaxVisible: 5
        }
    }

    toastMessage = (type) => {
        return () => {
            switch (type) {
                case "info":
                    Toast.info(Application.i18n(ToastSample,"toast.ToastSample","infoMessage"));
                    break;
                case "success":
                    Toast.success(Application.i18n(ToastSample,"toast.ToastSample","successMessage"), Application.i18n(ToastSample,"toast.ToastSample","successTitle"));
                    break;
                case "warning":
                    Toast.warning(Application.i18n(ToastSample,"toast.ToastSample","warningMessage"), Application.i18n(ToastSample,"toast.ToastSample","warningDesc"), 3000);
                    break;
                case "error":
                    Toast.error(Application.i18n(ToastSample,"toast.ToastSample","errorMessage"), Application.i18n(ToastSample,"toast.ToastSample","errorTitle"), 5000, () => {
                        alert(Application.i18n(ToastSample,"toast.ToastSample","callback"));
                    });
                    break;
                default:
                    throw new Error("Unknown Message");
            }
        };
    };


    toastConfiguration(property, value) {
        switch (property) {
            case "position":
                Toast.configuration({position: value});
                break;
            case "numMaxVisible":
                Toast.configuration({maxVisible: value});
                break;
            default:
                throw new Error("Unknown Message");
        }
    }

    radioInput = null;

    render(): Object {
        return (
            <div>
                <RadioInput
                    label={Application.i18n(ToastSample,"toast.ToastSample","radioLabel")}
                    name="position"
                    items={[
                            {
                                key: "top-right",
                                value: Application.i18n(ToastSample,"toast.ToastSample","topRight")
                            },
                            {
                                key: "top-left",
                                value: Application.i18n(ToastSample,"toast.ToastSample","topLeft")
                            },
                            {
                                key: "bottom-right",
                                value: Application.i18n(ToastSample,"toast.ToastSample","bottomRight")
                            },
                            {
                                key: "bottom-left",
                                value: Application.i18n(ToastSample,"toast.ToastSample","bottomLeft")
                            }
                        ]}
                    value={this.state.position}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
                />

                <p>{Application.i18n(ToastSample, "toast.ToastSample", "radioLabel")}</p>
                <Highlight className="javascript">{Snippet1}</Highlight>
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.toastMessage("success")}>{Application.i18n(ToastSample, "toast.ToastSample", "success")}</Button>
                    <Button bsStyle="info" onClick={this.toastMessage("info")}>{Application.i18n(ToastSample, "toast.ToastSample", "info")}</Button>
                    <Button bsStyle="warning" onClick={this.toastMessage("warning")}>{Application.i18n(ToastSample, "toast.ToastSample", "warning")}</Button>
                    <Button bsStyle="danger" onClick={this.toastMessage("error")}>{Application.i18n(ToastSample, "toast.ToastSample", "error")}</Button>
                </ButtonToolbar>
                <br />
                <br />
                <p>{Application.i18n(ToastSample, "toast.ToastSample", "paragraphTwo")}</p>
                <Highlight className="javascript">{Snippet2}</Highlight>
                <NumericInput
                    label={Application.i18n(ToastSample,"toast.ToastSample","numericLabel")}
                    name="numMaxVisible"
                    value={this.state.numMaxVisible}
                    onChange={this.__handleChange}
                />
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.toastMessage("success")}>{Application.i18n(ToastSample, "toast.ToastSample", "success")}</Button>
                    <Button bsStyle="info" onClick={this.toastMessage("info")}>{Application.i18n(ToastSample, "toast.ToastSample", "info")}</Button>
                    <Button bsStyle="warning" onClick={this.toastMessage("warning")}>{Application.i18n(ToastSample, "toast.ToastSample", "warning")}</Button>
                    <Button bsStyle="danger" onClick={this.toastMessage("error")}>{Application.i18n(ToastSample, "toast.ToastSample", "error")}</Button>
                </ButtonToolbar>
                <br />
            </div>

        );
    }

    __handleChange(e: Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.toastConfiguration(e.target.name, value);
        this.setState(state);
    }

}