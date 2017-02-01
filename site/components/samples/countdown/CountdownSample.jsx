import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Countdown from "robe-react-ui/lib/countdown/Countdown";
import FaIcon from "robe-react-ui/lib/faicon/FaIcon";

import { ButtonGroup, Button } from "react-bootstrap";

export default class CountdownSample extends ShallowComponent {
    countdown1;
    constructor(props) {
        super(props);
        this.state = {
            ticking: true
        }
    }

    render(): Object {
        return (
            <div style={{ textAlign: "center" }}>
                <Countdown
                    ref={(comp) => { this.countdown1 = comp; } }
                    onComplete={this.onComplete}
                    style={{ fontSize: "50px" }}
                    />
                <hr />
                <div style={{ textAlign: "center" }}>
                    <ButtonGroup>
                        <Button onClick={(this.state.ticking ? this.stop : this.start)}>
                            <FaIcon code={(this.state.ticking ? "fa-pause" : "fa-play")} />
                        </Button>
                        <Button onClick={this.reset}>
                            <FaIcon code="fa-refresh" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
    onComplete() {
        this.setState({
            ticking: false
        });
        this.reset();
    }

    start() {
        this.setState({
            ticking: true
        });
        this.countdown1.start();
    }
    stop() {
        this.setState({
            ticking: false
        });
        this.countdown1.stop();
    }
    reset() {
        this.countdown1.reset();
    }

    componentDidMount(props) {
        this.start();
    }
}
