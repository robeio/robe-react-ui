import React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";

export default class Validation extends ShallowComponent {
    /**
     * Properties of the component
     *
     * @static
     */
    static propTypes: Map = {
        direction: React.PropTypes.oneOf(["left", "right"])
    }

    /**
     * defaultProps
     * @static
     */
    static defaultProps = {
        direction: "right"
    };

    constructor(props) {
        super(props);
    }

    render() {
        let validationState = "error";
        return (
            <FormGroup controlId={this.props.name} validationState={validationState} >
                <ControlLabel>{this.props.label}</ControlLabel>
                    {this.props.children}
                <FormControl.Feedback />
            </FormGroup>
        );
    }
}
