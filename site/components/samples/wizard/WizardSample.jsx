import React from "react";
import ShallowComponent from "robe-react-commons/lib/components/ShallowComponent";
import Wizard from "robe-react-ui/lib/wizard/Wizard";
import Step from "robe-react-ui/lib/wizard/Step";
import DataForm from "robe-react-ui/lib/form/DataForm";
import Highlight from "react-highlight";
import {Alert, Jumbotron, Collapse} from "react-bootstrap";
import DataFormModel from "./DataFormModel.json";

class InfoStep extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: ""
        };
    }

    render() {
        let gender = this.state.gender === "male" ? "Mr." : "Mrs.";
        return (
            <div style={{textAlign: "center", margin: "40px 0px", fontSize: 24}}>
                <hr/>
                Hi, {gender + " " + this.state.name + " !"}
                <hr/>
            </div>
        );
    }

    stateOfSteps(steps) {
        let state = {};
        state.name = steps.formStep.name;
        state.gender = steps.formStep.gender;
        this.setState(state);
    }
}

class CompleteStep extends ShallowComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    render() {
        return (
            <div style={{textAlign: "center", margin: "40px 0px", fontSize: 24}}>
                <hr/>
                Goodbye, {this.state.name + " !"}
                <hr/>
            </div>
        );
    }

    isValid() {
        let result = {message: "Good Bye.", type: "success"};
        return result;
    }

    stateOfSteps(steps) {
        let state = {};
        state.name = steps.infoStep.name;
        this.setState(state);
    }
}

export default class WizardSample extends ShallowComponent {

    constructor(props) {
        super(props);
        this.state = {stepFinish: false, stateOfSteps: {}};
    }

    render() {
        return (
            <div>
                <Wizard onComplete={this.__onComplete}>
                    <Step title="Form" stepKey="formStep">
                        <DataForm fields={DataFormModel}/>
                    </Step>
                    <Step title="Info" stepKey="infoStep">
                        <InfoStep/>
                    </Step>
                    <Step title="Complete" stepKey="completeStep">
                        <CompleteStep/>
                    </Step>
                </Wizard>
                <Collapse in={this.state.stepFinish}>
                    <div>
                        <h4 style={{color: "#4380db"}}>Result</h4>
                        <hr style={{marginTop: 0}}/>
                        <Highlight className="json">
                            {JSON.stringify(this.state.stateOfSteps)}
                        </Highlight>
                    </div>
                </Collapse>
            </div>
        );
    }

    __onComplete(steps) {
        this.setState({stateOfSteps: steps, stepFinish: true});
    }

}
