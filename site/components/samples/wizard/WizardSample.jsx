import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Wizard from "robe-react-ui/lib/wizard/Wizard";
import Step from "robe-react-ui/lib/wizard/Step";
import DataForm from "robe-react-ui/lib/form/DataForm";
import CheckInput from "robe-react-ui/lib/inputs/CheckInput";
import Highlight from "react-highlight";
import {Alert, Jumbotron, Collapse} from "react-bootstrap";

const fields = [
    {
        label: "Name",
        name: "name",
        type: "string",
        validations: {
            regex: {
                message: "Only letter",
                args: [
                    "^[a-zA-Z\\s\\ç\\Ç\\ö\\Ö\\ş\\Ş\\ı\\İ\\ğ\\Ğ\\ü\\Ü]+$"
                ]
            },
            required: true
        }
    },
    {
        label: "Gender",
        name: "gender",
        type: "radio",
        horizontal: true,
        validations: {
            required: true
        },
        items: [
            {
                value: "Male",
                text: "Bay"
            },
            {
                value: "Female",
                text: "Bayan"
            }
        ]
    }
];


export default class WizardSample extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {finish: false, stateOfSteps: {}};
    }

    render() {
        return (
            <div>
                <Wizard onCompleteClick={this.__onCompleteClick}>
                    <Step title="Form" stepKey="formStep">
                        <DataForm fields={fields}/>
                    </Step>
                    <Step title="Info" stepKey="infoStep">
                        <div>Info Step</div>
                    </Step>
                </Wizard>
                <Collapse in={this.state.finish}>
                    <div>
                        <h4 style={{color:"#4380db"}}>Result</h4>
                        <hr style={{marginTop:0}}/>
                        <Highlight className="json">
                            {JSON.stringify(this.state.stateOfSteps)}
                        </Highlight>
                    </div>
                </Collapse>
            </div>
        );
    }

    __onCompleteClick(steps) {
        this.setState({stateOfSteps: steps, finish: true});
    }

}
