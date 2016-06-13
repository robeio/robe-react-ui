import React from "react";
import { Panel } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class Renderer extends ShallowComponent {

    /* eslint no-useless-constructor: 0*/
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Panel header={this.props.header}>
                {this.props.component}
            </Panel>
        );
    }
}
