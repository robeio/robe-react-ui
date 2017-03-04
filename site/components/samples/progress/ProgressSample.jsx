import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Progress from "robe-react-ui/lib/progress/Progress";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";
import { Button, ButtonGroup, Checkbox } from "react-bootstrap";


export default class ProgressSample extends ShallowComponent {
    constructor(props: Object) {
        super(props);
        this.state = {
            spinner: false
        };
    }
    render(): Object {
        return (
            <div>
                <div id="n-progress" style={{ marginTop: 20, paddingTop: 20, marginBottom: 20 }}>
                    <div>
                        <ButtonGroup>
                            <Button onClick={this.onClickSpinnerStart}>
                                <FaIcon code="fa-play" />
                            </Button>
                            <Button onClick={ProgressSample.onClickComplete} >
                                <FaIcon code="fa-stop" />
                            </Button>
                        </ButtonGroup>
                        {"   "}
                        <Checkbox inline onChange={this.onSpinnerClick}>With Spinner ?</Checkbox>
                    </div>
                </div>
                <a rel="noopener noreferrer" target="_blank" style={{ marginTop: 10 }} href="http://ricostacruz.com/nprogress/">Read More About Progress</a>
            </div>

        );
    }

    onClickSpinnerStart() {
        ProgressSample.onClickComplete();
        Progress.configure({ parent: "#n-progress", showSpinner: this.state.spinner });
        Progress.start();
    }

    static onClickComplete() {
        Progress.done();
    }

    onSpinnerClick() {
        this.setState({
            spinner: !this.state.spinner
        });
    }
}
