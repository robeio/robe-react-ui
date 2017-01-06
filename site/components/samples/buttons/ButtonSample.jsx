import React from "react";
import { ShallowComponent } from "robe-react-commons";
import Button from "robe-react-ui/lib/buttons/Button";
import { ToastContainer, Toast } from "robe-react-ui/lib/toast";
import { ControlLabel } from "react-bootstrap";


export default class ButtonSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <ControlLabel>Button (with normal behavior)</ControlLabel>
                <div className="form-group">
                    <Button bsStyle="primary" onClick={ButtonSample.onClick}>Normal</Button>
                </div>
                <ControlLabel>Button (with async behavior)</ControlLabel>
                <div className="form-group">
                    <Button bsStyle="warning" onClickAsync={this.onClickAsync} >Async</Button>
                </div>
                <ToastContainer />
                <a href="https://react-bootstrap.github.io/components.html#buttons" rel="noopener noreferrer" target="_blank"> For more React-Bootstrap Button</a>
            </div>
        );
    }
    static onClick(e: Object) {
        Toast.info(`Button Click: ${e.target.innerText}`);
    }

    onClickAsync(e: Object, done: Function) {
        let me = this;
        // We used setTimeout to simulate an AJAX call.
        setTimeout(function () {
            me.onResponse(done);
        }, 1000);
    }

    onResponse(done: Function) {
        Toast.warning("Button Click: Async");
        // done method is important
        // Call this after all operations are done (at the end of AJAX)
        done();
    }
}
