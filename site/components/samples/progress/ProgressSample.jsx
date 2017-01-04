import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Button from "react-bootstrap/lib/Button";
import Progress from "robe-react-ui/lib/progress/Progress";


export default class ProgressSample extends ShallowComponent {
    render(): Object {
        return (
            <div>
                <div id="n-progress" style={{ paddingTop: 20 }}>
                    <Button
                        onClick={this.__onClickParentStart}
                    >Start at current div</Button>
                    <Button
                        onClick={this.__onClickStart}
                    >Start at body</Button>

                    <Button
                        onClick={this.__onClickSpinnerStart}
                    >Start with spinner</Button>
                    <Button
                        onClick={this.__onClickComplete}
                    >Done</Button>
                </div>
                <a rel="noopener noreferrer" target="_blank" style={{ marginTop: 10 }} href="http://ricostacruz.com/nprogress/">Read More About Progress</a>
            </div>
            
        );
    }

    __onClickSpinnerStart = () => {
        this.__onClickComplete();
        Progress.configure({ parent: "#n-progress", showSpinner: true });
        Progress.start();
    }

    __onClickParentStart = () => {
        this.__onClickComplete();
        Progress.configure({ parent: "#n-progress" });
        Progress.start();
    };
    __onClickStart = () => {
        this.__onClickComplete();
        Progress.configure({ parent: "body", showSpinner: false });
        Progress.start();
    };
    __onClickComplete = () => {
        Progress.done();
    };
}
