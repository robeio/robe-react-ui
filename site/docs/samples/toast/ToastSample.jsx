import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import { ShallowComponent } from "robe-react-commons";
import { ToastContainer, Toast } from "robe-react-ui/lib/toast";
import NumericInput from "robe-react-ui/lib/inputs/NumericInput";
import Highlight from "react-highlight";
import Snippet1 from "./Snippet1.txt";
import Snippet2 from "./Snippet2.txt";

class ToastSample extends ShallowComponent {


    constructor(props: Object) {
        super(props);
        this.state = {
            numMaxVisible: ""
        };
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

    render() {
        return (
            <div>
                <p><code>Toast</code> have success,info,warning and error functions.</p>
                <Highlight className="javascript">{Snippet1}</Highlight>
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.toastMessage("success")}>Success</Button>
                    <Button bsStyle="info" onClick={this.toastMessage("info")}>Info</Button>
                    <Button bsStyle="warning" onClick={this.toastMessage("warning")}>Warning</Button>
                    <Button bsStyle="danger" onClick={this.toastMessage("error")}>Error</Button>
                </ButtonToolbar>
                <br />
                <br />
                <p>Also you can configure maximum visible notifications count. </p>
                <Highlight className="javascript">{Snippet2}</Highlight>
                <NumericInput
                    label={"Max Visible Count ( Default is max safe integer )"}
                    name="numMaxVisible"
                    value={this.state.numMaxVisible}
                    thousandSeparator=","
                    decimalSeparator="."
                    onChange={this.__handleChange}
                />
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.toastMessage("success")}>Success</Button>
                    <Button bsStyle="info" onClick={this.toastMessage("info")}>Info</Button>
                    <Button bsStyle="warning" onClick={this.toastMessage("warning")}>Warning</Button>
                    <Button bsStyle="danger" onClick={this.toastMessage("error")}>Error</Button>
                </ButtonToolbar>
                <br />
                <p><code>NotificationContainer</code> wrapped as <code>ToastContainer</code>,</p>
                <p><code>NotificationManager</code> wrapped as <code>Toast</code>.</p>
                <a rel="noopener noreferrer" target="_blank" href="https://github.com/minhtranite/react-notifications">Read More About Toast</a>
                
                <ToastContainer />
            </div>
        );
    }

    __handleChange(e: Object) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;

        if (value) {
            Toast.configure(value);
        } else {
            Toast.configure(Number.MAX_SAFE_INTEGER);
        }
        this.setState(state);
    }
}

export default ToastSample;
