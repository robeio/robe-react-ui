import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Toast from "robe-react-ui/lib/toast/Toast";
import { Button, ButtonToolbar, Checkbox } from "react-bootstrap";
import RadioInput from "robe-react-ui/lib/inputs/RadioInput";
import NumericInput from "robe-react-ui/lib/inputs/NumericInput";

const positions = [
    {
        key: "top-right",
        value: "Top and Right"
    },
    {
        key: "top-left",
        value: "Top and Left"
    },
    {
        key: "bottom-right",
        value: "Bottom and Right"
    },
    {
        key: "bottom-left",
        value: "Bottom and Left"
    }
];

export default class ToastSample extends ShallowComponent {

    constructor(props: Object) {
        super(props);
        this.state = {
            position: "top-right",
            maxVisible: 5
        }
    }

    toastMessage = (type) => {
        return () => {
            switch (type) {
                case "info":
                    Toast.info("Info message");
                    break;
                case "success":
                    Toast.success("Success message", "Title here");
                    break;
                case "warning":
                    Toast.warning("Warning message", "Close after 3000ms", 3000);
                    break;
                case "error":
                    Toast.error("Error message", "Click me!", 5000, () => {
                        alert("callback");
                    });
                    break;
                default:
                    throw new Error("Unknown Message");
            }
        };
    };

    toastConfiguration(property, value) {
        let conf = {};
        conf[property] = value;
        Toast.configuration(conf);
    }

    render(): Object {
        return (
            <div>
                <RadioInput
                    label="Positions"
                    name="position"
                    items={positions}
                    value={this.state.position}
                    textField="value"
                    valueField="key"
                    onChange={this.__handleChange}
                    />
                <NumericInput
                    label="Max Visible Count ( Default is max safe integer )"
                    name="maxVisible"
                    value={this.state.maxVisible}
                    onChange={this.__handleChange}
                    />
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.toastMessage("success")}>Success</Button>
                    <Button bsStyle="info" onClick={this.toastMessage("info")}>Info</Button>
                    <Button bsStyle="warning" onClick={this.toastMessage("warning")}>Warning</Button>
                    <Button bsStyle="danger" onClick={this.toastMessage("error")}>Error</Button>
                </ButtonToolbar>
                <br />
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
