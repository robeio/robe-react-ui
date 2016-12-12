import React from "react";
import {
    ButtonToolbar, Button
} from "react-bootstrap";
import {
    ShallowComponent
} from "robe-react-commons";
import {
    ToastContainer,
    Toast
} from "robe-react-ui/lib/toast";

class Example extends ShallowComponent {
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
                <ButtonToolbar>
                    <Button bsStyle="success" onClick={this.toastMessage("success")}>Success</Button>
                    <Button bsStyle="info" onClick={this.toastMessage("info")}>Info</Button>
                    <Button bsStyle="warning" onClick={this.toastMessage("warning")}>Warning</Button>
                    <Button bsStyle="danger" onClick={this.toastMessage("error")}>Error</Button>
                </ButtonToolbar>
                <ToastContainer />
            </div>
        );
    }
}

export default Example;