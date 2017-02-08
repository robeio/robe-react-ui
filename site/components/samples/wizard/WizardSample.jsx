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


class InfoStep extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            approve: ""
        };
    }

    render() {
        return (
            <div>
                <hr style={{marginTop:0}}/>
                <div><label style={{color:"#4380db"}}>Name: </label> {this.state.name}</div>
                <div><label style={{color:"#4380db"}}>Gender: </label> {this.state.gender}</div>
                <hr style={{marginTop:0}}/>

                <CheckInput
                    name="approve"
                    item={{key: "approve",value: "I approve."}}
                    textField="value"
                    valueField="key"
                    value={this.state.approve}
                    formControl={false}
                    onChange={this.__handleChange}
                />
            </div>
        );
    }

    __handleChange(e) {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
        return true;
    }

    isValid() {
        let result = {message: "", status: true};
        if (!this.state.approve) {
            result.message = "Please confirm your information.";
            result.status = false;
        }
        return result;
    }

    stateOfSteps(steps) {
        var state = {};
        state.name = steps.formStep.name;
        state.gender = steps.formStep.gender;
        this.setState(state);
    }
}

class CompleteStep extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            approve: ""
        };
    }

    render() {
        return (
            <div>
                <h4 style={{color:"#4380db"}}>Successful!</h4>
                <hr style={{marginTop:0}}/>
                <div><label>Name: </label> {this.state.name}</div>
                <div><label>Gender: </label> {this.state.gender}</div>
                <hr style={{marginTop:0}}/>

                <CheckInput
                    name="approve"
                    item={{key: "approve",value: "I approve."}}
                    textField="value"
                    valueField="key"
                    disabled
                    value={this.state.approve}
                    formControl={false}/>
            </div>
        );
    }

    isValid() {
        let result = {message: "Finish", type: "success"};

        return result;
    }

    stateOfSteps(steps) {
        var state = {};
        state.name = steps.infoStep.name;
        state.gender = steps.infoStep.gender;
        state.approve = steps.infoStep.approve;
        this.setState(state);
    }
}

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
                        <InfoStep/>
                    </Step>
                    <Step title="Complete" stepKey="completeStep">
                        <CompleteStep/>
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
