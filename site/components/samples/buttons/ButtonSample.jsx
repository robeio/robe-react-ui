import React from "react";
import { Application, ShallowComponent } from "robe-react-commons";
import { Button, Toast } from "robe-react-ui";
import { ControlLabel } from "react-bootstrap";


export default class ButtonSample extends ShallowComponent {

    render(): Object {
        return (
            <div>
                <ControlLabel>{Application.i18n(ButtonSample, "buttons.ButtonSample", "buttonNormal")}</ControlLabel>
                <div className="form-group">
                    <Button bsStyle="primary" onClick={ButtonSample.onClick}>Normal</Button>
                </div>
                <ControlLabel>{Application.i18n(ButtonSample, "buttons.ButtonSample", "buttonAsync")}</ControlLabel>
                <div className="form-group">
                    <Button bsStyle="warning" onClickAsync={this.onClickAsync}>{Application.i18n(ButtonSample, "buttons.ButtonSample", "async")}</Button>
                </div>
                <a
                    href="https://react-bootstrap.github.io/components.html#buttons" rel="noopener noreferrer"
                    target="_blank"
                >{Application.i18n(ButtonSample, "buttons.ButtonSample", "forMoreLink")}</a>
            </div>
        );
    }
    static onClick(e: Object) {
        Toast.info(`Button Click: ${e.target.innerText}`);
    }

    onClickAsync(e: Object, done: Function) {
        let me = this;
        // We used setTimeout to simulate an AJAX call.
        setTimeout(() => {
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
