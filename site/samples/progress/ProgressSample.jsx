import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Button from "react-bootstrap/lib/Button";
import Progress from "robe-react-ui/lib/progress/Progress";


export default class ProgressSample extends ShallowComponent {
    render():Object {
        return (
            <div>
                <Button
                    onClick={this.__onClickStart}>Start</Button>
                <Button
                    onClick={this.__onClickComplete}>Done</Button>
            </div>
        );
    }
    __onClickStart = () => {
        Progress.start();
    };
    __onClickComplete = () => {
        Progress.done();
    };
}
